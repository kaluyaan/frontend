// app/future-relationship/page.tsx
import FutureRelationship from '@/components/calculator/funny-calculators/FutureRelationship'
import type { Metadata } from 'next'

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Future Relationship Calculator | Love Prediction Test',
  description:
    'Curious about your future relationship? Try our Future Relationship Calculator to reveal your love destiny and compatibility insights instantly.',
  keywords: [
    'future relationship calculator',
    'love prediction test',
    'relationship destiny',
    'future love match',
    'funny calculator',
    'compatibility prediction',
  ],
  openGraph: {
    title: 'Future Relationship Calculator | Love Prediction Test',
    description:
      'Discover your future love match and relationship destiny using our Future Relationship Calculator. Fun and exciting predictions await!',
    url: 'https://kaluyaan.com/future-relationship',
    siteName: 'Kaluyaan',
    type: 'website',
  },
}

// ✅ Server Component (default in Next.js)
export default function Page() {
  return <FutureRelationship />
}
