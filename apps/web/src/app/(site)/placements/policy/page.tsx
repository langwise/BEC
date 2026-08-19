import { Clock, CheckCircle2, FileText } from "lucide-react";
import { placementContent } from "@/data/placements/content";
import { PlacementsHeader } from "@/components/placements/placements-header";
import { BreadcrumbsJsonLd } from "@/components/seo/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Placement Policy",
  description:
    "Slot-wise placement policy of the Training & Placement Cell, Basaveshwar Engineering College, Bagalkote — CTC bands, scheduling and general rules for campus recruitment.",
  path: "/placements/policy",
});

export default function PlacementPolicyPage() {
  const { policy, policyHref } = placementContent;

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Placements", path: "/placements" },
          { name: "Placement Policy", path: "/placements/policy" },
        ]}
      />
      <PlacementsHeader
        title="Placement Policy"
        description="Campus recruitment runs in priority slots by CTC band. The policy below governs eligibility, scheduling and conduct for every drive."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {policy.slots.map((slot) => (
          <div
            key={slot.title}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {slot.ctc}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400">
                <Clock className="h-3.5 w-3.5" />
                {slot.duration}
              </span>
            </div>
            <h2 className="mt-4 text-lg font-bold text-gray-900">{slot.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{slot.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50/60 p-6">
        <h2 className="mb-4 text-base font-bold text-gray-900">General rules</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {policy.generalRules.map((rule) => (
            <li key={rule} className="flex items-start gap-3 text-sm text-gray-600">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
              {rule}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <a
          href={policyHref}
          download
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-primary hover:text-primary"
        >
          <FileText className="h-4 w-4" /> Download full placement policy
        </a>
      </div>
    </>
  );
}
