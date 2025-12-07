"use client";

import { PageHeader } from "@/components/placements/page-header";
import { placementContent } from "@/data/placements/content";

export default function WhyRecruitPage() {
  const { whyRecruit } = placementContent;

  return (
    <div className="space-y-12">
      <PageHeader
        title="Why Recruit from BEC?"
        description="Our students are groomed to be industry-ready professionals with a blend of technical prowess and soft skills."
      />

      <div className="grid md:grid-cols-2 gap-6">
        {whyRecruit.map((reason, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-orange-50/30 border border-orange-100 hover:border-primary/30 transition-colors"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center text-sm font-bold border border-orange-100 shadow-sm">
                {idx + 1}
              </span>
              {reason.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed pl-10">
              {reason.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
