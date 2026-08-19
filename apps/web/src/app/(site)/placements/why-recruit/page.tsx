import { CheckCircle2 } from "lucide-react";
import { placementContent } from "@/data/placements/content";
import { PlacementsHeader } from "@/components/placements/placements-header";
import { BreadcrumbsJsonLd } from "@/components/seo/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Why Recruit Our Students",
  description:
    "Why recruiters choose Basaveshwar Engineering College, Bagalkote — problem solvers, effective communicators and corporate-ready graduates trained from the first year.",
  path: "/placements/why-recruit",
});

export default function WhyRecruitPage() {
  const { whyRecruit } = placementContent;

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Placements", path: "/placements" },
          { name: "Why Recruit Us", path: "/placements/why-recruit" },
        ]}
      />
      <PlacementsHeader
        title="Why Recruit Our Students"
        description="A structured, four-year training pipeline produces graduates who are ready to contribute from day one."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {whyRecruit.map((w) => (
          <div key={w.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
            <CheckCircle2 className="mb-3 h-6 w-6 text-primary" />
            <h2 className="mb-1 font-bold text-gray-900">{w.title}</h2>
            <p className="text-sm leading-relaxed text-gray-600">{w.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
