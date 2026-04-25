// /api/news — returns cached news for users
// Updated by /api/cron/refresh-news daily at 7am Dubai
// Falls back to bundled headlines if cache empty

import { newsCache } from '../_cache.js'

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

export async function GET() {
  const cached = newsCache.get()
  const data = cached.items.length > 0 ? cached : { items: FALLBACK_NEWS, fetchedAt: null, source: 'fallback' }
  return Response.json(data, {
    headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' }
  })
}
