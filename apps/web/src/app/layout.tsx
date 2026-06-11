import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { OrganizationJsonLd } from "@/components/seo/organization-jsonld";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Autonomous Institute`,
    template: "%s | BEC Bagalkote",
  },
  description:
    "Basaveshwar Engineering College, Bagalkote — an autonomous institute affiliated to VTU, offering UG, PG and PhD programmes in engineering, management and sciences since 1963.",
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      {
        url: "/logo.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/logo.png",
        type: "image/png",
        sizes: "16x16",
      },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <head>
        <OrganizationJsonLd />
        {/* React Grab — dev-only UI element grabber (react-grab.com). ⌘C / Ctrl+C on hover. */}
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className={`font-sans antialiased`}>
        <div className="min-h-screen">
          <Header />
          {children}
          <Footer />
        </div>
        <Analytics />
        {process.env.NODE_ENV === "production" && (
          <GoogleAnalytics gaId="G-6F6X7N6R73" />
        )}
      </body>
    </html>
  );
}
