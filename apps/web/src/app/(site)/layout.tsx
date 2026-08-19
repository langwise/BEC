import type React from "react";
import type { Metadata } from "next";
import { SiteChrome } from "@/components/site-chrome";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
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
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteChrome>{children}</SiteChrome>;
}
