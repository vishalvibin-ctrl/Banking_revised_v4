import './globals.css'

export const metadata = {
  title: 'UAE Banking Intelligence Hub',
  description: 'Research-grade UAE banking data — FY 2025 + Q1 2026 results, NPL, coverage, and credit card comparison. By Vishal Vibin.',
}

export const viewport = {
  themeColor: '#0B1120',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
