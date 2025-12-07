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
  bgGradient = "from-primary to-accent"
}: LibraryPageHeaderProps) {
  return (
    <section className={`bg-gradient-to-r ${bgGradient} py-16`}>
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="flex items-center gap-4 mb-4">
            <Icon className="h-12 w-12 text-white" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
              {title}
            </h1>
          </div>
          {subtitle && (
            <p className="text-xl text-white/90 max-w-3xl">
              {subtitle}
            </p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}