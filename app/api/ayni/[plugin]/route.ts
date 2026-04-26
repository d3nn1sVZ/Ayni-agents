import { withPayment } from '@moneydevkit/nextjs/server'
import {
  getTribu,
  publishPayout,
  publishRequest,
  splitSats,
} from '@/lib/payouts'

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

  // Settled: payment arrived, payouts fan out to all contributors.
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
      splits: splitSats(tribu.pricePerCallSats, tribu.splits),
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
  const url = new URL(req.url)
  const match = url.pathname.match(/\/api\/ayni\/([^/]+)/)
  const pluginId = match?.[1]
  if (!pluginId) return 100
  const tribu = getTribu(pluginId)
  return tribu?.pricePerCallSats ?? 100
}

const paywalled = withPayment(
  {
    amount: priceFromRequest,
    currency: 'SAT',
  },
  handler,
)

// Outer wrapper: emit a "requested" event the moment a request hits, before
// the L402 paywall responds. The dashboard lights up immediately so the demo
// looks alive even before the agent pays. The "settled" event fires inside
// the inner handler once the L402 unlock succeeds.
export const GET = async (req: Request, ctx: RouteContext) => {
  const { plugin } = await ctx.params
  const tribu = getTribu(plugin)
  if (tribu) {
    const url = new URL(req.url)
    const query = url.searchParams.get('q')?.trim() ?? ''
    publishRequest(tribu, query)
  }
  return paywalled(req, ctx)
}
