import type { Tribu } from '@/lib/types'

const CAT_GLOW: Record<string, string> = {
  'Legal & Finanzas': 'shadow-[0_0_32px_0_rgba(59,130,246,0.1)] border-blue-500/20',
  'Tecnología':       'shadow-[0_0_32px_0_rgba(139,92,246,0.1)] border-violet-500/20',
  'Salud':            'shadow-[0_0_32px_0_rgba(16,185,129,0.1)] border-emerald-500/20',
  'Crypto & DeFi':    'shadow-[0_0_32px_0_rgba(251,146,60,0.1)] border-orange-500/20',
  'Educación':        'shadow-[0_0_32px_0_rgba(244,114,182,0.1)] border-pink-500/20',
}

const CAT_BADGE: Record<string, string> = {
  'Legal & Finanzas': 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  'Tecnología':       'bg-violet-500/10 text-violet-300 border-violet-500/20',
  'Salud':            'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  'Crypto & DeFi':    'bg-orange-500/10 text-orange-300 border-orange-500/20',
  'Educación':        'bg-pink-500/10 text-pink-300 border-pink-500/20',
}

const BAR_COLORS = ['#E8B547', '#8B5CF6', '#10B981', '#38BDF8', '#F472B6', '#FB923C']

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`text-xs ${i <= Math.round(rating) ? 'text-[#E8B547]' : 'text-white/15'}`}>★</span>
      ))}
    </div>
  )
}

export default function TribeCard({ tribe }: { tribe: Tribu }) {
  const catGlow  = CAT_GLOW[tribe.category]  ?? ''
  const catBadge = CAT_BADGE[tribe.category] ?? 'bg-white/5 text-white/40 border-white/10'

  return (
    <div className={[
      'glass flex flex-col gap-4 p-5 transition-all duration-300 group',
      tribe.isActive
        ? `glass-hover ${catGlow}`
        : 'opacity-40 cursor-not-allowed',
    ].join(' ')}>

      {/* ── Top row ── */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <span className={`text-[10px] px-2.5 py-1 rounded-full border font-semibold tracking-wide ${catBadge}`}>
            {tribe.category}
          </span>
          {tribe.verified && (
            <span className="text-[10px] px-2.5 py-1 rounded-full border bg-[#E8B547]/10 text-[#E8B547] border-[#E8B547]/25 font-semibold">
              ✓ Verificada
            </span>
          )}
          {!tribe.isActive && (
            <span className="text-[10px] px-2.5 py-1 rounded-full border bg-white/5 text-white/30 border-white/10">
              Offline
            </span>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <Stars rating={tribe.rating} />
          <span className="text-white/30 text-[10px] font-mono">{tribe.rating} ({tribe.totalRatings})</span>
        </div>
      </div>

      {/* ── Name + description ── */}
      <div>
        <h3 className="text-[#EDE9E1] font-bold text-lg leading-tight mb-1.5
                       group-hover:text-gradient-gold transition-all">
          {tribe.name}
        </h3>
        <p className="text-white/45 text-sm leading-relaxed">{tribe.description}</p>
      </div>

      {/* ── Key stats ── */}
      <div className="flex items-center gap-0 text-sm">
        <div className="flex-1">
          <span className="text-[#E8B547] font-mono font-bold text-xl">{tribe.pricePerCallSats}</span>
          <span className="text-white/30 text-xs ml-1">sats/consulta</span>
        </div>
        <div className="w-px h-7 bg-white/[0.07] mx-3" />
        <div className="flex-1">
          <span className="text-[#EDE9E1] font-mono font-bold text-xl">{tribe.consultas.toLocaleString()}</span>
          <span className="text-white/30 text-xs ml-1">consultas</span>
        </div>
        <div className="w-px h-7 bg-white/[0.07] mx-3" />
        <div className="flex-1">
          <span className="text-[#38BDF8] font-mono font-bold text-base">{tribe.responseTime}</span>
          <span className="text-white/30 text-xs ml-1">resp.</span>
        </div>
      </div>

      {/* ── Tags ── */}
      <div className="flex flex-wrap gap-1.5">
        {tribe.tags.map(tag => (
          <span key={tag} className="text-[10px] text-white/35 bg-white/[0.04] border border-white/[0.07] px-2.5 py-0.5 rounded-lg">
            #{tag}
          </span>
        ))}
      </div>

      <div className="border-t border-white/[0.06]" />

      {/* ── Split bars ── */}
      <div>
        <div className="label mb-2.5">Distribución de pagos</div>
        <div className="flex flex-col gap-2">
          {tribe.splits.map((s, i) => (
            <div key={s.wallet} className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: BAR_COLORS[i % BAR_COLORS.length] }} />
              <span className="text-white/30 text-[10px] font-mono w-28 truncate">{s.wallet}</span>
              <div className="flex-1 h-[3px] bg-white/[0.07] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${s.pct * 100}%`, backgroundColor: BAR_COLORS[i % BAR_COLORS.length] }} />
              </div>
              <span className="text-[10px] font-mono font-bold w-7 text-right shrink-0"
                style={{ color: BAR_COLORS[i % BAR_COLORS.length] }}>
                {Math.round(s.pct * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      {tribe.isActive && (
        <button className="mt-auto w-full py-2.5 rounded-2xl border border-white/[0.08]
                           text-white/40 text-sm font-medium
                           hover:border-[#E8B547]/40 hover:text-[#E8B547] hover:bg-[#E8B547]/[0.04]
                           transition-all duration-200">
          Consultar tribu →
        </button>
      )}
    </div>
  )
}
