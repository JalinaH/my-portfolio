import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Add the weights you need
  variable: "--font-poppins", // Optional: if you want to use it as a CSS variable
});

export const metadata: Metadata = {
  title: "Jalina Hirushan", // Consider updating this
  description: "This is my portfolio", // Consider updating this
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Use poppins.className to apply the font globally */}
      {/* Or use poppins.variable if you prefer CSS variables */}
      <body className={`${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
