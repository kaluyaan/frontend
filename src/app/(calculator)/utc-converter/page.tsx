// app/utc-converter/page.tsx
import UTCConverter from '@/components/calculator/UTCConverter'
import type { Metadata } from 'next'

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'UTC Converter | Universal Time Conversion Tool',
  description:
    'Convert any local time to UTC or from UTC to your local time instantly with our UTC Converter. Ideal for international communication and scheduling.',
  keywords: [
    'UTC converter',
    'universal time conversion',
    'time zone tool',
    'time conversion',
    'world clock',
    'schedule planning',
  ],
  openGraph: {
    title: 'UTC Converter | Universal Time Conversion Tool',
    description:
      'Easily convert time between UTC and local time zones with our UTC Converter. Perfect for global meetings and travel planning.',
    url: 'https://kaluyaan.com/utc-converter',
    siteName: 'Kaluyaan',
    type: 'website',
  },
}

// ✅ Server Component (default)
export default function Page() {
  return <UTCConverter />
}
