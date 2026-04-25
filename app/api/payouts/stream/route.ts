import { subscribe, type PayoutEvent } from '@/lib/payouts'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder()
      const send = (event: PayoutEvent) => {
        const data = `data: ${JSON.stringify(event)}\n\n`
        controller.enqueue(encoder.encode(data))
      }
      const unsubscribe = subscribe(send)
      // Keep-alive ping every 25s so proxies don't close the stream.
      const ping = setInterval(() => {
        controller.enqueue(encoder.encode(': ping\n\n'))
      }, 25_000)
      const close = () => {
        clearInterval(ping)
        unsubscribe()
        try {
          controller.close()
        } catch {}
      }
      ;(controller as unknown as { _close?: () => void })._close = close
    },
    cancel() {
      const c = this as unknown as { _close?: () => void }
      c._close?.()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
