'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AyniBot from '@/components/AyniBot'

type LT = 'sys' | 'info' | 'req' | 'warn' | 'pay' | 'ok' | 'split' | 'dim'
const FLOW: { delay: number; type: LT; text: string }[] = [
  { delay: 0,    type: 'sys',  text: '▶  AyniAgents SDK v1.0 — initialized' },
  { delay: 600,  type: 'info', text: '◦  Scanning marketplace: api.ayniagents.com' },
  { delay: 1100, type: 'info', text: '◦  Selecting: Tributario PE  (4.7★ · 100 sats/query)' },
  { delay: 1600, type: 'req',  text: '→  GET /api/ayni/tributario-pe?q=IGV+2026' },
  { delay: 2000, type: 'warn', text: '←  402 Payment Required' },
  { delay: 2060, type: 'dim',  text: '       invoice="lnbc1000n1pj4x8ppsp5…"  ·  100 sats' },
  { delay: 2350, type: 'pay',  text: '⚡  Paying via Lightning Network…' },
  { delay: 2900, type: 'ok',   text: '✓   Settled in 183ms  ·  Fee: 0 sats' },
  { delay: 3100, type: 'req',  text: '→  GET /api/ayni/tributario-pe?q=…  [L402 token]' },
  { delay: 3500, type: 'ok',   text: '←  200 OK  ·  Knowledge received' },
  { delay: 3600, type: 'dim',  text: '       "El IGV en Perú es 18%..."' },
  { delay: 3850, type: 'split',text: '⚡  Splitting to 5 contributors instantly:' },
  { delay: 3950, type: 'dim',  text: '       @curador-3a8f   +40 sats · @validador  +30 sats' },
  { delay: 4050, type: 'dim',  text: '       @contrib × 3    +10 sats each' },
  { delay: 4300, type: 'sys',  text: '✓   Done. No account. No API key. Just ⚡ Lightning.' },
  { delay: 4700, type: 'dim',  text: '       1.8s end-to-end · $0.0006 total · 0 fees' },
]

const COMPARISON = [
  { before: 'Crear cuenta · esperar aprobación',       after: 'Ningún paso previo' },
  { before: 'API key con plan de precios mensual',     after: 'Pago por consulta (100 sats)' },
  { before: 'Fee mínimo $0.30 por transacción',        after: '$0 de fee para split a N wallets' },
  { before: 'Tarjeta de crédito, facturación 30 días', after: 'Lightning — liquidación en 183ms' },
  { before: 'Solo 47 países soportados',               after: 'Global por defecto, sin fronteras' },
]

export default function AgentPage() {
  const [visible, setVisible] = useState<typeof FLOW>([])
  const [loop, setLoop]       = useState(0)
  const [mood, setMood]       = useState<'happy' | 'paying'>('happy')
  const tRefs   = useRef<ReturnType<typeof setTimeout>[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    tRefs.current.forEach(clearTimeout); tRefs.current = []
    setVisible([])
    FLOW.forEach(line => {
      const t = setTimeout(() => {
        setVisible(prev => [...prev, line])
        if (line.type === 'pay') setMood('paying')
        if (line.type === 'ok' && line.text.includes('Settled')) setMood('happy')
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, line.delay)
      tRefs.current.push(t)
    })
    const r = setTimeout(() => setLoop(n => n + 1), FLOW[FLOW.length - 1].delay + 3500)
    tRefs.current.push(r)
    return () => tRefs.current.forEach(clearTimeout)
  }, [loop])

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />

      {/* ── Hero ── */}
      <section className="px-6 pt-24 pb-16 text-center border-b border-white/[0.06]">
        <div className="max-w-2xl mx-auto">
          <div className="label mb-6">Vista: Agente IA · L402 Protocol</div>
          <div className="flex justify-center mb-8">
            <AyniBot mood={mood} size="md"
              className="animate-float drop-shadow-[0_0_40px_rgba(139,92,246,0.4)]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5">
            <span className="text-gradient">No account. No API key.</span><br />
            <span className="text-[#E8B547]">Just Lightning.</span>
          </h1>
          <p className="text-white/40 text-lg leading-relaxed">
            An AI agent discovers a service, pays in milliseconds, and gets the knowledge it needs.
            Zero human intervention. Zero checkout friction.
          </p>
        </div>
      </section>

      {/* ── Terminal + Comparison ── */}
      <section className="px-6 py-20 border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Terminal */}
          <div className="glass p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
              </div>
              <button onClick={() => setLoop(n => n + 1)}
                className="text-[10px] text-white/20 hover:text-white/45 glass-sm px-2 py-0.5 transition-colors">
                ↺ replay
              </button>
            </div>
            <div className="bg-black/50 rounded-2xl border border-white/[0.05] p-4 font-mono
                            text-xs overflow-y-auto min-h-[280px] max-h-[360px]">
              {visible.map((l, i) => (
                <div key={i} className={`terminal-line term-${l.type} animate-slide-in`}>{l.text}</div>
              ))}
              <div ref={bottomRef} />
              {visible.length < FLOW.length && (
                <span className="inline-block w-2 h-3 bg-[#E8B547]/70 animate-pulse align-middle ml-0.5" />
              )}
            </div>
          </div>

          {/* Comparison */}
          <div className="flex flex-col gap-3 justify-center">
            <div className="grid grid-cols-2 gap-2 mb-1">
              <div className="label text-center text-red-400">Antes (API tradicional)</div>
              <div className="label text-center text-[#10B981]">Con L402 + Lightning</div>
            </div>
            {COMPARISON.map((r, i) => (
              <div key={i} className="grid grid-cols-2 gap-2">
                <div className="glass-sm px-3 py-2.5 text-xs text-white/35">{r.before}</div>
                <div className="glass-sm glass-emerald px-3 py-2.5 text-xs text-[#EDE9E1]">{r.after}</div>
              </div>
            ))}
            <div className="glass glass-gold p-4 mt-2">
              <p className="text-white/50 text-sm leading-relaxed">
                The L402 protocol turns every endpoint into an autonomous paywall.
                The agent pays → gets access → done. No accounts. No contracts. No humans needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Flow steps ── */}
      <section className="px-6 py-20 border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="label mb-4">El flujo completo en 1.8 segundos</div>
          <h2 className="text-2xl font-bold text-gradient mb-10">De la consulta al split — sin intervención humana.</h2>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { icon: '🤖', label: 'Agente IA',    sub: 'hace una consulta'       },
              { icon: '⚡', label: '402 + pago',   sub: '183ms Lightning'          },
              { icon: '📚', label: 'Conocimiento', sub: '200 OK'                   },
              { icon: '👥', label: 'N wallets',    sub: 'split automático · 0 fee' },
            ].map((s, i, arr) => (
              <>
                <div key={s.label} className="glass p-5 flex flex-col items-center gap-2 min-w-[110px]">
                  <span className="text-2xl">{s.icon}</span>
                  <span className="text-[#EDE9E1] text-xs font-bold">{s.label}</span>
                  <span className="text-white/30 text-[10px] text-center">{s.sub}</span>
                </div>
                {i < arr.length - 1 && <span key={`arr-${i}`} className="text-white/15 text-xl">→</span>}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-xl mx-auto">
          <h3 className="text-2xl font-bold text-gradient mb-3">¿Sos humano y querés desplegar agentes?</h3>
          <p className="text-white/30 text-sm mb-8">Mirá cómo se ve desde el lado humano.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/human" className="btn-gold">Vista humana →</Link>
            <Link href="/" className="btn-glass">Marketplace</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
