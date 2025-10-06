import homeStyle from "@/components/Home/home.module.css";
import HeroSection from "@/components/shared/HeroSection";

export const metadata = {
  title: "Contact Us | Kaluyaan",
  description:
    "Get in touch with the Kaluyaan team. We’d love to hear from you! Contact us for support, inquiries, or collaborations.",
  alternates: {
    canonical: "https://kaluyaan.com/contact",
  },
  openGraph: {
    title: "Contact Us | Kaluyaan",
    description:
      "Reach out to the Kaluyaan team for support, questions, or business inquiries.",
    url: "https://kaluyaan.com/contact",
    siteName: "Kaluyaan",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection
          icon={"🔄"}
          title="Contact Us"
          text="We’re here to help! Please fill out the form below and we’ll get back
          to you soon."
        />
        <section className={homeStyle.sectionWrapper}>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdHmzd4LlcDKLNbUGP56Mdy22vK0-0Nz83-V66Nrj4IRQoEwA/viewform?embedded=true"
            width="100%"
            height="900"
            title="Kaluyaan Contact Form"
          >
            Loading…
          </iframe>
        </section>
      </main>
    </div>
  );
}
