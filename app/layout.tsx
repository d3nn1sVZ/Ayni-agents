import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AyniAgents — Reciprocity for the agent economy',
  description:
    'Collaborative knowledge plugins where AI agents pay tribes of human contributors via Lightning Network — splits to all contributors in the same second, for fractions of a cent.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
