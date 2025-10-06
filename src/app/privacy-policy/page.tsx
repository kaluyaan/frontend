import { Metadata } from "next";
import HeroSection from "@/components/shared/HeroSection";
import homeStyle from "../../components/Home/home.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Kaluyaan",
  description:
    "Learn how Kaluyaan collects, uses, and protects your personal information. Your privacy is important to us.",
  keywords: [
    "privacy policy",
    "data protection",
    "user privacy",
    "Kaluyaan privacy",
    "information security",
  ],
  authors: [{ name: "Sandeep Sokle" }],
  creator: "Sandeep Sokle",
  publisher: "Kaluyaan",
  alternates: {
    canonical: "https://kaluyaan.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Kaluyaan",
    description:
      "Understand how Kaluyaan safeguards your personal data and privacy.",
    url: "https://kaluyaan.com/privacy-policy",
    siteName: "Kaluyaan",
    type: "website",
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
  category: "Legal",
};

export default function PrivacyPolicyPage() {
  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection
          title="Privacy Policy"
          text="Learn how Kaluyaan collects, uses, and protects your personal information. Your privacy matters to us."
        />

        <section className={homeStyle.sectionWrapper}>
          <h2 className={homeStyle.heroTitle}>Our Commitment to Your Privacy</h2>
            <p style={{ marginBottom: "1rem" }}>
              At Kaluyaan, we respect your privacy and are committed to protecting
              the personal information you share with us. This Privacy Policy explains
              how we collect, use, and protect your data when you use our website or
              services.
            </p>

            <h3 className={homeStyle.normalTitle}>1. Information We Collect</h3>
            <p className={homeStyle.normalText}>
              We collect information you provide voluntarily — such as your name,
              email address, or message details — when you contact us or use our forms.
            </p>

            <h3 className={homeStyle.normalTitle}>2. How We Use Your Information</h3>
            <p className={homeStyle.normalText}>
              The information collected is used to improve user experience, respond to
              inquiries, send updates, and maintain website security.
            </p>

            <h3 className={homeStyle.normalTitle}>3. Data Security</h3>
            <p className={homeStyle.normalText}>
              We adopt industry-standard measures to protect your personal data from
              unauthorized access, alteration, or destruction.
            </p>

            <h3 className={homeStyle.normalTitle}>4. Cookies</h3>
            <p className={homeStyle.normalText}>
              Our website may use cookies to enhance your browsing experience. You can
              disable cookies through your browser settings if preferred.
            </p>

            <h3 className={homeStyle.normalTitle}>5. Third-Party Services</h3>
            <p className={homeStyle.normalText}>
              We may use third-party analytics or hosting providers that process
              anonymized usage data in accordance with their own privacy policies.
            </p>

            <h3 className={homeStyle.normalTitle}>6. Contact Us</h3>
            <p className={homeStyle.normalText}>
              For any questions about this Privacy Policy, reach us at{" "}
              <strong>support@kaluyaan.com</strong>.
            </p>
        </section>
      </main>
    </div>
  );
}
