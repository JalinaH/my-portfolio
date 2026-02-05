import type { Metadata, Viewport } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-oxanium",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://itsjalina.me"),
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
      <body className={`${oxanium.className} antialiased bg-black`}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
