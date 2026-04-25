// UAE Banks Database — enhanced with balance sheet + asset quality fields
// Sources: Annual reports, ADX/DFM filings, investor presentations, CBUAE Register (June 2025)
// Status labels: reported | derived | estimated | indicative

export const ALL_BANKS = [
  // ═══════════════════════════════════════════════════════════════════════════
  // NATIONAL CONVENTIONAL BANKS
  // ═══════════════════════════════════════════════════════════════════════════
  { id:"enbd", name:"Emirates NBD", color:"#0066B3", type:"Conventional", category:"national", hq:"Dubai", exchange:"DFM", est:1963, profit2025:24.0, profit2024:23.0, totalAssets:1164, yoyGrowth:4, roe:21.0, nplRatio:2.4, grossLoans:661, nplPrior:3.3, coverageRatio:158, retailLoans:245, corpLoans:455, customerDeposits:781, totalEquity:119, impairmentCharge:1.5, operatingIncome:49.3, status:"reported", period:"FY2025 audited", sourceNote:"Press release Jan 26, 2026 + Q4 2025 financial statements", featured:true, hasProducts:true, irUrl:"https://www.emiratesnbd.com/en/investor-relations/financial-information", q1Profit:6.4, q1Assets:1220, q1Deposits:830, q1Loans:703, q1Npl:2.3, q1Coverage:157, q1Impairment:0.8, q1OpIncome:14.4, q1ProfitPrior:6.2, q1Status:"reported", q1Period:"Q1 2026 reported", q1Source:"Press release Apr 23, 2026" },
  { id:"fab", name:"First Abu Dhabi Bank", color:"#003B5C", type:"Conventional", category:"national", hq:"Abu Dhabi", exchange:"ADX", est:1968, profit2025:21.11, profit2024:17.0, totalAssets:1404, yoyGrowth:24, roe:19.2, nplRatio:2.2, grossLoans:668, nplPrior:3.4, coverageRatio:108, retailLoans:155, corpLoans:461, customerDeposits:841, totalEquity:121, impairmentCharge:3.3, operatingIncome:36.68, status:"reported", period:"FY2025 audited", sourceNote:"Press release Jan 28, 2026 + investor presentation", featured:true, hasProducts:true, irUrl:"https://www.bankfab.com/en-ae/about-fab/investor-relations", q1Profit:5.01, q1Assets:1490, q1Deposits:871, q1Loans:668, q1Npl:2.4, q1Coverage:92, q1Impairment:1.1, q1OpIncome:9.34, q1ProfitPrior:5.11, q1Status:"reported", q1Period:"Q1 2026 reported", q1Source:"Press release Apr 23, 2026" },
  { id:"adcb", name:"ADCB", color:"#D4145A", type:"Conventional", category:"national", hq:"Abu Dhabi", exchange:"ADX", est:1985, profit2025:11.445, profit2024:9.4, totalAssets:774, yoyGrowth:22, roe:15.3, nplRatio:1.83, grossLoans:406, nplPrior:3.04, coverageRatio:249, retailLoans:130, corpLoans:276, customerDeposits:500, totalEquity:75, impairmentCharge:2.4, operatingIncome:21.6, status:"reported", period:"FY2025 audited", sourceNote:"ADX Q4 2025 MD&A filing + press release Jan 29, 2026", featured:true, hasProducts:true, irUrl:"https://www.adcb.com/en/about-us/investor-relations/financial-reports/", q1Profit:3.36, q1Assets:809, q1Deposits:523, q1Loans:426, q1Npl:1.8, q1Coverage:190, q1Impairment:0.64, q1OpIncome:5.94, q1ProfitPrior:2.45, q1Status:"reported", q1Period:"Q1 2026 reported", q1Source:"Press release Apr 23, 2026" },
  { id:"mashreq", name:"Mashreq", color:"#E8442A", type:"Conventional", category:"national", hq:"Dubai", exchange:"DFM", est:1967, profit2025:7.0, profit2024:8.8, totalAssets:335, yoyGrowth:-20, roe:20.0, nplRatio:1.0, grossLoans:230, nplPrior:1.35, coverageRatio:263, retailLoans:55, corpLoans:175, customerDeposits:205, totalEquity:30, impairmentCharge:0.3, operatingIncome:12.6, status:"reported", period:"FY2025 audited", sourceNote:"Press release Jan 27, 2026 + 9M 2025 MD&A", featured:true, hasProducts:true, irUrl:"https://www.mashreq.com/en/uae/about-us/investors/", q1Status:"pending", q1Period:"Q1 2026 not yet reported" },
  { id:"cbd", name:"Commercial Bank of Dubai", color:"#1C4587", type:"Conventional", category:"national", hq:"Dubai", exchange:"DFM", est:1969, profit2025:2.8, profit2024:2.5, totalAssets:120, yoyGrowth:12, roe:22.0, nplRatio:3.5, grossLoans:80, nplPrior:4.5, coverageRatio:95, retailLoans:28, corpLoans:52, customerDeposits:82, totalEquity:12, impairmentCharge:0.55, operatingIncome:4.8, status:"reported", period:"FY2025 audited", sourceNote:"Annual report", featured:true, hasProducts:true, irUrl:"https://www.cbd.ae/general/investor-relations", q1Profit:0.83, q1Assets:157.9, q1Deposits:109.6, q1Loans:102.1, q1Npl:3.5, q1Coverage:95, q1Impairment:0.15, q1OpIncome:1.456, q1ProfitPrior:0.83, q1Status:"reported", q1Period:"Q1 2026 reported", q1Source:"Press release Apr 23, 2026" },
  { id:"rak", name:"RAKBANK", color:"#E31837", type:"Conventional", category:"national", hq:"Ras Al Khaimah", exchange:"ADX", est:1976, profit2025:2.6, profit2024:2.1, totalAssets:105, yoyGrowth:26, roe:22.1, nplRatio:1.9, grossLoans:56, nplPrior:2.2, coverageRatio:120, retailLoans:32, corpLoans:24, customerDeposits:71, totalEquity:11.7, impairmentCharge:0.5, operatingIncome:5.2, status:"reported", period:"FY2025 audited", sourceNote:"Press release Jan 27, 2026", featured:true, hasProducts:true, irUrl:"https://www.rakbank.ae/en/about-us/investor-relations", q1Profit:1.0, q1Assets:107.3, q1Deposits:74.3, q1Loans:57, q1Npl:1.9, q1Coverage:277, q1Impairment:0.05, q1OpIncome:1.5, q1ProfitPrior:0.7, q1Status:"reported", q1Period:"Q1 2026 reported", q1Source:"Press release Apr 20, 2026" },
  { id:"nbf", name:"National Bank of Fujairah", color:"#00695C", type:"Conventional", category:"national", hq:"Fujairah", exchange:"ADX", est:1984, profit2025:1.2, profit2024:0.85, totalAssets:65, yoyGrowth:42, roe:14.0, nplRatio:3.95, grossLoans:37.5, nplPrior:5.12, coverageRatio:85, retailLoans:5, corpLoans:32.5, customerDeposits:42, totalEquity:8.5, impairmentCharge:0.4, operatingIncome:2.8, status:"reported", period:"FY2025 audited", sourceNote:"NBF press release Jan 28, 2026 + ADX filing", featured:true, hasProducts:false, irUrl:"https://www.nbf.ae/en/about/investor-relations", q1Status:"pending", q1Period:"Q1 2026 not yet reported" },
  { id:"bos", name:"Bank of Sharjah", color:"#2E7D32", type:"Conventional", category:"national", hq:"Sharjah", exchange:"ADX", est:1973, profit2025:0.73, profit2024:0.39, totalAssets:40, yoyGrowth:89, roe:10.0, nplRatio:4.5, grossLoans:22, nplPrior:5.5, coverageRatio:80, retailLoans:4, corpLoans:18, customerDeposits:26, totalEquity:4.2, impairmentCharge:0.18, operatingIncome:1.3, status:"reported", period:"FY2025 audited", sourceNote:"Annual report", featured:true, hasProducts:false, irUrl:"https://bankofsharjah.com/investors/", q1Status:"pending", q1Period:"Q1 2026 not yet reported" },
  { id:"cbi", name:"Commercial Bank International", color:"#5C6BC0", type:"Conventional", category:"national", hq:"Dubai", exchange:"ADX", est:1991, profit2025:0.30, profit2024:0.21, totalAssets:22, yoyGrowth:40, roe:12.0, nplRatio:3.8, grossLoans:15, nplPrior:4.8, coverageRatio:90, retailLoans:3, corpLoans:12, customerDeposits:14, totalEquity:2.5, impairmentCharge:0.09, operatingIncome:0.85, status:"reported", period:"FY2025 audited", sourceNote:"Annual report", featured:true, hasProducts:false, irUrl:"https://www.cbiuae.com/en/about-us/investor-relations", q1Status:"pending", q1Period:"Q1 2026 not yet reported" },
  { id:"uab", name:"United Arab Bank", color:"#6D4C41", type:"Conventional", category:"national", hq:"Sharjah", exchange:"ADX", est:1975, profit2025:0.42, profit2024:0.28, totalAssets:26, yoyGrowth:49, roe:15.6, nplRatio:4.2, grossLoans:16, nplPrior:5.5, coverageRatio:95, retailLoans:4, corpLoans:12, customerDeposits:17.4, totalEquity:2.7, impairmentCharge:0.31, operatingIncome:1.05, status:"estimated", period:"Estimated from 9M 2025", sourceNote:"9M filing annualized", featured:true, hasProducts:false, irUrl:"https://www.uab.ae/en/about/investor-relations", q1Profit:0.075, q1Assets:26.9, q1Deposits:16.7, q1Loans:15.1, q1Npl:4.0, q1Coverage:95, q1Impairment:0.018, q1OpIncome:0.193, q1ProfitPrior:0.07, q1Status:"reported", q1Period:"Q1 2026 reported", q1Source:"Press release Apr 22, 2026" },
  { id:"investbank", name:"InvestBank", color:"#546E7A", type:"Conventional", category:"national", hq:"Sharjah", exchange:"Private", est:1975, profit2025:0.12, profit2024:0.10, totalAssets:12, yoyGrowth:20, roe:6.0, nplRatio:5.0, grossLoans:7, nplPrior:6.0, coverageRatio:75, retailLoans:2, corpLoans:5, customerDeposits:8, totalEquity:1.5, impairmentCharge:0.05, operatingIncome:0.4, status:"estimated", period:"Estimated FY2025", sourceNote:"Prior trends + limited disclosure", featured:true, hasProducts:false, irUrl:"https://www.investbank.ae/about-us/investor-relations", q1Status:"pending", q1Period:"Q1 2026 not yet reported" },
  { id:"nbq", name:"National Bank of Umm Al Qaiwain", color:"#795548", type:"Conventional", category:"national", hq:"Umm Al Quwain", exchange:"ADX", est:1982, profit2025:0.62, profit2024:0.53, totalAssets:23, yoyGrowth:17, roe:10.0, nplRatio:3.0, grossLoans:14, nplPrior:3.8, coverageRatio:100, retailLoans:4, corpLoans:10, customerDeposits:15, totalEquity:2.8, impairmentCharge:0.11, operatingIncome:0.95, status:"estimated", period:"Estimated from 9M 2025", sourceNote:"9M filing annualized", featured:true, hasProducts:false, irUrl:"https://www.nbq.ae/en/about-us/investor-relations", q1Status:"pending", q1Period:"Q1 2026 not yet reported" },
  { id:"abit", name:"Arab Bank for Inv. & Foreign Trade", color:"#37474F", type:"Conventional", category:"national", hq:"Abu Dhabi", exchange:"Private", est:1976, profit2025:0.10, profit2024:0.08, totalAssets:8, yoyGrowth:25, roe:0, nplRatio:3.5, grossLoans:4, nplPrior:4.0, coverageRatio:90, retailLoans:0.5, corpLoans:3.5, customerDeposits:5.5, totalEquity:1.0, impairmentCharge:0.04, operatingIncome:0.28, status:"estimated", period:"Estimated FY2025", sourceNote:"Limited public disclosure", featured:true, hasProducts:false, irUrl:"https://www.abifteam.ae/", q1Status:"pending", q1Period:"Q1 2026 not yet reported" },
  { id:"eib", name:"Emirates Investment Bank", color:"#455A64", type:"Conventional", category:"national", hq:"Dubai", exchange:"Private", est:1976, profit2025:0.05, profit2024:0.04, totalAssets:4, yoyGrowth:25, roe:0, nplRatio:2.0, grossLoans:2, nplPrior:2.5, coverageRatio:100, retailLoans:0, corpLoans:2, customerDeposits:2.5, totalEquity:0.6, impairmentCharge:0.01, operatingIncome:0.15, status:"estimated", period:"Estimated FY2025", sourceNote:"Limited public disclosure", featured:true, hasProducts:false, irUrl:"https://www.eib.ae/about-us", q1Status:"pending", q1Period:"Q1 2026 not yet reported" },

  // ═══════════════════════════════════════════════════════════════════════════
  // NATIONAL ISLAMIC BANKS
  // ═══════════════════════════════════════════════════════════════════════════
  { id:"dib", name:"Dubai Islamic Bank", color:"#006838", type:"Islamic", category:"national", hq:"Dubai", exchange:"DFM", est:1975, profit2025:7.8, profit2024:7.2, totalAssets:416, yoyGrowth:8, roe:22, nplRatio:3.4, grossLoans:353, nplPrior:4.0, coverageRatio:110, retailLoans:120, corpLoans:230, customerDeposits:320, totalEquity:38, impairmentCharge:0.5, operatingIncome:13.3, status:"reported", period:"FY2025 audited", sourceNote:"2025 Annual Report (MarketScreener Feb 2026) + Q3 2025 disclosures", featured:true, hasProducts:true, irUrl:"https://www.dib.ae/about-us/investor-relations/financial-information", q1Status:"pending", q1Period:"Q1 2026 not yet reported" },
  { id:"adib", name:"Abu Dhabi Islamic Bank", color:"#7B2D8E", type:"Islamic", category:"national", hq:"Abu Dhabi", exchange:"ADX", est:1997, profit2025:7.1, profit2024:6.1, totalAssets:281, yoyGrowth:16, roe:29.0, nplRatio:2.8, grossLoans:186, nplPrior:4.0, coverageRatio:172.5, retailLoans:80, corpLoans:120, customerDeposits:229, totalEquity:32.4, impairmentCharge:0.5, operatingIncome:12.3, status:"reported", period:"FY2025 audited", sourceNote:"Q4 2025 MD&A PDF + Zawya Jan 21, 2026", featured:true, hasProducts:true, irUrl:"https://www.adib.ae/en/about-adib/investor-relations", q1Status:"pending", q1Period:"Q1 2026 not yet reported" },
  { id:"ei", name:"Emirates Islamic", color:"#00838F", type:"Islamic", category:"national", hq:"Dubai", exchange:"ENBD subsidiary", est:1976, profit2025:3.4, profit2024:2.9, totalAssets:100, yoyGrowth:17, roe:22.0, nplRatio:2.5, grossLoans:65, nplPrior:3.0, coverageRatio:115, retailLoans:25, corpLoans:40, customerDeposits:70, totalEquity:11, impairmentCharge:0.45, operatingIncome:4.5, status:"reported", period:"FY2025 audited", sourceNote:"Annual report (ENBD group)", featured:true, hasProducts:false, irUrl:"https://www.emiratesislamic.ae/en/about-us/investor-relations", q1Profit:0.9, q1Assets:149, q1Deposits:109, q1Loans:94, q1Npl:2.5, q1Coverage:153, q1Impairment:0.2, q1OpIncome:1.5, q1ProfitPrior:1.07, q1Status:"reported", q1Period:"Q1 2026 reported", q1Source:"Press release Apr 23, 2026" },
  { id:"sib", name:"Sharjah Islamic Bank", color:"#4E342E", type:"Islamic", category:"national", hq:"Sharjah", exchange:"ADX", est:1975, profit2025:1.32, profit2024:1.05, totalAssets:90, yoyGrowth:26, roe:17.0, nplRatio:3.0, grossLoans:44, nplPrior:3.8, coverageRatio:110, retailLoans:14, corpLoans:30, customerDeposits:61, totalEquity:9.2, impairmentCharge:0.25, operatingIncome:3.0, status:"reported", period:"FY2025 audited", sourceNote:"Annual report", featured:true, hasProducts:false, irUrl:"https://www.sib.ae/en/about-us/investor-relations", q1Profit:0.38, q1Assets:90.9, q1Deposits:62, q1Loans:46.8, q1Npl:3.0, q1Coverage:110, q1Impairment:0.08, q1OpIncome:0.644, q1ProfitPrior:0.32, q1Status:"reported", q1Period:"Q1 2026 reported", q1Source:"Press release Apr 14, 2026" },
  { id:"ajman", name:"Ajman Bank", color:"#C75B12", type:"Islamic", category:"national", hq:"Ajman", exchange:"DFM", est:2008, profit2025:0.50, profit2024:0.40, totalAssets:32.9, yoyGrowth:25, roe:15.6, nplRatio:8.6, grossLoans:18, nplPrior:9.86, coverageRatio:65, retailLoans:7, corpLoans:11, customerDeposits:21.7, totalEquity:3.3, impairmentCharge:0.48, operatingIncome:1.42, status:"reported", period:"FY2025 audited", sourceNote:"Annual report + AGM filing", featured:true, hasProducts:true, irUrl:"https://www.ajmanbank.ae/about-us/investor-relations", q1Status:"pending", q1Period:"Q1 2026 not yet reported" },
  { id:"alhilal", name:"Al Hilal Bank", color:"#8B6914", type:"Islamic", category:"digital", hq:"Abu Dhabi", exchange:"ADCB subsidiary", est:2007, profit2025:-0.0193, totalAssets:10.46, customerDeposits:7.43, grossLoans:4.18, operatingIncome:0.3798, status:"reported", period:"FY2025 audited", sourceNote:"Al Hilal Bank FY2025 press release summary table", featured:true, hasProducts:true, note:"Loss-making", irUrl:"https://www.alhilalbank.ae/en/about-us/investor-relations", q1Status:"pending", q1Period:"Q1 2026 not yet reported" },

  // ═══════════════════════════════════════════════════════════════════════════
  // DIGITAL BANKS
  // ═══════════════════════════════════════════════════════════════════════════
  { id:"wio", name:"Wio Bank", color:"#FF6B00", type:"Digital", category:"digital", hq:"Abu Dhabi", exchange:"Private", est:2022, profit2025:0.62, profit2024:0.40, totalAssets:61, yoyGrowth:57, roe:0, nplRatio:0.5, grossLoans:15, nplPrior:0.8, coverageRatio:150, retailLoans:4, corpLoans:11, customerDeposits:43, totalEquity:6.2, impairmentCharge:0.08, operatingIncome:1.21, status:"reported", period:"FY2025 reported", sourceNote:"Company disclosures", featured:true, hasProducts:false, irUrl:"https://www.wio.io/about-us", q1Status:"pending", q1Period:"Q1 2026 not yet reported" },
  { id:"zand", name:"Zand Bank", color:"#FF4081", type:"Digital", category:"digital", hq:"Dubai", exchange:"Private", est:2022, profit2025:0, profit2024:0, totalAssets:5, yoyGrowth:0, roe:0, nplRatio:0, grossLoans:1, nplPrior:0, coverageRatio:0, retailLoans:0.3, corpLoans:0.7, customerDeposits:3, totalEquity:1.2, impairmentCharge:0, operatingIncome:0.08, status:"estimated", period:"Early stage", sourceNote:"Limited disclosure", featured:true, hasProducts:false, irUrl:"https://zand.ae/about-us", q1Status:"pending", q1Period:"Q1 2026 not yet reported" },

  // ═══════════════════════════════════════════════════════════════════════════
  // FOREIGN BANKS — RETAIL (operating branches in UAE)
  // ═══════════════════════════════════════════════════════════════════════════
  { id:"hsbc", name:"HSBC Middle East", color:"#DB0011", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"LSE: HSBA", est:1946, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE entity not separately reported", sourceNote:"Group financials only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"sc", name:"Standard Chartered", color:"#0072AA", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"LSE: STAN", est:1958, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE entity not separately reported", sourceNote:"Group financials only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"citi", name:"Citibank", color:"#003B70", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"NYSE: C", est:1964, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE entity not separately reported", sourceNote:"Group financials only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"hbl", name:"Habib Bank Ltd.", color:"#006341", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"PSX: HBL", est:1967, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE branch", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"ubl", name:"United Bank Ltd.", color:"#1A237E", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"PSX: UBL", est:1967, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE branch", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"bob", name:"Bank of Baroda", color:"#F15A29", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"NSE: BANKBARODA", est:1974, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE branch", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"habibag", name:"Habib Bank AG Zurich", color:"#1B5E20", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"Private", est:1974, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"Private", sourceNote:"Not publicly disclosed", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"bnp", name:"BNP Paribas", color:"#00965E", type:"Conventional", category:"foreign", hq:"Abu Dhabi", exchange:"Euronext: BNP", est:1973, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE branch", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"arab", name:"Arab Bank", color:"#003366", type:"Conventional", category:"foreign", hq:"Abu Dhabi", exchange:"ASE: ARBK", est:1973, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE branch", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"banquemisr", name:"Banque Misr", color:"#B71C1C", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"State-owned", est:1972, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE branch", sourceNote:"Not separately disclosed", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"aahli_kw", name:"Al Ahli Bank of Kuwait", color:"#0D47A1", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"Boursa Kuwait", est:1969, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE branch", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"doha", name:"Doha Bank", color:"#880E4F", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"QSE", est:2007, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE branch", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"snb", name:"Saudi National Bank", color:"#004D40", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"Tadawul: SNB", est:2007, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE branch", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"nbk", name:"National Bank of Kuwait", color:"#1565C0", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"Boursa Kuwait", est:2008, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE branch", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"creditag", name:"Credit Agricole", color:"#009688", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"Euronext: ACA", est:1975, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE branch", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"aaic", name:"Arab African International Bank", color:"#E65100", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"Private", est:1970, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE branch", sourceNote:"Not publicly disclosed", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"nbo", name:"National Bank of Oman", color:"#33691E", type:"Conventional", category:"foreign", hq:"Abu Dhabi", exchange:"MSX: NBOB", est:1976, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE branch", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"nbb", name:"National Bank of Bahrain", color:"#AD1457", type:"Conventional", category:"foreign", hq:"Abu Dhabi", exchange:"BSB: NBB", est:1982, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE branch", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"rafidain", name:"Rafidain Bank", color:"#4A148C", type:"Conventional", category:"foreign", hq:"Abu Dhabi", exchange:"State-owned", est:1974, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE branch", sourceNote:"Not separately disclosed", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"janata", name:"Janata Bank", color:"#1A237E", type:"Conventional", category:"foreign", hq:"Abu Dhabi", exchange:"State-owned", est:1974, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE branch", sourceNote:"Not separately disclosed", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"banorient", name:"Banque Banorient France", color:"#263238", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"Private", est:1974, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE branch", sourceNote:"Not publicly disclosed", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"khaliji", name:"Al Khaliji (France)", color:"#827717", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"QSE", est:1973, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE branch", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"saderat", name:"Bank Saderat Iran", color:"#BF360C", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"TSE", est:1968, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE branch", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"melli", name:"Bank Melli Iran", color:"#E64A19", type:"Conventional", category:"foreign", hq:"Dubai", exchange:"TSE", est:1969, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE branch", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"elnilein", name:"El Nilein Bank", color:"#558B2F", type:"Islamic", category:"foreign", hq:"Abu Dhabi", exchange:"Private", est:1976, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE branch", sourceNote:"Not publicly disclosed", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },

  // ═══════════════════════════════════════════════════════════════════════════
  // FOREIGN BANKS — WHOLESALE
  // ═══════════════════════════════════════════════════════════════════════════
  { id:"icbc", name:"ICBC (China)", color:"#C62828", type:"Conventional", category:"foreign_wholesale", hq:"Abu Dhabi", exchange:"HKEX / SSE", est:2010, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE wholesale", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"deutsche", name:"Deutsche Bank", color:"#0018A8", type:"Conventional", category:"foreign_wholesale", hq:"Abu Dhabi", exchange:"FWB: DBK", est:1968, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE wholesale", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"barclays", name:"Barclays", color:"#00AEEF", type:"Conventional", category:"foreign_wholesale", hq:"Dubai", exchange:"LSE: BARC", est:1973, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE wholesale", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"boc", name:"Bank of China", color:"#C41230", type:"Conventional", category:"foreign_wholesale", hq:"Abu Dhabi", exchange:"HKEX: 3988", est:2012, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE wholesale", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"gib", name:"Gulf International Bank", color:"#0277BD", type:"Conventional", category:"foreign_wholesale", hq:"Abu Dhabi", exchange:"Private", est:1976, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE wholesale", sourceNote:"Not publicly disclosed", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"intesa", name:"Intesa Sanpaolo", color:"#1B5E20", type:"Conventional", category:"foreign_wholesale", hq:"Abu Dhabi", exchange:"BIT: ISP", est:2010, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE wholesale", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"abc", name:"Agricultural Bank of China", color:"#D32F2F", type:"Conventional", category:"foreign_wholesale", hq:"Dubai", exchange:"HKEX / SSE", est:2014, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE wholesale", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"natwest", name:"NatWest Markets", color:"#5C2D91", type:"Conventional", category:"foreign_wholesale", hq:"Dubai", exchange:"LSE: NWG", est:1978, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE wholesale", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"hana", name:"KEB Hana Bank", color:"#00C853", type:"Conventional", category:"foreign_wholesale", hq:"Abu Dhabi", exchange:"KRX", est:2010, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE wholesale", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"amex", name:"American Express", color:"#006FCF", type:"Conventional", category:"foreign_wholesale", hq:"Abu Dhabi", exchange:"NYSE: AXP", est:1976, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE wholesale", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"mcb", name:"MCB Bank", color:"#0D47A1", type:"Conventional", category:"foreign_wholesale", hq:"Dubai", exchange:"PSX: MCB", est:2010, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE wholesale", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"alfalah", name:"Bank Alfalah", color:"#1B5E20", type:"Conventional", category:"foreign_wholesale", hq:"Dubai", exchange:"PSX: BAFL", est:2010, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE wholesale", sourceNote:"Parent filings only", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
  { id:"bok", name:"BOK International Bank", color:"#4E342E", type:"Conventional", category:"foreign_wholesale", hq:"Abu Dhabi", exchange:"Private", est:2010, profit2025:0, profit2024:0, totalAssets:0, yoyGrowth:0, roe:0, status:"indicative", period:"UAE wholesale", sourceNote:"Not publicly disclosed", featured:false, hasProducts:false, q1Status:"not_disclosed", q1Period:"UAE-specific Q1 not disclosed" },
];

export const PRODUCTS = {
  savings: {
    label: "Savings", icon: "🏦",
    fields: ["Min Balance", "Rate", "Monthly Fee", "Transfers", "App Rating"],
    data: {
      adcb:["AED 3K","Up to 4.25%","Free","Unlimited","4.5★"],
      enbd:["AED 3K","Up to 4.00%","Free","Unlimited","4.6★"],
      fab:["AED 5K","Up to 3.75%","Free","10/mo","4.3★"],
      dib:["AED 3K","Up to 3.50%*","Free","Unlimited","4.4★"],
      mashreq:["AED 1K","Up to 4.10%","Free","Unlimited","4.5★"],
      adib:["AED 3K","Up to 3.40%*","Free","Unlimited","4.3★"],
      rak:["AED 1K","Up to 4.00%","Free","Unlimited","4.2★"],
      cbd:["AED 5K","Up to 3.50%","Free","10/mo","4.0★"],
      alhilal:["AED 3K","Up to 3.25%*","Free","15/mo","4.1★"],
      ajman:["AED 3K","Up to 3.00%*","Free","Unlimited","3.9★"],
    },
  },
  cards: {
    label: "Credit Cards", icon: "💳",
    fields: ["Top Card","Annual Fee","Cashback/Rewards","Lounge","Min Salary"],
    data: {
      adcb:["TouchPoints Infinite","AED 750","Up to 5%","Unlimited","AED 15K"],
      enbd:["Beyond Infinite","AED 1,500","3x Skywards","Unlimited","AED 25K"],
      fab:["Rewards World Elite","AED 800","Up to 3 pts/AED","6/yr","AED 15K"],
      dib:["Prime Infinite","Free for life*","Up to 5%","Unlimited","AED 15K"],
      mashreq:["Solitaire World","Free 1st yr","Up to 7%","Unlimited","AED 20K"],
      adib:["Visa Infinite","AED 600","Up to 5%","Unlimited","AED 15K"],
      rak:["World Elite","AED 500","Up to 5%","4/yr","AED 15K"],
      cbd:["World Mastercard","AED 600","Up to 3%","2/yr","AED 12K"],
      alhilal:["Visa Infinite","AED 500","Up to 4%","4/yr","AED 12K"],
      ajman:["Visa Platinum","AED 350","Up to 2%","2/yr","AED 8K"],
    },
  },
  loans: {
    label: "Personal Loans", icon: "📋",
    fields: ["Rate (Flat)","Max Tenure","Max Amount","Processing","Min Salary"],
    data: {
      adcb:["From 4.49%","48 mo","AED 3M","1.05%","AED 8K"],
      enbd:["From 4.99%","48 mo","AED 4M","1.0%","AED 5K"],
      fab:["From 4.75%","48 mo","AED 3M","1.0%","AED 8K"],
      dib:["From 4.49%*","48 mo","AED 3M","1.05%","AED 5K"],
      mashreq:["From 4.50%","48 mo","AED 2.5M","1.0%","AED 5K"],
      adib:["From 4.50%*","48 mo","AED 2.5M","1.05%","AED 5K"],
      rak:["From 4.99%","48 mo","AED 2.5M","1.0%","AED 7.5K"],
      cbd:["From 5.25%","48 mo","AED 2M","1.0%","AED 7K"],
      alhilal:["From 4.75%*","48 mo","AED 2M","1.05%","AED 5K"],
      ajman:["From 5.25%*","48 mo","AED 1.5M","1.0%","AED 5K"],
    },
  },
  auto: {
    label: "Auto Finance", icon: "🚗",
    fields: ["Rate (Flat)","Max Tenure","Down Payment","Max LTV","Insurance"],
    data: {
      adcb:["From 2.49%","60 mo","From 0%","90%","Comprehensive"],
      enbd:["From 2.49%","60 mo","From 0%","85%","Comprehensive"],
      fab:["From 2.75%","60 mo","From 10%","85%","Comprehensive"],
      dib:["From 2.49%*","60 mo","From 0%","90%","Comprehensive"],
      mashreq:["From 2.99%","60 mo","From 10%","85%","Comprehensive"],
      adib:["From 2.75%*","60 mo","From 0%","85%","Comprehensive"],
      rak:["From 2.99%","60 mo","From 10%","80%","Comprehensive"],
      cbd:["From 3.25%","60 mo","From 15%","80%","Comprehensive"],
      alhilal:["From 2.75%*","60 mo","From 0%","85%","Comprehensive"],
      ajman:["From 3.25%*","60 mo","From 10%","80%","Comprehensive"],
    },
  },
};

export const CATEGORY_LABELS = {
  national: "National Bank",
  digital: "Digital Bank",
  foreign: "Foreign Bank (Retail)",
  foreign_wholesale: "Foreign Bank (Wholesale)",
};

export const CATEGORY_FILTERS = [
  { key:"all", label:"All Banks" },
  { key:"national", label:"National" },
  { key:"foreign", label:"Foreign (Retail)" },
  { key:"foreign_wholesale", label:"Foreign (Wholesale)" },
  { key:"digital", label:"Digital" },
  { key:"islamic", label:"Islamic" },
  { key:"conventional", label:"Conventional" },
];

export const fmtProfit = (v) => {
  if (v === 0) return "—";
  if (v < 0) { const abs = Math.abs(v); return abs >= 1 ? `(AED ${abs.toFixed(1)}B)` : `(AED ${(abs * 1000).toFixed(0)}M)`; }
  return v >= 1 ? `AED ${v.toFixed(1)}B` : `AED ${(v * 1000).toFixed(0)}M`;
};

export const STATUS_CONFIG = {
  reported:  { label:"Reported",  bg:"rgba(16,185,129,0.12)",  color:"#34D399", border:"rgba(52,211,153,0.25)", icon:"✓" },
  derived:   { label:"Derived",   bg:"rgba(59,130,246,0.12)",  color:"#60A5FA", border:"rgba(96,165,250,0.25)", icon:"Σ" },
  estimated: { label:"Estimated", bg:"rgba(245,158,11,0.12)",  color:"#FBBF24", border:"rgba(251,191,36,0.25)", icon:"⚠" },
  indicative:{ label:"Indicative",bg:"rgba(139,92,246,0.12)",  color:"#A78BFA", border:"rgba(167,139,250,0.25)", icon:"ⓘ" },
};
