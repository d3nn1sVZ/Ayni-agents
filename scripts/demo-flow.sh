#!/usr/bin/env bash
# AyniAgents — full autonomous demo flow on Bitcoin mainnet.
#
# 1. Agent calls L402 endpoint without auth → 402 + Lightning invoice + macaroon
# 2. Agent autonomously pays the invoice via MDK agent-wallet → preimage
# 3. Agent retries with `Authorization: L402 <macaroon>:<preimage>` → 200 + answer
# 4. Reads `ayni.splits` from the response and fans real Lightning payments
#    to each contributor's lnAddress configured in data/tribus.json.
#
# What it produces: structured JSON for every step. Suitable as terminal
# B-roll for the technical demo video. Real money moves in ~8 seconds.
#
# Requires:
#   - npx
#   - jq
#   - curl
#   - @moneydevkit/agent-wallet daemon running (npx @moneydevkit/agent-wallet start --daemon)
#   - the agent-wallet funded with at least pricePerCallSats + sum(payouts) sats
#
# Usage:
#   ./scripts/demo-flow.sh                              # default: tributario-pe via ayniw.com
#   ./scripts/demo-flow.sh data-science-es              # different tribu
#   PLUGIN=tributario-pe HOST=https://ayniw.com ./scripts/demo-flow.sh
#   QUERY="¿qué tasas aplica el IGV?" ./scripts/demo-flow.sh

set -euo pipefail

PLUGIN="${1:-${PLUGIN:-tributario-pe}}"
HOST="${HOST:-https://ayniw.com}"
QUERY="${QUERY:-igv}"
WALLET="npx -y @moneydevkit/agent-wallet@latest"

# Color helpers (no-op if NO_COLOR set or not a tty)
if [ -t 1 ] && [ -z "${NO_COLOR:-}" ]; then
  BOLD=$'\033[1m'; DIM=$'\033[2m'; CYAN=$'\033[36m'; GREEN=$'\033[32m'
  RED=$'\033[31m'; YELLOW=$'\033[33m'; RESET=$'\033[0m'
else
  BOLD=''; DIM=''; CYAN=''; GREEN=''; RED=''; YELLOW=''; RESET=''
fi

box() {
  printf "\n${BOLD}${CYAN}════════════════════════════════════════════════════════${RESET}\n"
  printf "${BOLD}${CYAN}  %s${RESET}\n" "$1"
  printf "${BOLD}${CYAN}════════════════════════════════════════════════════════${RESET}\n"
}

box "STEP 1 — Agent calls L402 endpoint without auth"
RESP1="$(mktemp)"
HTTP1=$(curl -s -m 30 -o "$RESP1" -w "%{http_code}" "$HOST/api/ayni/$PLUGIN?q=$(printf %s "$QUERY" | jq -sRr @uri)")
echo "  ${DIM}GET $HOST/api/ayni/$PLUGIN?q=$QUERY${RESET}"
echo "  → HTTP $HTTP1"
INVOICE=$(jq -r '.invoice' "$RESP1")
MACAROON=$(jq -r '.macaroon' "$RESP1")
PHASH=$(jq -r '.paymentHash' "$RESP1")
AMOUNT=$(jq -r '.amountSats' "$RESP1")
echo "  invoice:      ${INVOICE:0:50}…${INVOICE: -20}"
echo "  macaroon:     ${MACAROON:0:30}… (${#MACAROON} chars)"
echo "  paymentHash:  $PHASH"
echo "  amount:       ${AMOUNT} sats"

box "STEP 2 — Agent pays autonomously via MDK agent-wallet"
PAY_RAW=$($WALLET send "$INVOICE" 2>&1 | tail -10)
echo "  ${DIM}$WALLET send <invoice>${RESET}"
echo "$PAY_RAW" | sed 's/^/  /'
PREIMAGE=$(echo "$PAY_RAW" | grep -oE '"preimage":"[a-f0-9]+"' | head -1 | sed 's/"preimage":"//;s/"$//')
if [ -z "$PREIMAGE" ]; then
  echo "  ${RED}FAILED: no preimage in agent-wallet response${RESET}"
  exit 1
fi

# Cryptographic verification: sha256(preimage) must equal paymentHash
SHA=$(printf "%s" "$PREIMAGE" | xxd -r -p | sha256sum | cut -d' ' -f1)
echo ""
echo "  ${BOLD}preimage:${RESET}        ${PREIMAGE:0:32}…"
echo "  ${BOLD}sha256(preimage):${RESET} $SHA"
echo "  ${BOLD}paymentHash:${RESET}     $PHASH"
if [ "$SHA" = "$PHASH" ]; then
  echo "  ${GREEN}✓ MATCH — preimage proves this invoice was paid${RESET}"
else
  echo "  ${RED}✗ HASH MISMATCH${RESET}"
  exit 1
fi

box "STEP 3 — Agent retries with Authorization: L402 <macaroon>:<preimage>"
RESP3="$(mktemp)"
HTTP3=$(curl -s -m 30 -o "$RESP3" -w "%{http_code}" \
  -H "Authorization: L402 $MACAROON:$PREIMAGE" \
  "$HOST/api/ayni/$PLUGIN?q=$(printf %s "$QUERY" | jq -sRr @uri)")
echo "  ${DIM}GET $HOST/api/ayni/$PLUGIN?q=$QUERY  + Authorization: L402 …${RESET}"
echo "  → HTTP $HTTP3"
jq '.' "$RESP3" | sed 's/^/  /'

box "STEP 4 — Real onward Lightning sends to N contributors (the ayni)"
TRIBU=$(jq -r '.tribu.name' "$RESP3")
TOTAL=$(jq -r '.ayni.paid' "$RESP3")
echo "  ${BOLD}Tribu:${RESET}  $TRIBU"
echo "  ${BOLD}Total:${RESET}  $TOTAL sats received from agent"
echo "  ${BOLD}Splits to:${RESET}"

# For each split, look up its lnAddress in data/tribus.json and pay it.
TRIBUS_FILE="$(dirname "$0")/../data/tribus.json"
if [ ! -f "$TRIBUS_FILE" ]; then
  echo "  ${YELLOW}data/tribus.json not found at $TRIBUS_FILE — skipping payouts${RESET}"
  exit 0
fi

SPLIT_COUNT=$(jq -r ".ayni.splits | length" "$RESP3")
i=0
SUCCESSES=0
FAILURES=0
TOTAL_SENT=0
while [ $i -lt $SPLIT_COUNT ]; do
  WALLET_NAME=$(jq -r ".ayni.splits[$i].wallet" "$RESP3")
  ROLE=$(jq -r ".ayni.splits[$i].role" "$RESP3")
  SATS=$(jq -r ".ayni.splits[$i].sats" "$RESP3")
  LN_ADDR=$(jq -r ".\"$PLUGIN\".splits[$i].lnAddress // empty" "$TRIBUS_FILE")

  printf "\n  ${BOLD}[%d/%d]${RESET} %s · %s\n" "$((i+1))" "$SPLIT_COUNT" "$WALLET_NAME" "$ROLE"
  printf "      amount: %s sats\n" "$SATS"

  if [ -z "$LN_ADDR" ]; then
    printf "      ${YELLOW}↳ no lnAddress configured — skipped${RESET}\n"
    FAILURES=$((FAILURES + 1))
    i=$((i+1))
    continue
  fi

  printf "      destination (truncated): %s…\n" "${LN_ADDR:0:60}"
  PAY_OUT=$($WALLET send "$LN_ADDR" "$SATS" 2>&1 | tail -5)
  STATUS=$(echo "$PAY_OUT" | grep -oE '"status":"[a-z]+"' | head -1 | sed 's/"status":"//;s/"$//')
  if [ "$STATUS" = "completed" ]; then
    printf "      ${GREEN}✓ sent${RESET}\n"
    SUCCESSES=$((SUCCESSES + 1))
    TOTAL_SENT=$((TOTAL_SENT + SATS))
  else
    printf "      ${RED}✗ failed${RESET}: %s\n" "$(echo "$PAY_OUT" | head -1)"
    FAILURES=$((FAILURES + 1))
  fi
  i=$((i+1))
done

box "RESULT"
printf "  ${BOLD}successes:${RESET} %d\n" "$SUCCESSES"
printf "  ${BOLD}failures:${RESET}  %d\n" "$FAILURES"
printf "  ${BOLD}total moved:${RESET} %d sats (of %d collected)\n" "$TOTAL_SENT" "$TOTAL"

if [ "$FAILURES" -eq 0 ]; then
  echo ""
  echo "  ${GREEN}🌀 ayni cumplido — money moved end-to-end across $((SPLIT_COUNT + 1)) Lightning hops${RESET}"
fi

rm -f "$RESP1" "$RESP3"
