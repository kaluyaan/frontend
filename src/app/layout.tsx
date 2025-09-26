import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header/Header";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaluyaan Tools - Calculators, Converters, Health Tests & More",
  description:
    "Kaluyaan offers a comprehensive suite of free online tools: calculators, converters, health tests, PDF utilities, productivity timers, and more. Instantly access age calculators, countdowns, AI text converters, wellness trackers, and fun compatibility tools—all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#333",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <Header />
        <span
          style={{
            display: "block",
            height: "20px",
            position: "relative",
            zIndex: 1,
          }}
        ></span>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
