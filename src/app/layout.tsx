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
    default: "Contourna | Business manuals, done automatically",
    template: "%s | Contourna",
  },
  description:
    "Create, review, approve, and share business policies, procedures, and work instructions with AI-assisted document control.",
  icons: { icon: "/images/contourna-mark.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Contourna | Business manuals, done automatically",
    description:
      "Standardize processes, onboard faster, and keep your team aligned with AI-assisted business manuals.",
    url: "https://contourna.com",
    siteName: "Contourna",
    type: "website",
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
