// app/symptom-checker/page.tsx
import SymptomChecker from '@/components/health-test/SymptomChecker'
import type { Metadata } from 'next'

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Symptom Checker | Health & Wellness Tool',
  description:
    'Check your symptoms and get insights about possible health conditions with our interactive Symptom Checker. Quick, easy, and reliable.',
  keywords: [
    'symptom checker',
    'health assessment',
    'wellness tool',
    'medical symptoms test',
    'health evaluation',
    'health calculator',
  ],
  openGraph: {
    title: 'Symptom Checker | Health & Wellness Tool',
    description:
      'Use our Symptom Checker to quickly evaluate symptoms and gain insights into potential health conditions. Ideal for wellness tracking.',
    url: 'https://kaluyaan.com/symptom-checker',
    siteName: 'Kaluyaan',
    type: 'website',
  },
}

// ✅ Server Component (default)
export default function Page() {
  return <SymptomChecker />
}
