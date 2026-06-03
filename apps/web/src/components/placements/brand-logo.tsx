"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Brand logo by company domain (via Clearbit's logo endpoint), with a graceful
 * monogram fallback when the logo can't be loaded or no domain is provided.
 */
export function BrandLogo({
  name,
  domain,
  className,
  monogramClassName,
}: {
  name: string;
  domain?: string;
  className?: string;
  monogramClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !domain) {
    return (
      <span
        className={cn(
          "flex items-center justify-center rounded-xl bg-primary/10 font-bold text-primary",
          monogramClassName ?? className
        )}
      >
        {name.charAt(0)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={`${name} logo`}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("object-contain", className)}
    />
  );
}
