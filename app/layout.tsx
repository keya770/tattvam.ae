import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { RiskBar } from "@/components/site/RiskBar";
import { Preloader } from "@/components/site/Preloader";
import { BackToTop, ScrollProgress, SmoothScroll } from "@/components/site/SmoothScroll";

// Self-hosted fonts (Plus Jakarta Sans variable + JetBrains Mono) — no runtime call to Google.
const jakarta = localFont({
  src: "./fonts/PlusJakartaSans-Variable.woff2",
  variable: "--font-jakarta",
  weight: "200 800",
  display: "swap",
});
const mono = localFont({
  src: [
    { path: "./fonts/JetBrainsMono-500.woff2", weight: "500" },
    { path: "./fonts/JetBrainsMono-600.woff2", weight: "600" },
    { path: "./fonts/JetBrainsMono-700.woff2", weight: "700" },
  ],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tattvammarkets.com"),
  title: { default: "Tattvam Capital Securities — Trade Global Markets With Confidence", template: "%s | Tattvam Capital Securities" },
  description:
    "Tattvam Capital Securities in Dubai. Explore forex, precious metals, commodities, indices and stocks with clear information about products, costs and risks.",
  openGraph: { siteName: "Tattvam Capital Securities", type: "website" },
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${mono.variable}`}>
      <body>
        <MotionConfig reducedMotion="user">
          <SmoothScroll>
            <Preloader />
            <ScrollProgress />
            <Header />
            <main>{children}</main>
            <Footer />
            <RiskBar />
            <BackToTop />
          </SmoothScroll>
        </MotionConfig>
      </body>
    </html>
  );
}
