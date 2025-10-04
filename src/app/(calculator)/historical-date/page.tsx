// app/historical-date-calculator/page.tsx
import HistoricalDateCalculator from '@/components/calculator/HistoricalDateCalculator'
import type { Metadata } from 'next'

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Historical Date Calculator | Past Date Finder',
  description:
    'Find out important historical dates or calculate the difference between past dates with our Historical Date Calculator. Easy and accurate!',
  keywords: [
    'historical date calculator',
    'past date finder',
    'date difference tool',
    'history calculator',
    'days between dates',
    'timeline calculator',
  ],
  openGraph: {
    title: 'Historical Date Calculator | Past Date Finder',
    description:
      'Calculate the number of days between historical dates or find significant past dates easily with our Historical Date Calculator.',
    url: 'https://kaluyaan.com/historical-date',
    siteName: 'Kaluyaan',
    type: 'website',
  },
}

// ✅ Server Component (default)
export default function Page() {
  return <HistoricalDateCalculator />
}
