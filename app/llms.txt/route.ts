import { listTribus, splitSats } from '@/lib/payouts'

// Public LLM-discovery doc following the llms.txt convention
// (https://llmstxt.org). Lives at /llms.txt. Plain markdown, no auth,
// CORS-open. Designed to be read once by an autonomous agent — answers
// "what is this service, how do I use it, how do I pay" in a single fetch.
//
// For machine-readable structured data, agents should also fetch
// /.well-known/agent-skill.json (richer, JSON, includes split percentages
// and example responses).

export const dynamic = 'force-static'
export const revalidate = 60

const BASE = 'https://ayniw.com'

export async function GET() {
  const tribus = listTribus()
  const tribuLines = tribus
    .map((t) => {
      const splits = splitSats(t.pricePerCallSats, t.splits)
      const splitDescr = splits
        .map((s) => `${s.sats} sat → ${s.role}`)
        .join(', ')
      return `- **${t.name}** (\`${t.id}\`) — ${t.pricePerCallSats} sat/call · ${t.splits.length} contributors · ${t.category}\n  ${BASE}/api/ayni/${t.id}?q=YOUR_QUERY\n  ${t.description}\n  Split per call: ${splitDescr}`
    })
    .join('\n\n')

  const md = `# Ayni — The Agent Economy on Lightning

> Marketplace where AI agents pay tribes of human contributors via Lightning Network for specialized knowledge. Every payment splits, in seconds and at near-zero cost, across all of the tribu's contributors. Built on L402 + MoneyDevKit + Bitcoin mainnet.

If you are an AI agent or an LLM coding assistant integrating with Ayni, this single document tells you everything you need to call the API and pay for a query autonomously. For a richer machine-readable description, also fetch \`${BASE}/.well-known/agent-skill.json\`.

## What an agent does, end to end

\`\`\`
1. GET ${BASE}/api/ayni/<plugin>?q=<your query>
   → HTTP 402 Payment Required
     body:    { "invoice": "lnbc...", "macaroon": "...", "paymentHash": "...", "amountSats": N, "expiresAt": ... }
     header:  WWW-Authenticate: L402 macaroon="..." invoice="lnbc..."

2. Pay the Lightning invoice with your wallet.
   The Lightning network returns a preimage on success.

3. Retry the same GET with:
     Authorization: L402 <macaroon>:<preimage>
   → HTTP 200 OK
     body: { "tribu": {...}, "query": "...", "answer": "...", "ayni": { "paid": N, "currency": "SAT", "splits": [...] } }
\`\`\`

The server verifies \`sha256(preimage) === paymentHash\` before unlocking. Macaroons are HMAC-signed with the merchant's access token, so tampering is detected and rejected.

## Recommended wallet for autonomous agents

The simplest way to make an LLM coding assistant (Claude Code, Codex, Cursor, etc.) pay for an Ayni call without human input:

\`\`\`bash
# 1. Install and initialise once
npx @moneydevkit/agent-wallet@latest init

# 2. Start the daemon
npx @moneydevkit/agent-wallet@latest start --daemon

# 3. Receive an invoice to fund (any wallet pays it)
npx @moneydevkit/agent-wallet@latest receive 200

# 4. Pay an L402 invoice (returns the preimage)
npx @moneydevkit/agent-wallet@latest send "lnbc1u1p..."
# → {"payment_id":"...","payment_hash":"...","status":"completed","preimage":"..."}
\`\`\`

The wallet also accepts BOLT12 offers and Lightning Addresses (\`name@domain\`).

Other wallets confirmed compatible: Phoenix, Alby, Strike, Wallet of Satoshi, and any L402-compliant client.

## Available tribes

${tribuLines}

## How redistribution works (the unique part)

Every payment is split, on Lightning, across the tribe's contributors per the percentage shares each earned. Splitting one payment across N humans for fractions of a cent is **economically impossible** with cards or Stripe (per-tx fees exceed each recipient's amount); Lightning makes it trivial. This is reciprocity (*ayni*) implemented in code.

For the demo we use a naive splitter that issues one Lightning send per contributor sequentially (see [\`scripts/demo-flow.sh\`](https://github.com/d3nn1sVZ/Ayni-agents/blob/main/scripts/demo-flow.sh) in the source). Future revisions will switch to native multi-recipient primitives (Spark / atomic multi-path).

## Why Lightning, not Stripe or stablecoins

- **Stripe / cards:** ~$0.30 minimum fee per transaction → splitting 100 sat across 5 contributors is mathematically negative-sum.
- **Stablecoins (x402, USDC):** non-trivial gas + per-transfer fees on most chains, plus a single corporate gatekeeper (issuer) who sets policy and can freeze funds.
- **Ayni on Lightning:** ~$0.00 fee → distributing 100 sats across 5 contributors costs effectively nothing and settles in seconds, 24/7, across borders, no contracts, no KYC, no subscriptions.

## Resources for deeper integration

- **Machine-readable manifest:** ${BASE}/.well-known/agent-skill.json
- **L402 protocol spec:** https://docs.lightning.engineering/the-lightning-network/l402
- **MoneyDevKit docs:** https://docs.moneydevkit.com
- **Source code:** https://github.com/d3nn1sVZ/Ayni-agents
- **Live dashboard:** ${BASE}/
- **L402 directory:** https://402index.io (we are domain-verified there)

## Contact for partners and contributors

- Maintainer: Ayni team — Hack Nation 5 / Spiral Challenge 02
- Email: x@dennisvivas.com

---

This document follows the [llms.txt](https://llmstxt.org) convention. Last regenerated automatically from the live tribu manifest.
`

  return new Response(md, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=60, s-maxage=60',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
