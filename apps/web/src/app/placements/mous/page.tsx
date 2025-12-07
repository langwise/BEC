"use client";

import { PageHeader } from "@/components/placements/page-header";
import { placementContent } from "@/data/placements/content";
import { FileText } from "lucide-react";

export default function PlacementMoUsPage() {
  const { mous } = placementContent;

  return (
    <div className="space-y-12">
      <PageHeader
        title="Memorandum of Understanding (MoUs)"
        description="Collaborations aimed at enhancing industry exposure and academic excellence."
      />

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="grid divide-y divide-gray-100">
          {mous.map((mou, idx) => (
            <div
              key={idx}
              className="p-4 md:p-5 flex items-start gap-4 hover:bg-orange-50/50 transition-colors group"
            >
              <FileText className="w-5 h-5 text-gray-400 group-hover:text-primary mt-0.5 shrink-0 transition-colors" />
              <span className="text-gray-700 font-medium">{mou}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
