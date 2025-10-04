// app/custom-event-countdown/page.tsx
import CustomEventCountdown from '@/components/calculator/CustomEventCountdown'
import type { Metadata } from 'next'

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Custom Event Countdown | Countdown Timer Tool',
  description:
    'Set up a countdown for any special event with our Custom Event Countdown tool. Track days, hours, and minutes until your important occasion!',
  keywords: [
    'custom event countdown',
    'countdown timer',
    'event reminder',
    'special day countdown',
    'days until event',
    'fun calculator',
  ],
  openGraph: {
    title: 'Custom Event Countdown | Countdown Timer Tool',
    description:
      'Easily track time remaining for any important occasion with our Custom Event Countdown tool. Perfect for birthdays, anniversaries, and events!',
    url: 'https://kaluyaan.com/custom-countdown',
    siteName: 'Kaluyaan',
    type: 'website',
  },
}

// ✅ Server Component (default)
export default function Page() {
  return <CustomEventCountdown />
}
