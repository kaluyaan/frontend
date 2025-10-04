// app/pregnancy-calculator/page.tsx
import PregnancyCalculator from '@/components/calculator/PregnancyCalculator'
import type { Metadata } from 'next'

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Pregnancy Calculator | Due Date & Trimester Tool',
  description:
    'Calculate your pregnancy due date, track trimesters, and monitor your pregnancy progress with our easy-to-use Pregnancy Calculator.',
  keywords: [
    'pregnancy calculator',
    'due date calculator',
    'trimester tracker',
    'pregnancy progress',
    'baby due date',
    'health tool',
  ],
  openGraph: {
    title: 'Pregnancy Calculator | Due Date & Trimester Tool',
    description:
      'Quickly estimate your due date, monitor your trimesters, and track your pregnancy journey with our accurate Pregnancy Calculator.',
    url: 'https://kaluyaan.com/pregnancy-calculator',
    siteName: 'Kaluyaan',
    type: 'website',
  },
}

// ✅ Server Component (default)
export default function Page() {
  return <PregnancyCalculator />
}
