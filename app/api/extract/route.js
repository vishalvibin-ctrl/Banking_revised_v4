// /api/extract — extract banking data from press release text using Claude
// Admin-only (requires ADMIN_KEY)
// Returns structured fields ready to paste into banks.js

export async function POST(request) {
  const url = new URL(request.url)
  const adminKey = url.searchParams.get('admin') || request.headers.get('x-admin-key')

  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    return Response.json({ error: 'Unauthorized — admin key required' }, { status: 401 })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 })
  }

  let body
  try {
    body = await request.json()
  } catch (e) {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { bankId, bankName, period, pressRelease } = body

  if (!bankId || !pressRelease || !period) {
    return Response.json({ error: 'Missing fields: bankId, period, pressRelease are required' }, { status: 400 })
  }

  if (pressRelease.length > 50000) {
    return Response.json({ error: 'Press release too long (max 50,000 chars)' }, { status: 400 })
  }

  const periodLabels = {
    fy2025: 'Full Year 2025 (FY 2025)',
    fy2026: 'Full Year 2026 (FY 2026)',
    q1_2026: 'Q1 2026 (first quarter, three months ended 31 March 2026)',
    q2_2026: 'Q2 2026 / H1 2026 (six months ended 30 June 2026)',
    q3_2026: 'Q3 2026 / 9M 2026 (nine months ended 30 September 2026)',
    q1_2025: 'Q1 2025',
  }

  const periodLabel = periodLabels[period] || period

  const fieldNames = period.startsWith('q1_') || period.startsWith('q2_') || period.startsWith('q3_')
    ? `q1Profit, q1Assets, q1Deposits, q1Loans, q1Npl, q1Coverage, q1Impairment, q1OpIncome, q1ProfitPrior`
    : `profit2025, profit2024, totalAssets, customerDeposits, totalEquity, grossLoans, retailLoans, corpLoans, nplRatio, nplPrior, coverageRatio, impairmentCharge, operatingIncome, yoyGrowth, roe`

  const prompt = `You are extracting banking financial data from a UAE bank press release.

BANK: ${bankName || bankId}
PERIOD: ${periodLabel}

INSTRUCTIONS:
1. Read the press release text carefully
2. Extract numerical data with these RULES:
   - All AED amounts must be converted to BILLIONS (AED B). Example: "AED 5,400 million" → 5.4
   - For percentages: just the number (e.g., 2.4 not "2.4%")
   - If a figure is NOT clearly stated, use null
   - Do NOT estimate or guess — only extract what is explicitly stated
3. Return ONLY a JSON object with these fields (use null for any missing fields):

${period.startsWith('q1_') || period.startsWith('q2_') || period.startsWith('q3_') ? `
For QUARTERLY data, return:
{
  "q1Profit": <net profit AFTER tax in AED B>,
  "q1ProfitPrior": <same quarter previous year profit in AED B, for YoY comparison>,
  "q1Assets": <total assets at period end in AED B>,
  "q1Deposits": <customer deposits in AED B>,
  "q1Loans": <gross loans in AED B>,
  "q1Npl": <NPL ratio as percentage number>,
  "q1Coverage": <provision coverage ratio as percentage number>,
  "q1Impairment": <impairment charge in AED B>,
  "q1OpIncome": <total operating income in AED B>,
  "q1Period": "Q1 2026 reported",
  "q1Source": "<short citation of the press release>",
  "q1Status": "reported",
  "_notes": "<any caveats or things you couldn't extract>"
}
` : `
For ANNUAL data, return:
{
  "profit2025": <net profit AFTER tax for the full year in AED B>,
  "profit2024": <prior year net profit if mentioned, in AED B>,
  "totalAssets": <total assets at year-end in AED B>,
  "customerDeposits": <customer deposits in AED B>,
  "totalEquity": <total equity in AED B>,
  "grossLoans": <gross loans in AED B>,
  "retailLoans": <retail loans in AED B if disclosed>,
  "corpLoans": <corporate/wholesale loans in AED B if disclosed>,
  "nplRatio": <NPL ratio as percentage number>,
  "nplPrior": <prior year NPL ratio as percentage number>,
  "coverageRatio": <provision coverage ratio as percentage number>,
  "impairmentCharge": <impairment charge in AED B>,
  "operatingIncome": <total operating income in AED B>,
  "yoyGrowth": <YoY profit growth as percentage>,
  "roe": <return on equity as percentage>,
  "period": "FY2025 audited",
  "sourceNote": "<short citation>",
  "status": "reported",
  "_notes": "<any caveats>"
}
`}

CRITICAL: Output ONLY the JSON object. No markdown code fences, no preamble, no explanation. Start with { and end with }.

PRESS RELEASE TEXT:
"""
${pressRelease}
"""`

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }]
      })
    })

    if (!res.ok) {
      const errText = await res.text()
      return Response.json({ error: `Anthropic API ${res.status}`, detail: errText.slice(0, 500) }, { status: 500 })
    }

    const data = await res.json()
    const text = data.content?.filter(c => c.type === 'text').map(c => c.text).join('').replace(/```json|```/g, '').trim()

    if (!text) {
      return Response.json({ error: 'Empty response from Claude' }, { status: 500 })
    }

    let extracted
    try {
      extracted = JSON.parse(text)
    } catch (e) {
      return Response.json({ error: 'Failed to parse JSON from Claude', raw: text.slice(0, 500) }, { status: 500 })
    }

    // Build the snippet to paste into banks.js
    const snippet = buildSnippet(bankId, extracted, period)

    return Response.json({
      success: true,
      bankId,
      period,
      extracted,
      snippet,
      cost: '~$0.005 per extraction',
    })
  } catch (err) {
    return Response.json({ error: err.message || 'Unknown error' }, { status: 500 })
  }
}

function buildSnippet(bankId, data, period) {
  const isQuarterly = period.startsWith('q1_') || period.startsWith('q2_') || period.startsWith('q3_')

  if (isQuarterly) {
    const fields = ['q1Profit', 'q1Assets', 'q1Deposits', 'q1Loans', 'q1Npl', 'q1Coverage', 'q1Impairment', 'q1OpIncome', 'q1ProfitPrior']
    const parts = fields
      .filter(f => data[f] !== null && data[f] !== undefined)
      .map(f => `${f}:${data[f]}`)
      .join(', ')
    const period_str = data.q1Period ? `, q1Period:"${data.q1Period}"` : ''
    const source_str = data.q1Source ? `, q1Source:"${data.q1Source.replace(/"/g, '\\"')}"` : ''
    return `${parts}, q1Status:"reported"${period_str}${source_str}`
  } else {
    const fields = ['profit2025', 'profit2024', 'totalAssets', 'customerDeposits', 'totalEquity', 'grossLoans', 'retailLoans', 'corpLoans', 'nplRatio', 'nplPrior', 'coverageRatio', 'impairmentCharge', 'operatingIncome', 'yoyGrowth', 'roe']
    const parts = fields
      .filter(f => data[f] !== null && data[f] !== undefined)
      .map(f => `${f}:${data[f]}`)
      .join(', ')
    const period_str = data.period ? `, period:"${data.period}"` : ''
    const source_str = data.sourceNote ? `, sourceNote:"${data.sourceNote.replace(/"/g, '\\"')}"` : ''
    return `${parts}, status:"reported"${period_str}${source_str}`
  }
}
