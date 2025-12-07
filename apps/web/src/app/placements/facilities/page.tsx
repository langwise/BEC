"use client";

import { PageHeader } from "@/components/placements/page-header";
import { placementContent } from "@/data/placements/content";
import { Monitor, Presentation, Users, MessageSquare, Library, Wifi } from "lucide-react";

// Map icon strings to components
const iconMap: Record<string, any> = {
  Monitor,
  Presentation,
  Users,
  MessageSquare,
  Library,
  Wifi,
};

export default function PlacementFacilitiesPage() {
  const { facilities } = placementContent;

  return (
    <div className="space-y-12">
      <PageHeader
        title="Infrastructure & Facilities"
        description={facilities.overview}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.items.map((item, idx) => {
          const Icon = iconMap[item.icon] || Presentation;
          return (
            <div
              key={idx}
              className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-xs hover:shadow-md hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
