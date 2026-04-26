# Intake: Ayni

*Skill: startup-pitch | Generated: 2026-04-26*

## 2-sentence company description (foundation of every pitch)

> **Ayni is a marketplace where AI agents pay small communities of human experts to answer specialized questions — Peruvian tax law, Spanish data science, regional legal — over Lightning Network. Every sub-cent agent query auto-splits across all of a tribe's contributors in seconds, which Stripe physically cannot do.**

**Concrete example:** An accounting AI agent needs to know if a Peruvian freelancer's *renta de cuarta categoría* deduction caps at 24 UIT. It calls `GET ayniw.com/api/ayni/tributario-pe?q=renta-cuarta`. Server returns HTTP 402 + 100-sat Lightning invoice + L402 macaroon. Agent's wallet pays. Server verifies preimage and returns the answer. In the same second, Lightning fans out: 40 sats to the tribe's curator (a Lima CPA), 30 to the legal validator, 10 each to 3 contributors. The tribe gets paid, the agent gets the right answer, no Stripe, no contracts, no signups.

## Problem

AI agents are scaling fast, but value flows back to model providers and platforms. Human experts whose knowledge powers agent outputs are invisible and unpaid. Two structural failures:

1. **Stripe's $0.30+ minimum kills collective rewards.** Splitting one agent query across 5 contributors is mathematically negative-sum on cards.
2. **Domain experts in emerging markets have no programmatic monetization path.** Knowledge stays trapped in PDFs, consulting silos, and LinkedIn posts.

## Solution

L402-protected agent API + onward Lightning fan-out. Working today on Bitcoin mainnet:

- **2 tribus shipped:** Tributario PE (5 contributors, 100 sat/call) + Data Science ES (3 contributors, 75 sat/call)
- **L402 paywall** via MoneyDevKit v0.16
- **Real onward Lightning sends** to each contributor's BOLT12 / Lightning Address
- **Live dashboard** with two-phase SSE events (request → settled fan-out)
- **Public agent-skill.json manifest** at `/.well-known/` so agents self-discover

## Unique insight

**Multi-recipient sub-cent payments are physically impossible on cards but trivial on Lightning.** Every other "agent payment" startup is solving discoverability or auth. We're solving the one thing the existing payment stack literally cannot do: pay multiple humans per sub-cent transaction. This is the bonus criterion in Spiral's challenge — *"do something impossible with Stripe"* — and our entire architecture is built around it.

## Traction (honest)

- **Built during hackathon (April 2026).** Pre-revenue, pre-launch.
- **End-to-end validated on Bitcoin mainnet:** real invoices, real preimage verification, real onward Lightning sends to contributor wallets.
- **Public live URL:** [ayniw.com](https://ayniw.com). MIT-licensed repo: [github.com/d3nn1sVZ/Ayni-agents](https://github.com/d3nn1sVZ/Ayni-agents).
- **Demo numbers are seeded** (234 + 87 consultas in the catalog UI) — flag as **[Demo data]** in the appendix.

## Business model

Per-call Lightning micropayment from agent. Tribu defines price (75–100 sats today). Splits are configured per tribu in the manifest. **Open question for the pitch:** does Ayni take a protocol fee (e.g. 5% off the top before split) or stay zero-fee in v0 for adoption? Either is defensible; needs a position before pitch.

## Market — bottom-up

- **TAM signal:** OpenAI ChatGPT has ~700M weekly active users (mid-2025). If 1% become agents needing vertical knowledge at 1 query/day at 100 sats (~$0.06), that's ~$420K/day → ~$150M/year just at ChatGPT scale. **[Estimate — depends on agent adoption curve]**
- **Wedge:** start with LatAm vertical knowledge where Stripe-based monetization is broken (tax, legal, regional DS). 50K+ contadores in Peru alone (Colegio de Contadores Públicos del Perú).
- **Why we win:** Lightning is the only rail. Once we have rails + manifest + dashboard, every additional tribu is a config change.

## Team

4 in Lima, Peru:

- **Dennis Vivas** — Architect & pitch lead. Drove the Spiral choice based on "MDK accessible in Spanish via Discord" + "impossible-with-Stripe bonus criterion."
- **Cindy Rojas** — Backend. Diagnosed and fixed the webpack/native-binding bug that unlocked the L402 route (commit `09efcb6`).
- **Miluska Pajuelo** — Frontend / UX. Spanish-first dashboard with two-phase live payout fan-out.
- **Jhoselyn Pajuelo** — Logistics / coordination. Spiral wallet, credits, submission.

**Gap to flag:** no senior Lightning engineer on team yet. Mitigation: MDK community + Spiral mentorship.

## The ask

**Hackathon context:** Ayni is competing for Spiral Challenge 02 prize + incubation. The pitch ask is judges' attention + the win + post-hackathon incubation slot.

**Post-hackathon framing (for VC follow-ups):** raising a small angel/grant round (~$150K–$250K, 6-month runway) to:
1. Ship 5 more tribus across LatAm verticals (legal PE, immigration ES/MX, agro PE)
2. Build a contributor-onboarding flow so any expert community can spin up a tribu
3. Add usage-based reputation scoring per contributor

## Why now

- **L402 standard adoption** (MDK, Phoenix, Alby, Strike) finally makes agent-native payment ergonomic.
- **AI agents** went from research demo → production deployment in 2024–2026. The "agents need to pay for things" question is suddenly urgent and unanswered.
- **Lightning capacity** crossed 5K+ BTC and stable in 2025 — the rail is mature enough to bet a product on.
- **Stablecoin-on-cards alternatives** (e.g. agent x402 over Coinbase) replace one gatekeeper with another. Lightning is the only neutral, permissionless option.

## Competitive frame

- **RapidAPI / API marketplaces:** monetize individuals, card rails, signup required, no sub-cent split.
- **ElevenLabs / OpenAI plugins:** monetize platforms, not contributors.
- **x402 / Coinbase agent payments:** solves agent payment, but on stablecoin rails — single recipient, KYC'd issuer.
- **Ayni:** only one with multi-contributor sub-cent split + permissionless + agent-native discovery.

## Pitch ordering decision

Default for pre-traction startups: What You Do → **Insight** → Problem → Solution (with concrete demo) → Why Now → Team → Ask.

**Lead with the insight** because: (a) pre-revenue, no traction to lead with; (b) the insight ("Stripe can't do this; Lightning can") IS the wedge and IS the Spiral bonus criterion — judges will tune in immediately; (c) team is solid but not the headline.

## Notes / gaps to close

- **[Gap]** Protocol fee position — needed before VC pitch.
- **[Gap]** No paying customers yet. Lead with insight + demo, not traction.
- **[Knowledge-Based — verify independently]** ChatGPT MAU estimate. Bottom-up math is illustrative, not citable.
