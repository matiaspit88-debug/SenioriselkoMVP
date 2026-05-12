// SenioriSelko — Cloudflare Worker CORS proxy for Anthropic API
// Deploy: wrangler deploy
// Secret: wrangler secret put ANTHROPIC_API_KEY

const ALLOWED_ORIGINS = [
  'https://matiaspit88-debug.github.io',
  'http://localhost:5173',
  'http://localhost:4173',
]

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''
    const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]

    const corsHeaders = {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders })
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 })
    }

    let body
    try {
      body = await request.json()
    } catch {
      return new Response('Invalid JSON', { status: 400 })
    }

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await resp.json()
    return new Response(JSON.stringify(data), {
      status: resp.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  },
}
