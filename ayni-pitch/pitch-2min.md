# Pitch 2-min: Ayni

*Skill: startup-pitch | Generated: 2026-04-26*

**Audience:** Spiral judges, Hack Nation 5 — Challenge 02
**Format:** Word-for-word verbal script. ~310 words. Deliver in 2:00.

---

## Script

**[0:00 — Hook. Look up. Slow down.]**

> Ayni is a marketplace where AI agents pay tribes of human experts to answer specialized questions, over Lightning Network. An accounting agent calls our API, asks "what's the IGV rate in Peru," and pays 100 sats. In the same second, that payment auto-splits across all five contributors who maintain Peru's tax tribe — forty sats to the curator, thirty to the legal validator, ten each to three contributors.
>
> **Stripe physically cannot do this.** A 30-cent minimum fee makes splitting a sub-cent payment across five humans negative-sum. Lightning makes it free, instant, and global. That's the entire wedge.

**[0:35 — Problem. Direct. No filler.]**

> AI agents are scaling fast. The model providers get paid. The platforms get paid. The human experts whose knowledge powers the answers — the Lima CPA, the Spanish data scientist, the regional lawyer — get nothing. Not because nobody wants to pay them. Because the rails can't.

**[0:55 — Solution. Make them see the demo.]**

> We built it on Bitcoin mainnet during the hackathon. An agent hits our endpoint, gets a 402 Payment Required with a Lightning invoice and an L402 macaroon, pays it in seconds, retries with the preimage, and gets the expert answer. Then a second Lightning fan-out sends each contributor their share. **Two tribes live today: Peruvian tax law and Spanish data science. Public manifest at slash-well-known so any agent can self-discover. Live at ayniw.com. MIT on GitHub.**

**[1:25 — Why now + insight, integrated.]**

> Why now: L402 just got ergonomic, agents went from demo to production this year, and Lightning is mature. Why us: we're four builders in Lima, and the communities we're monetizing — Peruvian contadores, Latam data scientists — are people we can call by name today.

**[1:50 — Ask. Confident. Stop talking.]**

> Ayni is the Quechua word for reciprocity. We've encoded it in software. **We're asking Spiral to back the only payment rail that can.**

**[2:00 — Stop. Don't fill silence. Let them ask.]**

---

## Delivery notes

- **Pace:** ~2.6 words/second. Don't rush the hook (0:00–0:35) — that's where attention is bought.
- **Pause after "Stripe physically cannot do this."** Let the statement land. Judges who know payments will lean forward here.
- **The demo paragraph (0:55–1:25)** is the proof you actually built it. Hit "Bitcoin mainnet" and "live at ayniw.com" hard. Pull up the dashboard if you have a screen.
- **Final line ("the only payment rail that can")** — slow. Make eye contact. Stop. The next person to talk should be the judge.
- **If asked to extend**, the question they'll ask is "how do you make money?" or "who else is doing this?". Answers in `pitch-appendix.md`.

## Word count: 312

## Red flags

- **No paying customers.** If a judge presses on revenue, pivot immediately to: "We have a working rail and two seeded tribes. The next 90 days are about onboarding our first paying contributor community — the Lima CPA tribe is a warm intro away."
- **"Two tribes" sounds small.** Acknowledge and reframe: it's a config change, not a code change, to add the next ten.

## Yellow flags

- **"Quechua word for reciprocity" needs to land culturally.** If the judge audience skews tech-only and not LatAm-curious, drop the etymology and lead the close with "We've encoded reciprocity in software."

## Sources

- Founder formulary (Hack Nation 5 submission), 2026-04-26
- Repo: github.com/d3nn1sVZ/Ayni-agents (commit 5e78f92)
- Live URL: ayniw.com
- Spiral Challenge 02: "Earn in the Agent Economy" — bonus criterion: do something impossible with Stripe
