// app/enhanced-sleep-assessment/page.tsx
import EnhancedSleepAssessment from '@/components/health-test/SleepQuality'
import type { Metadata } from 'next'

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Enhanced Sleep Assessment | Sleep Quality & Wellness Tool',
  description:
    'Assess your sleep quality and patterns with our Enhanced Sleep Assessment tool. Gain insights to improve rest, energy, and overall wellness.',
  keywords: [
    'sleep assessment',
    'sleep quality test',
    'wellness tool',
    'sleep tracker',
    'healthy sleep',
    'health calculator',
  ],
  openGraph: {
    title: 'Enhanced Sleep Assessment | Sleep Quality & Wellness Tool',
    description:
      'Evaluate your sleep patterns and quality with our Enhanced Sleep Assessment tool. Get actionable insights for better rest and health.',
    url: 'https://kaluyaan.com/sleep-quality',
    siteName: 'Kaluyaan',
    type: 'website',
  },
}

// ✅ Server Component (default)
export default function Page() {
  return <EnhancedSleepAssessment />
}
