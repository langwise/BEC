"use client";

import { PageHeader } from "@/components/placements/page-header";
import { placementContent } from "@/data/placements/content";
import { FadeIn } from "@/components/animations/fade-in";

export default function PlacementProcessPage() {
  const { process } = placementContent;

  return (
    <div className="space-y-12">
      <PageHeader
        title="Placement Process & Calendar"
        description="A systematic approach to grooming students from their first year to final placement."
      />

      <div className="relative border-l-2 border-orange-100 ml-4 md:ml-6 space-y-12 py-4">
        {process.map((step, idx) => (
          <FadeIn key={idx} delay={idx * 0.1} className="relative pl-8 md:pl-12">
            {/* Timeline Dot */}
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-primary shadow-sm" />
            
            <div className="flex flex-col sm:flex-row gap-4 sm:items-baseline mb-2">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider shrink-0">
                Semester {step.semester}
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                {step.title}
              </h3>
            </div>
            
            <p className="text-gray-600 leading-relaxed max-w-2xl bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              {step.description}
            </p>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
