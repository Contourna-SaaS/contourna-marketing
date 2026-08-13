import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://contourna.com"),
  title: {
    // Brand first, then what the product is. The hero keeps the tagline; a
    // browser tab and a search result want the category instead.
    default: "Contourna | AI document control for policies and procedures",
    template: "%s | Contourna",
  },
  description:
    "AI-assisted document control for policies, procedures, work instructions, and training. Draft with AI, route through review and approval, then prove it with forms and records.",
  icons: { icon: "/images/contourna-mark.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Contourna | AI document control for policies and procedures",
    description:
      "Draft policies and procedures with AI, keep them under review and approval, and prove they are followed with forms and records.",
    url: "https://contourna.com",
    siteName: "Contourna",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contourna | AI document control for policies and procedures",
    description:
      "AI-assisted document control for policies, procedures, work instructions, and quality records.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <body>{children}</body>
    </html>
  );
}
