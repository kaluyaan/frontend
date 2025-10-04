import { Metadata } from "next";
import AIWriterClient from "@/components/ai-writer/aiWriterClient";

export const metadata: Metadata = {
  title:
    "AI to Human Text Converter - Transform AI Content into Natural Writing",
  description:
    "Convert AI-generated content into natural, human-like text with our advanced humanization tool. Improve readability and authenticity.",
  keywords: [
    "AI text converter",
    "humanize AI text",
    "AI to human",
    "text humanizer",
    "natural language processing",
    "content transformation",
  ],
  openGraph: {
    title: "AI to Human Text Converter",
    description: "Transform AI-generated text into natural, human-like content",
    url: "https://kaluyaan.com/ai-writer",
    siteName: "Kaluyaan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI to Human Text Converter",
    description: "Transform AI-generated text into natural, human-like content",
  },
};

export default async function AIWriterPage() {
  return <AIWriterClient />;
}
