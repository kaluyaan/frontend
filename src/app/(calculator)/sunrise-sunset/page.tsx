// app/sunrise-sunset-calculator/page.tsx
import SunriseSunsetCalculator from '@/components/calculator/SunriseSunsetCalculator'
import type { Metadata } from 'next'

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Sunrise & Sunset Calculator | Daylight Time Tool',
  description:
    'Calculate sunrise and sunset times for any location and date with our Sunrise & Sunset Calculator. Perfect for planning your day or photography sessions.',
  keywords: [
    'sunrise calculator',
    'sunset calculator',
    'daylight time tool',
    'sun timing',
    'astronomy tool',
    'location sunrise sunset',
  ],
  openGraph: {
    title: 'Sunrise & Sunset Calculator | Daylight Time Tool',
    description:
      'Find accurate sunrise and sunset times for any place and date using our Sunrise & Sunset Calculator. Ideal for travelers, photographers, and enthusiasts.',
    url: 'https://kaluyaan.com/sunrise-sunset',
    siteName: 'Kaluyaan',
    type: 'website',
  },
}

// ✅ Server Component (default)
export default function Page() {
  return <SunriseSunsetCalculator />
}
