import {
  Presentation,
  Monitor,
  Users,
  MessageSquare,
  Library,
  Wifi,
  Building2,
  type LucideIcon,
} from "lucide-react";
import { placementContent } from "@/data/placements/content";
import { PlacementsHeader } from "@/components/placements/placements-header";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { assetsUnder } from "@/lib/assets";
import { BreadcrumbsJsonLd } from "@/components/seo/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Placement Facilities",
  description:
    "Campus recruitment facilities at Basaveshwar Engineering College, Bagalkote — multimedia seminar halls, computer centres, interview and group-discussion rooms for placement drives.",
  path: "/placements/facilities",
});

const facilityIcons: Record<string, LucideIcon> = {
  Presentation,
  Monitor,
  Users,
  MessageSquare,
  Library,
  Wifi,
};

const cellPhotos = assetsUnder("placements/cell/").map((src) => ({
  src,
  alt: "Training & Placement Cell, Basaveshwar Engineering College, Bagalkote",
}));

export default function FacilitiesPage() {
  const { facilities } = placementContent;

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Placements", path: "/placements" },
          { name: "Facilities", path: "/placements/facilities" },
        ]}
      />
      <PlacementsHeader title="Facilities" description={facilities.overview} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {facilities.items.map((item) => {
          const Icon = facilityIcons[item.icon] ?? Building2;
          return (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="mb-1 font-bold text-gray-900">{item.title}</h2>
              <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
            </div>
          );
        })}
      </div>

      {cellPhotos.length > 0 && (
        <div className="mt-10">
          <PhotoGallery images={cellPhotos} />
        </div>
      )}
    </>
  );
}
