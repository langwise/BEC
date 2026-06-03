"use client";

import { cn } from "@/lib/utils";
import { placementContent } from "@/data/placements/content";

/**
 * Embedded Google Form for collecting recruiter leads.
 *
 * To go live: open the Google Form → Send → "<>" (embed) tab → copy the src
 * from the iframe and paste it into `placementContent.recruiterFormSrc`
 * (data/placements/content.ts). While that is empty, a styled placeholder is
 * shown so the page never renders a broken iframe.
 */
export function RecruiterForm({
  className,
  height = 720,
}: {
  className?: string;
  height?: number;
}) {
  const src = placementContent.recruiterFormSrc;

  if (src) {
    return (
      <iframe
        src={src}
        className={cn("w-full rounded-2xl border border-orange-100 bg-white", className)}
        style={{ height }}
        title="Recruiter interest form"
      >
        Loading…
      </iframe>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-orange-200 bg-orange-50/40 p-10 text-center",
        className
      )}
    >
      <div className="text-sm font-semibold text-gray-900">Recruiter interest form</div>
      <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
        The lead-capture Google Form will appear here. Add its embed URL to{" "}
        <code className="rounded bg-white px-1 py-0.5 text-gray-600">recruiterFormSrc</code>{" "}
        in <code className="rounded bg-white px-1 py-0.5 text-gray-600">data/placements/content.ts</code>.
      </p>
    </div>
  );
}
