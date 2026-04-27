'use client'
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react'
import { ALL_BANKS, PRODUCTS, CATEGORY_LABELS, CATEGORY_FILTERS, fmtProfit, STATUS_CONFIG } from '../data/banks'
import { CREDIT_CARDS as CARDS } from '../data/cards'

// ─── TINY UTILITIES ──────────────────────────────────────────────────────────

const Badge = ({ bank, size = 32 }) => (
  <div style={{ width:size, height:size, borderRadius:'50%', background:bank.color, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:size*0.28, color:'#fff', boxShadow:`0 2px 8px ${bank.color}33` }}>
    {bank.name.replace(/Bank of |Bank|Commercial /g,'').trim().split(' ')[0].slice(0,3).toUpperCase()}
  </div>
)

const StatusBadge = ({ status='reported', size='sm' }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.reported
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:3, padding:size==='sm'?'1px 5px':'2px 7px', borderRadius:4, background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}`, fontSize:size==='sm'?8.5:10, fontWeight:700, letterSpacing:'0.03em', textTransform:'uppercase' }}>
      <span style={{ fontSize:size==='sm'?9:10 }}>{cfg.icon}</span> {cfg.label}
    </span>
  )
}

const fmtAED = (v) => {
  if (v === 0 || v == null) return '—'
  const abs = Math.abs(v)
  const sign = v < 0 ? '-' : ''
  if (abs >= 1) return `${sign}AED ${abs.toFixed(abs >= 10 ? 1 : 2)}B`
  return `${sign}AED ${(abs * 1000).toFixed(0)}M`
}

// ─── SOURCE & METHODOLOGY DRAWER ─────────────────────────────────────────────

function MethodologyDrawer({ visible, onClose }) {
  if (!visible) return null
  return (
    <div style={{ position:'fixed', inset:0, zIndex:100, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(8px)', display:'flex', alignItems:'flex-end', justifyContent:'center' }} onClick={e => { if(e.target===e.currentTarget) onClose() }}>
      <div style={{ width:'100%', maxWidth:720, maxHeight:'90vh', background:'#0B1120', borderRadius:'24px 24px 0 0', padding:'20px 18px', display:'flex', flexDirection:'column', animation:'slideUp 0.3s ease', overflowY:'auto' }}>
        <div style={{ width:40, height:4, borderRadius:2, background:'#2A3448', margin:'0 auto 16px' }} />
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
          <div>
            <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:20, fontWeight:700, color:'#F0C850', marginBottom:6 }}>Source & Methodology</h2>
            <p style={{ fontSize:12, color:'#6B7A8D', lineHeight:1.6, maxWidth:560 }}>
              This platform aggregates UAE banking data from annual reports, quarterly statements, exchange filings, investor presentations, and curated market sources. Figures are shown on a best-effort basis for research, comparison, and market monitoring.
            </p>
          </div>
          <button onClick={onClose} style={{ width:30, height:30, borderRadius:8, border:'none', cursor:'pointer', background:'rgba(255,255,255,0.06)', color:'#8A96A8', fontSize:16, fontWeight:700, flexShrink:0 }}>✕</button>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:12, marginTop:8 }}>
          <div style={{ borderRadius:14, background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.05)', padding:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:'#F0C850', marginBottom:10, letterSpacing:'0.08em', textTransform:'uppercase' }}>✓ Confidence Labels</div>
            <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:11.5, color:'#A0A8B4', lineHeight:1.5 }}>
              <div><StatusBadge status="reported" /> Directly disclosed by the bank or official filing.</div>
              <div><StatusBadge status="derived" /> Calculated from disclosed figures (e.g., NPL amount = loans × NPL%).</div>
              <div><StatusBadge status="estimated" /> Inferred from partial-period disclosures. Directional only.</div>
              <div><StatusBadge status="indicative" /> Product features subject to change without notice.</div>
            </div>
          </div>

          <div style={{ borderRadius:14, background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.05)', padding:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:'#F0C850', marginBottom:10, letterSpacing:'0.08em', textTransform:'uppercase' }}>Σ Definitions</div>
            <div style={{ fontSize:11, color:'#A0A8B4', lineHeight:1.7 }}>
              <div><b style={{color:'#E0E6ED'}}>NPL Amount</b> = Gross Loans × NPL Ratio</div>
              <div><b style={{color:'#E0E6ED'}}>Coverage Ratio</b> = Provisions / NPLs</div>
              <div><b style={{color:'#E0E6ED'}}>ROA</b> = Net Profit / Total Assets</div>
              <div><b style={{color:'#E0E6ED'}}>Loan/Deposit</b> = Gross Loans / Customer Deposits</div>
              <div><b style={{color:'#E0E6ED'}}>Equity/Assets</b> = Total Equity / Total Assets</div>
              <div><b style={{color:'#E0E6ED'}}>Impairment/Income</b> = Impairment Charge / Operating Income</div>
            </div>
          </div>

          <div style={{ borderRadius:14, background:'rgba(245,158,11,0.05)', border:'1px solid rgba(245,158,11,0.15)', padding:14, gridColumn:'1 / -1' }}>
            <div style={{ fontSize:11, fontWeight:700, color:'#FBBF24', marginBottom:8, letterSpacing:'0.08em', textTransform:'uppercase' }}>⚠ Important Notice</div>
            <p style={{ fontSize:11.5, color:'#B0B8C4', lineHeight:1.7 }}>
              This app is designed for banking research, benchmarking, and market intelligence. Data may be reported, derived, estimated, or indicative depending on source availability. Users should verify important figures directly from the latest official bank disclosures before making financial, investment, or commercial decisions. Data last refreshed with FY 2025 annual filings (Jan–Mar 2026).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── ADD BANK DRAWER ─────────────────────────────────────────────────────────

function AddBankDrawer({ visible, activeBankIds, onToggle, onClose }) {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')
  const available = ALL_BANKS.filter(b => {
    const mQ = b.name.toLowerCase().includes(q.toLowerCase()) || b.type.toLowerCase().includes(q.toLowerCase()) || b.hq.toLowerCase().includes(q.toLowerCase()) || b.exchange.toLowerCase().includes(q.toLowerCase())
    const mF = filter === 'all' || (filter === 'national' && b.category === 'national') || (filter === 'foreign' && b.category === 'foreign') || (filter === 'foreign_wholesale' && b.category === 'foreign_wholesale') || (filter === 'digital' && b.category === 'digital') || (filter === 'islamic' && b.type === 'Islamic') || (filter === 'conventional' && b.type === 'Conventional')
    return mQ && mF
  })
  if (!visible) return null
  return (
    <div style={{ position:'fixed', inset:0, zIndex:100, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(6px)', display:'flex', alignItems:'flex-end', justifyContent:'center' }} onClick={e => { if(e.target===e.currentTarget) onClose() }}>
      <div style={{ width:'100%', maxWidth:520, maxHeight:'85vh', background:'#111827', borderRadius:'20px 20px 0 0', padding:'18px 16px', display:'flex', flexDirection:'column', animation:'slideUp 0.3s ease' }}>
        <div style={{ width:40, height:4, borderRadius:2, background:'#2A3448', margin:'0 auto 14px' }} />
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <h3 style={{ fontFamily:"'Fraunces',serif", fontSize:17, fontWeight:700, color:'#F0C850' }}>All UAE Banks ({ALL_BANKS.length})</h3>
          <button onClick={onClose} style={{ width:28, height:28, borderRadius:7, border:'none', cursor:'pointer', background:'rgba(255,255,255,0.06)', color:'#8A96A8', fontSize:15, fontWeight:700 }}>✕</button>
        </div>
        <div style={{ position:'relative', marginBottom:10 }}>
          <span style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', fontSize:14, color:'#4A5568' }}>🔍</span>
          <input type="text" placeholder="Search by name, type, HQ, exchange..." value={q} onChange={e=>setQ(e.target.value)} autoFocus style={{ width:'100%', padding:'10px 12px 10px 34px', borderRadius:9, border:'1px solid rgba(255,255,255,0.07)', background:'rgba(255,255,255,0.03)', fontFamily:"'Outfit',sans-serif", fontSize:12.5, color:'#E0E6ED', outline:'none' }} />
        </div>
        <div style={{ display:'flex', gap:4, marginBottom:12, overflowX:'auto' }}>
          {CATEGORY_FILTERS.map(f => (
            <button key={f.key} onClick={()=>setFilter(f.key)} style={{ padding:'5px 10px', borderRadius:6, border:'none', cursor:'pointer', whiteSpace:'nowrap', background:filter===f.key?'rgba(240,200,80,0.15)':'rgba(255,255,255,0.04)', color:filter===f.key?'#F0C850':'#5A6878', fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:10.5 }}>{f.label}</button>
          ))}
        </div>
        <div style={{ fontSize:10.5, color:'#3A4558', marginBottom:8 }}>{activeBankIds.length} active · {available.length} showing</div>
        <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:4 }}>
          {available.map(bank => {
            const active = activeBankIds.includes(bank.id)
            return (
              <div key={bank.id} onClick={()=>onToggle(bank.id)} style={{ display:'flex', alignItems:'center', gap:9, padding:'8px 10px', borderRadius:8, cursor:'pointer', background:active?`${bank.color}12`:'rgba(255,255,255,0.012)', border:active?`1px solid ${bank.color}40`:'1px solid rgba(255,255,255,0.025)' }}>
                <Badge bank={bank} size={26} />
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <span style={{ fontSize:12, fontWeight:600, color:'#E0E6ED' }}>{bank.name}</span>
                    <StatusBadge status={bank.status} />
                  </div>
                  <div style={{ fontSize:10, color:'#4A5568' }}>{bank.type} · {bank.hq} · {bank.exchange}</div>
                </div>
                <div style={{ width:22, height:22, borderRadius:5, background:active?bank.color:'rgba(255,255,255,0.04)', display:'flex', alignItems:'center', justifyContent:'center', color:active?'#fff':'#3A4558', fontSize:12, fontWeight:700 }}>{active?'✓':'+'}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── FINANCIALS TAB (replaces old Profits tab) ───────────────────────────────

const KpiCard = ({ label, value, sub }) => (
  <div style={{ flex:'1 1 160px', minWidth:140, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.05)', borderRadius:14, padding:'12px 14px' }}>
    <div style={{ fontSize:9.5, color:'#6B7A8D', textTransform:'uppercase', letterSpacing:'0.1em', fontWeight:600, marginBottom:6 }}>{label}</div>
    <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:18, fontWeight:800, color:'#F0C850', marginBottom:2 }}>{value}</div>
    <div style={{ fontSize:10, color:'#4A5568' }}>{sub}</div>
  </div>
)

const MetricTile = ({ label, value, status, highlight }) => (
  <div style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.04)', borderRadius:10, padding:'9px 11px' }}>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
      <span style={{ fontSize:9, color:'#5A6878', textTransform:'uppercase', letterSpacing:'0.1em', fontWeight:600 }}>{label}</span>
      {status && <StatusBadge status={status} />}
    </div>
    <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:14, fontWeight:700, color:highlight || '#E0E6ED' }}>{value}</div>
  </div>
)

function FinancialsTab({ activeBankIds, onOpenDrawer, onOpenMethodology }) {
  const [view, setView] = useState('earnings')
  const [sortBy, setSortBy] = useState('profit')
  const [period, setPeriod] = useState('fy2025') // 'fy2025' | 'q1_2026'

  // Helper to get period-specific values
  const getProfit = b => period === 'q1_2026' ? (b.q1Profit || 0) : (b.profit2025 || 0)
  const getAssets = b => period === 'q1_2026' ? (b.q1Assets || b.totalAssets || 0) : (b.totalAssets || 0)
  const getDeposits = b => period === 'q1_2026' ? (b.q1Deposits || b.customerDeposits || 0) : (b.customerDeposits || 0)
  const getNpl = b => period === 'q1_2026' ? (b.q1Npl || b.nplRatio || 0) : (b.nplRatio || 0)
  const getCoverage = b => period === 'q1_2026' ? (b.q1Coverage || b.coverageRatio || 0) : (b.coverageRatio || 0)
  const getLoans = b => period === 'q1_2026' ? (b.q1Loans || b.grossLoans || 0) : (b.grossLoans || 0)
  const getOpIncome = b => period === 'q1_2026' ? (b.q1OpIncome || b.operatingIncome || 0) : (b.operatingIncome || 0)
  const getImpairment = b => period === 'q1_2026' ? (b.q1Impairment || b.impairmentCharge || 0) : (b.impairmentCharge || 0)
  const getStatus = b => period === 'q1_2026' ? (b.q1Status || 'pending') : b.status

  // Filter banks based on period
  let banks
  if (period === 'q1_2026') {
    banks = ALL_BANKS.filter(b => activeBankIds.includes(b.id) && b.q1Status === 'reported')
  } else {
    banks = ALL_BANKS.filter(b => activeBankIds.includes(b.id) && (b.profit2025 !== 0 || b.note || b.totalAssets > 0) && b.totalAssets > 0)
  }

  // Pending banks (only shown in Q1 view)
  const pendingBanks = period === 'q1_2026' ? ALL_BANKS.filter(b => activeBankIds.includes(b.id) && b.q1Status === 'pending' && b.totalAssets > 0) : []

  const sorters = {
    profit: (a,b) => getProfit(b) - getProfit(a),
    assets: (a,b) => getAssets(b) - getAssets(a),
    roe:    (a,b) => b.roe - a.roe,
    npl:    (a,b) => getNpl(b) - getNpl(a),
    coverage: (a,b) => getCoverage(a) - getCoverage(b),
    deposits: (a,b) => getDeposits(b) - getDeposits(a),
  }
  const sorted = [...banks].sort(sorters[sortBy] || sorters.profit)

  const totals = {
    totalProfit: banks.reduce((s,b) => s + getProfit(b), 0),
    totalAssets: banks.reduce((s,b) => s + getAssets(b), 0),
    totalDeposits: banks.reduce((s,b) => s + getDeposits(b), 0),
    avgNpl: banks.length ? (banks.reduce((s,b) => s + (b.nplRatio || 0), 0) / banks.length).toFixed(2) : 0,
    avgRoe: banks.length ? (banks.reduce((s,b) => s + (b.roe || 0), 0) / banks.length).toFixed(1) : 0,
  }

  return (
    <div>
      {/* Period toggle: FY 2025 | Q1 2026 */}
      <div style={{ display:'flex', justifyContent:'center', marginBottom:14 }}>
        <div style={{ display:'flex', gap:4, background:'rgba(255,255,255,0.04)', borderRadius:100, padding:4, border:'1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={()=>setPeriod('fy2025')} style={{ padding:'8px 18px', border:'none', borderRadius:100, cursor:'pointer', background:period==='fy2025'?'#F0C850':'transparent', color:period==='fy2025'?'#0B1120':'#7A8699', fontFamily:"'Outfit',sans-serif", fontWeight:period==='fy2025'?700:500, fontSize:12 }}>FY 2025</button>
          <button onClick={()=>setPeriod('q1_2026')} style={{ padding:'8px 18px', border:'none', borderRadius:100, cursor:'pointer', background:period==='q1_2026'?'#F0C850':'transparent', color:period==='q1_2026'?'#0B1120':'#7A8699', fontFamily:"'Outfit',sans-serif", fontWeight:period==='q1_2026'?700:500, fontSize:12 }}>Q1 2026</button>
        </div>
      </div>

      {/* Q1 2026 banner */}
      {period === 'q1_2026' && (
        <div style={{ marginBottom:14, padding:'10px 14px', background:'linear-gradient(90deg, rgba(74,222,128,0.08), rgba(240,200,80,0.06))', border:'1px solid rgba(74,222,128,0.2)', borderRadius:10, display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
          <span style={{ fontSize:13 }}>📈</span>
          <div style={{ flex:1, minWidth:200 }}>
            <div style={{ fontFamily:"'Fraunces',serif", fontSize:12.5, fontWeight:700, color:'#4ADE80' }}>Latest: Q1 2026 results</div>
            <div style={{ fontSize:10, color:'#6B7A8D', marginTop:1 }}>{banks.length} banks reported · {pendingBanks.length} pending · 38 foreign banks not disclosed</div>
          </div>
          <span style={{ padding:'2px 7px', borderRadius:5, background:'rgba(74,222,128,0.15)', color:'#4ADE80', fontSize:9, fontWeight:700, letterSpacing:'0.06em' }}>Apr 2026</span>
        </div>
      )}

      {/* Sector KPIs */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:14 }}>
        <KpiCard label={period==='q1_2026'?'Q1 Profit':'Sector Profit'} value={fmtAED(totals.totalProfit)} sub={`${banks.length} banks shown`} />
        <KpiCard label="Total Assets" value={`AED ${totals.totalAssets.toFixed(0)}B`} sub={period==='q1_2026'?'As of 31 Mar 2026':'As of 31 Dec 2025'} />
        <KpiCard label="Total Deposits" value={`AED ${totals.totalDeposits.toFixed(0)}B`} sub="Customer deposits" />
        <KpiCard label="Avg ROE" value={`${totals.avgRoe}%`} sub={period==='q1_2026'?'Q1 annualized':'FY 2025'} />
        <KpiCard label="Avg NPL" value={`${totals.avgNpl}%`} sub="Asset quality" />
      </div>

      {/* Sub-view toggle */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:8, marginBottom:12, flexWrap:'wrap' }}>
        <div style={{ display:'flex', gap:5, background:'rgba(255,255,255,0.035)', borderRadius:100, padding:3, border:'1px solid rgba(255,255,255,0.05)' }}>
          {[['earnings','📊 Earnings'],['balancesheet','💼 Balance Sheet'],['risk','⚠️ Asset Quality']].map(([k,l]) => (
            <button key={k} onClick={()=>setView(k)} style={{ padding:'7px 13px', border:'none', borderRadius:100, cursor:'pointer', background:view===k?'#F0C850':'transparent', color:view===k?'#0B1120':'#6B7A8D', fontFamily:"'Outfit',sans-serif", fontWeight:view===k?700:500, fontSize:11.5, whiteSpace:'nowrap' }}>{l}</button>
          ))}
        </div>
        <div style={{ display:'flex', gap:6, alignItems:'center' }}>
          <button onClick={onOpenMethodology} style={{ padding:'6px 10px', borderRadius:8, border:'1px solid rgba(167,139,250,0.25)', background:'rgba(139,92,246,0.08)', color:'#A78BFA', cursor:'pointer', fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:10.5 }}>ⓘ Method</button>
          <button onClick={onOpenDrawer} style={{ padding:'6px 10px', borderRadius:8, border:'1px dashed rgba(240,200,80,0.3)', background:'rgba(240,200,80,0.04)', color:'#F0C850', cursor:'pointer', fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:10.5 }}>+ Banks</button>
        </div>
      </div>

      {/* Sort chips */}
      <div style={{ display:'flex', gap:4, marginBottom:12, overflowX:'auto', alignItems:'center' }}>
        <span style={{ fontSize:10, color:'#4A5568', marginRight:4 }}>Sort:</span>
        {[['profit','Profit','earnings'],['assets','Assets','balancesheet'],['deposits','Deposits','balancesheet'],['roe','ROE','earnings'],['npl','NPL %','risk'],['coverage','Coverage','risk']].map(([k,l,linkedView]) => (
          <button key={k} onClick={()=>{setSortBy(k); setView(linkedView)}} style={{ padding:'5px 10px', borderRadius:6, border:'none', cursor:'pointer', whiteSpace:'nowrap', background:sortBy===k?'#fff':'rgba(255,255,255,0.04)', color:sortBy===k?'#0B1120':'#6B7A8D', fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:10.5 }}>{l}</button>
        ))}
      </div>

      {/* Bank cards */}
      <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
        {sorted.map((bank,i) => {
          const profit = getProfit(bank)
          const assets = getAssets(bank)
          const deposits = getDeposits(bank)
          const npl = getNpl(bank)
          const coverage = getCoverage(bank)
          const loans = getLoans(bank)
          const opIncome = getOpIncome(bank)
          const impairment = getImpairment(bank)
          const status = getStatus(bank)
          const periodLabel = period==='q1_2026' ? bank.q1Period : bank.period
          const sourceLabel = period==='q1_2026' ? bank.q1Source : bank.sourceNote
          // For Q1, compute YoY vs Q1 prior; for FY, use yoyGrowth field
          const yoyPct = period==='q1_2026' && bank.q1ProfitPrior ? (((bank.q1Profit - bank.q1ProfitPrior) / bank.q1ProfitPrior) * 100) : bank.yoyGrowth
          return (
          <div key={bank.id} style={{ background:profit<0?'rgba(248,113,113,0.04)':'rgba(255,255,255,0.02)', borderRadius:14, padding:'12px 13px', border:profit<0?'1px solid rgba(248,113,113,0.15)':'1px solid rgba(255,255,255,0.04)', animation:`fadeUp 0.3s ease ${i*0.02}s both` }}>
            {/* Header */}
            <div style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:9 }}>
              <div style={{ width:30, height:30, borderRadius:7, background:bank.color, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:11, color:'#fff', flexShrink:0 }}>{String(i+1).padStart(2,'0')}</div>
              <Badge bank={bank} size={32} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>
                  <span style={{ fontFamily:"'Fraunces',serif", fontSize:13.5, fontWeight:700, color:'#E0E6ED' }}>{bank.name}</span>
                  <StatusBadge status={status} />
                </div>
                <div style={{ fontSize:10, color:'#4A5568', marginTop:2 }}>{bank.type} · {bank.hq} · {bank.exchange} · {periodLabel}</div>
                {sourceLabel && <div style={{ fontSize:9, color:'#3A4558', marginTop:2, fontStyle:'italic' }}>Source: {sourceLabel}</div>}
              </div>
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:17, fontWeight:800, color:profit<0?'#F87171':'#F0C850' }}>{fmtProfit(profit)}</div>
                {profit!==0 && yoyPct !== undefined && yoyPct !== null && <div style={{ fontSize:10, fontWeight:700, color:yoyPct>=0?'#4ADE80':'#F87171' }}>{yoyPct>=0?'▲':'▼'} {Math.abs(yoyPct).toFixed(1)}% {period==='q1_2026'?'vs Q1 25':'YoY'}</div>}
              </div>
            </div>

            {/* Metrics grid */}
            {view === 'earnings' && (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:6 }}>
                <MetricTile label={period==='q1_2026'?'Q1 Profit':'Net Profit'} value={fmtProfit(profit)} status={status} highlight={profit<0?'#F87171':'#F0C850'} />
                <MetricTile label={period==='q1_2026'?'Q1 2025':'Prior Year'} value={fmtProfit(period==='q1_2026'?bank.q1ProfitPrior:bank.profit2024)} status="reported" />
                <MetricTile label="Op. Income" value={fmtAED(opIncome)} status={status} />
                <MetricTile label="ROE" value={`${bank.roe}%`} status="reported" />
                <MetricTile label="ROA" value={assets ? `${((profit / assets) * (period==='q1_2026'?400:100)).toFixed(2)}%` : '—'} status="derived" />
              </div>
            )}
            {view === 'balancesheet' && (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:6 }}>
                <MetricTile label="Total Assets" value={`AED ${assets}B`} status={status} />
                <MetricTile label="Deposits" value={fmtAED(deposits)} status={status} />
                <MetricTile label="Gross Loans" value={fmtAED(loans)} status={status} />
                <MetricTile label="Equity" value={fmtAED(bank.totalEquity)} status="reported" />
                <MetricTile label="L/D Ratio" value={deposits ? `${((loans / deposits) * 100).toFixed(1)}%` : '—'} status="derived" />
                <MetricTile label="Equity/Assets" value={assets ? `${((bank.totalEquity / assets) * 100).toFixed(1)}%` : '—'} status="derived" />
              </div>
            )}
            {view === 'risk' && (
              <div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:6, marginBottom:8 }}>
                  <MetricTile label="NPL Ratio" value={`${npl}%`} status={status} highlight={npl>5?'#F87171':npl>3?'#FBBF24':'#4ADE80'} />
                  <MetricTile label="NPL Amount" value={fmtAED(loans * npl / 100)} status="derived" />
                  <MetricTile label={period==='q1_2026'?'FY25 NPL %':'Prior NPL %'} value={period==='q1_2026' ? (bank.nplRatio?`${bank.nplRatio}%`:'—') : (bank.nplPrior ? `${bank.nplPrior}%` : '—')} status="reported" />
                  <MetricTile label="Coverage" value={`${coverage}%`} status={status} highlight={coverage>=100?'#4ADE80':coverage>=80?'#FBBF24':'#F87171'} />
                  <MetricTile label="Impairment" value={fmtAED(impairment)} status={status} />
                  <MetricTile label="Impair/Income" value={opIncome ? `${((impairment / opIncome) * 100).toFixed(1)}%` : '—'} status="derived" />
                </div>
                {period === 'fy2025' && bank.nplPrior > 0 && (
                  <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:10, color:'#6B7A8D' }}>
                    <span>FY24 → FY25:</span>
                    <span style={{ fontWeight:700, color:bank.nplRatio < bank.nplPrior ? '#4ADE80':'#F87171' }}>
                      {bank.nplRatio < bank.nplPrior ? '▼' : '▲'} {Math.abs(bank.nplRatio - bank.nplPrior).toFixed(1)}pp
                    </span>
                  </div>
                )}
                {period === 'q1_2026' && bank.nplRatio && (
                  <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:10, color:'#6B7A8D' }}>
                    <span>FY25 → Q1 26:</span>
                    <span style={{ fontWeight:700, color:npl < bank.nplRatio ? '#4ADE80':'#F87171' }}>
                      {npl < bank.nplRatio ? '▼' : '▲'} {Math.abs(npl - bank.nplRatio).toFixed(1)}pp
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          )
        })}
      </div>

      {/* Pending banks (Q1 2026 view only) */}
      {period === 'q1_2026' && pendingBanks.length > 0 && (
        <div style={{ marginTop:18 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8, paddingBottom:6, borderBottom:'1px solid rgba(251,191,36,0.2)' }}>
            <span style={{ fontFamily:"'Fraunces',serif", fontSize:13, fontWeight:700, color:'#FBBF24' }}>Q1 2026 Pending</span>
            <span style={{ fontSize:10, color:'#6B7A8D' }}>{pendingBanks.length} banks yet to report</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {pendingBanks.map(bank => (
              <div key={bank.id} style={{ display:'flex', alignItems:'center', gap:9, padding:'8px 11px', borderRadius:10, background:'rgba(251,191,36,0.04)', border:'1px solid rgba(251,191,36,0.12)' }}>
                <Badge bank={bank} size={26} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:11.5, fontWeight:600, color:'#E0E6ED' }}>{bank.name}</div>
                  <div style={{ fontSize:9.5, color:'#6B7A8D' }}>{bank.type} · {bank.hq} · FY 2025: {fmtProfit(bank.profit2025)} · AED {bank.totalAssets}B assets</div>
                </div>
                <span style={{ padding:'2px 7px', borderRadius:5, background:'rgba(251,191,36,0.15)', color:'#FBBF24', border:'1px solid rgba(251,191,36,0.25)', fontSize:9, fontWeight:700, letterSpacing:'0.04em', textTransform:'uppercase', flexShrink:0 }}>Q1 2026 Pending</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop:14, padding:12, background:'rgba(240,200,80,0.04)', borderRadius:9, borderLeft:'3px solid #F0C850' }}>
        <p style={{ fontSize:10, color:'#6B7A8D', lineHeight:1.7 }}>
          <b style={{ color:'#F0C850' }}>Sources:</b> Bank annual reports, ADX/DFM filings, investor presentations, FAB Research, A&M UAE Banking Pulse. Q1 2026 figures from press releases issued Apr 14–24, 2026. Metrics labeled <StatusBadge status="derived" /> are calculated from disclosed figures. <StatusBadge status="estimated" /> are inferred from partial-period filings.
        </p>
      </div>
    </div>
  )
}

// ─── DIRECTORY TAB ───────────────────────────────────────────────────────────

function DirectoryTab({ activeBankIds, onOpenDrawer }) {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')
  const banks = ALL_BANKS.filter(b => {
    const mQ = b.name.toLowerCase().includes(q.toLowerCase()) || b.hq.toLowerCase().includes(q.toLowerCase())
    const mF = filter === 'all' || (filter === 'national' && b.category === 'national') || (filter === 'foreign' && b.category === 'foreign') || (filter === 'foreign_wholesale' && b.category === 'foreign_wholesale') || (filter === 'digital' && b.category === 'digital') || (filter === 'islamic' && b.type === 'Islamic') || (filter === 'conventional' && b.type === 'Conventional')
    return mQ && mF
  })
  const grouped = {}
  banks.forEach(b => { const c = CATEGORY_LABELS[b.category] || b.category; if(!grouped[c]) grouped[c]=[]; grouped[c].push(b) })
  Object.values(grouped).forEach(list => list.sort((a, b) => b.totalAssets - a.totalAssets))

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
        <div>
          <h3 style={{ fontFamily:"'Fraunces',serif", fontSize:16, fontWeight:700, color:'#F0C850', marginBottom:2 }}>Bank Directory</h3>
          <p style={{ fontSize:11, color:'#4A5568' }}>All {ALL_BANKS.length} CBUAE-licensed banks</p>
        </div>
      </div>
      <div style={{ position:'relative', marginBottom:10 }}>
        <span style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', fontSize:14, color:'#4A5568' }}>🔍</span>
        <input type="text" placeholder="Search banks..." value={q} onChange={e=>setQ(e.target.value)} style={{ width:'100%', padding:'10px 12px 10px 34px', borderRadius:9, border:'1px solid rgba(255,255,255,0.07)', background:'rgba(255,255,255,0.03)', fontFamily:"'Outfit',sans-serif", fontSize:12.5, color:'#E0E6ED', outline:'none' }} />
      </div>
      <div style={{ display:'flex', gap:4, marginBottom:14, overflowX:'auto' }}>
        {CATEGORY_FILTERS.map(f => <button key={f.key} onClick={()=>setFilter(f.key)} style={{ padding:'5px 10px', borderRadius:6, border:'none', cursor:'pointer', whiteSpace:'nowrap', background:filter===f.key?'rgba(240,200,80,0.15)':'rgba(255,255,255,0.04)', color:filter===f.key?'#F0C850':'#5A6878', fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:10.5 }}>{f.label}</button>)}
      </div>
      {Object.entries(grouped).map(([catName, list]) => (
        <div key={catName} style={{ marginBottom:18 }}>
          <div style={{ fontSize:11, fontWeight:700, color:'#F0C850', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8, paddingBottom:4, borderBottom:'1px solid rgba(240,200,80,0.15)' }}>{catName} ({list.length})</div>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {list.map((bank,idx) => {
              const hasSegment = bank.retailLoans > 0 || bank.corpLoans > 0
              const totalLoans = (bank.retailLoans||0) + (bank.corpLoans||0)
              const retailPct = totalLoans > 0 ? ((bank.retailLoans||0)/totalLoans*100).toFixed(0) : 0
              const corpPct = totalLoans > 0 ? ((bank.corpLoans||0)/totalLoans*100).toFixed(0) : 0
              return (
                <div key={bank.id} style={{ background:'rgba(255,255,255,0.015)', border:'1px solid rgba(255,255,255,0.025)', borderRadius:10, padding:'10px 11px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:hasSegment?8:0 }}>
                    <div style={{ width:18, height:18, borderRadius:4, background:'rgba(240,200,80,0.08)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:9.5, color:'#F0C850', flexShrink:0 }}>{idx+1}</div>
                    <Badge bank={bank} size={26} />
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                        <span style={{ fontSize:11.5, fontWeight:600, color:'#E0E6ED' }}>{bank.name}</span>
                        <StatusBadge status={bank.status} />
                      </div>
                      <div style={{ fontSize:9.5, color:'#4A5568' }}>{bank.hq} · Est. {bank.est} · {bank.exchange}{bank.totalAssets > 0 ? ` · AED ${bank.totalAssets}B` : ''}</div>
                    </div>
                    {bank.profit2025>0 ? <div style={{ textAlign:'right', flexShrink:0 }}><div style={{ fontSize:10.5, fontWeight:700, color:'#F0C850' }}>{fmtProfit(bank.profit2025)}</div><div style={{ fontSize:9, color:bank.yoyGrowth>=0?'#4ADE80':'#F87171', fontWeight:600 }}>{bank.yoyGrowth>=0?'▲':'▼'}{Math.abs(bank.yoyGrowth)}%</div></div> : bank.note ? <div style={{ fontSize:9.5, fontWeight:700, color:'#F87171', flexShrink:0 }}>{bank.note}</div> : null}
                  </div>
                  {hasSegment && (
                    <div>
                      <div style={{ display:'flex', height:6, borderRadius:3, overflow:'hidden', marginBottom:5 }}>
                        <div style={{ width:`${retailPct}%`, background:'#3B82F6' }}/>
                        <div style={{ width:`${corpPct}%`, background:'#F59E0B' }}/>
                      </div>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <div style={{ display:'flex', gap:10 }}>
                          <span style={{ fontSize:9.5, color:'#3B82F6', fontWeight:600 }}>● Retail AED {bank.retailLoans}B ({retailPct}%)</span>
                          <span style={{ fontSize:9.5, color:'#F59E0B', fontWeight:600 }}>● Corp AED {bank.corpLoans}B ({corpPct}%)</span>
                        </div>
                        <span style={{ fontSize:9, color:'#4A5568' }}>Total: AED {totalLoans}B</span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
      <div style={{ padding:12, background:'rgba(240,200,80,0.04)', borderRadius:9, borderLeft:'3px solid #F0C850' }}>
        <p style={{ fontSize:10, color:'#6B7A8D', lineHeight:1.7 }}>
          <b style={{ color:'#F0C850' }}>Source:</b> CBUAE Register (June 2025). All nationally licensed and foreign banks with retail/wholesale licences in the UAE. Loan splits from bank filings and investor presentations.
        </p>
      </div>
    </div>
  )
}

// ─── NEWS TAB ────────────────────────────────────────────────────────────────

function NewsTab() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fetchedAt, setFetchedAt] = useState(null)
  const [source, setSource] = useState(null)
  const [adminKey, setAdminKey] = useState(null)
  const [forceRefreshing, setForceRefreshing] = useState(false)

  useEffect(() => {
    // Check for ?admin=KEY in URL on first render
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const key = params.get('admin')
      if (key) setAdminKey(key)
    }
    loadNews()
  }, [])

  const loadNews = async () => {
    setLoading(true); setError(null)
    try {
      const res = await fetch('/api/news', { cache: 'no-store' })
      if (!res.ok) throw new Error(`API ${res.status}`)
      const data = await res.json()
      setNews(data.items || [])
      setFetchedAt(data.fetchedAt)
      setSource(data.source)
      if (data.source === 'fallback') setError('Showing bundled headlines — daily refresh has not run yet.')
    } catch (err) {
      setError(`Could not load news: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const forceRefresh = async () => {
    if (!adminKey) return
    setForceRefreshing(true); setError(null)
    try {
      const res = await fetch(`/api/cron/refresh-news?admin=${encodeURIComponent(adminKey)}`, { cache: 'no-store' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `API ${res.status}`)
      // After successful refresh, reload news from cache
      await loadNews()
    } catch (err) {
      setError(`Force refresh failed: ${err.message}`)
    } finally {
      setForceRefreshing(false)
    }
  }

  // Format "X hours ago"
  const relativeTime = (iso) => {
    if (!iso) return null
    const diff = Date.now() - new Date(iso).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins} min${mins === 1 ? '' : 's'} ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs} hour${hrs === 1 ? '' : 's'} ago`
    const days = Math.floor(hrs / 24)
    return `${days} day${days === 1 ? '' : 's'} ago`
  }

  // Format exact timestamp Dubai-style
  const exactTime = (iso) => {
    if (!iso) return null
    const d = new Date(iso)
    return d.toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dubai' }) + ' GST'
  }

  const cc = { Banking:'#3B82F6', Markets:'#F59E0B', Regulation:'#EF4444', Digital:'#8B5CF6', 'Islamic Finance':'#10B981', Economy:'#F97316' }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10, gap:8, flexWrap:'wrap' }}>
        <div>
          <h3 style={{ fontFamily:"'Fraunces',serif", fontSize:16, fontWeight:700, color:'#F0C850', marginBottom:2 }}>UAE Banking News</h3>
          <p style={{ fontSize:11, color:'#4A5568' }}>Auto-refreshed daily at 7am Dubai · Newest first</p>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap', justifyContent:'flex-end' }}>
          {adminKey && (
            <button onClick={forceRefresh} disabled={forceRefreshing} style={{ padding:'6px 12px', borderRadius:7, border:'1px solid rgba(167,139,250,0.3)', cursor:forceRefreshing?'default':'pointer', background:forceRefreshing?'#1A2438':'rgba(139,92,246,0.1)', color:'#A78BFA', fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:10.5, opacity:forceRefreshing?0.5:1 }}>{forceRefreshing ? '⟳ Refreshing...' : '⚡ Force Refresh'}</button>
          )}
        </div>
      </div>

      {/* Last refreshed indicator */}
      {fetchedAt && (
        <div style={{ marginBottom:12, padding:'7px 11px', background:'rgba(74,222,128,0.04)', border:'1px solid rgba(74,222,128,0.12)', borderRadius:8, display:'flex', alignItems:'center', gap:6, fontSize:10.5, color:'#6B7A8D', flexWrap:'wrap' }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'#4ADE80' }}/>
          <span>Last updated <b style={{ color:'#4ADE80' }}>{relativeTime(fetchedAt)}</b></span>
          <span style={{ color:'#3A4558' }}>·</span>
          <span style={{ color:'#5A6878' }}>{exactTime(fetchedAt)}</span>
          {source && source !== 'cron' && <span style={{ marginLeft:'auto', padding:'1px 6px', borderRadius:3, background:'rgba(167,139,250,0.12)', color:'#A78BFA', fontSize:9, fontWeight:700, letterSpacing:'0.04em', textTransform:'uppercase' }}>{source}</span>}
        </div>
      )}

      {!fetchedAt && source === 'fallback' && (
        <div style={{ marginBottom:12, padding:'7px 11px', background:'rgba(245,158,11,0.05)', border:'1px solid rgba(245,158,11,0.15)', borderRadius:8, fontSize:10.5, color:'#FBBF24' }}>
          <StatusBadge status="indicative" /> Bundled headlines · Daily auto-refresh starts after first cron run
        </div>
      )}

      {error && <div style={{ padding:'8px 11px', background:'rgba(248,113,113,0.05)', borderRadius:8, border:'1px solid rgba(248,113,113,0.18)', marginBottom:12, fontSize:11, color:'#F87171' }}>{error}</div>}

      {loading ? (
        <div style={{ display:'flex', flexDirection:'column', gap:7 }}>{[...Array(5)].map((_,i)=><div key={i} style={{ height:80, borderRadius:12, background:'rgba(255,255,255,0.02)', animation:`shimmer 1.5s ease ${i*0.1}s infinite alternate` }}/>)}</div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
          {news.map((item, i) => (
            <div key={i} style={{ background:'rgba(255,255,255,0.02)', borderRadius:12, padding:'11px 13px', border:'1px solid rgba(255,255,255,0.035)', animation:`fadeUp 0.3s ease ${i*0.03}s both` }}>
              <div style={{ display:'flex', gap:6, alignItems:'center', marginBottom:6 }}>
                <span style={{ fontSize:9, fontWeight:700, padding:'2px 6px', borderRadius:4, background:`${cc[item.category]||'#4A5568'}18`, color:cc[item.category]||'#4A5568', textTransform:'uppercase', letterSpacing:'0.04em' }}>{item.category}</span>
                <span style={{ fontSize:10, color:'#2D3A4E' }}>{item.date}</span>
              </div>
              <h4 style={{ fontFamily:"'Fraunces',serif", fontSize:13, fontWeight:700, color:'#E0E6ED', lineHeight:1.3, marginBottom:4 }}>{item.title}</h4>
              <p style={{ fontSize:11, color:'#6B7A8D', lineHeight:1.4, marginBottom:3 }}>{item.summary}</p>
              <span style={{ fontSize:10, color:'#2D3A4E', fontWeight:500 }}>{item.source}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── COMPARE TAB (Products) ──────────────────────────────────────────────────

function CompareTab({ activeBankIds, onOpenDrawer }) {
  const [cat, setCat] = useState('savings')
  const [selected, setSelected] = useState(['adcb','enbd','dib','alhilal','ajman'])
  const [showTable, setShowTable] = useState(false)
  const [cardFeeType, setCardFeeType] = useState('all')
  const [cardBenefit, setCardBenefit] = useState('all')
  const prod = PRODUCTS[cat]
  const banks = ALL_BANKS.filter(b => activeBankIds.includes(b.id) && prod.data[b.id])
  const toggle = id => setSelected(p => p.includes(id)?p.filter(x=>x!==id):[...p,id])
  const selBanks = banks.filter(b => selected.includes(b.id))

  const filteredCards = CARDS.filter(c => {
    const feeMatch = cardFeeType === 'all' || (cardFeeType === 'free' && c.free) || (cardFeeType === 'paid' && !c.free)
    const benMatch = cardBenefit === 'all' || c[cardBenefit] === true
    return feeMatch && benMatch
  }).sort((a,b) => a.annualFee - b.annualFee)

  const tierColors = {"Entry":"#4ADE80","Mid":"#60A5FA","Premium":"#F0C850","Ultra Premium":"#A78BFA"}
  const benefitFilters = [{key:"all",label:"All",icon:"🎴"},{key:"cinema",label:"Cinema",icon:"🎬"},{key:"golf",label:"Golf",icon:"⛳"},{key:"valet",label:"Valet",icon:"🚗"},{key:"lounge",label:"Lounge",icon:"✈️"},{key:"dining",label:"Dining",icon:"🍽️"},{key:"airmiles",label:"Miles",icon:"🛫"},{key:"sharia",label:"Sharia",icon:"☪"}]
  const benefitIcons = {cinema:"🎬",golf:"⛳",valet:"🚗",lounge:"✈️",dining:"🍽️",airmiles:"🛫",travel:"🌍",sharia:"☪"}

  return (
    <div>
      <div style={{ display:'flex', gap:5, overflowX:'auto', padding:3, marginBottom:16, background:'rgba(255,255,255,0.035)', borderRadius:100, border:'1px solid rgba(255,255,255,0.05)' }}>
        {Object.entries(PRODUCTS).map(([k,v]) => <button key={k} onClick={()=>{setCat(k);setShowTable(false)}} style={{ padding:'9px 15px', border:'none', borderRadius:100, whiteSpace:'nowrap', cursor:'pointer', background:cat===k?'#F0C850':'transparent', color:cat===k?'#0B1120':'#7A8699', fontFamily:"'Outfit',sans-serif", fontWeight:cat===k?700:500, fontSize:12.5 }}><span style={{marginRight:4}}>{v.icon}</span>{v.label}</button>)}
      </div>

      {cat === 'cards' ? (
        <div>
          <div style={{ fontSize:10, color:'#6B7A8D', marginBottom:6, display:'flex', alignItems:'center', gap:5 }}><StatusBadge status="indicative" /> Card offers subject to change. Verify with bank.</div>
          <div style={{ display:'flex', gap:5, marginBottom:12, background:'rgba(255,255,255,0.03)', borderRadius:100, padding:3, border:'1px solid rgba(255,255,255,0.04)' }}>
            {[{key:'all',label:'All Cards'},{key:'free',label:'Free for Life'},{key:'paid',label:'Paid Premium'}].map(f => (
              <button key={f.key} onClick={()=>setCardFeeType(f.key)} style={{ flex:1, padding:'8px 0', border:'none', borderRadius:100, cursor:'pointer', background:cardFeeType===f.key?(f.key==='free'?'#4ADE80':f.key==='paid'?'#A78BFA':'#F0C850'):'transparent', color:cardFeeType===f.key?'#0B1120':'#6B7A8D', fontFamily:"'Outfit',sans-serif", fontWeight:cardFeeType===f.key?700:500, fontSize:11.5 }}>{f.label}</button>
            ))}
          </div>
          <div style={{ display:'flex', gap:4, marginBottom:14, overflowX:'auto' }}>
            {benefitFilters.map(f => <button key={f.key} onClick={()=>setCardBenefit(f.key)} style={{ padding:'5px 10px', borderRadius:6, border:'none', cursor:'pointer', whiteSpace:'nowrap', background:cardBenefit===f.key?'rgba(240,200,80,0.15)':'rgba(255,255,255,0.04)', color:cardBenefit===f.key?'#F0C850':'#5A6878', fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:10.5 }}>{f.icon} {f.label}</button>)}
          </div>
          <div style={{ fontSize:11, color:'#4A5568', marginBottom:10 }}>{filteredCards.length} cards found</div>
          <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
            {filteredCards.map((card,i) => (
              <div key={card.id} style={{ background:'rgba(255,255,255,0.02)', borderRadius:12, padding:'12px 13px', border:'1px solid rgba(255,255,255,0.035)', animation:`fadeUp 0.3s ease ${i*0.02}s both` }}>
                <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:8 }}>
                  <div style={{ width:32, height:32, borderRadius:'50%', background:card.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:8, fontWeight:700, color:'#fff', flexShrink:0 }}>{card.bank.split(' ')[0].slice(0,3).toUpperCase()}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'Fraunces',serif", fontSize:13, fontWeight:700, color:'#E0E6ED' }}>{card.name}</div>
                    <div style={{ fontSize:10, color:'#4A5568' }}>{card.bank} · {card.network}</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:14, fontWeight:800, color:card.free?'#4ADE80':'#A78BFA' }}>{card.free?'FREE':`AED ${card.annualFee}`}</div>
                    <span style={{ fontSize:8, fontWeight:700, padding:'1px 5px', borderRadius:3, background:`${tierColors[card.tier]}20`, color:tierColors[card.tier] }}>{card.tier}</span>
                  </div>
                </div>
                <div style={{ display:'flex', gap:4, marginBottom:6, flexWrap:'wrap' }}>
                  {Object.entries(benefitIcons).map(([k,icon]) => card[k] ? <span key={k} style={{ fontSize:9, padding:'2px 6px', borderRadius:4, background:'rgba(240,200,80,0.08)', color:'#F0C850' }}>{icon} {k}</span> : null)}
                </div>
                <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                  <span style={{ fontSize:10, color:'#4A5568' }}>Cashback: <b style={{ color:'#A0A8B4' }}>{card.cashback}</b></span>
                  <span style={{ fontSize:10, color:'#4A5568' }}>Min Salary: <b style={{ color:'#A0A8B4' }}>AED {card.minSalary.toLocaleString()}</b></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12, gap:8, flexWrap:'wrap' }}>
            <div style={{ display:'flex', gap:7, alignItems:'center' }}>
              <button onClick={onOpenDrawer} style={{ padding:'8px 14px', borderRadius:9, border:'1px dashed rgba(240,200,80,0.35)', background:'rgba(240,200,80,0.05)', color:'#F0C850', cursor:'pointer', fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:11.5 }}>+ Add Banks</button>
              <span style={{ fontSize:11, color:'#3A4558' }}>{banks.length} with products</span>
            </div>
            {selBanks.length>=2 && <button onClick={()=>setShowTable(!showTable)} style={{ padding:'8px 18px', borderRadius:100, border:'none', cursor:'pointer', background:showTable?'#2A3448':'linear-gradient(135deg,#F0C850,#D4A830)', color:showTable?'#8A96A8':'#0B1120', fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:12 }}>{showTable ? '← Cards' : `Compare ${selBanks.length} →`}</button>}
          </div>
          {showTable && selBanks.length>=2 ? (
            <div style={{ background:'rgba(255,255,255,0.025)', borderRadius:13, overflow:'hidden', border:'1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', fontFamily:"'Outfit',sans-serif", minWidth:Math.max(420,selBanks.length*120) }}>
                  <thead><tr>
                    <th style={{ padding:'13px', textAlign:'left', background:'#0F1A2E', color:'#F0C850', fontWeight:600, fontSize:10.5, letterSpacing:'0.06em', textTransform:'uppercase', position:'sticky', left:0, zIndex:2 }}>Feature</th>
                    {selBanks.map(b => <th key={b.id} style={{ padding:'11px 8px', textAlign:'center', background:'#0F1A2E', color:'#C0C8D4', fontWeight:600, fontSize:10.5 }}><div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}><Badge bank={b} size={24}/><span style={{ maxWidth:72, lineHeight:1.2 }}>{b.name}</span></div></th>)}
                  </tr></thead>
                  <tbody>{prod.fields.map((f,fi) => <tr key={f}><td style={{ padding:'10px 13px', fontWeight:600, fontSize:11, color:'#A0A8B4', borderBottom:'1px solid rgba(255,255,255,0.025)', background:'#0B1120', position:'sticky', left:0, zIndex:1 }}>{f}</td>{selBanks.map(b => <td key={b.id} style={{ padding:'10px 8px', textAlign:'center', fontSize:11, fontWeight:500, color:'#C0C8D4', borderBottom:'1px solid rgba(255,255,255,0.025)', background:fi%2===0?'rgba(255,255,255,0.012)':'transparent' }}>{prod.data[b.id]?.[fi] || '—'}</td>)}</tr>)}</tbody>
                </table>
              </div>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(245px,1fr))', gap:9 }}>
              {banks.map((bank,i) => { const sel = selected.includes(bank.id); return (
                <div key={bank.id} onClick={()=>toggle(bank.id)} style={{ background:sel?`${bank.color}10`:'rgba(255,255,255,0.02)', border:sel?`2px solid ${bank.color}48`:'2px solid rgba(255,255,255,0.035)', borderRadius:12, padding:13, cursor:'pointer', position:'relative', animation:`fadeUp 0.3s ease ${i*0.03}s both` }}>
                  {sel && <div style={{ position:'absolute', top:8, right:8, width:19, height:19, borderRadius:'50%', background:bank.color, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:10.5, fontWeight:700 }}>✓</div>}
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:11 }}><Badge bank={bank} size={32}/><div><div style={{ fontFamily:"'Fraunces',serif", fontSize:13.5, fontWeight:700, color:'#E0E6ED' }}>{bank.name}</div><div style={{ fontSize:10, color:'#4A5568' }}>{bank.type}</div></div></div>
                  {prod.fields.map((f,fi) => <div key={f} style={{ display:'flex', justifyContent:'space-between', padding:'3.5px 0', borderBottom:fi<prod.fields.length-1?'1px solid rgba(255,255,255,0.025)':'none' }}><span style={{ fontSize:10.5, color:'#4A5568' }}>{f}</span><span style={{ fontSize:11, color:'#A0A8B4', fontWeight:600 }}>{prod.data[bank.id]?.[fi] || '—'}</span></div>)}
                </div>
              )})}
            </div>
          )}
          <p style={{ marginTop:12, fontSize:10, color:'#2D3A4E', fontStyle:'italic' }}>* Islamic banks offer profit rates (Murabaha/Ijarah). Rates indicative.</p>
        </div>
      )}
    </div>
  )
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

// ─── AUDIT TAB ───────────────────────────────────────────────────────────────

function AuditTab({ activeBankIds }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const banks = ALL_BANKS.filter(b => activeBankIds.includes(b.id) && b.totalAssets > 0).filter(b => {
    const sm = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.hq.toLowerCase().includes(search.toLowerCase())
    const fm = statusFilter === 'all' || b.status === statusFilter
    return sm && fm
  })

  const counts = {
    reported: ALL_BANKS.filter(b=>activeBankIds.includes(b.id)&&b.status==='reported'&&b.totalAssets>0).length,
    estimated: ALL_BANKS.filter(b=>activeBankIds.includes(b.id)&&b.status==='estimated'&&b.totalAssets>0).length,
    derived: 0,
    indicative: ALL_BANKS.filter(b=>activeBankIds.includes(b.id)&&b.status==='indicative'&&b.totalAssets>0).length,
  }

  const downloadCSV = () => {
    const headers = ['Bank','Type','HQ','Exchange','Status','Period','Profit FY25 (AED B)','Profit FY24 (AED B)','YoY%','Total Assets (AED B)','Deposits','Equity','Gross Loans','Retail Loans','Corp Loans','NPL%','Prior NPL%','Coverage%','Impairment','Op Income','ROE%','Q1 Status','Q1 Profit','Q1 Profit Prior','Q1 Assets','Q1 Deposits','Q1 Loans','Q1 NPL%','Q1 Coverage%','Q1 Impairment','Q1 Op Income','Q1 Source','FY Source','IR URL']
    const rows = banks.map(b => [b.name,b.type,b.hq,b.exchange,b.status,b.period,b.profit2025,b.profit2024,b.yoyGrowth,b.totalAssets,b.customerDeposits||'',b.totalEquity||'',b.grossLoans||'',b.retailLoans||'',b.corpLoans||'',b.nplRatio||'',b.nplPrior||'',b.coverageRatio||'',b.impairmentCharge||'',b.operatingIncome||'',b.roe,b.q1Status||'',b.q1Profit||'',b.q1ProfitPrior||'',b.q1Assets||'',b.q1Deposits||'',b.q1Loans||'',b.q1Npl||'',b.q1Coverage||'',b.q1Impairment||'',b.q1OpIncome||'',b.q1Source||'',b.sourceNote||'',b.irUrl||''])
    const csv = [headers, ...rows].map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new Blob([csv],{type:'text/csv;charset=utf-8'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `uae-banking-data-${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14, flexWrap:'wrap', gap:10 }}>
        <div>
          <h3 style={{ fontFamily:"'Fraunces',serif", fontSize:16, fontWeight:700, color:'#F0C850', marginBottom:2 }}>Data Audit & Verification</h3>
          <p style={{ fontSize:11, color:'#4A5568' }}>FY 2025 vs Q1 2026 side-by-side · Verify with source · Export to CSV</p>
        </div>
        <button onClick={downloadCSV} style={{ padding:'7px 14px', borderRadius:8, border:'1px solid rgba(74,222,128,0.3)', background:'rgba(74,222,128,0.08)', color:'#4ADE80', cursor:'pointer', fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:11 }}>↓ Export CSV</button>
      </div>

      {/* Status counts */}
      <div style={{ display:'flex', gap:6, marginBottom:12, flexWrap:'wrap' }}>
        {['all','reported','estimated','indicative'].map(s => {
          const cnt = s==='all' ? banks.length : counts[s]
          return (
            <button key={s} onClick={()=>setStatusFilter(s)} style={{ padding:'6px 12px', borderRadius:8, border:'none', cursor:'pointer', background:statusFilter===s?'rgba(240,200,80,0.15)':'rgba(255,255,255,0.04)', color:statusFilter===s?'#F0C850':'#6B7A8D', fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:11 }}>
              {s==='all'?'All':s.charAt(0).toUpperCase()+s.slice(1)} ({cnt})
            </button>
          )
        })}
      </div>

      <div style={{ position:'relative', marginBottom:14 }}>
        <span style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', fontSize:14, color:'#4A5568' }}>🔍</span>
        <input type="text" placeholder="Search by bank name or HQ..." value={search} onChange={e=>setSearch(e.target.value)} style={{ width:'100%', padding:'9px 12px 9px 34px', borderRadius:9, border:'1px solid rgba(255,255,255,0.07)', background:'rgba(255,255,255,0.03)', fontFamily:"'Outfit',sans-serif", fontSize:12, color:'#E0E6ED', outline:'none' }} />
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {banks.map(b => (
          <details key={b.id} style={{ background:'rgba(255,255,255,0.025)', borderRadius:12, border:'1px solid rgba(255,255,255,0.04)', padding:'10px 12px' }}>
            <summary style={{ cursor:'pointer', listStyle:'none', display:'flex', alignItems:'center', gap:9 }}>
              <Badge bank={b} size={28}/>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <span style={{ fontFamily:"'Fraunces',serif", fontSize:13, fontWeight:700, color:'#E0E6ED' }}>{b.name}</span>
                  <StatusBadge status={b.status} />
                </div>
                <div style={{ fontSize:9.5, color:'#4A5568', marginTop:2 }}>{b.period} · {b.sourceNote}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:13, fontWeight:800, color:b.profit2025<0?'#F87171':'#F0C850' }}>{fmtProfit(b.profit2025)}</div>
                <div style={{ fontSize:9, color:'#6B7A8D' }}>▶ Click to expand</div>
              </div>
            </summary>
            <div style={{ marginTop:10, paddingTop:10, borderTop:'1px solid rgba(255,255,255,0.04)' }}>
              {/* Two-column header */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:8 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 9px', borderRadius:6, background:'rgba(240,200,80,0.08)', border:'1px solid rgba(240,200,80,0.18)' }}>
                  <span style={{ fontSize:9, fontWeight:700, color:'#F0C850', textTransform:'uppercase', letterSpacing:'0.06em' }}>FY 2025</span>
                  <StatusBadge status={b.status} />
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 9px', borderRadius:6, background:b.q1Status==='reported'?'rgba(74,222,128,0.08)':'rgba(251,191,36,0.06)', border:b.q1Status==='reported'?'1px solid rgba(74,222,128,0.18)':'1px solid rgba(251,191,36,0.18)' }}>
                  <span style={{ fontSize:9, fontWeight:700, color:b.q1Status==='reported'?'#4ADE80':'#FBBF24', textTransform:'uppercase', letterSpacing:'0.06em' }}>Q1 2026</span>
                  {b.q1Status==='reported' ? <StatusBadge status="reported" /> : <span style={{ padding:'1px 5px', borderRadius:3, background:'rgba(251,191,36,0.15)', color:'#FBBF24', fontSize:8, fontWeight:700, letterSpacing:'0.03em', textTransform:'uppercase' }}>Pending</span>}
                </div>
              </div>

              {/* Metric rows: FY 2025 | Q1 2026 */}
              <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                <AuditRow label="Net Profit" fy={fmtProfit(b.profit2025)} q1={b.q1Status==='reported'?fmtProfit(b.q1Profit):'—'} q1Pending={b.q1Status!=='reported'} />
                <AuditRow label="Prior Period" fy={fmtProfit(b.profit2024)} fyHint="FY 2024" q1={b.q1Status==='reported'?fmtProfit(b.q1ProfitPrior):'—'} q1Hint="Q1 2025" q1Pending={b.q1Status!=='reported'} />
                <AuditRow label="YoY Growth" fy={`${b.yoyGrowth}%`} q1={b.q1Status==='reported' && b.q1ProfitPrior?`${(((b.q1Profit-b.q1ProfitPrior)/b.q1ProfitPrior)*100).toFixed(1)}%`:'—'} q1Pending={b.q1Status!=='reported'} />
                <AuditRow label="Total Assets" fy={`AED ${b.totalAssets}B`} q1={b.q1Status==='reported'?`AED ${b.q1Assets}B`:'—'} q1Pending={b.q1Status!=='reported'} />
                <AuditRow label="Deposits" fy={fmtAED(b.customerDeposits)} q1={b.q1Status==='reported'?fmtAED(b.q1Deposits):'—'} q1Pending={b.q1Status!=='reported'} />
                <AuditRow label="Gross Loans" fy={fmtAED(b.grossLoans)} q1={b.q1Status==='reported'?fmtAED(b.q1Loans):'—'} q1Pending={b.q1Status!=='reported'} />
                <AuditRow label="Equity" fy={fmtAED(b.totalEquity)} q1="—" q1Pending={true} q1Note="Not separately disclosed quarterly" />
                <AuditRow label="Retail Loans" fy={`AED ${b.retailLoans}B`} q1="—" q1Pending={true} q1Note="Quarterly split typically not disclosed" />
                <AuditRow label="Corporate Loans" fy={`AED ${b.corpLoans}B`} q1="—" q1Pending={true} q1Note="Quarterly split typically not disclosed" />
                <AuditRow label="NPL Ratio" fy={`${b.nplRatio}%`} q1={b.q1Status==='reported'?`${b.q1Npl}%`:'—'} q1Pending={b.q1Status!=='reported'} />
                <AuditRow label="NPL Amount" fy={fmtAED(b.grossLoans*b.nplRatio/100)} fyDerived q1={b.q1Status==='reported'?fmtAED(b.q1Loans*b.q1Npl/100):'—'} q1Derived q1Pending={b.q1Status!=='reported'} />
                <AuditRow label="Coverage" fy={`${b.coverageRatio}%`} q1={b.q1Status==='reported'?`${b.q1Coverage}%`:'—'} q1Pending={b.q1Status!=='reported'} />
                <AuditRow label="Impairment" fy={fmtAED(b.impairmentCharge)} q1={b.q1Status==='reported'?fmtAED(b.q1Impairment):'—'} q1Pending={b.q1Status!=='reported'} />
                <AuditRow label="Operating Income" fy={fmtAED(b.operatingIncome)} q1={b.q1Status==='reported'?fmtAED(b.q1OpIncome):'—'} q1Pending={b.q1Status!=='reported'} />
                <AuditRow label="ROE" fy={`${b.roe}%`} q1="—" q1Pending={true} q1Note="Quarterly ROE not consistently disclosed" />
                <AuditRow label="ROA" fy={b.totalAssets?`${(b.profit2025/b.totalAssets*100).toFixed(2)}%`:'—'} fyDerived q1={b.q1Status==='reported' && b.q1Assets?`${(b.q1Profit/b.q1Assets*400).toFixed(2)}%`:'—'} q1Derived q1Pending={b.q1Status!=='reported'} q1Note="Annualized" />
                <AuditRow label="L/D Ratio" fy={b.customerDeposits?`${(b.grossLoans/b.customerDeposits*100).toFixed(1)}%`:'—'} fyDerived q1={b.q1Status==='reported' && b.q1Deposits?`${(b.q1Loans/b.q1Deposits*100).toFixed(1)}%`:'—'} q1Derived q1Pending={b.q1Status!=='reported'} />
              </div>
              {b.q1Period && <div style={{ marginTop:8, fontSize:9.5, color:'#5A6878', fontStyle:'italic' }}>Q1 source: {b.q1Source || b.q1Period}</div>}
            </div>
            {b.irUrl && (
              <div style={{ marginTop:10, paddingTop:10, borderTop:'1px solid rgba(255,255,255,0.04)' }}>
                <a href={b.irUrl} target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'5px 11px', borderRadius:7, background:'rgba(96,165,250,0.1)', border:'1px solid rgba(96,165,250,0.25)', color:'#60A5FA', fontSize:10.5, fontWeight:600, textDecoration:'none' }}>
                  ↗ Verify with {b.name} IR page
                </a>
              </div>
            )}
          </details>
        ))}
      </div>

      <div style={{ marginTop:14, padding:12, background:'rgba(96,165,250,0.05)', borderRadius:9, borderLeft:'3px solid #60A5FA' }}>
        <p style={{ fontSize:10, color:'#A0B0C8', lineHeight:1.7 }}>
          <b style={{ color:'#60A5FA' }}>How to use:</b> Click any bank to expand all metrics with FY 2025 and Q1 2026 columns side-by-side. Pending Q1 cells stay yellow until results are released. "Verify with IR page" opens the bank's investor relations page. Export CSV to share or audit. To correct any number, edit <code style={{ background:'rgba(0,0,0,0.3)', padding:'1px 4px', borderRadius:3 }}>data/banks.js</code> on GitHub — Vercel will auto-deploy in ~60 seconds.
        </p>
      </div>
    </div>
  )
}

const DataRow = ({ label, value, src }) => (
  <div style={{ background:'rgba(0,0,0,0.2)', borderRadius:7, padding:'7px 9px', border:'1px solid rgba(255,255,255,0.03)' }}>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:2 }}>
      <span style={{ fontSize:9, color:'#5A6878', textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:600 }}>{label}</span>
      <span style={{ fontSize:7.5, padding:'1px 4px', borderRadius:3, background:src==='derived'?'rgba(96,165,250,0.15)':'rgba(74,222,128,0.12)', color:src==='derived'?'#60A5FA':'#4ADE80', fontWeight:700 }}>{src==='derived'?'Σ':'✓'}</span>
    </div>
    <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, fontWeight:700, color:'#E0E6ED' }}>{value}</div>
  </div>
)

const AuditRow = ({ label, fy, fyHint, fyDerived, q1, q1Hint, q1Derived, q1Pending, q1Note }) => (
  <div style={{ display:'grid', gridTemplateColumns:'minmax(95px, 130px) 1fr 1fr', gap:8, alignItems:'center', padding:'5px 0', borderBottom:'1px solid rgba(255,255,255,0.025)' }}>
    <span style={{ fontSize:10, color:'#6B7A8D', fontWeight:600 }}>{label}</span>
    <div style={{ background:'rgba(240,200,80,0.04)', borderRadius:5, padding:'5px 8px', border:'1px solid rgba(240,200,80,0.1)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:5 }}>
        <span style={{ fontSize:11.5, fontWeight:700, color:'#E0E6ED' }}>{fy}</span>
        {fyDerived && <span style={{ fontSize:7.5, padding:'1px 4px', borderRadius:3, background:'rgba(96,165,250,0.15)', color:'#60A5FA', fontWeight:700 }}>Σ</span>}
      </div>
      {fyHint && <div style={{ fontSize:8.5, color:'#5A6878', marginTop:1 }}>{fyHint}</div>}
    </div>
    <div style={{ background:q1Pending?'rgba(251,191,36,0.04)':'rgba(74,222,128,0.04)', borderRadius:5, padding:'5px 8px', border:q1Pending?'1px solid rgba(251,191,36,0.12)':'1px solid rgba(74,222,128,0.1)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:5 }}>
        <span style={{ fontSize:11.5, fontWeight:700, color:q1Pending?'#7A8699':'#E0E6ED' }}>{q1}</span>
        {q1Derived && !q1Pending && <span style={{ fontSize:7.5, padding:'1px 4px', borderRadius:3, background:'rgba(96,165,250,0.15)', color:'#60A5FA', fontWeight:700 }}>Σ</span>}
      </div>
      {(q1Hint || q1Note) && <div style={{ fontSize:8.5, color:'#5A6878', marginTop:1 }}>{q1Hint || q1Note}</div>}
    </div>
  </div>
)

// ─── AI DATA UPDATER TAB (admin only) ──────────────────────────────────────

function AIUpdaterTab({ adminKey }) {
  const [mode, setMode] = useState('manual') // 'ai' or 'manual'
  const [bankId, setBankId] = useState('')
  const [bankName, setBankName] = useState('')
  const [period, setPeriod] = useState('q1_2026')
  const [pressRelease, setPressRelease] = useState('')
  const [jsonInput, setJsonInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [promptCopied, setPromptCopied] = useState(false)

  const featuredBanks = ALL_BANKS.filter(b => b.featured && b.totalAssets > 0)
  const selectedBank = ALL_BANKS.find(b => b.id === bankId)

  const periodLabels = {
    fy2025: 'Full Year 2025 (FY 2025)',
    fy2026: 'Full Year 2026 (FY 2026)',
    q1_2026: 'Q1 2026 (three months ended 31 March 2026)',
    q2_2026: 'Q2 2026 / H1 2026 (six months ended 30 June 2026)',
    q3_2026: 'Q3 2026 / 9M 2026 (nine months ended 30 September 2026)',
  }

  const isQuarterly = period.startsWith('q')

  // Build the prompt for ChatGPT/Claude/Gemini
  const buildPrompt = (prText = '') => {
    const periodLabel = periodLabels[period] || period
    const prSection = prText.trim()
      ? `PRESS RELEASE TEXT:\n${prText.trim()}`
      : `PRESS RELEASE TEXT:\n>>> PASTE THE PRESS RELEASE TEXT HERE <<<\n(Replace the line above with the actual press release text)`

    if (isQuarterly) {
      return `You are extracting banking financial data from a UAE bank press release.

BANK: ${selectedBank?.name || bankName || '[bank name]'}
PERIOD: ${periodLabel}

INSTRUCTIONS:
1. Read the press release text below.
2. Extract numerical data with these RULES:
   - All AED amounts converted to BILLIONS (AED B). Example: "AED 5,400 million" -> 5.4
   - Percentages: just the number (2.4 not "2.4%")
   - If a figure is NOT clearly stated, use null
   - Do NOT estimate or guess - only extract what is explicitly stated
3. Return ONLY a JSON object with these fields (use null for missing fields):

{
  "q1Profit": <net profit AFTER tax in AED B>,
  "q1ProfitPrior": <same quarter previous year profit in AED B for YoY>,
  "q1Assets": <total assets at period end in AED B>,
  "q1Deposits": <customer deposits in AED B>,
  "q1Loans": <gross loans in AED B>,
  "q1Npl": <NPL ratio as percentage number>,
  "q1Coverage": <provision coverage ratio as percentage number>,
  "q1Impairment": <impairment charge in AED B>,
  "q1OpIncome": <total operating income in AED B>,
  "q1Period": "Q1 2026 reported",
  "q1Source": "<short citation, e.g. 'Press release Apr 23, 2026'>",
  "q1Status": "reported",
  "_notes": "<any caveats or fields you couldn't extract>"
}

CRITICAL: Output ONLY the JSON object. No markdown code fences, no preamble. Start with { end with }.

${prSection}`
    } else {
      return `You are extracting banking financial data from a UAE bank annual report or press release.

BANK: ${selectedBank?.name || bankName || '[bank name]'}
PERIOD: ${periodLabel}

INSTRUCTIONS:
1. Read the press release / annual report text below.
2. Extract numerical data with these RULES:
   - All AED amounts converted to BILLIONS (AED B). Example: "AED 5,400 million" -> 5.4
   - Percentages: just the number (2.4 not "2.4%")
   - If a figure is NOT clearly stated, use null
   - Do NOT estimate or guess - only extract what is explicitly stated
3. Return ONLY a JSON object with these fields (use null for missing fields):

{
  "profit2025": <net profit AFTER tax for full year in AED B>,
  "profit2024": <prior year net profit in AED B>,
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

CRITICAL: Output ONLY the JSON object. No markdown code fences, no preamble. Start with { end with }.

${prSection}`
    }
  }

  // Build snippet from extracted data (works for both AI and manual JSON)
  const buildSnippet = (data) => {
    if (isQuarterly) {
      const fields = ['q1Profit','q1Assets','q1Deposits','q1Loans','q1Npl','q1Coverage','q1Impairment','q1OpIncome','q1ProfitPrior']
      const parts = fields.filter(f => data[f] !== null && data[f] !== undefined).map(f => `${f}:${data[f]}`).join(', ')
      const periodStr = data.q1Period ? `, q1Period:"${data.q1Period}"` : ''
      const sourceStr = data.q1Source ? `, q1Source:"${String(data.q1Source).replace(/"/g, '\\"')}"` : ''
      return `${parts}, q1Status:"reported"${periodStr}${sourceStr}`
    } else {
      const fields = ['profit2025','profit2024','totalAssets','customerDeposits','totalEquity','grossLoans','retailLoans','corpLoans','nplRatio','nplPrior','coverageRatio','impairmentCharge','operatingIncome','yoyGrowth','roe']
      const parts = fields.filter(f => data[f] !== null && data[f] !== undefined).map(f => `${f}:${data[f]}`).join(', ')
      const periodStr = data.period ? `, period:"${data.period}"` : ''
      const sourceStr = data.sourceNote ? `, sourceNote:"${String(data.sourceNote).replace(/"/g, '\\"')}"` : ''
      return `${parts}, status:"reported"${periodStr}${sourceStr}`
    }
  }

  const handleAIExtract = async () => {
    if (!bankId || !pressRelease.trim()) {
      setError('Please pick a bank and paste the press release text')
      return
    }
    setLoading(true); setError(null); setResult(null); setCopied(false)
    try {
      const res = await fetch(`/api/extract?admin=${encodeURIComponent(adminKey)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bankId, bankName: selectedBank?.name || bankName, period, pressRelease })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `API error ${res.status}`)
      setResult(data)
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  const handleManualJSON = () => {
    if (!bankId) {
      setError('Please pick a bank first')
      return
    }
    if (!jsonInput.trim()) {
      setError('Please paste the JSON output from ChatGPT/Claude/Gemini')
      return
    }
    setError(null); setResult(null); setCopied(false)
    try {
      // Strip markdown fences if user accidentally pasted them
      const cleaned = jsonInput.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim()
      const parsed = JSON.parse(cleaned)
      const snippet = buildSnippet(parsed)
      setResult({ bankId, period, extracted: parsed, snippet, source: 'manual' })
    } catch (e) {
      setError(`Invalid JSON: ${e.message}. Make sure you copied just the {...} object.`)
    }
  }

  const copyPrompt = () => {
    if (!bankId) { setError('Pick a bank first to personalise the prompt'); return }
    setError(null)
    // Pass the press release text so it gets embedded inline — no manual replacement needed
    navigator.clipboard.writeText(buildPrompt(pressRelease))
    setPromptCopied(true)
    setTimeout(() => setPromptCopied(false), 2500)
  }

  const copySnippet = () => {
    if (result?.snippet) {
      navigator.clipboard.writeText(result.snippet)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const reset = () => {
    setResult(null); setError(null); setPressRelease(''); setJsonInput(''); setCopied(false)
  }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14, flexWrap:'wrap', gap:10 }}>
        <div>
          <h3 style={{ fontFamily:"'Fraunces',serif", fontSize:16, fontWeight:700, color:'#A78BFA', marginBottom:2, display:'flex', alignItems:'center', gap:8 }}>
            🤖 AI Data Updater <span style={{ padding:'2px 7px', borderRadius:4, background:'rgba(167,139,250,0.15)', color:'#A78BFA', fontSize:8, fontWeight:700, letterSpacing:'0.08em' }}>ADMIN</span>
          </h3>
          <p style={{ fontSize:11, color:'#4A5568' }}>Two ways to update bank data — copy snippet to banks.js</p>
        </div>
      </div>

      {/* Mode toggle */}
      <div style={{ display:'flex', gap:5, marginBottom:14, background:'rgba(255,255,255,0.03)', borderRadius:100, padding:3, border:'1px solid rgba(255,255,255,0.05)' }}>
        <button onClick={()=>{setMode('manual'); reset()}} style={{ flex:1, padding:'9px 0', border:'none', borderRadius:100, cursor:'pointer', background:mode==='manual'?'#A78BFA':'transparent', color:mode==='manual'?'#0B1120':'#7A8699', fontFamily:"'Outfit',sans-serif", fontWeight:mode==='manual'?700:500, fontSize:11.5 }}>📋 Manual JSON Paste (Free)</button>
        <button onClick={()=>{setMode('ai'); reset()}} style={{ flex:1, padding:'9px 0', border:'none', borderRadius:100, cursor:'pointer', background:mode==='ai'?'#A78BFA':'transparent', color:mode==='ai'?'#0B1120':'#7A8699', fontFamily:"'Outfit',sans-serif", fontWeight:mode==='ai'?700:500, fontSize:11.5 }}>🤖 AI Extract (uses API)</button>
      </div>

      {/* Step 1: Bank & Period (always shown) */}
      <div style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.04)', borderRadius:12, padding:'13px 14px', marginBottom:10 }}>
        <div style={{ fontSize:10, fontWeight:700, color:'#A78BFA', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>Step 1 — Bank & Period</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          <div>
            <label style={{ fontSize:10, color:'#6B7A8D', marginBottom:4, display:'block' }}>Bank</label>
            <select value={bankId} onChange={e=>{setBankId(e.target.value); const b=ALL_BANKS.find(x=>x.id===e.target.value); if(b) setBankName(b.name)}} style={{ width:'100%', padding:'9px 11px', borderRadius:8, border:'1px solid rgba(255,255,255,0.08)', background:'#0F1A2E', color:'#E0E6ED', fontSize:12, fontFamily:"'Outfit',sans-serif", outline:'none' }}>
              <option value="">— Select a bank —</option>
              {featuredBanks.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize:10, color:'#6B7A8D', marginBottom:4, display:'block' }}>Period</label>
            <select value={period} onChange={e=>setPeriod(e.target.value)} style={{ width:'100%', padding:'9px 11px', borderRadius:8, border:'1px solid rgba(255,255,255,0.08)', background:'#0F1A2E', color:'#E0E6ED', fontSize:12, fontFamily:"'Outfit',sans-serif", outline:'none' }}>
              <option value="q1_2026">Q1 2026</option>
              <option value="q2_2026">Q2 2026 / H1 2026</option>
              <option value="q3_2026">Q3 2026 / 9M 2026</option>
              <option value="fy2025">FY 2025 (annual)</option>
              <option value="fy2026">FY 2026 (annual)</option>
            </select>
          </div>
        </div>
      </div>

      {/* MANUAL MODE */}
      {mode === 'manual' && (
        <>
          {/* Step 2: Paste press release */}
          <div style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.04)', borderRadius:12, padding:'13px 14px', marginBottom:10 }}>
            <div style={{ fontSize:10, fontWeight:700, color:'#A78BFA', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>Step 2 — Paste the press release text</div>
            <textarea
              value={pressRelease}
              onChange={e=>setPressRelease(e.target.value)}
              placeholder="Paste the bank's press release or earnings announcement text here. Include all financial figures: profit, assets, deposits, loans, NPL ratio, coverage, impairment charges...&#10;&#10;Tip: Just copy-paste the entire press release — the AI will pick out only what it needs."
              style={{ width:'100%', minHeight:180, padding:'10px 12px', borderRadius:8, border:'1px solid rgba(255,255,255,0.08)', background:'#0F1A2E', color:'#E0E6ED', fontSize:11.5, fontFamily:"'Outfit',sans-serif", lineHeight:1.5, resize:'vertical', outline:'none' }}
            />
            <div style={{ marginTop:6, fontSize:10, color:'#4A5568', display:'flex', justifyContent:'space-between' }}>
              <span>{pressRelease.length.toLocaleString()} characters {pressRelease.length === 0 ? '· Paste the press release above' : '· ✓ Looks good'}</span>
              <span>No API call · ✓ Free</span>
            </div>
          </div>

          {/* Step 3: Copy prompt */}
          <div style={{ background:'rgba(74,222,128,0.04)', border:'1px solid rgba(74,222,128,0.18)', borderRadius:12, padding:'13px 14px', marginBottom:10 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8, flexWrap:'wrap', gap:6 }}>
              <span style={{ fontSize:10, fontWeight:700, color:'#4ADE80', textTransform:'uppercase', letterSpacing:'0.08em' }}>Step 3 — Send to ChatGPT / Claude / Gemini</span>
              <button onClick={copyPrompt} disabled={!bankId} style={{ padding:'8px 14px', borderRadius:7, border:'none', cursor:bankId?'pointer':'default', background:promptCopied?'#4ADE80':bankId?'rgba(74,222,128,0.2)':'#1A2438', color:promptCopied?'#0B1120':bankId?'#4ADE80':'#3A4558', fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:11 }}>
                {promptCopied ? '✓ Copied to clipboard!' : '📋 Copy complete prompt'}
              </button>
            </div>
            <div style={{ fontSize:11, color:'#A0B0C8', lineHeight:1.6, marginBottom:6 }}>
              {pressRelease.trim()
                ? <>The complete prompt <b style={{ color:'#4ADE80' }}>including your press release</b> will be copied. Just paste it into the AI — no editing needed.</>
                : <span style={{ color:'#FBBF24' }}>⚠ Paste the press release in Step 2 first, otherwise the prompt will be empty.</span>}
            </div>
            <ol style={{ fontSize:10.5, color:'#7A8699', lineHeight:1.7, paddingLeft:18, margin:0 }}>
              <li>Click <b style={{ color:'#4ADE80' }}>Copy complete prompt</b> above</li>
              <li>Open <a href="https://chat.openai.com" target="_blank" rel="noreferrer" style={{ color:'#60A5FA' }}>ChatGPT</a>, <a href="https://claude.ai" target="_blank" rel="noreferrer" style={{ color:'#60A5FA' }}>Claude</a>, or <a href="https://gemini.google.com" target="_blank" rel="noreferrer" style={{ color:'#60A5FA' }}>Gemini</a> in a new tab</li>
              <li>Paste (Ctrl+V) and press Enter — that's it. The press release is already embedded.</li>
              <li>Copy the JSON object from the AI's response</li>
              <li>Paste it in Step 4 below ↓</li>
            </ol>
          </div>

          {/* Step 4: Paste JSON */}
          <div style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.04)', borderRadius:12, padding:'13px 14px', marginBottom:10 }}>
            <div style={{ fontSize:10, fontWeight:700, color:'#A78BFA', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>Step 4 — Paste the JSON output from the AI</div>
            <textarea
              value={jsonInput}
              onChange={e=>setJsonInput(e.target.value)}
              placeholder={isQuarterly ? `{\n  "q1Profit": 1.95,\n  "q1ProfitPrior": 1.85,\n  "q1Assets": 425,\n  "q1Deposits": 285,\n  "q1Loans": 358,\n  "q1Npl": 3.2,\n  "q1Coverage": 105,\n  "q1Impairment": 0.3,\n  "q1OpIncome": 4.2,\n  "q1Period": "Q1 2026 reported",\n  "q1Source": "Press release Apr 28, 2026"\n}` : `{\n  "profit2025": 24.0,\n  "profit2024": 23.0,\n  "totalAssets": 1164,\n  ...\n}`}
              style={{ width:'100%', minHeight:160, padding:'10px 12px', borderRadius:8, border:'1px solid rgba(255,255,255,0.08)', background:'#0F1A2E', color:'#E0E6ED', fontSize:11, fontFamily:'monospace', lineHeight:1.5, resize:'vertical', outline:'none' }}
            />
            <div style={{ marginTop:6, fontSize:10, color:'#4A5568' }}>{jsonInput.length.toLocaleString()} characters {jsonInput.trim().startsWith('{') ? '· ✓ Looks like JSON' : jsonInput.length > 0 ? '· ⚠ Should start with {' : ''}</div>
          </div>

          <div style={{ display:'flex', gap:8, marginBottom:14 }}>
            <button onClick={handleManualJSON} disabled={!bankId || !jsonInput.trim()} style={{ flex:1, padding:'11px 0', borderRadius:9, border:'none', cursor:(!bankId||!jsonInput.trim())?'default':'pointer', background:(!bankId||!jsonInput.trim())?'#1A2438':'linear-gradient(135deg,#A78BFA,#8B5CF6)', color:(!bankId||!jsonInput.trim())?'#3A4558':'#fff', fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:12 }}>📋 Generate Snippet</button>
            {(result || error) && <button onClick={reset} style={{ padding:'11px 16px', borderRadius:9, border:'1px solid rgba(255,255,255,0.08)', cursor:'pointer', background:'rgba(255,255,255,0.04)', color:'#7A8699', fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:11 }}>Reset</button>}
          </div>
        </>
      )}

      {/* AI MODE */}
      {mode === 'ai' && (
        <>
          <div style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.04)', borderRadius:12, padding:'13px 14px', marginBottom:10 }}>
            <div style={{ fontSize:10, fontWeight:700, color:'#A78BFA', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>Step 2 — Paste press release</div>
            <textarea
              value={pressRelease}
              onChange={e=>setPressRelease(e.target.value)}
              placeholder="Paste the bank's press release or earnings announcement text here. Include all financial figures: profit, assets, deposits, loans, NPL ratio, coverage, impairment charges..."
              style={{ width:'100%', minHeight:200, padding:'10px 12px', borderRadius:8, border:'1px solid rgba(255,255,255,0.08)', background:'#0F1A2E', color:'#E0E6ED', fontSize:11.5, fontFamily:"'Outfit',sans-serif", lineHeight:1.5, resize:'vertical', outline:'none' }}
            />
            <div style={{ marginTop:6, fontSize:10, color:'#4A5568', display:'flex', justifyContent:'space-between' }}>
              <span>{pressRelease.length.toLocaleString()} characters · {pressRelease.length > 50000 ? '⚠️ Too long' : '✓ OK'}</span>
              <span>Cost per extraction: ~$0.001</span>
            </div>
          </div>

          <div style={{ display:'flex', gap:8, marginBottom:14 }}>
            <button onClick={handleAIExtract} disabled={loading || !bankId || !pressRelease.trim()} style={{ flex:1, padding:'11px 0', borderRadius:9, border:'none', cursor:(loading||!bankId||!pressRelease.trim())?'default':'pointer', background:(loading||!bankId||!pressRelease.trim())?'#1A2438':'linear-gradient(135deg,#A78BFA,#8B5CF6)', color:(loading||!bankId||!pressRelease.trim())?'#3A4558':'#fff', fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:12 }}>
              {loading ? '⟳ Extracting with Claude...' : '🤖 Extract Data'}
            </button>
            {(result || error) && <button onClick={reset} style={{ padding:'11px 16px', borderRadius:9, border:'1px solid rgba(255,255,255,0.08)', cursor:'pointer', background:'rgba(255,255,255,0.04)', color:'#7A8699', fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:11 }}>Reset</button>}
          </div>
        </>
      )}

      {error && (
        <div style={{ padding:'10px 12px', background:'rgba(248,113,113,0.06)', borderRadius:8, border:'1px solid rgba(248,113,113,0.2)', marginBottom:12, fontSize:11.5, color:'#F87171' }}>
          ❌ {error}
        </div>
      )}

      {result && (
        <div>
          {/* Extracted data preview */}
          <div style={{ background:'rgba(74,222,128,0.04)', border:'1px solid rgba(74,222,128,0.2)', borderRadius:12, padding:'13px 14px', marginBottom:10 }}>
            <div style={{ fontSize:10, fontWeight:700, color:'#4ADE80', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10, display:'flex', alignItems:'center', gap:6 }}>
              ✓ {result.source === 'manual' ? 'Parsed from JSON' : 'Extracted'} — review before applying
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:6 }}>
              {Object.entries(result.extracted).filter(([k,v]) => k !== '_notes' && v !== null && v !== undefined).map(([k,v]) => (
                <div key={k} style={{ background:'rgba(0,0,0,0.25)', borderRadius:7, padding:'6px 9px', border:'1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ fontSize:9, color:'#5A6878', textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:600, marginBottom:2 }}>{k}</div>
                  <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:11.5, fontWeight:700, color:'#E0E6ED' }}>{String(v)}</div>
                </div>
              ))}
            </div>
            {result.extracted._notes && (
              <div style={{ marginTop:10, padding:'7px 10px', background:'rgba(245,158,11,0.06)', borderRadius:7, border:'1px solid rgba(245,158,11,0.15)', fontSize:10.5, color:'#FBBF24' }}>
                <b>Notes:</b> {result.extracted._notes}
              </div>
            )}
          </div>

          {/* Snippet */}
          <div style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.05)', borderRadius:12, padding:'13px 14px', marginBottom:10 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
              <span style={{ fontSize:10, fontWeight:700, color:'#F0C850', textTransform:'uppercase', letterSpacing:'0.08em' }}>{mode==='manual' ? 'Step 5 — Copy snippet to banks.js' : 'Step 3 — Copy snippet to banks.js'}</span>
              <button onClick={copySnippet} style={{ padding:'5px 12px', borderRadius:7, border:'none', cursor:'pointer', background:copied?'#4ADE80':'rgba(240,200,80,0.15)', color:copied?'#0B1120':'#F0C850', fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:10.5 }}>
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
            <pre style={{ background:'#0B1120', padding:'10px 12px', borderRadius:7, fontSize:10.5, color:'#E0E6ED', overflowX:'auto', fontFamily:'monospace', lineHeight:1.6, whiteSpace:'pre-wrap', wordBreak:'break-all' }}>{result.snippet}</pre>
          </div>

          {/* Apply instructions */}
          <div style={{ background:'rgba(96,165,250,0.05)', border:'1px solid rgba(96,165,250,0.15)', borderRadius:12, padding:'13px 14px' }}>
            <div style={{ fontSize:10, fontWeight:700, color:'#60A5FA', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>{mode==='manual' ? 'Step 6 — Apply on GitHub' : 'Step 4 — Apply on GitHub'}</div>
            <ol style={{ fontSize:11.5, color:'#A0B0C8', lineHeight:1.8, paddingLeft:18, margin:0 }}>
              <li>Open <code style={{ background:'rgba(0,0,0,0.3)', padding:'1px 5px', borderRadius:3, fontSize:10.5 }}>data/banks.js</code> on GitHub → click ✏️ to edit</li>
              <li>Find <code style={{ background:'rgba(0,0,0,0.3)', padding:'1px 5px', borderRadius:3, fontSize:10.5 }}>id:&quot;{result.bankId}&quot;</code></li>
              <li>{isQuarterly ? 'Replace the existing q1Status:"pending"... fields' : 'Replace the existing FY fields'} with the snippet above</li>
              <li>Commit changes — Vercel auto-deploys in ~60 seconds</li>
            </ol>
          </div>
        </div>
      )}

      <div style={{ marginTop:14, padding:12, background:'rgba(167,139,250,0.04)', borderRadius:9, borderLeft:'3px solid #A78BFA' }}>
        <p style={{ fontSize:10, color:'#A0B0C8', lineHeight:1.7 }}>
          <b style={{ color:'#A78BFA' }}>Two ways to extract data:</b><br/>
          <b style={{ color:'#4ADE80' }}>Manual (free):</b> Use ChatGPT/Claude/Gemini outside the app, paste back the JSON. No API cost.<br/>
          <b style={{ color:'#A78BFA' }}>AI Extract:</b> Uses your Anthropic API key inside the app (~$0.001 per extraction). Faster but uses credit. Always review numbers before applying.
        </p>
      </div>
    </div>
  )
}



export default function BankingHub() {
  const [tab, setTab] = useState('financials')
  const [activeBankIds, setActiveBankIds] = useState(() => ALL_BANKS.filter(b => b.featured).map(b => b.id))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [methodOpen, setMethodOpen] = useState(false)
  const [adminKey, setAdminKey] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const key = params.get('admin')
      if (key) setAdminKey(key)
    }
  }, [])

  const toggleBank = id => setActiveBankIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
  const tabs = [
    { key:'financials', label:'Financials', icon:'📊' },
    { key:'directory',  label:'Directory',  icon:'🏛️' },
    { key:'news',       label:'News',       icon:'📰' },
    { key:'compare',    label:'Compare',    icon:'⚖️' },
    { key:'audit',      label:'Audit',      icon:'🔍' },
    ...(adminKey ? [{ key:'updater', label:'AI Updater', icon:'🤖' }] : []),
  ]

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(180deg,#080E1A 0%,#0B1120 40%,#0E1528 100%)', fontFamily:"'Outfit',sans-serif", color:'#E0E6ED' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Fraunces:wght@600;700;800&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { from { opacity:0.2; } to { opacity:0.05; } }
        @keyframes slideUp { from { transform:translateY(100%); } to { transform:translateY(0); } }
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { height:3px; width:3px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:#2A3448; border-radius:3px; }
        input::placeholder { color:#4A5568; }
      `}</style>

      {/* Header */}
      <div style={{ background:'linear-gradient(160deg,#0F1A2E 0%,#162440 50%,#1A2D4A 100%)', padding:'30px 16px 22px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-35, right:-35, width:140, height:140, borderRadius:'50%', background:'radial-gradient(circle,rgba(240,200,80,0.07) 0%,transparent 70%)' }}/>
        <div style={{ maxWidth:900, margin:'0 auto', position:'relative' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <span style={{ fontSize:9, color:'#6B7A8D', fontWeight:500 }}>by <span style={{ color:'#A78BFA', fontWeight:700 }}>Vishal Vibin</span></span>
            <div style={{ display:'flex', gap:5, alignItems:'center' }}>
              <button onClick={()=>setMethodOpen(true)} style={{ padding:'3px 8px', borderRadius:4, background:'rgba(139,92,246,0.1)', color:'#A78BFA', border:'1px solid rgba(139,92,246,0.25)', cursor:'pointer', fontFamily:"'Outfit',sans-serif", fontSize:9, fontWeight:700, letterSpacing:'0.06em' }}>ⓘ METHOD</button>
              <span style={{ padding:'3px 8px', borderRadius:4, background:'rgba(139,92,246,0.15)', color:'#A78BFA', fontSize:8, fontWeight:700, letterSpacing:'0.08em' }}>BETA v2.0</span>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
            <span style={{ fontSize:9, letterSpacing:'0.14em', color:'#F0C850', fontWeight:700, textTransform:'uppercase' }}>UAE Banking Intelligence Hub</span>
            <span style={{ width:20, height:1, background:'#F0C85030' }}/>
            <span style={{ fontSize:9, color:'#3A4558' }}>{ALL_BANKS.length} banks</span>
          </div>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:'clamp(22px,5vw,34px)', fontWeight:800, color:'#F0E6D3', lineHeight:1.15, marginBottom:4 }}>
            Research-Grade<br/><span style={{ color:'#F0C850' }}>Banking Intelligence</span>
          </h1>
          <p style={{ fontSize:12, color:'#4A5568', maxWidth:420, lineHeight:1.5 }}>
            Built from official disclosures, filings, and market sources — with Reported, Derived, Estimated, and Indicative labels.
          </p>
          <div style={{ marginTop:8, display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#4ADE80' }}/>
            <span style={{ fontSize:9.5, color:'#4A5568' }}>Data as of: FY 2025 annual results · Q1 2026 (8 banks reported, 14 pending)</span>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ position:'sticky', top:0, zIndex:50, background:'rgba(11,17,32,0.92)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(255,255,255,0.035)' }}>
        <div style={{ maxWidth:900, margin:'0 auto', display:'flex' }}>
          {tabs.map(t => <button key={t.key} onClick={()=>setTab(t.key)} style={{ flex:1, padding:'12px 0', border:'none', cursor:'pointer', background:'transparent', display:'flex', alignItems:'center', justifyContent:'center', gap:4, fontFamily:"'Outfit',sans-serif", fontWeight:tab===t.key?700:500, fontSize:11.5, color:tab===t.key?'#F0C850':'#4A5568', borderBottom:tab===t.key?'2px solid #F0C850':'2px solid transparent' }}><span style={{ fontSize:13 }}>{t.icon}</span>{t.label}</button>)}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth:900, margin:'0 auto', padding:'16px 12px 65px' }}>
        {tab==='financials' && <FinancialsTab activeBankIds={activeBankIds} onOpenDrawer={()=>setDrawerOpen(true)} onOpenMethodology={()=>setMethodOpen(true)} />}
        {tab==='directory'  && <DirectoryTab activeBankIds={activeBankIds} onOpenDrawer={()=>setDrawerOpen(true)} />}
        {tab==='news'       && <NewsTab/>}
        {tab==='compare'    && <CompareTab activeBankIds={activeBankIds} onOpenDrawer={()=>setDrawerOpen(true)} />}
        {tab==='audit'      && <AuditTab activeBankIds={activeBankIds} />}
        {tab==='updater'    && adminKey && <AIUpdaterTab adminKey={adminKey} />}
      </div>

      {/* Footer */}
      <div style={{ textAlign:'center', padding:'20px 12px', borderTop:'1px solid rgba(255,255,255,0.025)' }}>
        <div style={{ fontSize:9.5, color:'#2D3A4E', marginBottom:6 }}>CBUAE Register (June 2025) · FY 2025 bank filings · Data indicative — verify with your bank</div>
        <div style={{ fontSize:9, color:'#3A4558' }}>Developed by <span style={{ color:'#A78BFA', fontWeight:600 }}>Vishal Vibin</span> · © 2026 · <span style={{ color:'#4A5568' }}>Beta v2.0</span></div>
      </div>

      <AddBankDrawer visible={drawerOpen} activeBankIds={activeBankIds} onToggle={toggleBank} onClose={()=>setDrawerOpen(false)} />
      <MethodologyDrawer visible={methodOpen} onClose={()=>setMethodOpen(false)} />
    </div>
  )
}
