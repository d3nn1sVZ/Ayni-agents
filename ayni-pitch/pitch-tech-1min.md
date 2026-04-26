# Tech Video Script (60 sec): Ayni

*Skill: startup-pitch | Generated: 2026-04-26*

**Spec:** Hack Nation 5 submission · Tech Video · max 60 seconds · MP4
**Brief:** technical explanation — stack, architecture, implementation
**Companion deck:** `ayni-pitch/Ayni-tech-deck.pptx` (6 slides, screen-record alongside narration)
**Word budget:** ~135 words at 2.5 wps ≈ 54 seconds (6s buffer for pauses + transitions)

---

## Script (word-for-word)

### [0:00 — 0:10] Slide 1: Hero card

> *(beat — let the title land)*
>
> **Ayni is an agent-paid expert API. AI agents call our endpoint, pay sub-cent in Lightning, and the payment auto-splits to the contributors who maintain the knowledge.**

**Words:** 27 · **Time:** ~10s · **Visual:** title card "ayni · agent-paid expert APIs over Lightning"

---

### [0:10 — 0:28] Slide 2: Stack chips → Slide 3: L402 flow

> Stack: **Next.js 15 on Vercel**, **MoneyDevKit 0.16**, **L402** over **Bitcoin mainnet**.
>
> The agent gets a **402** with a Lightning invoice and macaroon, pays it, retries with the preimage. We verify **SHA-256** against the payment hash, then return the answer.

**Words:** 40 · **Time:** ~16s · **Visual:** transition from stack chips to the 4-step request flow diagram

---

### [0:28 — 0:42] Slide 4: Splitter

> Then a second Lightning fan-out pays each contributor by **BOLT12** or **Lightning Address**. The splitter uses **floor-then-residual** rounding — per-wallet sats sum exactly to the total, no drift.

**Words:** 28 · **Time:** ~11s · **Visual:** splitter pseudocode + a 100→[40,30,10,10,10] example

---

### [0:42 — 0:55] Slide 5: The critical fix

> Critical fix: the **WebSocket lib** and the native **Lightning .node binding** both broke under webpack. We **externalized them** and pinned the route to the **Node.js runtime**. That commit unlocked end-to-end.

**Words:** 31 · **Time:** ~12s · **Visual:** `next.config.mjs` snippet + commit hash `09efcb6`

---

### [0:55 — 1:00] Slide 6: Closing card

> **Live on mainnet at ayniw.com. MIT on GitHub.**

**Words:** 8 · **Time:** ~4s · **Visual:** URLs + QR codes

---

**Total: 134 words · ~54 seconds spoken · 6s buffer**

---

## Recording notes

- **Pace:** practice at metronome 150 BPM (one syllable per beat) — that's roughly 2.5 wps. Anything faster sounds rushed; anything slower will overrun.
- **Stress these words** in delivery: *agent-paid*, *auto-splits*, *Bitcoin mainnet*, *SHA-256*, *floor-then-residual*, *externalized*, *Node.js runtime*.
- **Don't read** "0:00 — 0:10" markers — those are for editing.
- **Camera:** screen-share the deck full-screen. No webcam picture-in-picture; the deck is the visual. (If you must include a face, put it in a small bottom-right circle and only on slides 1 and 6.)
- **Audio:** use the best mic you have. Compressed loudness > visual polish for a 60-second tech video.
- **Take 3 cuts and pick the cleanest.** Don't over-edit single takes.

## Production checklist

- [ ] Open `Ayni-tech-deck.pptx` full-screen in PowerPoint
- [ ] Start screen recording (OBS, QuickTime, or Win+G Game Bar)
- [ ] Click through slides on the timing marks above
- [ ] Record audio in one continuous take per attempt
- [ ] Export MP4, verify file is **≤ 60 seconds** and ideally < 100 MB
- [ ] Watch with the volume off — do the slides alone tell the story? Should be yes.
- [ ] Watch with the screen off — does the audio alone tell the story? Should be yes too.
- [ ] Upload to the Hack Nation form

## Red flags

- **"~10s per slide" is tight.** If your delivery runs 60s+, cut the splitter slide narration first (slide 4 — say only "splitter uses floor-then-residual rounding so sats sum exactly").
- **Don't mention Spark.** This is a *tech* video, not a war-story. Whoever evaluates may know Spark exists; do not invite the question "why didn't you use it" in 60 seconds.
- **Don't read the URL out loud twice.** Once at the end is enough.

## Yellow flags

- **Term "macaroon"** is correct L402 terminology but unfamiliar outside Lightning. Trust the audience — Hack Nation reviewers know it. If pitching to a different audience, swap to "auth token."
- **The architecture has 4 steps but slide 3 only shows them once.** If you stumble, just describe what's on screen — don't try to remember the full sentence.

## Sources

- Founder formulary, Hack Nation 5 submission spec
- Repo: `github.com/d3nn1sVZ/Ayni-agents`, commit `09efcb6` (the externals fix)
- `next.config.mjs`, `scripts/demo-flow.sh`, `data/tribus.json`
