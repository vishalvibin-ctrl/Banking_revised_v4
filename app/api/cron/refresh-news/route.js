// /api/cron/refresh-news — runs daily at 7am Dubai (3am UTC)
// Triggered by Vercel cron config in vercel.json
// Calls Anthropic API server-side and stores result in cache
// Also accessible manually with admin key for force refresh

import { newsCache } from '../../_cache.js'

export async function GET(request) {
  // Auth: either Vercel cron header OR admin key
  const cronSecret = request.headers.get('authorization')
  const url = new URL(request.url)
  const adminKey = url.searchParams.get('admin')

  const isVercelCron = cronSecret === `Bearer ${process.env.CRON_SECRET}`
  const isAdmin = adminKey && adminKey === process.env.ADMIN_KEY

  if (!isVercelCron && !isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'ANTHROPIC_API_KEY not configured in Vercel environment variables' }, { status: 500 })
  }

  try {
    const today = new Date().toISOString().split('T')[0]
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 1500,
        tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 1 }],
        messages: [{
          role: 'user',
          content: `Search once for "UAE banks ${today.slice(0,7)} earnings news" then return ONLY a JSON array of 8 latest UAE banking headlines.

Each item: {"title": "...", "source": "...", "date": "Apr 24, 2026", "dateSort": "2026-04-24", "summary": "one sentence", "category": "Banking|Markets|Regulation|Digital|Islamic Finance|Economy"}

Sort newest first. Output ONLY the JSON array, no markdown, no preamble. Start with [ and end with ].`
        }]
      })
    })

    if (!res.ok) {
      const errorText = await res.text()
      return Response.json({ error: `Anthropic API ${res.status}`, detail: errorText.slice(0, 500) }, { status: 500 })
    }

    const data = await res.json()
    const text = data.content?.filter(c => c.type === 'text').map(c => c.text).join('').replace(/```json|```/g, '').trim()

    if (!text) {
      return Response.json({ error: 'Empty response from Anthropic' }, { status: 500 })
    }

    let items
    try {
      items = JSON.parse(text)
    } catch (e) {
      return Response.json({ error: 'Failed to parse JSON', raw: text.slice(0, 500) }, { status: 500 })
    }

    if (!Array.isArray(items) || items.length === 0) {
      return Response.json({ error: 'No items returned' }, { status: 500 })
    }

    // Sort by date descending
    items.sort((a, b) => new Date(b.dateSort || b.date) - new Date(a.dateSort || a.date))

    const result = newsCache.set(items, isAdmin ? 'admin-refresh' : 'cron')
    return Response.json({
      success: true,
      itemCount: items.length,
      fetchedAt: result.fetchedAt,
      source: result.source,
    })
  } catch (err) {
    return Response.json({ error: err.message || 'Unknown error' }, { status: 500 })
  }
}
