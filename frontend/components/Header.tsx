'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AyniBot from './AyniBot'

const NAV = [
  { href: '/',             label: 'Marketplace' },
  { href: '/agent',        label: 'Agentes IA'  },
  { href: '/human',        label: 'Humanos'      },
  { href: '/contributors', label: 'Contribuidores' },
]

type Props = {
  totalSats?:     number
  confirmedCount?: number
}

export default function Header({ totalSats, confirmedCount }: Props) {
  const pathname = usePathname()

  return (
    <header className="shrink-0 z-50 bg-white/[0.03] backdrop-blur-2xl border-b border-white/[0.07]">
      <div className="px-6 py-3 flex items-center justify-between gap-4">

        {/* ── Logo + Ayni xs ── */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center
                            bg-gradient-to-br from-[#8B5CF6] to-[#E8B547]
                            shadow-[0_0_16px_0_rgba(139,92,246,0.5)]">
              <span className="text-white font-black text-sm">A</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AyniBot mood="happy" size="xs"
              className="group-hover:animate-float transition-all" />
            <div className="hidden sm:block leading-tight">
              <div className="text-[#EDE9E1] font-bold text-base tracking-tight">AyniAgents</div>
              <div className="text-white/30 text-[9px] tracking-widest uppercase">Lightning · Knowledge</div>
            </div>
          </div>
        </Link>

        {/* ── Nav ── */}
        <nav className="flex items-center gap-1">
          {NAV.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={[
                  'relative px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200',
                  active
                    ? 'bg-white/[0.09] text-white border border-white/[0.12]'
                    : 'text-white/45 hover:text-white/75 hover:bg-white/[0.05]',
                ].join(' ')}
              >
                {label}
                {active && (
                  <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E8B547]
                                   shadow-[0_0_6px_2px_rgba(232,181,71,0.6)]" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* ── Right: live stats ── */}
        <div className="flex items-center gap-4 shrink-0">
          {totalSats !== undefined && (
            <div className="hidden md:block text-right">
              <div className="font-mono font-bold text-base text-[#E8B547] tabular-nums leading-tight">
                {totalSats.toLocaleString()}
              </div>
              <div className="text-white/25 text-[9px] tracking-wider uppercase">sats distribuidos</div>
            </div>
          )}
          {confirmedCount !== undefined && (
            <div className="hidden md:block text-right">
              <div className="font-mono font-bold text-base text-[#38BDF8] tabular-nums leading-tight">
                {confirmedCount}
              </div>
              <div className="text-white/25 text-[9px] tracking-wider uppercase">pagos</div>
            </div>
          )}
          <div className="flex items-center gap-2 glass-sm px-3 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold tracking-widest">LIVE</span>
          </div>
        </div>
      </div>
    </header>
  )
}
