// app/crush-calculator/page.tsx
import CrushCalculator from '@/components/calculator/funny-calculators/CrushCalculator'
import type { Metadata } from 'next'

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Crush Calculator | Love Compatibility Test',
  description:
    'Find out your love compatibility instantly with our Crush Calculator. Fun, accurate, and entertaining love match results for couples!',
  keywords: [
    'crush calculator',
    'love calculator',
    'compatibility test',
    'couple love test',
    'funny calculator',
    'relationship match',
  ],
  openGraph: {
    title: 'Crush Calculator | Love Compatibility Test',
    description:
      'Test your love compatibility and find how perfect your match is using our Crush Calculator.',
    url: 'https://kaluyaan.com/crush-calculator',
    siteName: 'ToolsHub',
    type: 'website',
  },
}

// ✅ Server Component (default)
export default function Page() {
  return <CrushCalculator />
}
