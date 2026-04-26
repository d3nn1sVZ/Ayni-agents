// Alias for /llms.txt (the canonical llmstxt.org name is plural). Some agents
// guess the singular form, so we 301 them to the real document.

export function GET() {
  return Response.redirect('https://ayniw.com/llms.txt', 301)
}
