import AyniBot from './AyniBot'

const TEAM = [
  { name: 'Dennis Vivas',   role: 'Architect & Biz'  },
  { name: 'Miluska Pajuelo', role: 'Frontend / UX'   },
  { name: 'Cindy Rojas',    role: 'Backend Dev'       },
]

const NAV = [
  { href: '/',             label: 'Marketplace'    },
  { href: '/agent',        label: 'Agentes IA'     },
  { href: '/human',        label: 'Humanos'        },
  { href: '/contributors', label: 'Contribuidores' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-20">
      <div className="max-w-5xl mx-auto px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand + Ayni mascot */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <AyniBot mood="happy" size="sm" />
              <div>
                <div className="text-[#EDE9E1] font-bold text-lg tracking-tight">AyniAgents</div>
                <div className="text-white/25 text-[10px] tracking-widest uppercase">Lightning · Knowledge · Reciprocity</div>
              </div>
            </div>
            <p className="text-white/35 text-sm leading-relaxed">
              Programmable ayni for the agent economy. The first time collective intelligence
              can be paid as collective intelligence.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[#E8B547] text-sm">⚡</span>
              <span className="text-white/20 text-xs">Powered by Bitcoin Lightning Network</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-medium">Mainnet · Live</span>
            </div>
          </div>

          {/* Team */}
          <div>
            <div className="label mb-5">Equipo</div>
            <div className="flex flex-col gap-4">
              {TEAM.map(m => (
                <div key={m.name} className="flex items-center justify-between">
                  <span className="text-[#EDE9E1] text-sm font-medium">{m.name}</span>
                  <span className="text-white/25 text-xs">{m.role}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.06] mt-6 pt-5">
              <div className="label mb-3">Navegar</div>
              <div className="flex flex-col gap-2">
                {NAV.map(n => (
                  <a key={n.href} href={n.href}
                    className="text-white/30 text-sm hover:text-white/60 transition-colors">
                    {n.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Ayni cultural note */}
          <div>
            <div className="label mb-5">El principio Ayni</div>
            <p className="text-white/35 text-sm leading-relaxed mb-4">
              <em className="text-white/55 not-italic font-medium">Ayni</em> — palabra quechua que significa reciprocidad
              y ayuda mutua. Durante siglos estructuró el trabajo colectivo en los Andes.
            </p>
            <p className="text-white/25 text-sm leading-relaxed mb-4 italic">
              "Hoy te ayudo. Mañana me ayudas."
            </p>
            <p className="text-white/30 text-sm leading-relaxed">
              El conocimiento siempre se ha compartido así. Pero nunca se había podido{' '}
              <span className="text-[#E8B547]">pagar</span> así — los fees lo hacían imposible.
              Lightning lo cambia todo.
            </p>

            <div className="mt-6 glass-sm px-4 py-3 inline-block">
              <div className="label mb-1">Hack Nation 5</div>
              <div className="text-white/45 text-xs">Spiral Challenge 02 · Earn in the Agent Economy</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-wrap items-center justify-between gap-4">
          <span className="text-white/15 text-xs">© 2026 AyniAgents · MIT License · Built 2026-04-25</span>
          <span className="text-white/15 text-xs">Global AI Hackathon 2026 · World Bank Youth Summit</span>
        </div>
      </div>
    </footer>
  )
}
