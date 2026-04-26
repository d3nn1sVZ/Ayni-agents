'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AyniBot from '@/components/AyniBot'

type AgentStatus = 'active' | 'idle' | 'paying'
type Agent = {
  id: string; name: string; mission: string; status: AgentStatus
  satsSpent: number; queriesMade: number; currentTask: string; lastActive: string
}
type Entry = { ts: number; agentName: string; action: string; sats: number; type: 'query' | 'payment' }

const INIT_AGENTS: Agent[] = [
  { id: 'a1', name: 'TaxBot PE', mission: 'Tax consulting for Peruvian clients', status: 'active', satsSpent: 3400, queriesMade: 34, currentTask: 'Checking NRUS regime for client #447', lastActive: '12s ago' },
  { id: 'a2', name: 'DataSage', mission: 'Data science assistance for the team', status: 'paying', satsSpent: 2250, queriesMade: 30, currentTask: '⚡ Paying 75 sats — XGBoost vs LightGBM', lastActive: 'now' },
  { id: 'a3', name: 'LexAgent MX', mission: 'Corporate legal support for MX startups', status: 'idle', satsSpent: 1800, queriesMade: 12, currentTask: 'Waiting for next query…', lastActive: '3min ago' },]

const INIT_ACTIVITY: Entry[] = [
  { ts: Date.now() - 12000, agentName: 'TaxBot PE', action: 'When do I pay the monthly VAT (IGV) to SUNAT?', sats: 100, type: 'query' },
  { ts: Date.now() - 14000, agentName: 'TaxBot PE', action: '⚡ Payment settled — 100 sats in 156ms', sats: 100, type: 'payment' },
  { ts: Date.now() - 30000, agentName: 'DataSage', action: 'Handling missing values with pandas', sats: 75, type: 'query' },
  { ts: Date.now() - 32000, agentName: 'DataSage', action: '⚡ Payment settled — 75 sats in 183ms', sats: 75, type: 'payment' },
  { ts: Date.now() - 55000, agentName: 'LexAgent MX', action: 'How to establish a SAS in Mexico?', sats: 150, type: 'query' },
  { ts: Date.now() - 58000, agentName: 'LexAgent MX', action: '⚡ Payment settled — 150 sats in 201ms', sats: 150, type: 'payment' },
]

const QUERIES = [
  { id: 'a1', name: 'TaxBot PE', q: 'Accounting books for SMEs', sats: 100 },
  { id: 'a2', name: 'DataSage', q: 'L1 vs L2 regularization', sats: 75 },
  { id: 'a3', name: 'LexAgent MX', q: 'Difference between SAPI and SA de CV', sats: 150 },
]

const STATUS_STYLE: Record<AgentStatus, string> = {
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  idle: 'bg-white/5 text-white/25 border-white/10',
  paying: 'bg-[#E8B547]/10 text-[#E8B547] border-[#E8B547]/20',
}
const STATUS_LABEL: Record<AgentStatus, string> = {
  active: '● Activo', idle: '○ En espera', paying: '⚡ Pagando',
}

function rel(ts: number) {
  const d = Date.now() - ts
  return d < 60000 ? `hace ${Math.round(d / 1000)}s` : `hace ${Math.round(d / 60000)}min`
}

export default function HumanPage() {
  const [agents, setAgents] = useState<Agent[]>(INIT_AGENTS)
  const [activity, setActivity] = useState<Entry[]>(INIT_ACTIVITY)
  const [totalSats, setTotal] = useState(7450)
  const [mood, setMood] = useState<'happy' | 'paying'>('happy')

  useEffect(() => {
    let idx = 0
    const iv = setInterval(() => {
      const q = QUERIES[idx % QUERIES.length]; idx++
      setMood('paying')
      setAgents(prev => prev.map(a => a.id === q.id ? { ...a, status: 'paying', currentTask: `⚡ Paying ${q.sats} sats — ${q.q}` } : a))
      setActivity(prev => [{ ts: Date.now(), agentName: q.name, action: q.q, sats: q.sats, type: 'query' as const }, ...prev].slice(0, 20))
      setTimeout(() => {
        setMood('happy')
        setAgents(prev => prev.map(a => a.id === q.id ? { ...a, status: 'active', satsSpent: a.satsSpent + q.sats, queriesMade: a.queriesMade + 1, currentTask: `Response received`, lastActive: 'now' } : a))
        setTotal(p => p + q.sats)
        setActivity(prev => [{ ts: Date.now(), agentName: q.name, action: `⚡ Pago liquidado — ${q.sats} sats en ${160 + Math.floor(Math.random() * 80)}ms`, sats: q.sats, type: 'payment' as const }, ...prev].slice(0, 20))
      }, 1800)
    }, 5000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />

      {/* ── Hero ── */}
      <section className="px-6 pt-24 pb-16 text-center border-b border-white/[0.06]">
        <div className="max-w-2xl mx-auto">
          <div className="label mb-6">View: Human · Agent Economy</div>
          <div className="flex justify-center mb-8">
            <AyniBot mood={mood} size="md"
              className="animate-float drop-shadow-[0_0_40px_rgba(56,189,248,0.35)]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5">
            <span className="text-gradient">Your agents work.</span><br />
            <span className="text-[#38BDF8]">Your agents pay.</span>
          </h1>
          <p className="text-white/40 text-lg leading-relaxed mb-8">
            Deploy your agent once. It discovers services, pays in sats, and delivers results.
            No contracts. No API keys. No friction.
          </p>

          <div className="flex justify-center gap-4">
            {[
              { v: agents.filter(a => a.status !== 'idle').length, l: 'active agents', c: 'text-emerald-400' },
              { v: totalSats.toLocaleString(), l: 'sats spent', c: 'text-[#E8B547]' },
              { v: `$${(totalSats * 0.0000006).toFixed(4)}`, l: 'total cost (USD)', c: 'text-[#38BDF8]' },
            ].map(s => (
              <div key={s.l} className="glass-sm px-5 py-3 text-center">
                <div className={`font-mono font-bold text-xl ${s.c}`}>{s.v}</div>
                <div className="text-white/20 text-[9px] uppercase tracking-widest mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agents + Activity ── */}
      <section className="px-6 py-20 border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="label mb-5">My deployed agents</div>
            <div className="flex flex-col gap-3">
              {agents.map(a => (
                <div key={a.id} className="glass p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[#EDE9E1] font-bold">{a.name}</div>
                      <div className="text-white/30 text-xs mt-0.5">{a.mission}</div>
                    </div>
                    <span className={`text-[10px] px-2.5 py-1 rounded-full border font-semibold shrink-0 ${STATUS_STYLE[a.status]}`}>
                      {STATUS_LABEL[a.status]}
                    </span>
                  </div>
                  <div className="bg-black/30 rounded-xl border border-white/[0.05] px-3 py-2">
                    <span className="text-white/20 text-[10px] font-mono">task → </span>
                    <span className="text-white/40 text-[11px] font-mono">{a.currentTask}</span>
                  </div>
                  <div className="flex gap-5 text-xs">
                    <div><span className="text-[#E8B547] font-mono font-bold">{a.satsSpent.toLocaleString()}</span><span className="text-white/20 ml-1">sats</span></div>
                    <div><span className="text-[#38BDF8] font-mono font-bold">{a.queriesMade}</span><span className="text-white/20 ml-1">requests</span></div>
                    <div className="ml-auto text-white/20">{a.lastActive}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="label">Real-time Activity</div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span className="text-emerald-400 text-[10px]">live</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {activity.slice(0, 8).map((e, i) => (
                <div key={i} className={`glass-sm flex items-center gap-3 px-4 py-3 text-xs animate-slide-in ${e.type === 'payment' ? 'glass-gold' : ''}`}>
                  <span className="text-base shrink-0">{e.type === 'payment' ? '⚡' : '→'}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[#38BDF8] font-semibold">{e.agentName}</span>
                    <span className="text-white/20 mx-1.5">·</span>
                    <span className="text-white/35 truncate">{e.action}</span>
                  </div>
                  <div className="shrink-0 text-right">
                    {e.type === 'payment' && <div className="text-[#E8B547] font-mono font-bold">{e.sats} sats</div>}
                    <div className="text-white/20 text-[9px]">{rel(e.ts)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-xl mx-auto">
          <h3 className="text-2xl font-bold text-gradient mb-3">Do you contribute knowledge?</h3>
          <p className="text-white/30 text-sm mb-8">See how you earn every time an agent queries your tribe.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/contributors" className="btn-gold">View contributors →</Link>
            <Link href="/" className="btn-glass">Marketplace</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
