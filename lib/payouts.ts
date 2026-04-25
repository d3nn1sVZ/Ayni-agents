// In-memory event bus for the payout dashboard.
// Frontend subscribes via SSE at /api/payouts/stream and animates each event.
//
// For the hackathon MVP, the redistribution is *visualized* in real time but
// the onward Lightning sends to N contributor wallets are simulated (we log
// the splits but do not actually send sats out yet). Wiring the real splits
// is the next milestone — see docs/DESIGN.md.

import tribusData from '@/data/tribus.json'

export type Tribu = {
  id: string
  name: string
  description: string
  rating: number
  consultas: number
  pricePerCallSats: number
  splits: Array<{ wallet: string; role: string; pct: number }>
  knowledge: Record<string, string>
}

export type PayoutEvent = {
  ts: number
  tribuId: string
  tribuName: string
  totalSats: number
  query: string
  splits: Array<{ wallet: string; role: string; sats: number }>
}

const tribus = tribusData as Record<string, Tribu>

export function getTribu(id: string): Tribu | null {
  return tribus[id] ?? null
}

export function listTribus(): Tribu[] {
  return Object.values(tribus)
}

const subscribers = new Set<(e: PayoutEvent) => void>()

export function subscribe(fn: (e: PayoutEvent) => void) {
  subscribers.add(fn)
  return () => {
    subscribers.delete(fn)
  }
}

export function publishPayout(tribu: Tribu, query: string) {
  const event: PayoutEvent = {
    ts: Date.now(),
    tribuId: tribu.id,
    tribuName: tribu.name,
    totalSats: tribu.pricePerCallSats,
    query,
    splits: tribu.splits.map((s) => ({
      wallet: s.wallet,
      role: s.role,
      sats: Math.round(tribu.pricePerCallSats * s.pct),
    })),
  }
  for (const fn of subscribers) fn(event)
  return event
}
