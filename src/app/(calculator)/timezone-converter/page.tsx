// app/timezone-converter/page.tsx
import TimezoneConverter from '@/components/calculator/TimezoneConverter'
import type { Metadata } from 'next'

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Timezone Converter | Time Zone Conversion Tool',
  description:
    'Convert time between different time zones instantly with our Timezone Converter. Perfect for meetings, travel planning, and international collaboration.',
  keywords: [
    'timezone converter',
    'time zone conversion',
    'world clock',
    'time difference calculator',
    'global time tool',
    'meeting scheduler',
  ],
  openGraph: {
    title: 'Timezone Converter | Time Zone Conversion Tool',
    description:
      'Easily convert time across different time zones with our Timezone Converter. Ideal for travel, business, and international communication.',
    url: 'https://kaluyaan.com/timezone-converter',
    siteName: 'Kaluyaan',
    type: 'website',
  },
}

// ✅ Server Component (default)
export default function Page() {
  return <TimezoneConverter />
}
