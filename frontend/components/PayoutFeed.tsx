'use client'

import type { PayoutEvent } from '@/lib/types'

function fmt(ts: number) {
  return new Date(ts).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
}

function shortW(w: string) {
  return w.length > 14 ? w.slice(0, 10) + '…' : w
}

function EventCard({ event }: { event: PayoutEvent }) {
  const settled = event.phase === 'settled'

  return (
    <div className={[
      'px-4 py-3.5 border-b border-white/[0.05] animate-slide-in',
      settled ? 'bg-white/[0.015]' : '',
    ].join(' ')}>
      {/* Badge + time */}
      <div className="flex items-center justify-between mb-2">
        <span className={[
          'inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full border tracking-widest',
          settled
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            : 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        ].join(' ')}>
          <span>{settled ? '✓' : '◌'}</span>
          {settled ? 'SETTLED' : 'REQUESTED'}
        </span>
        <span className="text-white/20 text-[10px] font-mono">{fmt(event.ts)}</span>
      </div>

      {/* Tribe + query */}
      <div className="mb-2">
        <div className="text-[#EDE9E1] text-sm font-semibold leading-tight">{event.tribuName}</div>
        <div className="text-white/35 text-[11px] mt-0.5 line-clamp-1 italic">
          &ldquo;{event.query}&rdquo;
        </div>
      </div>

      {/* Amount */}
      <div className="flex items-center gap-2 mb-2.5">
        <span className={`font-mono font-bold text-sm ${settled ? 'text-[#E8B547]' : 'text-[#38BDF8]'}`}>
          {event.totalSats} sats
        </span>
        {!settled && <span className="text-white/25 text-[11px]">pendiente…</span>}
        {settled && <span className="text-emerald-400 text-[11px]">→ {event.splits.length} wallets</span>}
      </div>

      {/* Splits (settled) */}
      {settled && (
        <div className="glass-sm overflow-hidden">
          {event.splits.map((s, i) => (
            <div key={s.wallet}
              className={`flex items-center justify-between px-3 py-1.5 text-[11px]
                         ${i < event.splits.length - 1 ? 'border-b border-white/[0.05]' : ''}`}>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-[#E8B547]/60" />
                <span className="text-white/35 font-mono">{shortW(s.wallet)}</span>
              </div>
              <span className="text-[#E8B547] font-mono font-bold">+{s.sats} sats</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-2 text-white/15 text-[10px] font-mono">agent: {event.agentId}</div>
    </div>
  )
}

export default function PayoutFeed({ events }: { events: PayoutEvent[] }) {
  const settled = events.filter(e => e.phase === 'settled').length

  return (
    <div className="flex flex-col h-full">
      {/* Sticky header */}
      <div className="shrink-0 px-4 py-3 border-b border-white/[0.06]
                      bg-white/[0.02] backdrop-blur-xl
                      flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
          </span>
          <span className="text-[#EDE9E1] font-semibold text-sm">Live Payouts</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 text-[10px] font-mono">{settled} settled</span>
          <span className="text-white/20 text-[10px] font-mono">{events.length} total</span>
        </div>
      </div>

      {/* Events */}
      <div className="flex-1 overflow-y-auto">
        {events.length === 0
          ? <div className="flex flex-col items-center justify-center h-40 text-white/20 text-sm gap-2">
              <span className="text-3xl">◌</span>Esperando pagos…
            </div>
          : events.map(e => <EventCard key={e.id} event={e} />)
        }
      </div>
    </div>
  )
}
