import type { Metadata, Viewport } from "next";
import { Oxanium } from "next/font/google";
import { siteUrl } from "@/lib/portfolio";
import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const portfolioFont = Oxanium({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-oxanium",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Jalina Hirushan | Digital Product Engineer",
  description:
    "Portfolio of Jalina Hirushan — crafting web, mobile, and IoT experiences with thoughtful engineering and bold design.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${portfolioFont.className} antialiased bg-black`}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
