// /api/news — fetches latest UAE banking news from Anthropic
// Uses Vercel CDN caching: results cached for 24 hours
// Force-refreshable via ?force=1 with admin key
// Falls back to bundled headlines if API fails

const FALLBACK_NEWS = [
  { title: 'Wio Bank to launch Islamic banking platform after 57% profit jump', source: 'The National', date: 'Mar 17, 2026', dateSort: '2026-03-17', summary: 'Customer deposits climbed 66% to AED 57B, on track for AED 100B assets.', category: 'Digital' },
  { title: 'Bank of Sharjah profit surges 89% to AED 729M in FY 2025', source: 'Sharjah24', date: 'Mar 17, 2026', dateSort: '2026-03-17', summary: 'Transformation continues with diversified income and improved asset quality.', category: 'Banking' },
  { title: 'Ajman Bank approves 50% dividend after record AED 548M profit before tax', source: 'Zawya', date: 'Mar 5, 2026', dateSort: '2026-03-05', summary: 'Total assets grew 44% to AED 32.9B; debut $500M Sukuk 5.4x oversubscribed.', category: 'Islamic Finance' },
  { title: 'UAE banks set for strong 2026 as profits and lending surge fuel outlook', source: 'Khaleej Times', date: 'Feb 8, 2026', dateSort: '2026-02-08', summary: 'Total banking sector assets climbed 18.1% YoY by Sep 2025 on robust lending.', category: 'Economy' },
  { title: 'Mashreq achieves AED 7.0B net profit after tax in 2025', source: 'Gulf News', date: 'Feb 2, 2026', dateSort: '2026-02-02', summary: 'Total assets rose 25% to AED 335B with record 32% loan growth and 20% ROE.', category: 'Banking' },
  { title: 'ADCB reports AED 11.4B net profit, 18 consecutive quarters of PBT growth', source: 'Business Today ME', date: 'Jan 30, 2026', dateSort: '2026-01-30', summary: 'Total assets AED 774B with cost-to-income ratio improving to 28.2%.', category: 'Banking' },
  { title: 'First Abu Dhabi Bank posts 24% surge in 2025 net profit to AED 21.1B', source: 'The National', date: 'Jan 28, 2026', dateSort: '2026-01-28', summary: 'Highest cash dividend in FAB history at 80 fils per share recommended.', category: 'Banking' },
  { title: 'RAKBANK FY 2025 net profit rises 26% to AED 2.6 billion', source: 'Zawya', date: 'Jan 28, 2026', dateSort: '2026-01-28', summary: 'Non-interest income rose 29% to AED 1.5B with impairment charges falling 42%.', category: 'Banking' },
  { title: 'NBF net profit after tax surges 42% to record AED 1.2 billion', source: 'NBF', date: 'Jan 28, 2026', dateSort: '2026-01-28', summary: 'Operating profit hit AED 1.9B with cost-to-income improving to 29.5%.', category: 'Banking' },
  { title: 'Emirates NBD delivers record AED 29.8B profit before tax for FY 2025', source: 'Emirates NBD', date: 'Jan 27, 2026', dateSort: '2026-01-27', summary: 'Total assets exceeded AED 1 trillion with lending growth of AED 129B.', category: 'Banking' },
  { title: 'ADIB posts record AED 7.1B net profit with industry-leading 29% ROE', source: 'TradeArabia', date: 'Jan 26, 2026', dateSort: '2026-01-26', summary: 'Non-performing asset ratio fell to record low of 2.8% for the bank.', category: 'Islamic Finance' },
  { title: 'CBI achieves record AED 311M pre-tax profit with 40% growth', source: 'MarketScreener', date: 'Jan 26, 2026', dateSort: '2026-01-26', summary: 'Strongest annual performance ever reflecting successful balance sheet optimization.', category: 'Banking' },
  { title: 'Sharjah Islamic Bank achieves AED 1.32B net profit with 26% growth', source: 'Al Bawaba', date: 'Jan 23, 2026', dateSort: '2026-01-23', summary: 'Proposes 20% higher cash dividends and capital increase for shareholders.', category: 'Islamic Finance' },
]

export const runtime = 'nodejs'
// Revalidate every 24 hours
export const revalidate = 86400

async function fetchNewsFromClaude() {
  if (!process.env.ANTHROPIC_API_KEY) return null
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
          content: `Search once for "UAE banks ${today.slice(0,7)} earnings news" then return ONLY a JSON array of 8 latest UAE banking headlines.\n\nEach item: {"title": "...", "source": "...", "date": "Apr 24, 2026", "dateSort": "2026-04-24", "summary": "one sentence", "category": "Banking|Markets|Regulation|Digital|Islamic Finance|Economy"}\n\nSort newest first. Output ONLY the JSON array, no markdown, no preamble. Start with [ and end with ].`
        }]
      })
    })
    if (!res.ok) return null
    const data = await res.json()
    const text = data.content?.filter(c => c.type === 'text').map(c => c.text).join('').replace(/```json|```/g, '').trim()
    if (!text) return null
    const items = JSON.parse(text)
    if (!Array.isArray(items) || items.length === 0) return null
    items.sort((a, b) => new Date(b.dateSort || b.date) - new Date(a.dateSort || a.date))
    return items
  } catch (err) {
    console.error('News fetch error:', err.message)
    return null
  }
}

export async function GET(request) {
  const url = new URL(request.url)
  const forceRefresh = url.searchParams.get('force') === '1'
  const adminKey = url.searchParams.get('admin')
  const isAdmin = adminKey && adminKey === process.env.ADMIN_KEY
  const allowForce = forceRefresh && isAdmin

  const items = await fetchNewsFromClaude()

  if (items) {
    return Response.json({
      items,
      fetchedAt: new Date().toISOString(),
      source: allowForce ? 'admin-refresh' : 'live',
    }, {
      headers: {
        'Cache-Control': allowForce
          ? 'no-cache, no-store, must-revalidate'
          : 'public, s-maxage=86400, stale-while-revalidate=3600',
      }
    })
  }

  return Response.json({
    items: FALLBACK_NEWS,
    fetchedAt: null,
    source: 'fallback',
  }, { headers: { 'Cache-Control': 'public, s-maxage=300' } })
}
