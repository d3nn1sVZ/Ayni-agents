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

1. **Payment rails make collective rewards impossible.** Stripe and card networks charge a $0.30+ minimum per transaction, so splitting one agent query across even 5 contributors is mathematically negative-sum.
2. **Specialized communities are locked out of the agent economy.** Domain experts — especially in emerging markets — have no programmatic way to monetize their expertise. It stays trapped in PDFs, consulting silos, and LinkedIn posts.

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

- **Stripe:** ~$0.30 minimum fee → splitting across 5 recipients is negative-sum.
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

## Real-world extension path

Same infrastructure can host civic plugins (Peruvian tax code maintained by a local CPA tribu), scientific plugins (university thesis repositories), or regional legal tribus — directly relevant to the Hack Nation incubation thesis on Global South AI infrastructure.

## Pitching this — exactly what to say

Two pre-written scripts. Read **verbatim**. Stress the **bold** words. Don't fill silence at the end — let the audience speak first.

> 📝 Full versions, with red flags + delivery notes: [pitch-2min.md](ayni-pitch/pitch-2min.md), [pitch-tech-1min.md](ayni-pitch/pitch-tech-1min.md), [pitch-1min.md](ayni-pitch/pitch-1min.md)
> 📊 Decks (with these scripts in the speaker notes): [Ayni-pitch-deck.pptx](ayni-pitch/Ayni-pitch-deck.pptx) (8 slides), [Ayni-tech-deck.pptx](ayni-pitch/Ayni-tech-deck.pptx) (6 slides)

### The 2-minute investor pitch (Spiral judges, demo day)

**[0:00 — open. Look up. Slow down.]**

> Ayni is a marketplace where AI agents pay tribes of human experts to answer specialized questions, over Lightning Network. An accounting agent calls our API, asks "what's the IGV rate in Peru," and pays 100 sats. In the same second, that payment auto-splits across all five contributors who maintain Peru's tax tribe — forty sats to the curador, thirty to the validador, ten each to three contribuidores.
>
> **Stripe physically cannot do this.** A 30-cent minimum fee makes splitting a sub-cent payment across five humans negative-sum. Lightning makes it free, instant, and global. **That's the entire wedge.**

*👉 Pause one full second after "Stripe physically cannot do this." Let it land.*

**[0:35 — Problem. Direct. No filler.]**

> AI agents are scaling fast. The model providers get paid. The platforms get paid. The human experts whose knowledge powers the answers — the Lima CPA, the Spanish data scientist, the regional lawyer — get nothing. Not because nobody wants to pay them. **Because the rails can't.**

**[0:55 — Solution. Show the demo.]**

> We built it on **Bitcoin mainnet** during the hackathon. An agent hits our endpoint, gets a 402 Payment Required with a Lightning invoice and an L402 macaroon, pays it in seconds, retries with the preimage, and gets the expert answer. Then a second Lightning fan-out sends each contributor their share. **Two tribes live today: Peruvian tax law and Spanish data science.** Public manifest at slash-well-known so any agent can self-discover. **Live at ayniw.com. MIT on GitHub.**

**[1:25 — Why now / why us.]**

> Why now: L402 just got ergonomic, agents went from demo to production this year, and Lightning is mature. Why us: we're four builders in Lima, and the communities we're monetizing — Peruvian contadores, Latam data scientists — are **people we can call by name today**.

**[1:50 — The ask. Confident. Stop talking.]**

> Ayni is the Quechua word for reciprocity. We've encoded it in software. **We're asking Spiral to back the only payment rail that can.**

*👉 Stop. Don't fill the silence. Let the judge speak first.*

---

### The 60-second tech video (Hack Nation submission, screen-recorded)

Record this with [Ayni-tech-deck.pptx](ayni-pitch/Ayni-tech-deck.pptx) on screen. Click slides on the timing marks below.

**[0:00 — Slide 1, hero card]**

> Ayni: AI agents pay sub-cent in Lightning, and every payment auto-splits to the contributors who maintain the knowledge.

**[0:08 — Slide 2, the architecture diagram. Point at each zone as you talk.]**

> *(point at the **Agent** column on the left)* Stack: **Next.js 15** on Vercel, **MoneyDevKit 0.16**, **L402** over **Bitcoin mainnet**.
>
> *(sweep right, into the **Ayni** middle container)* An agent discovers our endpoints through a public **agent-skill manifest**, then calls the API.
>
> *(point at arrow 2 — Ayni → Lightning)* The API returns a 402 with a Lightning invoice and a macaroon. The agent's wallet pays. We verify the preimage and return the answer.
>
> *(point at arrow 3 — Splitter → Contributors)* Then the **splitter** fans out real Lightning sends to each contributor's BOLT12 or Lightning Address.

**[0:25 — Slide 3, L402 zoom]**

> Inside the API route: MDK returns the 402 with the Lightning invoice and macaroon. The agent retries with the preimage. We verify **SHA-256** against the payment hash before answering.

**[0:35 — Slide 4, splitter]**

> The splitter uses **floor-then-residual** rounding — per-wallet sats sum exactly to the total. A 100-sat call to Tributario PE pays **40-30-10-10-10** to five wallets in seconds.

**[0:46 — Slide 5, the fix]**

> Critical fix: the WebSocket lib and the native Lightning binding broke under webpack. We **externalized** them and pinned the route to the **Node.js runtime**. That commit unlocked end-to-end.

**[0:55 — Slide 6, closing]**

> **Live on mainnet at ayniw.com. MIT on GitHub.**

---

### Three things, every time

1. **Pause after the wedge line.** The single most powerful sentence is *"Stripe physically cannot do this."* If the room knows payments, they will fact-check you in their head and conclude you're right. That's the moment the pitch is won. Don't trample it.
2. **End on the ask. Then stop.** The next person to talk should not be you.
3. **If you have only 30 seconds:** *"Ayni lets AI agents pay tribes of human experts via Lightning. One agent payment auto-splits across all the contributors in the same second. Stripe can't do this — the fees are bigger than the payment. We built it on Bitcoin mainnet during the hackathon. Live at ayniw.com."* (54 words.)

## Team

4 contributors based in Lima, Peru.

- **Dennis Vivas** — Architect & Pitch Lead
- **Cindy Rojas** — Backend dev
- **Miluska Pajuelo** — Frontend / UX
- **Jhoselyn Pajuelo** — Logistics & coordination

## Tags

`Lightning Network` · `Bitcoin` · `L402` · `MoneyDevKit` · `Next.js 15` · `React 19` · `TypeScript` · `Tailwind` · `Vercel` · `Server-Sent Events` · `BOLT11/BOLT12` · `AI Agents` · `Agentic Payments` · `Marketplace` · `Micropayments` · `Knowledge Sharing` · `Reciprocity` · `Ayni` · `Decentralized` · `Web3` · `Fintech` · `Global South`

## License

MIT — created during Hack Nation 5 per challenge rules.
