import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BEC - Bangkok Education Center",
  description: "Bangkok Education Center official website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
