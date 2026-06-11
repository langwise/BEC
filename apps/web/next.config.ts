import type { NextConfig } from "next";

const r2Host = process.env.NEXT_PUBLIC_R2_BASE_URL
  ? new URL(process.env.NEXT_PUBLIC_R2_BASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      ...(r2Host
        ? [{ protocol: "https" as const, hostname: r2Host, pathname: "/**" }]
        : []),
      {
        protocol: "https",
        hostname: "utexas.edu",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      }
    ],
  }
};

export default nextConfig;
