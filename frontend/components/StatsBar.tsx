import type { Tribu, PayoutEvent } from '@/lib/types'

type Props = { tribes: Tribu[]; events: PayoutEvent[] }

export default function StatsBar({ tribes, events }: Props) {
  const settled   = events.filter(e => e.phase === 'settled')
  const totalSats = settled.reduce((a, e) => a + e.totalSats, 0)
  const active    = tribes.filter(t => t.isActive).length
  const consultas = tribes.reduce((a, t) => a + t.consultas, 0)
  const avgRating = (tribes.reduce((a, t) => a + t.rating, 0) / tribes.length).toFixed(1)
  const agents    = new Set(events.map(e => e.agentId)).size

  const stats = [
    { label: 'Sats distribuidos',   value: totalSats.toLocaleString(), color: 'text-[#E8B547]' },
    { label: 'Tribus activas',      value: `${active} / ${tribes.length}`, color: 'text-[#8B5CF6]' },
    { label: 'Consultas históricas',value: consultas.toLocaleString(),  color: 'text-[#EDE9E1]' },
    { label: 'Rating promedio',     value: avgRating,                   color: 'text-[#10B981]' },
    { label: 'Agentes únicos',      value: String(agents),              color: 'text-[#38BDF8]' },
    { label: 'Pagos liquidados',    value: String(settled.length),      color: 'text-[#F472B6]' },
  ]

  return (
    <div className="shrink-0 border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-xl">
      <div className="px-6 py-2.5 flex gap-6 overflow-x-auto items-center">
        {stats.map((s, i) => (
          <div key={s.label} className="flex items-center gap-6 shrink-0">
            <div>
              <div className={`font-mono font-bold text-lg leading-tight tabular-nums ${s.color}`}>
                {s.value}
              </div>
              <div className="text-white/25 text-[9px] uppercase tracking-widest">{s.label}</div>
            </div>
            {i < stats.length - 1 && <div className="w-px h-6 bg-white/[0.07]" />}
          </div>
        ))}
      </div>
    </div>
  )
}
