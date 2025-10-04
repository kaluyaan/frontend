// app/event-duration-calculator/page.tsx
import EventDurationCalculator from '@/components/calculator/EventDurationCalculator'
import type { Metadata } from 'next'

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Event Duration Calculator | Time Between Events',
  description:
    'Calculate the duration between two events easily with our Event Duration Calculator. Perfect for planning, scheduling, and tracking timelines.',
  keywords: [
    'event duration calculator',
    'time between events',
    'duration calculator',
    'schedule planner',
    'timeline calculator',
    'date difference tool',
  ],
  openGraph: {
    title: 'Event Duration Calculator | Time Between Events',
    description:
      'Quickly find out the time difference between any two events with our Event Duration Calculator. Ideal for scheduling and planning purposes.',
    url: 'https://kaluyaan.com/event-duration',
    siteName: 'Kaluyaan',
    type: 'website',
  },
}

// ✅ Server Component (default)
export default function Page() {
  return <EventDurationCalculator />
}
