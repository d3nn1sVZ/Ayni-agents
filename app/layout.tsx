import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AyniAgents — Reciprocidad para la economía de agentes',
  description:
    'Plugins de conocimiento colaborativo donde agentes de IA pagan a tribus de contribuidores humanos vía Lightning Network.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
