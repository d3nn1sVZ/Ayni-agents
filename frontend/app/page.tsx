'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TribeCard from '@/components/TribeCard'
import AyniBot from '@/components/AyniBot'
import { tribes, initialEvents, generateEvent } from '@/lib/mock-data'
import type { PayoutEvent } from '@/lib/types'

const ROLES = [
  {
    href: '/agent',
    icon: '🤖',
    who: 'AI Agent',
    tagline: 'Pays autonomously. No accounts. No API keys.',
    body: 'The agent calls the endpoint, receives a Lightning invoice, pays it in milliseconds and gets the answer. All without human intervention.',
    stat: '183ms',
    statLabel: 'average settlement time',
    color: 'text-[#8B5CF6]',
    border: 'hover:border-[#8B5CF6]/30',
  },
  {
    href: '/human',
    icon: '👤',
    who: 'Human',
    tagline: 'Your agents work. Your agents pay.',
    body: 'Deploy the agent once. It queries services, pays in sats, and brings you results. No subscription contracts. No end-of-month invoices.',
    stat: '$0.0006',
    statLabel: 'cost per specialized query',
    color: 'text-[#38BDF8]',
    border: 'hover:border-[#38BDF8]/30',
  },
  {
    href: '/contributors',
    icon: '👥',
    who: 'Contributor',
    tagline: 'Your knowledge. Earnings with no middleman.',
    body: 'Every time an agent queries your tribe, sats land directly in your wallet in the same second — automatically split among all contributors.',
    stat: '0 sats',
    statLabel: 'fee for splits to N wallets',
    color: 'text-[#10B981]',
    border: 'hover:border-[#10B981]/30',
  },
]

const CATEGORIES = ['All', 'Science', 'Legal & Finance', 'Technology', 'Health', 'Crypto & DeFi', 'Education']

function LiveTicker({ events }: { events: PayoutEvent[] }) {
  const settled = events.filter(e => e.phase === 'settled').slice(0, 6)
  if (settled.length === 0) return null
  return (
    <div className="flex items-center gap-4 overflow-hidden">
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
        </span>
        <span className="text-emerald-400 text-[10px] font-semibold tracking-widest uppercase">Live</span>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        {settled.map(e => (
          <div key={e.id} className="shrink-0 glass-sm px-3 py-1.5 flex items-center gap-2">
            <span className="text-[#E8B547] font-mono font-bold text-xs">+{e.totalSats}</span>
            <span className="text-white/30 text-[10px]">sats</span>
            <span className="text-white/25 text-[10px]">·</span>
            <span className="text-white/40 text-[10px]">{e.tribuName}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const [events, setEvents] = useState<PayoutEvent[]>(initialEvents)
  const [filter, setFilter] = useState('All')
  const [ayniMood, setAyniMood] = useState<'happy' | 'celebrating'>('happy')

  const totalSats = events.filter(e => e.phase === 'settled').reduce((a, e) => a + e.totalSats, 0)
  const confirmedCount = events.filter(e => e.phase === 'settled').length

  useEffect(() => {
    const tick = () => {
      const req = generateEvent('requested')
      setEvents(prev => [req, ...prev].slice(0, 50))
      setAyniMood('celebrating')
      setTimeout(() => {
        const settled: PayoutEvent = { ...req, id: req.id + '-s', phase: 'settled', ts: Date.now() }
        setEvents(prev => [settled, ...prev].slice(0, 50))
        setTimeout(() => setAyniMood('happy'), 2500)
      }, 1800)
    }
    const t = setTimeout(tick, 1500)
    const iv = setInterval(tick, 5000)
    return () => { clearTimeout(t); clearInterval(iv) }
  }, [])

  const filtered = tribes.filter(t =>
    filter === 'All' || t.category === filter
  )

  return (
    <div className="min-h-dvh flex flex-col">
      <Header totalSats={totalSats} confirmedCount={confirmedCount} />

      {/* ────────────────── HERO ────────────────── */}
      <section className="px-6 pt-24 pb-20 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="label mb-8 animate-fade-in">
            Hack Nation 5 · Spiral Challenge 02 · Bitcoin Lightning Network
          </div>

          <div className="flex justify-center mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <AyniBot mood={ayniMood} size="md"
              className="animate-float drop-shadow-[0_0_48px_rgba(139,92,246,0.45)]" />
          </div>

          <h1 className="text-5xl md:text-[64px] font-black tracking-tight leading-[1.05] mb-6 animate-fade-up"
            style={{ animationDelay: '0.15s' }}>
            <span className="text-gradient">Collective intelligence,</span><br />
            <span className="text-[#E8B547]">paid as collective intelligence.</span>
          </h1>

          <p className="text-white/45 text-lg md:text-xl leading-relaxed mb-3 max-w-xl mx-auto animate-fade-up"
            style={{ animationDelay: '0.25s' }}>
            AI agents pay tribes of human experts via Lightning. Every contributor receives
            their fair share — in the same second the query happens.
          </p>

          <p className="text-white/25 text-sm italic mb-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            Ayni (Quechua): reciprocity. For the first time, this ancient principle can be paid.
          </p>

          <div className="flex gap-3 justify-center animate-fade-up" style={{ animationDelay: '0.35s' }}>
            <a href="#marketplace" className="btn-gold">Explore marketplace ↓</a>
            <Link href="/agent" className="btn-glass">How agents pay →</Link>
          </div>
        </div>
      </section>

      {/* ────────────────── THREE-DIMENSIONAL PROBLEM ────────────────── */}
      <section className="px-6 py-20 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="label mb-4">Problem Statement</div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gradient mb-4">
              The problem, across three dimensions.
            </h2>
            <p className="text-white/40 text-base max-w-2xl mx-auto leading-relaxed">
              The economy of collective intelligence is broken on three simultaneous fronts.
              Ayni solves all three with a single primitive: Lightning payments + L402.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass p-6 flex flex-col gap-3">
              <div className="text-3xl">🏛️</div>
              <div className="text-[10px] uppercase tracking-widest font-semibold text-[#8B5CF6]">
                01 · Centralization
              </div>
              <h3 className="text-[#EDE9E1] font-bold text-lg leading-tight">
                Data is centralized and expensive.
              </h3>
              <p className="text-white/35 text-sm leading-relaxed">
                A handful of platforms concentrate the world's knowledge and extract rent from
                anyone who wants access. The producer earns nothing; the consumer overpays.
              </p>
            </div>

            <div className="glass p-6 flex flex-col gap-3">
              <div className="text-3xl">🧠</div>
              <div className="text-[10px] uppercase tracking-widest font-semibold text-[#38BDF8]">
                02 · Access to knowledge
              </div>
              <h3 className="text-[#EDE9E1] font-bold text-lg leading-tight">
                AI lacks data to train and query against.
              </h3>
              <p className="text-white/35 text-sm leading-relaxed">
                Models need specialized, verified knowledge — but it's trapped behind paywalls,
                contracts and closed APIs. Accessibility to expertise is still a bottleneck.
              </p>
            </div>

            <div className="glass p-6 flex flex-col gap-3">
              <div className="text-3xl">⛓️</div>
              <div className="text-[10px] uppercase tracking-widest font-semibold text-[#E8B547]">
                03 · Monetization monopoly
              </div>
              <h3 className="text-[#EDE9E1] font-bold text-lg leading-tight">
                Big-AI monopolizes the earnings.
              </h3>
              <p className="text-white/35 text-sm leading-relaxed">
                The intelligence generated by users and agents is monetized by a few companies.
                The human who contributes the knowledge is excluded from the value flow they created.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-white/30 text-sm italic max-w-2xl mx-auto">
              Ayni decentralizes information and generates direct income for contributors —
              in the same second their knowledge is queried.
            </p>
          </div>
        </div>
      </section>

      {/* ────────────────── THE WHY ────────────────── */}
      <section className="px-6 py-20 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="label mb-4">Why Lightning · Why now</div>
            <h2 className="text-4xl font-black tracking-tight text-gradient mb-4">
              Payment fees killed micro-reciprocity.
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
              Splitting a 100-sat payment across 5 contributors costs nothing on Lightning.
              The same operation on Stripe costs more in fees than the payment itself.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {/* Stripe card */}
            <div className="glass p-8 flex flex-col gap-4">
              <div className="text-[10px] uppercase tracking-widest font-semibold text-red-400">
                ✗ Stripe / Traditional rails
              </div>
              <div>
                <div className="text-6xl font-black text-red-400 tracking-tight leading-none">$0.30</div>
                <div className="text-white/30 text-sm mt-1">minimum fee per transaction</div>
              </div>
              <div className="border-t border-white/[0.06]" />
              <p className="text-white/35 text-sm leading-relaxed">
                Your share of a 100-sat query = <strong className="text-white/55">$0.0000216</strong>.
                Stripe's minimum fee is <strong className="text-red-400">13,888×</strong> the payment value.
                Collective monetization at micropayment scale is simply impossible.
              </p>
              <div className="text-red-400/60 text-sm font-medium">Split to N wallets: impossible.</div>
            </div>
            {/* Lightning card */}
            <div className="glass glass-gold p-8 flex flex-col gap-4">
              <div className="text-[10px] uppercase tracking-widest font-semibold text-[#E8B547]">
                ✓ Bitcoin Lightning Network
              </div>
              <div>
                <div className="text-6xl font-black text-[#E8B547] tracking-tight leading-none">$0</div>
                <div className="text-white/30 text-sm mt-1">fee to split to any number of wallets</div>
              </div>
              <div className="border-t border-white/[0.06]" />
              <p className="text-white/35 text-sm leading-relaxed">
                100 sats splits to 5 contributors in the <strong className="text-white/55">same second</strong> the
                query happens. Each receives their exact share. No intermediary. No minimum. No delay.
              </p>
              <div className="text-[#E8B547] text-sm font-medium">Split to N wallets: trivial. ⚡</div>
            </div>
          </div>

          {/* Pull quote */}
          <div className="text-center">
            <blockquote className="text-xl md:text-2xl font-medium text-white/55 max-w-2xl mx-auto leading-relaxed italic">
              "Wikipedia + Patreon + Lightning, anchored in an ancient cultural principle.
              The first time collective intelligence can be paid as collective intelligence."
            </blockquote>
          </div>
        </div>
      </section>

      {/* ────────────────── THREE ROLES ────────────────── */}
      <section className="px-6 py-20 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="label mb-4">Three roles, one economy</div>
            <h2 className="text-3xl font-black tracking-tight text-gradient">
              Everyone benefits. Everyone earns.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ROLES.map(r => (
              <Link key={r.href} href={r.href}
                className={`glass glass-hover ${r.border} p-7 flex flex-col gap-4 group`}>
                <div className="text-3xl">{r.icon}</div>
                <div>
                  <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${r.color}`}>{r.who}</div>
                  <div className="text-[#EDE9E1] font-bold text-base leading-tight group-hover:text-white transition-colors">
                    {r.tagline}
                  </div>
                </div>
                <p className="text-white/35 text-sm leading-relaxed flex-1">{r.body}</p>
                <div className="border-t border-white/[0.06] pt-4">
                  <div className={`font-mono font-black text-2xl ${r.color}`}>{r.stat}</div>
                  <div className="text-white/25 text-xs mt-0.5">{r.statLabel}</div>
                </div>
                <div className={`text-xs font-medium ${r.color} group-hover:translate-x-1 transition-transform`}>
                  Learn more →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── UNIQUE SELLING PROPOSITION ────────────────── */}
      <section className="px-6 py-20 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="label mb-4">Unique Selling Proposition</div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gradient mb-4">
              What no traditional rail can do.
            </h2>
            <p className="text-white/40 text-base max-w-2xl mx-auto leading-relaxed">
              Real-time micropayments to multiple actors, with no middlemen.
              Simply impossible on traditional banking infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: '🚫',
                title: 'No middlemen',
                body: 'Direct wallet-to-wallet payments. No banks, no processors, no custodians. Value flows without tolls.',
                color: 'text-[#8B5CF6]',
              },
              {
                icon: '⚡',
                title: 'Settlement in milliseconds',
                body: 'Lightning Network settles transactions in ~183ms. The query and the payment happen in the same breath.',
                color: 'text-[#E8B547]',
              },
              {
                icon: '🌎',
                title: 'Decentralized and global',
                body: 'No contracts, no subscriptions, no country restrictions. Any wallet, any agent, any human.',
                color: 'text-[#38BDF8]',
              },
              {
                icon: '💸',
                title: 'Fees close to $0',
                body: 'Per-transaction cost ~$0.0000 vs $0.30 on Stripe. Makes monetizing each individual query viable.',
                color: 'text-[#10B981]',
              },
              {
                icon: '🪙',
                title: 'Real micropayments',
                body: 'Charging 100 sats (~$0.0001) makes economic sense. What is noise in traditional banking is income here.',
                color: 'text-[#E8B547]',
              },
              {
                icon: '🔀',
                title: 'Split to N wallets, in real time',
                body: 'A single transaction splits automatically across 5, 10 or 20 contributors. Impossible on bank rails.',
                color: 'text-[#10B981]',
              },
            ].map(f => (
              <div key={f.title} className="glass p-6 flex flex-col gap-3">
                <div className="text-2xl">{f.icon}</div>
                <h3 className={`font-bold text-base leading-tight ${f.color}`}>{f.title}</h3>
                <p className="text-white/35 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── LIVE MARKETPLACE ────────────────── */}
      <section id="marketplace" className="px-6 py-20 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <div className="label mb-2">Live now</div>
              <h2 className="text-2xl font-black tracking-tight text-gradient">Tribe Marketplace</h2>
            </div>
            <div className="flex gap-3 text-sm">
              <div className="glass-sm px-4 py-2 text-center">
                <div className="text-[#E8B547] font-mono font-bold text-lg">{totalSats.toLocaleString()}</div>
                <div className="text-white/20 text-[9px] uppercase tracking-widest">sats distributed</div>
              </div>
              <div className="glass-sm px-4 py-2 text-center">
                <div className="text-[#10B981] font-mono font-bold text-lg">{confirmedCount}</div>
                <div className="text-white/20 text-[9px] uppercase tracking-widest">payments</div>
              </div>
            </div>
          </div>

          {/* Live ticker */}
          <div className="mb-6">
            <LiveTicker events={events} />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={[
                  'text-[11px] px-3.5 py-1.5 rounded-full border font-medium transition-all duration-150',
                  filter === cat
                    ? 'bg-[#E8B547] text-[#05040A] border-[#E8B547] shadow-[0_0_16px_0_rgba(232,181,71,0.35)]'
                    : 'glass-sm text-white/35 hover:text-white/60',
                ].join(' ')}>
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(t => <TribeCard key={t.id} tribe={t} />)}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
