// app/age-calculator/page.tsx
import AgeCalculator from '@/components/calculator/AgeCalculator'
import type { Metadata } from 'next'

// ✅ Define metadata for SEO
export const metadata: Metadata = {
  title: 'Age Calculator | ToolsHub',
  description: 'Calculate your exact age in years, months, and days instantly using our accurate Age Calculator tool.',
  keywords: ['age calculator', 'date of birth', 'calculate age online', 'birthday calculator', 'ToolsHub'],
  openGraph: {
    title: 'Age Calculator | ToolsHub',
    description: 'Easily calculate your age in years, months, and days with our smart online tool.',
    url: 'https://kaluyaan.com/age-calculator',
    siteName: 'ToolsHub',
    type: 'website',
  },
}

// ✅ Server Component (default in Next.js 13+)
export default function Page() {
  return <AgeCalculator />
}
