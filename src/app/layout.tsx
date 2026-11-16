import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";

// Same family as the product app and mobile. Variable font, so every weight is real.
const roboto = Roboto({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://contourna.com"),
  title: {
    // Brand first, then what the product is. The hero keeps the tagline; a
    // browser tab and a search result want the category instead.
    default: "Contourna | AI document control software",
    template: "%s | Contourna",
  },
  description:
    "Write policies, procedures, and work instructions faster. Keep every document current and collect the records that show the work was done.",
  icons: { icon: "/images/contourna-mark.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Contourna | AI document control software",
    description:
      "Write policies and procedures faster, keep them current, and collect the records that show your team followed them.",
    url: "https://contourna.com",
    siteName: "Contourna",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contourna | AI document control software",
    description:
      "Write better business manuals, keep them current, and collect the records that show the work was done.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${roboto.variable} scroll-smooth`}>
      <body>{children}</body>
    </html>
  );
}
