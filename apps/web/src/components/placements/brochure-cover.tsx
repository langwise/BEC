"use client";

import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

/** Stacked, slightly-tilted mockup of the placement brochure cover. */
export function BrochureCover({
  className,
  width = "300px",
}: {
  className?: string;
  width?: string;
}) {
  return (
    <div className={cn("relative mx-auto", className)} style={{ width }}>
      <div className="absolute inset-0 translate-x-3 translate-y-4 rotate-3 rounded-xl bg-secondary/20" />
      <div className="absolute inset-0 translate-x-1.5 translate-y-2 rotate-1 rounded-xl bg-secondary/30" />
      <div className="relative aspect-[3/4] rounded-xl bg-linear-to-br from-primary to-accent p-6 text-white shadow-2xl shadow-orange-900/20 -rotate-2">
        <FileText className="w-8 h-8 opacity-90" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="text-[10px] font-bold uppercase tracking-widest text-white/70">
            Recruiter Edition
          </div>
          <div className="text-2xl font-bold leading-tight mt-1">BEC Placement Brochure</div>
          <div className="mt-3 h-px w-12 bg-white/40" />
          <div className="mt-3 text-sm text-white/80">2025 · Bagalkote</div>
        </div>
      </div>
    </div>
  );
}
