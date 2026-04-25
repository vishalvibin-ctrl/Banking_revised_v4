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
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{
          role: 'user',
          content: `Search for the latest UAE banking and finance news as of today (${today}). Focus on bank earnings (especially Q1 2026 results currently being reported), regulatory changes, M&A, sukuk issuances, digital banking developments, and major UAE banking sector news.

Return ONLY a JSON array of exactly 12 news items, sorted by date descending (newest first). Each item must have:
- "title" (string, headline)
- "source" (string, e.g. "The National", "Zawya", "Khaleej Times", "Gulf News")
- "date" (string, display format like "Apr 24, 2026")
- "dateSort" (ISO date string like "2026-04-24")
- "summary" (1 concise sentence about the story)
- "category" (one of: Banking, Markets, Regulation, Digital, Islamic Finance, Economy)

Output ONLY the JSON array. No markdown code fences, no preamble, no explanation. Start directly with [ and end with ].`
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
