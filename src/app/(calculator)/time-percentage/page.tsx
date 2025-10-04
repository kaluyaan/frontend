// app/time-percentage-calculator/page.tsx
import TimePercentageCalculator from '@/components/calculator/time-percentage/TimePercentageCalculator'
import type { Metadata } from 'next'

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Time Percentage Calculator | Time Management Tool',
  description:
    'Calculate the percentage of time elapsed or remaining for any task or activity with our Time Percentage Calculator. Ideal for productivity and tracking.',
  keywords: [
    'time percentage calculator',
    'time management tool',
    'task tracking',
    'time elapsed calculator',
    'productivity tool',
    'time tracking calculator',
  ],
  openGraph: {
    title: 'Time Percentage Calculator | Time Management Tool',
    description:
      'Track the percentage of time spent or remaining for tasks and activities accurately with our Time Percentage Calculator. Boost your productivity!',
    url: 'https://kaluyaan.com/time-percentage',
    siteName: 'Kaluyaan',
    type: 'website',
  },
}

// ✅ Server Component (default)
export default function Page() {
  return <TimePercentageCalculator />
}
