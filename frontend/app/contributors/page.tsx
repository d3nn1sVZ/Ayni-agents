'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AyniBot from '@/components/AyniBot'

type Earning = { id: string; ts: number; query: string; yourSats: number; agentId: string }

const INIT_EARNINGS: Earning[] = [
  { id: 'e1', ts: Date.now()-5000,   query: '¿Cómo diseñar OVAs según MEN?',        yourSats: 36, agentId: '@agent-a1b2c3' },
  { id: 'e2', ts: Date.now()-25000,  query: 'Gamificación en educación primaria CO',  yourSats: 36, agentId: '@agent-d4e5f6' },
  { id: 'e3', ts: Date.now()-55000,  query: 'Pedagogía activa vs tradicional MEN',    yourSats: 36, agentId: '@agent-g7h8i9' },
  { id: 'e4', ts: Date.now()-90000,  query: 'Estrategias para resultados Icfes',      yourSats: 36, agentId: '@agent-j0k1l2' },
]

const LEADERBOARD = [
  { rank: 1,  wallet: '@curador-3a8f',   tribe: 'Tributario PE',   earned: 48320, badge: '👑' },
  { rank: 2,  wallet: '@curador-ml5g',   tribe: 'Data Science ES', earned: 41250, badge: '🥈' },
  { rank: 3,  wallet: '@curador-lex1',   tribe: 'Legal MX',        earned: 35420, badge: '🥉' },
  { rank: 4,  wallet: '@defi-ar9m2f',    tribe: 'DeFi AR',         earned: 29180, badge: ''   },
  { rank: 5,  wallet: '@validador-9c2e', tribe: 'Tributario PE',   earned: 24640, badge: ''   },
  { rank: 6,  wallet: '@abogado-corp',   tribe: 'Legal MX',        earned: 21480, badge: ''   },
  { rank: 7,  wallet: '@profe-co1a9',    tribe: 'EduTech CO',      earned: 18360, badge: ''   },
  { rank: 8,  wallet: '@miluska-edu3',   tribe: 'EduTech CO',      earned: 5760,  badge: '← Tú' },
]

const QUERIES = [
  '¿Cómo diseñar OVAs según MEN?', 'Gamificación en educación primaria CO',
  'Pedagogía activa vs tradicional MEN', 'Estrategias para resultados Icfes',
]

const IMPOSSIBLE = [
  { metric: 'Fee por transacción',       lightning: '0 sats',              stripe: '$0.30 mínimo'    },
  { metric: 'Tu share (45% de 80 sats)', lightning: '36 sats = $0.0000216', stripe: 'Pérdida neta'   },
  { metric: 'Split a N wallets',          lightning: 'Nativo · instantáneo', stripe: 'Imposible'       },
  { metric: 'Tiempo de liquidación',      lightning: '< 200ms',             stripe: '2–7 días hábiles' },
  { metric: 'Disponibilidad',             lightning: 'Global · sin límites', stripe: 'Solo 47 países'  },
]

let ctr = 10

function rel(ts: number) {
  const d = Date.now() - ts
  return d < 60000 ? `hace ${Math.round(d / 1000)}s` : `hace ${Math.round(d / 60000)}min`
}

export default function ContributorsPage() {
  const [earnings, setEarnings] = useState<Earning[]>(INIT_EARNINGS)
  const [totalEarned, setEarned] = useState(5760)
  const [totalQ, setTotalQ]     = useState(72)

  useEffect(() => {
    const iv = setInterval(() => {
      const q = QUERIES[Math.floor(Math.random() * QUERIES.length)]
      const e: Earning = {
        id: `e-${++ctr}`, ts: Date.now(), query: q, yourSats: 36,
        agentId: `@agent-${Math.random().toString(36).slice(2, 8)}`,
      }
      setEarnings(prev => [e, ...prev].slice(0, 15))
      setEarned(p => p + 36)
      setTotalQ(p => p + 1)
    }, 5500)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />

      {/* ── Hero ── */}
      <section className="px-6 pt-24 pb-16 text-center border-b border-white/[0.06]">
        <div className="max-w-2xl mx-auto">
          <div className="label mb-6">Vista: Contribuidor · Passive Income on Lightning</div>
          <div className="flex justify-center mb-8">
            <AyniBot mood="celebrating" size="md"
              className="animate-float drop-shadow-[0_0_40px_rgba(16,185,129,0.4)]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5">
            <span className="text-gradient">Tu conocimiento.</span><br />
            <span className="text-[#10B981]">Ganancias sin intermediario.</span>
          </h1>
          <p className="text-white/40 text-lg leading-relaxed">
            Cada vez que un agente consulta tu tribu, los sats llegan directo a tu wallet
            en milisegundos — automáticamente repartidos entre todos los contribuidores.
          </p>
        </div>
      </section>

      {/* ── The math ── */}
      <section className="px-6 py-20 border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="label mb-4">La prueba matemática</div>
            <h2 className="text-3xl font-black tracking-tight text-gradient mb-3">
              Por qué solo funciona con Lightning.
            </h2>
            <p className="text-white/35 text-base leading-relaxed max-w-xl mx-auto">
              Tu share de un pago de 80 sats = <strong className="text-[#10B981]">$0.0000216</strong>.
              Stripe cobra <strong className="text-red-400">$0.30 mínimo</strong> —
              el fee sería <strong className="text-red-400">13,888×</strong> el valor del pago.
              Con Lightning: 0 fees, split instantáneo.
            </p>
          </div>

          <div className="glass overflow-hidden mb-8">
            <div className="grid grid-cols-3 px-5 py-3 border-b border-white/[0.06]">
              <div className="label">Métrica</div>
              <div className="label text-center text-[#10B981]">⚡ Lightning</div>
              <div className="label text-center text-red-400">✗ Stripe</div>
            </div>
            {IMPOSSIBLE.map((r, i) => (
              <div key={i} className={`grid grid-cols-3 px-5 py-3.5 border-b border-white/[0.04] last:border-0 text-sm ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                <div className="text-white/40">{r.metric}</div>
                <div className="text-[#10B981] font-mono text-center">{r.lightning}</div>
                <div className="text-red-400/70 font-mono text-center">{r.stripe}</div>
              </div>
            ))}
          </div>

          {/* Split visual */}
          <div className="text-center">
            <div className="label mb-5">Cómo fluye un pago de 80 sats</div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <div className="glass glass-violet px-5 py-3 flex items-center gap-2">
                <span>🤖</span>
                <div className="text-left">
                  <div className="text-[#8B5CF6] text-xs font-bold">Agente IA</div>
                  <div className="text-white/25 text-[10px]">paga 80 sats ⚡</div>
                </div>
              </div>
              <span className="text-[#E8B547] text-lg">→</span>
              {[
                { w: '@miluska-edu3', s: 36, pct: '45%', c: '#10B981' },
                { w: '@curricul-5b3', s: 24, pct: '30%', c: '#38BDF8' },
                { w: '@tecno-edu3f',  s: 20, pct: '25%', c: '#8B5CF6' },
              ].map((sp, i, arr) => (
                <>
                  <div key={sp.w} className="glass-sm px-4 py-3 text-center">
                    <div className="font-mono font-black text-xl" style={{ color: sp.c }}>+{sp.s}</div>
                    <div className="text-white/20 text-[9px]">sats ({sp.pct})</div>
                    <div className="text-white/25 text-[10px] font-mono mt-1">{sp.w}</div>
                  </div>
                  {i < arr.length - 1 && <span key={`sep-${i}`} className="text-white/15">+</span>}
                </>
              ))}
            </div>
            <p className="text-white/15 text-xs mt-4">3 wallets · 0ms delay · $0 fee</p>
          </div>
        </div>
      </section>

      {/* ── My profile + feed + leaderboard ── */}
      <section className="px-6 py-20 border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Profile */}
          <div className="glass glass-emerald p-6 flex flex-col gap-4">
            <div className="label">Mi perfil</div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#10B981]/15 border border-[#10B981]/25 flex items-center justify-center">
                <span className="text-[#10B981] font-bold text-sm">M</span>
              </div>
              <div>
                <div className="text-[#EDE9E1] font-bold text-sm">@miluska-edu3</div>
                <div className="text-white/25 text-xs">Pedagogo · EduTech CO</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { v: totalEarned.toLocaleString(), l: 'sats ganados', c: 'text-[#10B981]' },
                { v: String(totalQ),               l: 'consultas',    c: 'text-[#38BDF8]' },
                { v: '45%',                         l: 'mi split',     c: 'text-[#E8B547]' },
                { v: `$${(totalEarned * 0.00000006).toFixed(5)}`, l: 'USD', c: 'text-[#8B5CF6]' },
              ].map(s => (
                <div key={s.l} className="glass-sm p-3 text-center">
                  <div className={`font-mono font-bold text-lg ${s.c}`}>{s.v}</div>
                  <div className="text-white/20 text-[9px] uppercase tracking-widest">{s.l}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="text-white/20">Share por pago</span>
                <span className="text-[#10B981] font-mono font-bold">36/80 sats</span>
              </div>
              <div className="h-[3px] bg-white/[0.07] rounded-full overflow-hidden">
                <div className="h-full bg-[#10B981] rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
          </div>

          {/* Live feed */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="label">Ganancias en tiempo real</div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span className="text-emerald-400 text-[10px]">live</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {earnings.slice(0, 6).map(e => (
                <div key={e.id} className="glass-sm glass-emerald p-3 animate-slide-in">
                  <div className="flex justify-between mb-1">
                    <span className="text-[#10B981] font-mono font-bold text-sm">+{e.yourSats} sats</span>
                    <span className="text-white/20 text-[10px]">{rel(e.ts)}</span>
                  </div>
                  <p className="text-white/30 text-xs italic line-clamp-1">&ldquo;{e.query}&rdquo;</p>
                  <p className="text-white/15 text-[10px] font-mono mt-1">{e.agentId}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <div className="label mb-4">Top contribuidores</div>
            <div className="flex flex-col gap-1.5">
              {LEADERBOARD.map(c => (
                <div key={c.wallet}
                  className={`glass-sm flex items-center gap-3 px-3 py-2.5 text-xs ${c.wallet === '@miluska-edu3' ? 'glass-emerald' : ''}`}>
                  <span className="text-white/20 w-5 text-center shrink-0">{c.badge || `#${c.rank}`}</span>
                  <div className="flex-1 min-w-0">
                    <div className={`font-mono truncate ${c.wallet === '@miluska-edu3' ? 'text-[#10B981]' : 'text-[#EDE9E1]'}`}>{c.wallet}</div>
                    <div className="text-white/20 text-[9px] truncate">{c.tribe}</div>
                  </div>
                  <div className="text-[#E8B547] font-mono font-bold shrink-0">{c.earned.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-xl mx-auto">
          <h3 className="text-2xl font-bold text-gradient mb-3">
            Ayni — Reciprocidad en la economía de agentes.
          </h3>
          <p className="text-white/30 text-sm mb-8 italic">
            "Hoy te ayudo. Mañana me ayudas." — Ahora pagado en sats, en milisegundos, via Lightning.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/" className="btn-gold">Ver marketplace →</Link>
            <Link href="/agent" className="btn-glass">Perspectiva agente</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
