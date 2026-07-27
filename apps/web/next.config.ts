import type { NextConfig } from "next";

import legacyRedirects from "./src/data/legacy-redirects.json";

const r2Host = process.env.NEXT_PUBLIC_R2_BASE_URL
  ? new URL(process.env.NEXT_PUBLIC_R2_BASE_URL).hostname
  : undefined;


const toSource = (path: string) => encodeURI(path).replace(/[()[\]{}*+?^$|\\]/g, "\\$&");

const LEGACY_DOCUMENT = ":path(.*\\.(?:php|html?))";

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
  },
  async redirects() {
    return [
      ...Object.entries(legacyRedirects.exact).map(([source, destination]) => ({
        source: toSource(source),
        destination,
        permanent: true,
      })),
      ...Object.entries(legacyRedirects.prefixes).map(([prefix, destination]) => ({
        source: `${toSource(prefix)}/${LEGACY_DOCUMENT}`,
        destination,
        permanent: true,
      })),
    ];
  }
};

export default nextConfig;
