type Mood = 'happy' | 'paying' | 'celebrating'
type Size = 'xl' | 'md' | 'sm' | 'xs'

const DIMS: Record<Size, { w: number; h: number }> = {
  xl: { w: 160, h: 256 },
  md: { w: 88,  h: 141 },
  sm: { w: 44,  h: 70  },
  xs: { w: 28,  h: 45  },
}

const ARM_ANGLE: Record<Mood, [number, number]> = {
  happy:       [18, -18],
  paying:      [35, -8 ],
  celebrating: [52, -52],
}

/* Scales all coordinates from the base 100×160 viewBox */
export default function AyniBot({
  mood      = 'happy',
  size      = 'md',
  className = '',
  style,
}: {
  mood?:      Mood
  size?:      Size
  className?: string
  style?:     React.CSSProperties
}) {
  const { w, h } = DIMS[size]
  const [la, ra] = ARM_ANGLE[mood]
  const isPaying      = mood === 'paying'
  const isCelebrating = mood === 'celebrating'

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 100 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-label="Ayni robot mascot"
    >
      <defs>
        <radialGradient id="violetBloom" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#8B5CF6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0"    />
        </radialGradient>
        <radialGradient id="goldBloom" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#E8B547" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#E8B547" stopOpacity="0"    />
        </radialGradient>
        <radialGradient id="emeraldBloom" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#10B981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0"   />
        </radialGradient>
        <filter id="fg" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="fgGold" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(139,92,246,0.25)" />
          <stop offset="100%" stopColor="rgba(99,60,180,0.12)"  />
        </linearGradient>
        <linearGradient id="headGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(139,92,246,0.3)" />
          <stop offset="100%" stopColor="rgba(109,40,217,0.15)" />
        </linearGradient>
      </defs>

      {/* ── Glow bloom ── */}
      <ellipse
        cx="50" cy="96" rx="44" ry="44"
        fill={isPaying ? 'url(#goldBloom)' : isCelebrating ? 'url(#emeraldBloom)' : 'url(#violetBloom)'}
      />

      {/* ── Legs ── */}
      <rect x="26" y="130" width="18" height="25" rx="7"
        fill="url(#bodyGrad)" stroke="rgba(139,92,246,0.45)" strokeWidth="1" />
      <rect x="56" y="130" width="18" height="25" rx="7"
        fill="url(#bodyGrad)" stroke="rgba(139,92,246,0.45)" strokeWidth="1" />

      {/* ── Body ── */}
      <rect x="16" y="76" width="68" height="56" rx="15"
        fill="url(#bodyGrad)" stroke="rgba(139,92,246,0.5)" strokeWidth="1.2" />

      {/* Chest panel */}
      <rect x="30" y="88" width="40" height="30" rx="8"
        fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

      {/* Lightning on chest */}
      <text
        x="50" y="109" textAnchor="middle" fontSize="13"
        style={isPaying ? { animation: 'chest-glow 1.4s ease-in-out infinite' } : undefined}
        filter={isPaying ? 'url(#fgGold)' : undefined}
      >⚡</text>

      {/* ── Left arm ── */}
      <rect
        x="1" y="80" width="13" height="32" rx="5"
        fill="url(#bodyGrad)" stroke="rgba(139,92,246,0.45)" strokeWidth="1"
        transform={`rotate(${la}, 7.5, 80)`}
      />

      {/* ── Right arm ── */}
      <rect
        x="86" y="80" width="13" height="32" rx="5"
        fill="url(#bodyGrad)" stroke="rgba(139,92,246,0.45)" strokeWidth="1"
        transform={`rotate(${ra}, 92.5, 80)`}
      />

      {/* ── Head ── */}
      <rect x="17" y="18" width="66" height="54" rx="15"
        fill="url(#headGrad)" stroke="rgba(139,92,246,0.6)" strokeWidth="1.5" />

      {/* Inner head shine */}
      <rect x="22" y="21" width="30" height="8" rx="4"
        fill="rgba(255,255,255,0.06)" />

      {/* ── Eye left (gold) ── */}
      <rect
        x="22" y="34" width="22" height={isPaying ? 5 : 12} rx="5"
        fill="#E8B547" filter="url(#fg)"
        style={isPaying ? { transition: 'height 0.2s' } : undefined}
      />
      <circle cx="33" cy={isPaying ? 36 : 40} r="4" fill="#FFFBEB" />
      <circle cx="34.5" cy={isPaying ? 35 : 38.5} r="1.5" fill="#05040A" />

      {/* ── Eye right (emerald) ── */}
      <rect x="56" y="34" width="22" height="12" rx="5" fill="#10B981" />
      <circle cx="67" cy="40" r="4" fill="#ECFDF5" />
      <circle cx="68.5" cy="38.5" r="1.5" fill="#05040A" />

      {/* ── Mouth ── */}
      <path
        d={isCelebrating ? 'M 30 55 Q 50 67 70 55' : 'M 33 55 Q 50 64 67 55'}
        stroke="rgba(255,255,255,0.45)" strokeWidth="2.2"
        strokeLinecap="round" fill="none"
      />

      {/* ── Cheek blush dots ── */}
      <circle cx="24" cy="51" r="4" fill="rgba(244,114,182,0.18)" />
      <circle cx="76" cy="51" r="4" fill="rgba(244,114,182,0.18)" />

      {/* ── Antenna ── */}
      <line x1="50" y1="6" x2="50" y2="20"
        stroke="#E8B547" strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="5" r="5" fill="#E8B547" filter="url(#fgGold)"
        style={{ animation: 'glow-pulse 2.5s ease-in-out infinite' }} />

      {/* ── Celebration particles ── */}
      {isCelebrating && (
        <>
          <text x="6"  y="28" fontSize="7" fill="#E8B547"
            style={{ animation: 'particle 1.5s ease-out 0.1s infinite' }}>✦</text>
          <text x="85" y="22" fontSize="5" fill="#10B981"
            style={{ animation: 'particle 1.5s ease-out 0.4s infinite' }}>✦</text>
          <text x="3"  y="72" fontSize="5" fill="#8B5CF6"
            style={{ animation: 'particle 1.5s ease-out 0.7s infinite' }}>✦</text>
          <text x="88" y="68" fontSize="7" fill="#E8B547"
            style={{ animation: 'particle 1.5s ease-out 0.2s infinite' }}>✦</text>
          <text x="14" y="15" fontSize="4" fill="#38BDF8"
            style={{ animation: 'particle 1.5s ease-out 0.9s infinite' }}>✦</text>
          <text x="78" y="10" fontSize="6" fill="#F472B6"
            style={{ animation: 'particle 1.5s ease-out 0.5s infinite' }}>✦</text>
        </>
      )}
    </svg>
  )
}
