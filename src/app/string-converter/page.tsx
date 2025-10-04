import { Metadata } from "next";
import HeroSection from "@/components/shared/HeroSection";

import homeStyle from "../../components/Home/home.module.css";
import StringHelper from "@/components/string-converter/components/stringHelper";

// Metadata for SEO
export const metadata: Metadata = {
  title: "String Case Converter | Free Text Converter Tool",
  description:
    "Convert text between lowercase, uppercase, camelCase, PascalCase, snake_case, kebab-case, and Title Case instantly. Free online string case converter tool for developers and writers.",
  keywords: [
    "string converter",
    "case converter",
    "text converter",
    "camelCase converter",
    "snake_case converter",
    "kebab-case converter",
    "PascalCase converter",
    "title case converter",
    "lowercase converter",
    "uppercase converter",
    "text transformation",
    "string manipulation",
    "developer tools",
    "coding tools",
    "text formatting",
  ],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  publisher: "Your Website",
  alternates: {
    canonical: "https://yourwebsite.com/string-converter", // Update with your actual URL
  },
  openGraph: {
    title: "String Case Converter | Free Text Converter Tool",
    description:
      "Convert text between different cases instantly. Perfect for coding, writing, and content formatting.",
    url: "https://yourwebsite.com/string-converter", // Update with your actual URL
    siteName: "Your Website Name",
    type: "website",
    images: [
      {
        url: "/og-image-string-converter.png", // Add your OG image
        width: 1200,
        height: 630,
        alt: "String Case Converter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "String Case Converter | Free Text Converter Tool",
    description:
      "Convert text between different cases instantly. Perfect for coding, writing, and content formatting.",
    images: ["/twitter-image-string-converter.png"], // Add your Twitter image
  },
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
  category: "Technology",
};

export default function StringConverterPage() {
  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection
          title="String Case Converter"
          text="A handy tool to instantly switch your text between different cases for coding, writing, or content formatting."
        />
        <StringHelper />
      </main>

      {/* Additional SEO-friendly content */}
      <section className={homeStyle.sectionWrapper}>
        <h2 className={homeStyle.heroTitle}>
          About String Case Converter
        </h2>
        <div className={homeStyle.heroText}>
          <p style={{ marginBottom: "1rem" }}>
            {`Our String Case Converter is a powerful, free online tool designed
            to help developers, writers, and content creators quickly convert
            text between various formatting styles. Whether you're coding in
            JavaScript, Python, or any other programming language, this tool
            makes it easy to maintain consistent naming conventions.`}
          </p>
          <p>
            {`Simply paste your text, and instantly see it converted to lowercase,
            uppercase, camelCase, PascalCase, snake_case, kebab-case, and Title
            Case. No installation required, works directly in your browser, and
            completely free to use.`}
          </p>
        </div>
      </section>

      <section className={homeStyle.sectionWrapper}>
        <h2 className={homeStyle.heroTitle}>Supported Case Formats</h2>
        <div style={{ padding: "1rem 0" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 className={homeStyle.normalTitle}>lowercase</h3>
            <p className={homeStyle.normalText}>
              {`Converts all characters to lowercase letters. Example: "hello
              world"`}
            </p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 className={homeStyle.normalTitle}>UPPERCASE</h3>
            <p className={homeStyle.normalText}>
              {`Converts all characters to uppercase letters. Example: "HELLO
              WORLD"
            `}
            </p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 className={homeStyle.normalTitle}>camelCase</h3>
            <p className={homeStyle.normalText}>
              {`First word lowercase, subsequent words capitalized with no spaces.
              Popular in JavaScript. Example: "helloWorld"`}
            </p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 className={homeStyle.normalTitle}>PascalCase</h3>
            <p className={homeStyle.normalText}>
              {`All words capitalized with no spaces. Common for class names.
              Example: "HelloWorld"`}
            </p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 className={homeStyle.normalTitle}>snake_case</h3>
            <p className={homeStyle.normalText}>
             {` All lowercase with underscores between words. Popular in Python.
              Example: "hello_world"`}
            </p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 className={homeStyle.normalTitle}>kebab-case</h3>
            <p className={homeStyle.normalText}>
              {`All lowercase with hyphens between words. Common in URLs and CSS.
              Example: "hello-world"`}
            </p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 className={homeStyle.normalTitle}>Title Case</h3>
            <p className={homeStyle.normalText}>
              {`First letter of each word capitalized. Example: "Hello World"`}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}