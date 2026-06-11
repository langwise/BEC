import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Basaveshwar Engineering College | Home",
  description: "Basaveshwar Engineering College (Autonomous) Bagalkot",
  generator: "v0.app",
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
    <html lang="en">
      <head>
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
