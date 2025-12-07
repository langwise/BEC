"use client";

import { PageHeader } from "@/components/placements/page-header";
import { placementContent } from "@/data/placements/content"; // Make sure to export this in data layer step if not done, assumed existing or will be created.
// Wait I haven't verified the export yet, let me use the raw content from previous step to be safe or import it if I did write it.
// I wrote it in Step 97 to `apps/web/src/data/placements/content.ts`.

import { placementStats } from "@/data/home/placements";
import { FadeIn } from "@/components/animations/fade-in";
import { CheckCircle2 } from "lucide-react";

export default function PlacementHomePage() {
  const { home } = placementContent;

  return (
    <div className="space-y-12">
      <PageHeader
        title={home.title}
        description={home.subtitle}
      />

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {placementStats.map((stat, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100 flex flex-col items-center justify-center text-center"
          >
            <span className="text-2xl md:text-3xl font-bold text-primary block mb-1">
              {stat.value}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* About Section */}
      <div className="prose prose-lg prose-orange max-w-none">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          About the Cell
        </h3>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          {home.about.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Institutional Highlights
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {home.highlights.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-gray-700 font-medium">{item}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
