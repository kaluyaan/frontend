// app/color-blindness-test/page.tsx
import ColorBlindnessTest from '@/components/calculator/ColorBlindnessTest'
import type { Metadata } from 'next'

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Color Blindness Test | Vision Check Tool',
  description:
    'Check your color vision instantly with our Color Blindness Test. Fun, easy, and accurate way to test your ability to distinguish colors.',
  keywords: [
    'color blindness test',
    'vision test',
    'eye test',
    'color vision checker',
    'funny calculator',
    'health tool',
  ],
  openGraph: {
    title: 'Color Blindness Test | Vision Check Tool',
    description:
      'Test your ability to distinguish colors accurately with our interactive Color Blindness Test — a quick and reliable tool for everyone.',
    url: 'https://kaluyaan.com/color-blindness',
    siteName: 'Kaluyaan',
    type: 'website',
  },
}

// ✅ Server Component (default)
export default function Page() {
  return <ColorBlindnessTest />
}
