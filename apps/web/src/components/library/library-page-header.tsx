// File: src/components/library/library-page-header.tsx
"use client";

import { LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";

interface LibraryPageHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  bgGradient?: string;
}

export function LibraryPageHeader({
  icon: Icon,
  title,
  subtitle,
  bgGradient = "from-primary to-accent",
}: LibraryPageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f97316_0%,transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#0f172a_0%,transparent_28%)]" />
      </div>
      <div className="relative container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
          Facilities · Library
        </p>
        <div className="mt-4 space-y-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
