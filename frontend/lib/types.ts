export type Split = {
  wallet: string
  role: string
  pct: number
}

export type Tribu = {
  id: string
  name: string
  category: string
  description: string
  longDescription: string
  rating: number
  totalRatings: number
  consultas: number
  pricePerCallSats: number
  responseTime: string
  tags: string[]
  splits: Split[]
  isActive: boolean
  verified: boolean
}

export type PayoutSplit = {
  wallet: string
  role: string
  sats: number
}

export type PayoutEvent = {
  id: string
  ts: number
  phase: 'requested' | 'settled' | 'failed'
  tribuId: string
  tribuName: string
  category: string
  totalSats: number
  query: string
  splits: PayoutSplit[]
  agentId: string
}
