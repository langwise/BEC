import { Download, Award } from "lucide-react";
import { placementContent } from "@/data/placements/content";
import { BrochureCover } from "@/components/placements/brochure-cover";
import { PlacementsHeader } from "@/components/placements/placements-header";
import { BreadcrumbsJsonLd } from "@/components/seo/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Placement Brochure",
  description:
    "Download the placement brochure of Basaveshwar Engineering College, Bagalkote — programmes, statistics, facilities and the placement process for recruiters.",
  path: "/placements/brochure",
});

export default function BrochurePage() {
  const { brochureHref } = placementContent;

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Placements", path: "/placements" },
          { name: "Brochure", path: "/placements/brochure" },
        ]}
      />
      <PlacementsHeader
        title="Placement Brochure"
        description="Everything about BEC for recruiters, in one file."
      />

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs sm:p-8">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-12">
          <BrochureCover width="180px" className="shrink-0" />
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <Award className="h-3.5 w-3.5" /> Recruiter Edition
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Everything about BEC, in one file
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-gray-600">
              Programmes, statistics, facilities, recruiters and the placement process — the
              complete placement brochure for recruiters.
            </p>
            <a
              href={brochureHref}
              download
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-primary/90"
            >
              <Download className="h-5 w-5" /> Download brochure
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
