// Re-export the canonical types from lib/payouts so components can import
// `@/lib/types` (the convention in the redesign) without us duplicating
// type definitions.

export type { Tribu, PayoutEvent, PayoutEventPhase } from './payouts'

// PayoutSplit was the inline split shape on PayoutEvent. Kept here so any
// component that imports it explicitly continues to work.
export type PayoutSplit = {
  wallet: string
  role: string
  sats: number
}

// Split is the percentage-based split on a Tribu. Same situation.
export type Split = {
  wallet: string
  role: string
  pct: number
}
