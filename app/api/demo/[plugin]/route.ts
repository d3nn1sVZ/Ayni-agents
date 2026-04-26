import { getTribu, publishPayout, publishRequest } from '@/lib/payouts'

// Demo trigger: simulates the full L402 lifecycle without requiring a real
// Lightning payment. Used as the dashboard's "Trigger demo payout" button
// and as a backup if real Lightning has issues during the live demo.
//
// This endpoint is for demo-only payouts. The visualization is identical to
// real money flow; the difference is that no sats actually move on-chain.
// Real onward Lightning sends to N contributor wallets are the next milestone.

export const runtime = 'nodejs'

type RouteContext = { params: Promise<{ plugin: string }> }

const DEMO_QUERIES: Record<string, string[]> = {
  'tributario-pe': [
    'What is the IGV (Peruvian VAT) rate?',
    'How are 4th-category (independent worker) earnings taxed in Peru?',
    'What is the NRUS monthly cap for small Peruvian businesses?',
    'Tax rates for 5th-category (employee) income in Peru?',
    'When does a Peruvian freelancer have to register for RER?',
  ],
  'data-science-es': [
    'Best Spanish-language NER model for legal documents?',
    'Open dataset of Spanish-language consumer reviews?',
    'How to fine-tune a multilingual model for Latin American Spanish?',
  ],
}

export async function POST(_req: Request, ctx: RouteContext) {
  const { plugin } = await ctx.params
  const tribu = getTribu(plugin)
  if (!tribu) {
    return Response.json({ error: 'tribu_not_found', plugin }, { status: 404 })
  }

  const queries = DEMO_QUERIES[plugin] ?? ['(consulta de demostración)']
  const query = queries[Math.floor(Math.random() * queries.length)]!

  // Phase 1: agent's call lands on the L402 endpoint.
  publishRequest(tribu, query)

  // Pause for visual effect — the dashboard animates "incoming request"
  // before showing the redistribution. ~1.6s mimics realistic Lightning
  // payment latency (invoice mint + payment + settlement).
  await new Promise((resolve) => setTimeout(resolve, 1600))

  // Phase 2: payment settled, payouts fan out to all contributors.
  publishPayout(tribu, query)

  return Response.json({ ok: true, tribu: tribu.id, query })
}
