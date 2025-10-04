// app/attention-span-test/page.tsx
import AttentionSpanTest from "@/components/health-test/AttentionSpanTest";
import type { Metadata } from "next";

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: "Attention Span Test | Focus & Cognitive Health Tool",
  description:
    "Test your attention span and concentration levels with our interactive Attention Span Test. Improve focus and cognitive performance with fun exercises.",
  keywords: [
    "attention span test",
    "focus test",
    "cognitive health tool",
    "concentration test",
    "mental focus",
    "health calculator",
  ],
  openGraph: {
    title: "Attention Span Test | Focus & Cognitive Health Tool",
    description:
      "Check and improve your attention span using our interactive Attention Span Test. Fun and insightful tool for cognitive assessment.",
    url: "https://kaluyaan.com/attention-span",
    siteName: "Kaluyaan",
    type: "website",
  },
};

// ✅ Server Component (default)
export default function Page() {
  return <AttentionSpanTest />;
}
