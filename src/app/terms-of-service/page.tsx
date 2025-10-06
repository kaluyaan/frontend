import { Metadata } from "next";
import HeroSection from "@/components/shared/HeroSection";
import homeStyle from "../../components/Home/home.module.css";

export const metadata: Metadata = {
  title: "Terms of Service | Kaluyaan",
  description:
    "Read the terms and conditions governing your use of Kaluyaan.com. By using our website, you agree to these terms.",
  keywords: [
    "terms of service",
    "terms and conditions",
    "Kaluyaan terms",
    "legal policy",
    "user agreement",
  ],
  authors: [{ name: "Sandeep Sokle" }],
  creator: "Sandeep Sokle",
  publisher: "Kaluyaan",
  alternates: {
    canonical: "https://kaluyaan.com/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service | Kaluyaan",
    description:
      "Understand the terms and conditions that govern your access to Kaluyaan.com.",
    url: "https://kaluyaan.com/terms-of-service",
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

export default function TermsOfServicePage() {
  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection
          title="Terms of Service"
          text="Please read these terms carefully before using Kaluyaan.com. By accessing or using our website, you agree to these terms."
        />

        <section className={homeStyle.sectionWrapper}>
          <h2 className={homeStyle.heroTitle}>Introduction</h2>
          <p style={{ marginBottom: "1rem" }}>
            These Terms of Service govern your access to and use of Kaluyaan.com
            and its related services. By continuing to use our website, you
            agree to these terms.
          </p>

          <h3 className={homeStyle.normalTitle}>1. Acceptance of Terms</h3>
          <p className={homeStyle.normalText}>
            By accessing our site, you confirm that you have read, understood,
            and agreed to comply with these Terms of Service.
          </p>

          <h3 className={homeStyle.normalTitle}>2. Use of Website</h3>
          <p className={homeStyle.normalText}>
            You agree to use the website only for lawful purposes and in a
            manner that does not infringe upon the rights of others or restrict
            their use of the site.
          </p>

          <h3 className={homeStyle.normalTitle}>3. Intellectual Property</h3>
          <p className={homeStyle.normalText}>
            All content on Kaluyaan.com, including text, logos, images, and
            graphics, is owned or licensed by Kaluyaan and protected by
            applicable copyright laws.
          </p>

          <h3 className={homeStyle.normalTitle}>4. Limitation of Liability</h3>
          <p className={homeStyle.normalText}>
            Kaluyaan shall not be liable for any damages arising from your use
            of our website or inability to access it.
          </p>

          <h3 className={homeStyle.normalTitle}>5. Changes to Terms</h3>
          <p className={homeStyle.normalText}>
            We may revise or update these Terms of Service from time to time.
            Your continued use of the website signifies your acceptance of any
            modifications.
          </p>

          <h3 className={homeStyle.normalTitle}>6. Contact Us</h3>
          <p className={homeStyle.normalText}>
            For inquiries about these Terms, contact us at{" "}
            <strong>support@kaluyaan.com</strong>.
          </p>
        </section>
      </main>
    </div>
  );
}
