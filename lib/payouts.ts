// In-memory event bus for the payout dashboard.
//
// Events come in two phases so the demo can show the full lifecycle:
//   "requested" — an agent hit the L402 endpoint and got a 402 invoice back.
//                  Lights up the dashboard immediately, even before payment.
//   "settled"   — the agent paid the invoice and unlocked the response.
//                  This is the money-shot: payouts fan out to N contributors.
//
// For the hackathon MVP, the onward Lightning sends to N contributor wallets
// are visualized in real time but not yet executed on-chain. Wiring real
// onward payouts is the next milestone — see docs/DESIGN.md.

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

export type PayoutEventPhase = 'requested' | 'settled'

export type PayoutEvent = {
  id: string
  ts: number
  phase: PayoutEventPhase
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

function makeEvent(
  tribu: Tribu,
  query: string,
  phase: PayoutEventPhase,
): PayoutEvent {
  return {
    id: `${tribu.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ts: Date.now(),
    phase,
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
}

export function publishRequest(tribu: Tribu, query: string) {
  const event = makeEvent(tribu, query, 'requested')
  for (const fn of subscribers) fn(event)
  return event
}

export function publishPayout(tribu: Tribu, query: string) {
  const event = makeEvent(tribu, query, 'settled')
  for (const fn of subscribers) fn(event)
  return event
}
