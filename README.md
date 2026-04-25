# AyniAgents

> Collaborative knowledge plugins where AI agents pay tribes of human contributors via Lightning Network.

**Hack Nation 5 — Spiral Challenge 02 (Earn in the Agent Economy)**

## What is this

When an AI agent needs specialized knowledge — Peruvian tax law, Spanish data science, regional healthcare — it can call a `tribu` (tribe) plugin. The plugin charges per call via Lightning Network. The payment is then automatically split among all contributors who maintain that tribe's knowledge.

Wikipedia + Patreon + Lightning. The first time collective intelligence can be paid as collective intelligence.

## Why Lightning

Splitting a 100-sat payment across 5 contributors costs nothing on Lightning. The same operation on Stripe would cost more in fees than the payment itself. Collective monetization at micropayment scale is impossible without Lightning.

## Stack

- Next.js 14 + Tailwind on Vercel
- MoneyDevKit (L402 paywall + agent wallet)
- Spark (programmable payment splitting)
- Bitcoin Lightning mainnet

## Status

Hackathon MVP. Built 2026-04-25.

## Team

- Dennis Vivas — Architect & Biz
- Miluska Pajuelo — Frontend / UX
- Cindy Rojas — Backend dev

## License

MIT
