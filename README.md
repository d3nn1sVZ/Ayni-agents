# Ayni

> **Programmable *ayni* for the agent economy.** AI agents pay tribes of human contributors via Lightning Network — and every contributor gets their share in the same second, for fractions of a cent.

**Hack Nation 5 — Spiral Challenge 02 (Earn in the Agent Economy)**

🌐 Live: [ayniw.com](https://ayniw.com) · 📦 Repo: [d3nn1sVZ/Ayni-agents](https://github.com/d3nn1sVZ/Ayni-agents) · 📜 MIT

---

## What is *ayni*

*Ayni* (Quechua: pronounced *eye-nee*) is the Andean principle of reciprocity: **today I help you, tomorrow you help me**. It's the social technology that has held Andean communities together for centuries — and exactly what the Lightning Network finally lets us encode in software, at the scale of one agent query at a time.

**Ayni brings ayni to the agent economy.**

## What is this

Ayni is a marketplace of **knowledge tribes** (`tribus`) where small communities of human experts — legal, tax, data science, regional — collectively maintain specialized plugins that AI agents consume via API. Every agent query is a Lightning micropayment that's automatically split, in seconds and at near-zero cost, across all of the tribu's contributors.

We do what Stripe physically cannot: **pay several humans per single sub-cent transaction** — turning collective expertise into an income-generating, agent-native API.

## The problem

AI agents are scaling fast, but value flows back to a handful of model providers and platforms. The human experts whose knowledge powers useful agent outputs are invisible and unpaid. Two structural failures cause this:

1. **Payment rails make collective rewards impossible.** There is no way for an agent to consume specialized vertical knowledge — Peruvian tax code, Spanish-language data science practice, regional legal interpretations — and automatically reward the humans who curate it. Stripe and card networks charge a $0.30+ minimum per transaction, so splitting one agent query across even 5 contributors is mathematically negative-sum.
2. **Specialized communities are locked out of the agent economy.** Domain experts — especially in emerging markets — have no programmatic way to monetize their expertise, so it stays trapped in PDFs, consulting silos, and LinkedIn posts. Agent outputs get worse, and Global South knowledge gets excluded from the AI value chain.

The challenge: **build the payment-and-distribution layer that makes a multi-contributor knowledge marketplace economically viable** — something only Lightning Network can technically deliver today.

## Target audience

A two-sided marketplace.

**Supply side — Knowledge contributors.** Small communities (typically 3–10 people in the MVP, designed to scale further) of domain experts organized as `tribus`: tax accountants, data scientists, lawyers, researchers — particularly in emerging markets where expertise is under-monetized. Each tribu collectively maintains a specialized plugin and shares revenue automatically — *ayni encoded in software*.

**Demand side — AI agents and their operators.** Autonomous agents (and the developers/companies running them) that need vertical, trusted, up-to-date specialized knowledge for tasks general-purpose LLMs can't solve alone — e.g. an agent doing Peruvian tax filings or jurisdiction-specific lookups.

**Secondary:** developers building agentic applications who need a permissionless, programmatic way to extend agent capabilities without per-API contracts, signups, or subscriptions.

## The solution

Four core components, all shipped in this repo:

### 1. Tribus marketplace
A discoverable catalog of vertical knowledge plugins. **Two tribus shipped in the MVP:**

| Tribu | Price | Contributors | Splits |
|---|---|---|---|
| **Tributario PE** | 100 sat/call | 5 | 40% curador · 30% validador · 10% × 3 contribuidores |
| **Data Science ES** | 75 sat/call | 3 | 50% curador · 25% × 2 contribuidores |

Tributario PE answers real Peruvian tax questions (IGV, rentas 4ta/5ta, RER, NRUS). Data Science ES covers Spanish/LatAm data science practice.

### 2. L402-protected agent API
Each plugin exposes an endpoint protected by the **L402 protocol** via MoneyDevKit. The flow:

1. Agent calls `GET /api/ayni/[plugin]?q=...`
2. Server returns `HTTP 402 Payment Required` + Lightning invoice + macaroon
3. Agent's wallet pays in seconds
4. Agent retries with `Authorization: L402 <macaroon>:<preimage>`
5. Server verifies `sha256(preimage) === paymentHash` and returns the expert answer

### 3. Automatic micro-commission distribution (real onward Lightning)
On L402 success, [`scripts/demo-flow.sh`](scripts/demo-flow.sh) reads `ayni.splits` from the response and pays each contributor's BOLT12 / Lightning Address via the MDK agent-wallet. The splitter uses **floor-then-residual** rounding to guarantee per-wallet sats sum exactly to the total — no drift.

Splitting one payment across several humans for fractions of a cent is **impossible with cards or Stripe** — Lightning makes it trivial. This is *ayni* implemented in code.

### 4. Live activity dashboard
A real-time feed (Server-Sent Events, two-phase: `requested` → `settled`) lights up the moment an agent hits the endpoint, then animates the payout fan-out the moment Lightning settlement lands. **Turning the redistribution into something a judge can see, not just read about.**

## USP — what we do that nobody else can

We do the one thing the existing payment stack physically cannot: **split a single sub-cent payment across multiple contributors, in seconds, globally, with no intermediaries.**

- **Stripe:** ~$0.30 minimum fee per transaction → splitting across 5+ recipients is negative-sum.
- **Stablecoins (x402 / USDC):** non-trivial gas + per-transfer fees on most chains, plus a single corporate gatekeeper (issuer) who sets policy and can freeze funds.
- **Ayni on Lightning:** ~$0.00 fee → distributing 100 sats across 5 contributors costs effectively nothing and settles in seconds, 24/7, across borders, with no contracts, KYC, or subscriptions.

Three positioning axes:
- **Collective, not individual.** RapidAPI / ElevenLabs monetize individual creators; we monetize *tribus* — the way knowledge actually gets built.
- **Agent-native by design.** L402 + a public `/.well-known/agent-skill.json` manifest let an autonomous agent discover, price, and pay this API with **zero human in the loop** — no signup, no API keys, no billing setup.
- **Cultural fit, not just product fit.** Our name and architecture come from *ayni* — an Andean reciprocity principle that already governs how knowledge gets built in the communities we serve.

## Stack

- **Lightning rails:** [MoneyDevKit (MDK) v0.16](https://www.npmjs.com/package/@moneydevkit/nextjs) — invoice generation, L402 paywall, payment verification, SATS settlement against a real Lightning node on **Bitcoin mainnet**.
- **App:** Single **Next.js 15** app (App Router, React 19, TypeScript, Tailwind) deployed to **Vercel**. Same codebase serves the API routes (`/api/ayni/[plugin]`, `/api/payouts/stream`, `/api/demo/[plugin]`, `/api/mdk`) and the frontend dashboard. **Spanish-first** UI (`<html lang="es">`).
- **Onward redistribution:** Naive splitter implemented in [`scripts/demo-flow.sh`](scripts/demo-flow.sh), real Lightning fan-out per contributor wallet. *Spark was evaluated for native splitting and rejected for time reasons in favour of this naive-but-real fan-out.*
- **Agent discovery:** Public [`/.well-known/agent-skill.json`](public/.well-known/agent-skill.json) manifest so agents and crawlers ([402index.io](https://402index.io)) can self-discover plugins, pricing, and the L402 flow. Domain verified for 402index.io.
- **Live dashboard:** Two-phase SSE events (`requested` → `settled`) over Server-Sent Events.
- **Wallet compatibility:** Phoenix, Alby, Strike, MDK agent-wallet on the agent side.

### Critical fix that unlocked the build
A webpack/runtime bug in the L402 route — the `ws` WebSocket library's `mask()` broke when bundled, and the native `@moneydevkit/lightning-js` `.node` binding cannot be webpacked — was diagnosed and fixed by **externalizing both packages and pinning the route to the Node.js runtime** (commit [`09efcb6`](https://github.com/d3nn1sVZ/Ayni-agents/commit/09efcb6); see [`next.config.mjs`](next.config.mjs)).

## End-to-end validated flow

```
agent
  └── GET /api/ayni/tributario-pe?q=igv
        └── 402 Payment Required + invoice + macaroon
              └── MDK agent-wallet pays
                    └── preimage verified (sha256(preimage) === paymentHash)
                          └── 200 OK + expert answer + ayni.splits
                                └── scripts/demo-flow.sh
                                      └── onward Lightning sends to each contributor wallet
```

**Verified live on Bitcoin mainnet during the build:**

- 5 autonomous L402 unlocks paid by an MDK agent-wallet (10, 75, 10, 5, 1 sats — including a 1-sat invoice that no other rail can settle).
- 1 onward Lightning send from agent-wallet to a real external `coinos.io` Lightning Address — proving the redistribution architecture isn't a loopback shortcut, it's real Lightning routing across separate nodes.
- See [`scripts/demo-output-broll.txt`](scripts/demo-output-broll.txt) for the full captured terminal output, complete with payment hashes and preimages anyone can verify on-chain.

## Quick start

```bash
# install
npm install

# dev server
npm run dev

# end-to-end demo (requires a funded MDK agent-wallet)
bash scripts/demo-flow.sh tributario-pe igv
```

The dashboard lives at [`/`](app/page.tsx) — single page with marketplace + live activity feed.

## Repo layout

```
app/                       Next.js 15 App Router (single page + API routes)
  api/ayni/[plugin]/       L402-protected agent API
  api/payouts/stream/      Server-Sent Events for live dashboard
  api/demo/[plugin]/       Demo trigger endpoint
  api/mdk/                 MoneyDevKit integration
data/tribus.json           Tribus catalog (price + splits + knowledge)
public/.well-known/
  agent-skill.json         Agent-discoverable manifest
scripts/demo-flow.sh       End-to-end demo + onward Lightning fan-out
next.config.mjs            ws + lightning-js externals, Node runtime pin
```

## Adding a new tribu

A config change in [`data/tribus.json`](data/tribus.json) — not a code change. Add an entry with `id`, `name`, `pricePerCallSats`, and `splits[]` (each with `wallet`, `role`, `pct`, `lnAddress`). The marketplace, API, and manifest pick it up automatically.

## Impact

- **For contributors:** turns informal, fragmented expertise into a recurring, programmatic income stream — particularly transformative in emerging markets where domain knowledge is abundant but under-monetized.
- **For the agent economy:** unlocks vertical, trusted knowledge that general-purpose models can't supply, while solving "how do agents pay for things" without replacing one corporate gatekeeper (Visa) with another (stablecoin issuers).
- **For Lightning / Bitcoin:** demonstrates a real, non-trivial, agent-native use case that genuinely *requires* Lightning — micro fan-out payments no other rail can deliver. Directly addresses Spiral's mandate of enabling AI agents to earn and pay permissionlessly.

## Why we picked Spiral

Strongest match between three things:

- **Team motivation:** fintech + agents + UX is what we already love.
- **Mentorship available:** the MDK / Lightning team is reachable in Spanish via Discord throughout the build.
- **Unique upside:** Spiral's "impossible-with-Stripe" bonus criterion rewards exactly what Lightning uniquely makes possible — sub-cent micro fan-out that no card network or stablecoin issuer can match.

## Plan B that de-risked our choice

If MoneyDevKit had blocked us in the first 30 minutes of smoke-testing, the team had a documented pivot to the World Bank "Unmapped" challenge — leveraging Cindy Rojas's IMF and Dennis Vivas's IDB experience. The smoke test passed in 12 minutes, so Plan A continued.

## Real-world extension path

Same infrastructure can host civic plugins (Peruvian tax code maintained by a local CPA tribu), scientific plugins (university thesis repositories), or regional legal tribus — directly relevant to the Hack Nation incubation thesis on Global South AI infrastructure. Adding a third tribu (e.g. Legal PE) is a config change in [`data/tribus.json`](data/tribus.json), not a code change.

## Team

4 contributors based in Lima, Peru.

- **Dennis Vivas** — Architect & Pitch Lead
- **Cindy Rojas** — Backend dev
- **Jhoselyn Pajuelo** — Frontend / UX

## Tags

`Lightning Network` · `Bitcoin` · `L402` · `MoneyDevKit` · `Next.js 15` · `React 19` · `TypeScript` · `Tailwind` · `Vercel` · `Server-Sent Events` · `BOLT11/BOLT12` · `AI Agents` · `Agentic Payments` · `Marketplace` · `Micropayments` · `Knowledge Sharing` · `Reciprocity` · `Ayni` · `Decentralized` · `Web3` · `Fintech` · `Global South`

## License

MIT — created during Hack Nation 5 per challenge rules.
