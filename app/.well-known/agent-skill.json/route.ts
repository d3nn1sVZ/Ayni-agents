import { listTribus, splitSats } from '@/lib/payouts'

// Public agent-discovery manifest. Designed to be read by AI agents and
// crawlers (402index.io, agentic.market, etc.) and by humans peeking at
// /.well-known/agent-skill.json. Self-contained: an agent can read this once
// and know everything it needs to call the API and pay autonomously.

export const dynamic = 'force-static'
export const revalidate = 60

export async function GET() {
  const tribus = listTribus()

  const manifest = {
    name: 'AyniAgents',
    version: '0.1.0',
    summary:
      'Lightning-paid plugins where AI agents pay tribes of human contributors per call. Each payment fans out to all contributors in the same second — programmable ayni for the agent economy.',
    homepage: 'https://ayniw.com',
    repo: 'https://github.com/d3nn1sVZ/Ayni-agents',
    contact: {
      maintainer: 'AyniAgents team — Hack Nation 5 / Spiral Challenge 02',
    },
    payment: {
      scheme: 'L402',
      spec: 'https://docs.lightning.engineering/the-lightning-network/l402',
      rail: 'Lightning Network (Bitcoin mainnet)',
      currency: 'SAT',
      flow: [
        'GET endpoint without Authorization → 402 Payment Required + Lightning invoice + macaroon',
        'pay invoice via any Lightning wallet (Phoenix, Alby, Strike, MDK agent-wallet, etc.)',
        'retry GET with header `Authorization: L402 <macaroon>:<preimage>` → 200 OK + plugin response',
      ],
      verification: 'sha256(preimage) === paymentHash from macaroon',
    },
    redistribution: {
      model: 'collective',
      description:
        "Each call's payment is automatically split among the tribu's human contributors per the splits configured in this manifest. Lightning makes sub-cent fan-out economically viable; traditional rails (Stripe, etc.) cannot do this because per-tx fees exceed the per-recipient amount.",
    },
    skills: tribus.map((tribu) => ({
      id: tribu.id,
      name: tribu.name,
      description: tribu.description,
      endpoint: {
        method: 'GET',
        url: `https://ayniw.com/api/ayni/${tribu.id}`,
        params: {
          q: 'string — the query the agent wants answered, free-text natural language',
        },
      },
      pricing: {
        amount: tribu.pricePerCallSats,
        currency: 'SAT',
      },
      contributors: tribu.splits.map((s) => ({
        wallet: s.wallet,
        role: s.role,
        sharePct: Math.round(s.pct * 1000) / 10,
      })),
      splitExample: splitSats(tribu.pricePerCallSats, tribu.splits),
      stats: {
        rating: tribu.rating,
        consultas: tribu.consultas,
      },
      example: {
        request: {
          method: 'GET',
          url: `https://ayniw.com/api/ayni/${tribu.id}?q=${encodeURIComponent('¿qué es el IGV?')}`,
        },
        unauthenticatedResponse: {
          status: 402,
          headers: {
            'WWW-Authenticate':
              'L402 macaroon="<base64>" invoice="lnbc..."',
          },
          body: {
            error: { code: 'payment_required', message: 'Payment required' },
            macaroon: '<base64-encoded macaroon>',
            invoice: 'lnbc1u1p... (real BOLT11 Lightning invoice)',
            paymentHash: '<hex>',
            amountSats: tribu.pricePerCallSats,
            expiresAt: '<unix-epoch-seconds>',
          },
        },
        authenticatedResponse: {
          status: 200,
          body: {
            tribu: { id: tribu.id, name: tribu.name },
            query: '¿qué es el IGV?',
            answer: '<the expert response from this tribu>',
            ayni: {
              paid: tribu.pricePerCallSats,
              currency: 'SAT',
              splits: splitSats(tribu.pricePerCallSats, tribu.splits),
            },
          },
        },
      },
    })),
    quickstart_for_agents: {
      mdk_agent_wallet: {
        description:
          'Agents can pay this API autonomously using MDK agent-wallet. No human in the loop.',
        steps: [
          'npx @moneydevkit/agent-wallet@latest init  # generates Lightning wallet',
          'npx @moneydevkit/agent-wallet@latest start --daemon',
          'npx @moneydevkit/agent-wallet@latest receive 200  # get funded by anyone',
          'curl https://ayniw.com/api/ayni/tributario-pe?q=igv  # 402 returned',
          'extract invoice + macaroon from response',
          'npx @moneydevkit/agent-wallet@latest send <invoice>  # returns preimage',
          'curl -H "Authorization: L402 <macaroon>:<preimage>" <same url>  # 200 OK',
        ],
        docs: 'https://docs.moneydevkit.com/agent-wallet',
      },
    },
    why_lightning_not_stablecoins: [
      'Lightning is open infrastructure, no single company sets fees or can freeze funds',
      'Payments are private by default, no public on-chain trace tied to a wallet',
      'Sub-cent fees make per-call micropayments economically possible',
      'Permissionless: any agent can transact without account approval or KYC',
    ],
    discovery: {
      crawlable: true,
      indexes: [
        'submitted to https://402index.io',
        'aligned with https://docs.moneydevkit.com',
      ],
      cors: 'public, no auth required to read this manifest',
    },
  }

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=60, s-maxage=60',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
