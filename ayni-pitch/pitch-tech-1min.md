# Tech Video Script (60 sec): Ayni

*Skill: startup-pitch | Generated: 2026-04-26 · architecture-led revision*

**Spec:** Hack Nation 5 submission · Tech Video · max 60 seconds · MP4
**Brief:** technical explanation — stack, architecture, implementation
**Companion deck:** `ayni-pitch/Ayni-tech-deck.pptx` (6 slides, screen-record alongside)
**Word budget:** ~146 words at 2.5 wps ≈ 58 seconds (2s buffer)

This revision leads with the architecture diagram. While slide 2 is on screen, you point at each zone — agent, Ayni, Lightning, contributors — and walk through the three numbered arrows.

---

## Script (word-for-word)

### [0:00 — 0:08] Slide 1: Hero card

> *(beat — let the title land)*
>
> **Ayni: AI agents pay sub-cent in Lightning, and every payment auto-splits to the contributors who maintain the knowledge.**

**Words:** 19 · **Time:** ~8s

---

### [0:08 — 0:25] Slide 2: System architecture *(the centerpiece — point at the diagram as you talk)*

> *(point at the **Agent** column on the left)*
>
> Stack: **Next.js 15** on Vercel, **MoneyDevKit 0.16**, **L402** over **Bitcoin mainnet**.
>
> *(sweep right, into the **Ayni** middle container)*
>
> An agent discovers our endpoints through a public **agent-skill manifest**, then calls the API.
>
> *(point at arrow 2 — Ayni → Lightning)*
>
> The API returns a 402 with a Lightning invoice and a macaroon. The agent's wallet pays. We verify the preimage and return the answer.
>
> *(point at arrow 3 — Splitter → Contributors)*
>
> Then the **splitter** fans out real Lightning sends to each contributor's BOLT12 or Lightning Address.

**Words:** 71 · **Time:** ~17s · **Visual:** the architecture diagram (slide 2). Move your cursor or finger across the three numbered arrows as you narrate them.

---

### [0:25 — 0:35] Slide 3: L402 zoom

> Inside the API route: **MDK** returns the 402 with the Lightning invoice and macaroon. The agent retries with the preimage. We verify **SHA-256** against the payment hash before answering.

**Words:** 30 · **Time:** ~12s · **Visual:** 4-step request-flow zoom

---

### [0:35 — 0:46] Slide 4: Splitter

> The splitter uses **floor-then-residual** rounding — per-wallet sats sum exactly to the total. A 100-sat call to Tributario PE pays **40-30-10-10-10** to five wallets in seconds.

**Words:** 31 · **Time:** ~12s · **Visual:** pseudocode + sat breakdown

---

### [0:46 — 0:55] Slide 5: The critical fix

> Critical fix: the **WebSocket lib** and the native **Lightning binding** broke under webpack. We **externalized** them and pinned the route to the **Node.js runtime**. That commit unlocked end-to-end.

**Words:** 30 · **Time:** ~12s · **Visual:** symptom / cause / fix cards + commit hash

---

### [0:55 — 1:00] Slide 6: Closing card

> **Live on mainnet at ayniw.com. MIT on GitHub.**

**Words:** 9 · **Time:** ~4s · **Visual:** URLs

---

**Total: 190 words spoken (incl. micro-pauses) · ~58 seconds · 2s buffer**

> ⚠️ **Density check:** the architecture slide carries the most words (71) in 17 seconds. That's ~4.2 wps — slightly faster than baseline. **Practice this slide first.** If you can't deliver it cleanly, drop the "Stack: ..." sentence and just point at the diagram chips.

---

## How to use the architecture slide

Slide 2 is the workhorse — it's the slide you spend the most time on, and it's the one investors will remember. Three things to do while it's on screen:

1. **Point.** Use a cursor (PowerPoint laser pointer with `Ctrl+L` in slideshow mode) or your finger if recording from mobile. Move across the three numbered arrows in order.
2. **Pace yourself.** Don't rush — 17 seconds feels like forever, but you have a lot of words to deliver. Practice with a stopwatch.
3. **Don't read every box.** The diagram has 4 sub-boxes inside Ayni (manifest, API route, splitter, dashboard). Mention only the two you need (manifest + splitter); the others are visual texture.

---

## Recording notes

- **Pace:** practice at metronome 150 BPM (one syllable per beat) — that's roughly 2.5 wps. Architecture slide pushes ~4 wps, so practice it standalone.
- **Stress these words** in delivery: *agent-paid*, *auto-splits*, *agent-skill manifest*, *Lightning invoice*, *macaroon*, *preimage*, *splitter*, *floor-then-residual*, *externalized*, *Node.js runtime*.
- **Camera:** screen-share the deck full-screen. No webcam picture-in-picture; the deck is the visual.
- **Audio:** clean mic > visual polish for a 60-second tech video.
- **Take 3 cuts** and pick the cleanest. Don't over-edit a single take.

## Production checklist

- [ ] Open `Ayni-tech-deck.pptx` full-screen in PowerPoint
- [ ] Practice slide 2 alone three times — that's the hardest section
- [ ] Start screen recording (Win+G Game Bar, OBS, or QuickTime)
- [ ] Click through slides on the timing marks
- [ ] Use cursor / laser pointer to indicate the architecture arrows
- [ ] Record audio in one continuous take per attempt
- [ ] Export MP4, verify file is **≤ 60 seconds** and ideally < 100 MB
- [ ] Watch with the volume off — does the deck alone tell the story? Should be yes.
- [ ] Watch with the screen off — does the audio alone tell the story? Should be yes too.
- [ ] Upload to the Hack Nation form

## Red flags

- **Architecture slide is dense.** If you stumble, the script you most want to land is the *order*: agent → manifest → API route → Lightning → splitter → contributors. Even if the words come out wrong, the visual order is what teaches the audience.
- **Don't mention Spark.** Tech video, not war story. Don't invite the question "why didn't you use it" in 60 seconds.
- **Don't read the URL out loud twice.** Once at the end is enough.

## Yellow flags

- **"Macaroon"** is correct L402 terminology. Hack Nation reviewers know it. If pitching to a different audience, swap to "auth token."
- **The architecture diagram has 4 inner boxes** (manifest, API, splitter, dashboard) but the script only narrates 3 of those zones. That's intentional — extra texture without extra words.

## Sources

- Founder formulary, Hack Nation 5 submission spec
- Repo: `github.com/d3nn1sVZ/Ayni-agents`, commit `09efcb6` (the externals fix)
- `next.config.mjs`, `scripts/demo-flow.sh`, `data/tribus.json`
