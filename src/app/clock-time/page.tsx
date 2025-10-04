import ClockClient from "@/components/clock-time/ClockClient";
import { Metadata } from "next";

// SEO Metadata for Server Component
export const metadata: Metadata = {
  title: "Online Clock - Free Analog & Digital Clock with Multiple Themes",
  description:
    "Beautiful online clock with analog and digital display. Features multiple themes including dark mode, neon, and vintage. Free world clock with real-time updates, date, and timezone information.",
  keywords: [
    "online clock",
    "digital clock",
    "analog clock",
    "world clock",
    "current time",
    "live clock",
    "clock with date",
    "timezone clock",
    "free online clock",
    "web clock",
    "desktop clock",
    "dark mode clock",
    "neon clock",
    "vintage clock",
    "real-time clock",
  ],
  authors: [{ name: "SandeepSokle" }],
  creator: "KaluYaan",
  publisher: "KaluYaan",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kaluyaan.com/clock-time",
    title: "Online Clock - Free Analog & Digital Clock with Multiple Themes",
    description:
      "Beautiful online clock with analog and digital display. Features multiple themes including dark mode, neon, and vintage. Free world clock with real-time updates.",
    siteName: "KaluYaan",
  },
  alternates: {
    canonical: "https://kaluyaan.com/clock-time",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Online Clock",
  },
};

// Server Component (No 'use client')
export default function ClockPage() {
  // Schema.org JSON-LD for SEO
  const jsonLd = {
    "@context": "https://kaluyaan.com/clock-time",
    "@type": "WebApplication",
    name: "Online Clock",
    description:
      "Beautiful online clock with analog and digital display featuring multiple themes",
    url: "https://kaluyaan.com/clock-time",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Analog clock display",
      "Digital time display",
      "Multiple theme options",
      "Real-time updates",
      "Timezone information",
      "Date display",
      "Responsive design",
    ],
    author: {
      "@type": "Organization",
      name: "KaluYaan",
    },
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* SEO-friendly hidden heading */}
      <h1 style={{ position: "absolute", left: "-9999px" }}>
        Free Online Clock - Analog and Digital Display with Multiple Themes
      </h1>

      {/* Client Component for interactivity */}
      <ClockClient />

      {/* SEO-friendly content section */}
      <article style={{ position: "absolute", left: "-9999px" }}>
        <h2>About Our Online Clock</h2>
        <p>
          This free online clock provides both analog and digital time displays
          with real-time updates. Perfect for keeping track of time on your
          desktop, laptop, or mobile device. Features include multiple beautiful
          themes (Classic, Dark, Neon, and Vintage), automatic timezone
          detection, and a responsive design that works on all devices.
        </p>

        <h2>Features</h2>
        <ul>
          <li>Real-time analog clock with smooth hand movements</li>
          <li>Digital time display with hours, minutes, and seconds</li>
          <li>Current date display with full month and day names</li>
          <li>Timezone information with UTC offset</li>
          <li>Multiple theme options for personalization</li>
          <li>Fully responsive design for mobile, tablet, and desktop</li>
          <li>Free to use with no registration required</li>
        </ul>

        <h2>How to Use</h2>
        <p>
          {`Simply open the page to view the current time. Select from different themes using the buttons
          at the top right. The clock automatically updates every second and displays your local timezone.`}
        </p>

        <h2>Why Use Our Online Clock?</h2>
        <p>
          {`Whether you need a simple time check, a stylish desktop clock, or want to track time across
          different timezones, our online clock is the perfect solution. With its clean interface and
          customizable themes, it's both functional and beautiful.`}
        </p>

        <h2>Supported Themes</h2>
        <p>
          {`Choose from four beautiful themes: Classic with purple gradients, Dark mode for night-time viewing,
          Neon with glowing cyan and magenta effects, and Vintage with warm brown tones. Each theme is
          carefully designed to be both aesthetically pleasing and easy to read.`}
        </p>

        <h2>Compatible Devices</h2>
        <p>
          {`Our online clock works perfectly on all devices including desktop computers, laptops, tablets,
          iPads, iPhones, Android phones, and any device with a modern web browser. The responsive design
          ensures optimal viewing on screens of all sizes.`}
        </p>
      </article>
    </>
  );
}
