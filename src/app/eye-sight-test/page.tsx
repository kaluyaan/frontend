import EyeSightTestClient from "@/components/eye-sight-test/EyeSightTestClient";
import { Metadata } from "next";

// Generate metadata for SEO
export const metadata: Metadata = {
  title:
    "Free Online Eye Sight Test - Visual Acuity & Color Vision Testing | Kaluyaan",
  description:
    "Test your vision online for free with our comprehensive eye sight test. Check visual acuity and color vision in multiple languages. Professional vision screening tool available at Kaluyaan.com.",
  keywords: [
    "eye sight test",
    "vision test online",
    "visual acuity test",
    "color vision test",
    "eye test free",
    "vision screening",
    "color blindness test",
    "eye chart test",
    "snellen chart online",
    "ishihara test",
    "eye exam online",
    "vision check",
    "eyesight screening",
    "free eye test",
    "vision assessment",
    "eye health test",
    "multilingual eye test",
    "hindi eye test",
    "punjabi eye test",
    "urdu eye test",
    "english eye test",
  ],
  authors: [{ name: "Kaluyaan", url: "https://www.kaluyaan.com" }],
  creator: "Kaluyaan",
  publisher: "Kaluyaan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.kaluyaan.com"),
  alternates: {
    canonical: "/eye-sight-test",
  },
  openGraph: {
    title:
      "Free Online Eye Sight Test - Visual Acuity & Color Vision | Kaluyaan",
    description:
      "Professional online eye sight test with visual acuity and color vision screening. Test your vision in multiple languages. Free and easy to use.",
    url: "https://kaluyaan.com/eye-sight-test",
    siteName: "Kaluyaan",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/eye-sight-test-og.jpg",
        width: 1200,
        height: 630,
        alt: "Kaluyaan Eye Sight Test - Free Online Vision Screening",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Eye Sight Test | Kaluyaan",
    description:
      "Test your vision online with our professional eye sight test. Visual acuity and color vision screening in multiple languages.",
    images: ["/images/eye-sight-test-twitter.jpg"],
    creator: "@kaluyaan",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Health & Medical Tools",
  classification: "Online Vision Test",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Eye Test",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://kaluyaan.com/eye-sight-test",
      url: "https://kaluyaan.com/eye-sight-test",
      name: "Free Online Eye Sight Test - Visual Acuity & Color Vision Testing",
      description:
        "Professional online eye sight test with visual acuity and color vision screening. Test your vision in multiple languages including English, Hindi, Punjabi, and Urdu.",
      isPartOf: {
        "@id": "https://kaluyaan.com/#website",
      },
      breadcrumb: {
        "@id": "https://kaluyaan.com/eye-sight-test/#breadcrumb",
      },
      inLanguage: "en-US",
      potentialAction: [
        {
          "@type": "ReadAction",
          target: ["https://kaluyaan.com/eye-sight-test"],
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://kaluyaan.com/eye-sight-test/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://kaluyaan.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Tools",
          item: "https://kaluyaan.com",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Eye Sight Test",
          item: "https://kaluyaan.com/eye-sight-test",
        },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Kaluyaan Eye Sight Test",
      description:
        "Free online vision screening tool with visual acuity and color vision tests in multiple languages.",
      url: "https://kaluyaan.com/eye-sight-test",
      applicationCategory: "HealthApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Visual Acuity Test",
        "Color Vision Test",
        "Multi-language Support (English, Hindi, Punjabi, Urdu)",
        "Printable Results",
        "Mobile Responsive",
      ],
      screenshot: "https://kaluyaan.com/images/eye-sight-test-screenshot.jpg",
      author: {
        "@type": "Organization",
        name: "Kaluyaan",
        url: "https://kaluyaan.com",
      },
    },
    {
      "@type": "MedicalWebPage",
      name: "Eye Sight Test - Vision Screening Tool",
      description:
        "Comprehensive online eye sight testing tool for visual acuity and color vision screening.",
      medicalAudience: [
        {
          "@type": "MedicalAudience",
          audienceType: "Patient",
        },
      ],
      about: {
        "@type": "MedicalCondition",
        name: "Vision Problems",
        alternateName: [
          "Visual Impairment",
          "Color Blindness",
          "Refractive Error",
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How accurate is the online eye sight test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "This is a basic vision screening tool that can help identify potential vision issues. However, it should not replace professional eye examinations by qualified optometrists or ophthalmologists. For accurate diagnosis and treatment, please consult an eye care professional.",
          },
        },
        {
          "@type": "Question",
          name: "What distance should I sit from the screen?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For accurate results, please sit 6 feet (approximately 2 meters) away from your screen. This distance simulates the standard testing distance used in professional eye examinations.",
          },
        },
        {
          "@type": "Question",
          name: "What languages are supported in the eye test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The eye sight test supports multiple languages including English, Hindi, Punjabi, and Urdu, making it accessible to a diverse range of users.",
          },
        },
        {
          "@type": "Question",
          name: "Can I print my test results?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, after completing the test, you can print your results which include your score, details, and recommendations. These results can be shared with your eye care professional.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between visual acuity and color vision tests?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Visual acuity test measures how clearly you can see letters at different sizes, similar to a traditional eye chart. Color vision test checks your ability to distinguish between different colors and can help identify color blindness.",
          },
        },
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://kaluyaan.com/#organization",
      name: "Kaluyaan",
      url: "https://kaluyaan.com",
      logo: {
        "@type": "ImageObject",
        url: "https://kaluyaan.com/logo.png",
      },
      sameAs: [
        "https://twitter.com/kaluyaan",
        "https://facebook.com/kaluyaan",
        "https://linkedin.com/company/kaluyaan",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://kaluyaan.com/#website",
      url: "https://kaluyaan.com",
      name: "Kaluyaan",
      description: "Professional online tools and services",
      publisher: {
        "@id": "https://kaluyaan.com/#organization",
      },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://kaluyaan.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      ],
      inLanguage: "en-US",
    },
  ],
};

// Server Component
export default function EyeSightTestPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Client Component */}
      <EyeSightTestClient />
    </>
  );
}

// Generate static params if needed for static site generation
export async function generateStaticParams() {
  return []; // Add any dynamic routes if needed
}

// Revalidate configuration (if using ISR)
export const revalidate = 86400; // Revalidate every 24 hours
