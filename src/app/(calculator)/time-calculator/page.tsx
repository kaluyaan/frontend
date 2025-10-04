// app/date-time-calculator/page.tsx
import DateTimeCalculator from '@/components/calculator/DateTimeCalculator'
import type { Metadata } from 'next'

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Date & Time Calculator | Date Difference & Time Tool',
  description:
    'Calculate the difference between dates, add or subtract time, and manage your schedule efficiently with our Date & Time Calculator.',
  keywords: [
    'date and time calculator',
    'date difference tool',
    'time calculator',
    'date calculator',
    'schedule planning tool',
    'datetime tool',
  ],
  openGraph: {
    title: 'Date & Time Calculator | Date Difference & Time Tool',
    description:
      'Easily calculate date differences, add or subtract time, and plan your schedule with our accurate Date & Time Calculator.',
    url: 'https://kaluyaan.com/time-calculator',
    siteName: 'Kaluyaan',
    type: 'website',
  },
}

// ✅ Server Component (default)
export default function Page() {
  return <DateTimeCalculator />
}
