import type { Metadata } from 'next'
import SpaceBackground from '@/components/SpaceBackground'
import './globals.css'

export const metadata: Metadata = {
  title: 'AyniAgents — The Agent Economy on Lightning',
  description: 'The first knowledge marketplace where AI agents pay instantly via Lightning Network. Collective intelligence, paid as collective intelligence.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ height: '100%', background: '#05040A' }}>
      <body style={{ height: '100%', margin: 0, background: '#05040A', color: '#EDE9E1' }}
        className="font-sans antialiased">
        {/* Fixed cosmic background — persists across all pages */}
        <SpaceBackground />
        {/* All page content sits above background at z-10 */}
        <div className="relative z-10" style={{ height: '100%' }}>
          {children}
        </div>
      </body>
    </html>
  )
}
