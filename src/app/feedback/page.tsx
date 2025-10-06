import HeroSection from "@/components/shared/HeroSection";
import homeStyle from "@/components/Home/home.module.css";

export const metadata = {
  title: "Feedback | Kaluyaan",
  description:
    "Share your feedback with the Kaluyaan team. We value your opinion and strive to improve your experience.",
  alternates: {
    canonical: "https://kaluyaan.com/feedback",
  },
  openGraph: {
    title: "Feedback | Kaluyaan",
    description:
      "Help Kaluyaan grow by sharing your valuable feedback and suggestions.",
    url: "https://kaluyaan.com/feedback",
    siteName: "Kaluyaan",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FeedbackPage() {
  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection
          icon={"📝"}
          title="Share Your Feedback"
          text="Your opinion matters to us. Please fill out the form below to share your
        thoughts or suggestions."
        />

        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSd7Y8ap9IlLlwRI6o6Fyc36SFdrCwth4Nty3pmjlMuDL0ay5Q/viewform?embedded=true"
          width="100%"
          height="900"
          title="Kaluyaan Feedback Form"
        >
          Loading…
        </iframe>
      </main>
    </div>
  );
}
