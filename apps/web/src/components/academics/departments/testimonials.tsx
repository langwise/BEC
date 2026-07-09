"use client";

import { Quote } from "lucide-react";
import { iconMap } from "./icons";

type Testimonial = {
  name: string;
  quote: string;
  designation?: string;
  organization?: string;
  photo?: string;
};

function initials(name: string): string {
  return name
    .replace(/^(Dr|Mr|Mrs|Ms|Prof)\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function TestimonialsSection({
  title,
  icon,
  testimonials,
}: {
  title: string;
  icon?: string;
  testimonials: Testimonial[];
}) {
  const Icon = icon ? iconMap[icon] : null;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        {Icon && (
          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center border border-orange-100 shadow-sm">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        )}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{title}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <figure
            key={i}
            className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
          >
            <Quote className="w-8 h-8 text-primary/20 shrink-0" aria-hidden />
            <blockquote className="mt-3 flex-1 text-gray-700 leading-relaxed">
              {t.quote}
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-4 border-t border-stone-100 pt-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {t.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.photo} alt={t.name} className="h-full w-full object-cover" />
                ) : (
                  initials(t.name)
                )}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 leading-snug">{t.name}</p>
                {(t.designation || t.organization) && (
                  <p className="text-sm text-gray-500 leading-snug">
                    {[t.designation, t.organization].filter(Boolean).join(", ")}
                  </p>
                )}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
