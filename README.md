# UAE Banking Intelligence Hub

A research-grade banking intelligence app covering 60 UAE banks with FY 2025 results and Q1 2026 interim data. Built with Next.js 14, deployed on Vercel.

**Developed by Vishal Vibin · Beta v2.0**

---

## What's inside

- **Financials tab** — FY 2025 / Q1 2026 toggle, Earnings, Balance Sheet, Asset Quality views
- **Directory tab** — All 60 CBUAE-licensed banks with Retail vs Corporate loan splits
- **News tab** — Live news fetch with cached fallback (date-sorted)
- **Compare tab** — 43 credit cards across 14 banks (Free/Paid + 8 benefit filters), plus product comparison for savings, loans, auto finance
- **Audit tab** — FY 2025 vs Q1 2026 side-by-side metric verification, CSV export, IR page links

---

## Deploy to Vercel

### Option 1: New repo (cleanest)

1. Create a new GitHub repo (e.g., `uae-banking-hub`)
2. Upload all files in this folder to the repo (preserve folder structure)
3. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
4. Vercel auto-detects Next.js — click **Deploy**
5. Live in ~60 seconds at `https://your-project.vercel.app`

### Option 2: Replace existing repo files

If you already have the app on GitHub, replace these files (keeping your repo's folder structure):

- `components/BankingHub.js`
- `data/banks.js`
- `data/cards.js`
- `app/layout.js` (if missing the `viewport` export)
- `app/page.js`
- `next.config.js` (if missing `eslint.ignoreDuringBuilds`)

Commit and push. Vercel will auto-rebuild.

---

## Folder structure

```
uae-banking-hub/
├── app/
│   ├── globals.css
│   ├── layout.js          # Metadata + viewport
│   └── page.js            # Imports BankingHub
├── components/
│   └── BankingHub.js      # Main app (880 lines)
├── data/
│   ├── banks.js           # 60 banks database
│   └── cards.js           # 43 credit cards
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── .gitignore
```

---

## How to update data

When new bank results come out (typically quarterly):

1. Open `data/banks.js` on GitHub
2. Click the pencil (✏️) icon to edit
3. Find the bank (e.g., search for `"dib"`)
4. Update the relevant fields:
   - For new quarterly results: `q1Profit`, `q1Assets`, `q1Deposits`, `q1Loans`, `q1Npl`, `q1Coverage`, `q1Impairment`, `q1OpIncome`, `q1ProfitPrior`
   - Change `q1Status:"pending"` to `q1Status:"reported"`
   - Update `q1Period` and `q1Source`
5. Commit changes
6. Vercel auto-deploys in ~60 seconds

You can also use the **Audit tab → "↓ Export CSV"** to download all data, edit in Excel, and have the data file regenerated.

---

## News refresh

The News tab uses Anthropic's API client-side. On Vercel, this typically falls back to cached headlines unless you configure a server-side API route with an `ANTHROPIC_API_KEY` env variable. The cached headlines (13 items, all FY 2025 results) are date-sorted and update whenever you edit `BankingHub.js`.

---

## Tech stack

- **Next.js 14.2.15** (App Router)
- **React 18.3.1**
- **Tailwind CSS 3.4** (configured but most styles are inline for portability)
- **Vercel** for hosting

---

## Status confidence labels

Every bank metric carries one of four labels:

- 🟢 **Reported** — directly from filings
- 🔵 **Derived** — calculated (e.g., NPL Amount = Loans × NPL%)
- 🟡 **Estimated** — extrapolated from partial data
- 🟣 **Indicative** — subject to change (mostly product features)

---

## Q1 2026 status (as of Apr 25, 2026)

**Reported (8 banks):** Emirates NBD, FAB, ADCB, RAKBANK, CBD, Emirates Islamic, SIB, UAB

**Pending (14 banks):** DIB, ADIB, Mashreq, NBF, Bank of Sharjah, CBI, NBQ, InvestBank, ABIT, EIB, Ajman, Al Hilal, Wio, Zand

**Foreign banks (38):** UAE-specific quarterly figures not disclosed

---

© 2026 · Beta v2.0
