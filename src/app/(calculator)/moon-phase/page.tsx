// app/moon-phase-calculator/page.tsx
import MoonPhaseCalculator from '@/components/calculator/MoonPhaseCalculator'
import type { Metadata } from 'next'

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Moon Phase Calculator | Lunar Calendar Tool',
  description:
    'Discover the current moon phase or calculate the moon phase for any date with our Moon Phase Calculator. Accurate and easy-to-use lunar tool!',
  keywords: [
    'moon phase calculator',
    'lunar calendar',
    'moon phases',
    'moon cycle calculator',
    'astronomy tool',
    'date to moon phase',
  ],
  openGraph: {
    title: 'Moon Phase Calculator | Lunar Calendar Tool',
    description:
      'Check the moon phase for any date or track lunar cycles with our Moon Phase Calculator. Perfect for astronomy enthusiasts and planners.',
    url: 'https://kaluyaan.com/moon-phase',
    siteName: 'Kaluyaan',
    type: 'website',
  },
}

// ✅ Server Component (default)
export default function Page() {
  return <MoonPhaseCalculator />
}
