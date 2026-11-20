import "./globals.css";
import { Figtree } from "next/font/google";
import type { Metadata } from "next";
import ScrollSync from "@/components/ScrollSync";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-figtree",
});

const siteUrl = "https://matiks-concept-project.vercel.app";
const title = "Share the Thrill · Matiks referral concept case study";
const description =
  "Concept UX case study: situation-based Matiks referral slide-ups after close wins, personal bests, and streaks; 150 XP invite tracking; pass-it-on loop. Proposed feature, not a live Matiks ship. By Harshal.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: "Harshal" }],
  keywords: [
    "Matiks",
    "referral",
    "UX case study",
    "concept case study",
    "product design",
    "Share the Thrill",
  ],
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": [{ url: "/case.md", title: "Case study markdown twin" }],
    },
  },
  openGraph: {
    type: "article",
    url: siteUrl,
    title,
    description,
    siteName: "Harshal · Matiks concept case study",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Share the Thrill: Matiks Referral at Excite Moments — concept case study cover",
        type: "image/png",
      },
      {
        url: "/case/thumbnail.png",
        alt: "Share the Thrill case study thumbnail (full art)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/favicon-180.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon-32.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: title,
  headline: "Share the Thrill: Matiks Referral at Excite Moments",
  description,
  url: siteUrl,
  creator: {
    "@type": "Person",
    name: "Harshal",
  },
  about: [
    "Matiks referral UX",
    "situation-based slide-up",
    "product design case study",
  ],
  genre: "Concept UX case study",
  inLanguage: "en",
  isAccessibleForFree: true,
  learningResourceType: "Case study",
  encoding: [
    {
      "@type": "MediaObject",
      encodingFormat: "text/html",
      url: siteUrl,
    },
    {
      "@type": "MediaObject",
      encodingFormat: "text/markdown",
      url: `${siteUrl}/case.md`,
      name: "AI-readable markdown twin",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${figtree.className}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollSync />
        {children}
      </body>
    </html>
  );
}
