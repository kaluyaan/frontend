// app/risk-assessment/page.tsx
import RiskAssessment from '@/components/health-test/RiskAssessment'
import type { Metadata } from 'next'

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Risk Assessment | Health & Wellness Evaluation',
  description:
    'Evaluate your health risks with our interactive Risk Assessment tool. Gain insights into wellness, lifestyle factors, and preventive measures.',
  keywords: [
    'risk assessment',
    'health evaluation',
    'wellness check',
    'lifestyle risk test',
    'health calculator',
    'preventive health',
  ],
  openGraph: {
    title: 'Risk Assessment | Health & Wellness Evaluation',
    description:
      'Use our Risk Assessment tool to understand potential health risks and improve your wellness with actionable insights.',
    url: 'https://kaluyaan.com/risk-assessment',
    siteName: 'Kaluyaan',
    type: 'website',
  },
}

// ✅ Server Component (default)
export default function Page() {
  return <RiskAssessment />
}
