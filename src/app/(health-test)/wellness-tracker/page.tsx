// app/wellness-tracker/page.tsx
import WellnessTracker from "@/components/health-test/WellnessTracker";
import type { Metadata } from "next";

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: "Wellness Tracker | Health & Lifestyle Monitoring Tool",
  description:
    "Track your overall wellness, habits, and lifestyle with our interactive Wellness Tracker. Gain insights to improve health, fitness, and daily routines.",
  keywords: [
    "wellness tracker",
    "health tracker",
    "lifestyle monitoring",
    "habit tracker",
    "fitness tool",
    "health calculator",
  ],
  openGraph: {
    title: "Wellness Tracker | Health & Lifestyle Monitoring Tool",
    description:
      "Monitor your health and lifestyle habits with our Wellness Tracker. Get actionable insights to improve fitness, wellness, and daily routines.",
    url: "https://kaluyaan.com/wellness-tracker",
    siteName: "Kaluyaan",
    type: "website",
  },
};

// ✅ Server Component (default)
export default function Page() {
  return <WellnessTracker />;
}
