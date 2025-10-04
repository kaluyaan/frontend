// app/business-days-calculator/page.tsx
import BusinessDaysCalculator from '@/components/calculator/BusinessDaysCalculator'
import type { Metadata } from 'next'

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Business Days Calculator | Workday Counter Tool',
  description:
    'Easily calculate the number of business days between two dates with our Business Days Calculator. Perfect for project planning and work scheduling.',
  keywords: [
    'business days calculator',
    'workday counter',
    'working days between dates',
    'office days calculator',
    'date difference tool',
    'project scheduling tool',
  ],
  openGraph: {
    title: 'Business Days Calculator | Workday Counter Tool',
    description:
      'Find out how many business days fall between any two dates with our accurate Business Days Calculator — ideal for work and planning purposes.',
    url: 'https://kaluyaan.com/business-days',
    siteName: 'Kaluyaan',
    type: 'website',
  },
}

// ✅ Server Component (default)
export default function Page() {
  return <BusinessDaysCalculator />
}
