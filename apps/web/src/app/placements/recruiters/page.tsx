"use client";

import { PageHeader } from "@/components/placements/page-header";
import { topRecruiters } from "@/data/home/placements";
import Image from "next/image";

export default function PlacementRecruitersPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Our Recruiters"
        description="Top companies that trust our talent."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {topRecruiters.map((company, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="relative w-full h-12">
              <Image
                src={company.logo}
                alt={company.name}
                fill
                className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm">
          And many more industry leaders...
        </p>
      </div>
    </div>
  );
}
