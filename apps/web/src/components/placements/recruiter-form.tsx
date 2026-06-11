"use client";

import { Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { placementContent } from "@/data/placements/content";

/**
 * Recruiter lead-capture. The embedded Google Form is disabled until a form
 * URL is set in `placementContent.recruiterFormSrc` (data/placements/content.ts);
 * until then recruiters are routed to the placement office directly.
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

  const { contact } = placementContent.home;

  return (
    <div
      className={cn(
        "rounded-2xl border border-orange-100 bg-orange-50/40 p-8 text-center",
        className
      )}
    >
      <h3 className="text-lg font-bold text-gray-900">Talk to the placement office</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-gray-600">
        Planning a campus drive? Reach out to {contact.name},{" "}
        {contact.role}, and the team will share available slots for the season.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-primary/90"
        >
          <Mail className="w-4 h-4" /> {contact.email}
        </a>
        <a
          href={`tel:+91${contact.mobile}`}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-primary hover:text-primary"
        >
          <Phone className="w-4 h-4" /> +91 {contact.mobile}
        </a>
      </div>
    </div>
  );
}
