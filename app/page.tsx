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

  useEffect(() => {
    const es = new EventSource('/api/payouts/stream')
    es.onmessage = (msg) => {
      try {
        const ev = JSON.parse(msg.data) as PayoutEvent
        setEvents((prev) => [ev, ...prev].slice(0, 20))
      } catch {}
    }
    return () => es.close()
  }, [])

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
            <em>Ayni</em> programable. Tribus de contribuidores humanos
            mantienen plugins de conocimiento. Agentes de IA pagan por consumirlos.
            Cada contribuidor recibe su parte en el mismo segundo, vía Lightning.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">Tribus activas</h2>
            <p className="mt-2 text-sm text-ayni-stone/70">
              Cada tribu cobra por consulta. El pago se divide entre quienes
              mantienen el plugin actualizado.
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
                    <span>{t.consultas} consultas</span>
                    <span>·</span>
                    <span>{t.splits.length} contribuidores</span>
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
↳ pay → respuesta + payout split a ${t.splits.length} wallets`}
                  </pre>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl">
              Pagos en tiempo real
            </h2>
            <p className="mt-2 text-sm text-ayni-stone/70">
              Cada vez que un agente consume una tribu, los sats se reparten
              entre los contribuidores. Esto es imposible con Stripe.
            </p>

            <div className="mt-6 space-y-3">
              {events.length === 0 && (
                <div className="rounded-2xl border border-dashed border-ayni-stone/20 bg-white/50 p-10 text-center text-sm text-ayni-stone/50">
                  Esperando consultas...
                  <br />
                  <span className="font-mono text-xs">
                    GET /api/ayni/tributario-pe?q=igv
                  </span>
                </div>
              )}

              {events.map((ev) => (
                <div
                  key={ev.ts}
                  className="rounded-2xl border border-ayni-maize/40 bg-ayni-maize/5 p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between text-xs text-ayni-stone/60">
                    <span className="font-mono uppercase tracking-wider">
                      {ev.tribuName}
                    </span>
                    <span>+{ev.totalSats} sat</span>
                  </div>
                  <p className="mt-2 truncate text-sm text-ayni-stone/80">
                    “{ev.query || '(sin query)'}”
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
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-ayni-stone/10 py-8 text-center text-xs text-ayni-stone/50">
        Hack Nation 5 · Spiral Challenge 02 · Built with MoneyDevKit + Lightning
      </footer>
    </main>
  )
}
