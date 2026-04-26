'use client'

/* Deterministic star positions via seeded LCG — no hydration mismatch */
function seeded(seed: number) {
  let n = seed
  return () => {
    n = (Math.imul(n, 1664525) + 1013904223) | 0
    return (n >>> 0) / 4294967296
  }
}

const rand = seeded(314159)
const STARS = Array.from({ length: 110 }, (_, i) => ({
  x:   rand() * 100,
  y:   rand() * 100,
  r:   rand() < 0.65 ? 0.8 : rand() < 0.88 ? 1.2 : 1.8,
  dur: 3 + rand() * 5,
  del: rand() * 6,
  op:  0.35 + rand() * 0.55,
}))

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
      {/* Nebula blobs */}
      <div
        className="absolute rounded-full blur-[140px]"
        style={{ top: -200, left: -120, width: 720, height: 720, background: 'rgba(109,40,217,0.2)' }}
      />
      <div
        className="absolute rounded-full blur-[120px]"
        style={{ top: -80, right: -160, width: 560, height: 480, background: 'rgba(29,78,216,0.14)' }}
      />
      <div
        className="absolute rounded-full blur-[160px]"
        style={{ bottom: -240, left: '28%', width: 660, height: 440, background: 'rgba(232,181,71,0.055)' }}
      />
      <div
        className="absolute rounded-full blur-[100px]"
        style={{ top: '40%', right: '15%', width: 360, height: 360, background: 'rgba(139,92,246,0.09)' }}
      />

      {/* Star field */}
      {STARS.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left:               `${s.x}%`,
            top:                `${s.y}%`,
            width:              `${s.r * 2}px`,
            height:             `${s.r * 2}px`,
            opacity:            s.op,
            animationDuration:  `${s.dur}s`,
            animationDelay:     `${s.del}s`,
          }}
        />
      ))}

      {/* Subtle radial vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 0%, transparent 40%, rgba(5,4,10,0.6) 100%)' }}
      />
    </div>
  )
}
