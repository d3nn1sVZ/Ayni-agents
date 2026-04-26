'use client'

import { useEffect, useState } from 'react'
import tribusData from '@/data/tribus.json'
import type { PayoutEvent } from '@/lib/payouts'

type TribuPreview = {
  id: string
  name: string
  description: string
  rating: number
  consultas: number
  pricePerCallSats: number
  splits: Array<{ wallet: string; role: string; pct: number }>
}

const tribus = Object.values(
  tribusData as Record<string, TribuPreview>,
)

export default function Page() {
  const [events, setEvents] = useState<PayoutEvent[]>([])
  const [triggering, setTriggering] = useState<string | null>(null)

  useEffect(() => {
    const es = new EventSource('/api/payouts/stream')
    es.onmessage = (msg) => {
      try {
        const ev = JSON.parse(msg.data) as PayoutEvent
        setEvents((prev) => [ev, ...prev].slice(0, 30))
      } catch {}
    }
    return () => es.close()
  }, [])

  async function triggerDemo(tribuId: string) {
    if (triggering) return
    setTriggering(tribuId)
    try {
      await fetch(`/api/demo/${tribuId}`, { method: 'POST' })
    } catch {}
    setTimeout(() => setTriggering(null), 2000)
  }

  return (
    <main className="min-h-screen bg-ayni-cloud text-ayni-night">
      <header className="border-b border-ayni-stone/10 bg-ayni-night text-ayni-cloud">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ayni-maize">
            Hack Nation 5 · Spiral Challenge
          </p>
          <h1 className="mt-4 font-display text-5xl leading-tight">
            AyniAgents
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ayni-cloud/80">
            Programmable <em>ayni</em>. Tribes of human contributors maintain
            specialized knowledge plugins. AI agents pay to consume them.
            Every contributor receives their share in the same second, via Lightning.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">Active tribes</h2>
            <p className="mt-2 text-sm text-ayni-stone/70">
              Each tribe charges per query. The payment splits across the
              contributors who maintain the plugin.
            </p>

            <ul className="mt-6 space-y-4">
              {tribus.map((t) => (
                <li
                  key={t.id}
                  className="rounded-2xl border border-ayni-stone/10 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl">{t.name}</h3>
                      <p className="mt-1 text-sm text-ayni-stone/70">
                        {t.description}
                      </p>
                    </div>
                    <div className="shrink-0 rounded-full bg-ayni-maize/15 px-3 py-1 font-mono text-xs uppercase tracking-wider text-ayni-earth">
                      {t.pricePerCallSats} sat / call
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3 text-xs text-ayni-stone/60">
                    <span>★ {t.rating.toFixed(1)}</span>
                    <span>·</span>
                    <span>{t.consultas} queries</span>
                    <span>·</span>
                    <span>{t.splits.length} contributors</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {t.splits.map((s) => (
                      <span
                        key={s.wallet}
                        className="rounded-md bg-ayni-stone/5 px-2 py-1 font-mono text-[11px] text-ayni-stone/70"
                      >
                        {s.wallet} · {Math.round(s.pct * 100)}%
                      </span>
                    ))}
                  </div>

                  <pre className="mt-5 overflow-x-auto rounded-lg bg-ayni-night p-3 font-mono text-[11px] leading-relaxed text-ayni-cloud/80">
                    {`GET /api/ayni/${t.id}?q=...
↳ 402 Payment Required (Lightning invoice)
↳ pay → answer + payout split to ${t.splits.length} wallets`}
                  </pre>

                  <button
                    type="button"
                    onClick={() => triggerDemo(t.id)}
                    disabled={triggering === t.id}
                    className="mt-4 w-full rounded-lg border border-ayni-earth/40 bg-ayni-earth/5 px-4 py-2.5 text-sm font-medium text-ayni-earth transition-colors hover:bg-ayni-earth/10 disabled:opacity-50"
                  >
                    {triggering === t.id
                      ? 'Triggering ayni…'
                      : 'Trigger demo ayni →'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:sticky lg:top-6 lg:self-start">
            <h2 className="font-display text-2xl">
              Real-time payments
            </h2>
            <p className="mt-2 text-sm text-ayni-stone/70">
              Every time an agent queries a tribe, sats fan out across its
              contributors in seconds. Impossible with Stripe.
            </p>

            <div className="mt-6 space-y-3">
              {events.length === 0 && (
                <div className="rounded-2xl border border-dashed border-ayni-stone/20 bg-white/50 p-10 text-center text-sm text-ayni-stone/50">
                  Waiting for queries…
                  <br />
                  <span className="font-mono text-xs">
                    GET /api/ayni/tributario-pe?q=igv
                  </span>
                </div>
              )}

              {events.map((ev) => (
                <EventCard key={ev.id} ev={ev} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-ayni-stone/10 py-8 text-center text-xs text-ayni-stone/50">
        <p>Hack Nation 5 · Spiral Challenge 02 · Built with MoneyDevKit + Lightning</p>
        <p className="mt-2">
          <a
            href="/.well-known/agent-skill.json"
            className="underline decoration-dotted underline-offset-4 hover:text-ayni-earth"
          >
            agent-skill manifest
          </a>
          {' · '}
          <a
            href="https://github.com/d3nn1sVZ/Ayni-agents"
            className="underline decoration-dotted underline-offset-4 hover:text-ayni-earth"
            target="_blank"
            rel="noreferrer"
          >
            source on github
          </a>
        </p>
      </footer>
    </main>
  )
}

function EventCard({ ev }: { ev: PayoutEvent }) {
  if (ev.phase === 'requested') {
    return (
      <div className="rounded-2xl border border-ayni-sky/40 bg-ayni-sky/5 p-5 shadow-sm">
        <div className="flex items-center justify-between text-xs text-ayni-stone/60">
          <span className="flex items-center gap-2 font-mono uppercase tracking-wider">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-ayni-sky" />
            agent query · {ev.tribuName}
          </span>
          <span>· · · sats</span>
        </div>
        <p className="mt-2 truncate text-sm text-ayni-stone/80">
          “{ev.query || '(no query)'}”
        </p>
        <p className="mt-3 text-xs text-ayni-stone/50">
          Waiting for Lightning payment confirmation…
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-ayni-maize/40 bg-ayni-maize/5 p-5 shadow-sm">
      <div className="flex items-center justify-between text-xs text-ayni-stone/60">
        <span className="flex items-center gap-2 font-mono uppercase tracking-wider">
          <span className="inline-block h-2 w-2 rounded-full bg-ayni-maize" />
          ayni fulfilled · {ev.tribuName}
        </span>
        <span className="font-semibold text-ayni-earth">+{ev.totalSats} sat</span>
      </div>
      <p className="mt-2 truncate text-sm text-ayni-stone/80">
        “{ev.query || '(no query)'}”
      </p>
      <ul className="mt-3 space-y-1.5">
        {ev.splits.map((s) => (
          <li
            key={s.wallet}
            className="flex items-center justify-between text-xs"
          >
            <span className="font-mono text-ayni-stone/70">
              {s.wallet} · {s.role}
            </span>
            <span className="font-mono font-semibold text-ayni-earth">
              +{s.sats} sat
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
