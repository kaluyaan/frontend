// app/birthday-countdown/page.tsx
import BirthdayCountdown from '@/components/calculator/BirthdayCountdown'
import type { Metadata } from 'next'

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Birthday Countdown | Days Until Your Birthday',
  description:
    'Count the days, hours, and minutes left until your next birthday with our fun and accurate Birthday Countdown tool!',
  keywords: [
    'birthday countdown',
    'days until birthday',
    'birthday timer',
    'birthday calculator',
    'birthday reminder',
    'funny calculator',
  ],
  openGraph: {
    title: 'Birthday Countdown | Days Until Your Birthday',
    description:
      'Track how long is left until your next birthday with our easy-to-use Birthday Countdown tool — perfect for planning your big day!',
    url: 'https://kaluyaan.com/birthday-countdown',
    siteName: 'Kaluyaan',
    type: 'website',
  },
}

// ✅ Server Component (default)
export default function Page() {
  return <BirthdayCountdown />
}
