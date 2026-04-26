import { withPayment } from '@moneydevkit/nextjs/server'
import { getTribu, publishPayout } from '@/lib/payouts'

// Lightning node and L402 token verification both need full Node APIs.
export const runtime = 'nodejs'
// MDK spins up an embedded Lightning node on cold start (~2s), so allow more
// than the default 10s on Vercel hobby. 60s covers cold starts comfortably.
export const maxDuration = 60

type RouteContext = { params: Promise<{ plugin: string }> }

const handler = async (req: Request, ctx: RouteContext) => {
  const { plugin } = await ctx.params
  const tribu = getTribu(plugin)
  if (!tribu) {
    return Response.json(
      { error: 'tribu_not_found', plugin },
      { status: 404 },
    )
  }

  const url = new URL(req.url)
  const query = url.searchParams.get('q')?.trim() ?? ''
  const knowledgeKey = pickKnowledgeKey(query, tribu)
  const answer = tribu.knowledge[knowledgeKey] ?? tribu.knowledge.default

  // Publish the payout split to the live dashboard. Real onward Lightning
  // sends to contributor wallets are the next milestone; today we surface
  // the split so the demo can show "money fanning out to N humans" in real time.
  publishPayout(tribu, query)

  return Response.json({
    tribu: {
      id: tribu.id,
      name: tribu.name,
    },
    query,
    answer,
    matchedKey: knowledgeKey,
    ayni: {
      paid: tribu.pricePerCallSats,
      currency: 'SAT',
      splits: tribu.splits.map((s) => ({
        wallet: s.wallet,
        role: s.role,
        sats: Math.round(tribu.pricePerCallSats * s.pct),
      })),
    },
  })
}

function pickKnowledgeKey(query: string, tribu: ReturnType<typeof getTribu>): string {
  if (!tribu) return 'default'
  const q = query.toLowerCase()
  // Naive keyword match against knowledge keys. Good enough for hackathon demo.
  for (const key of Object.keys(tribu.knowledge)) {
    if (key === 'default') continue
    if (q.includes(key)) return key
  }
  return 'default'
}

// Pricing pulled from the tribu config so each plugin can charge its own rate.
async function priceFromRequest(req: Request): Promise<number> {
  // The route param isn't easily accessible from the price function in MDK's
  // current wrapper, so we re-parse the URL. Same answer either way.
  const url = new URL(req.url)
  const match = url.pathname.match(/\/api\/ayni\/([^/]+)/)
  const pluginId = match?.[1]
  if (!pluginId) return 100
  const tribu = getTribu(pluginId)
  return tribu?.pricePerCallSats ?? 100
}

export const GET = withPayment(
  {
    amount: priceFromRequest,
    currency: 'SAT',
  },
  handler,
)
