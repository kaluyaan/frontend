// app/stress-assessment/page.tsx
import StressAssessment from '@/components/health-test/StressAssessment'
import type { Metadata } from 'next'

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Stress Assessment | Mental Health & Wellness Tool',
  description:
    'Evaluate your stress levels and mental wellness with our interactive Stress Assessment tool. Get insights and tips to manage stress effectively.',
  keywords: [
    'stress assessment',
    'mental health tool',
    'wellness evaluation',
    'stress test',
    'mental wellness',
    'health calculator',
  ],
  openGraph: {
    title: 'Stress Assessment | Mental Health & Wellness Tool',
    description:
      'Use our Stress Assessment tool to understand your stress levels and improve mental wellness with actionable insights.',
    url: 'https://kaluyaan.com/stress-assessment',
    siteName: 'Kaluyaan',
    type: 'website',
  },
}

// ✅ Server Component (default)
export default function Page() {
  return <StressAssessment />
}
