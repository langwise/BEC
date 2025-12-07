"use client";

import { PageHeader } from "@/components/placements/page-header";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function PlacementBrochurePage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Placement Brochure"
        description="Download our latest placement brochure to learn more about our opportunities."
      />

      <div className="flex flex-col items-center justify-center p-16 bg-orange-50/50 rounded-2xl border border-dashed border-orange-200">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
            <span className="text-4xl">📄</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
            2025 Placement Brochure
        </h3>
        <p className="text-gray-600 mb-8 text-center max-w-md">
            Comprehensive guide for recruiters containing student profiles, department details, and past placement records.
        </p>
        <Button className="gap-2" size="lg">
            <Download className="w-4 h-4" />
            Download PDF
        </Button>
      </div>
    </div>
  );
}
