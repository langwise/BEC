import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type PageHeroBadge = {
  label: string;
  tone?: "primary" | "secondary" | "outline";
};

export function PageHero({
  eyebrow,
  title,
  description,
  badges,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  badges?: PageHeroBadge[];
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50",
        className,
      )}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f97316_0%,transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#0f172a_0%,transparent_28%)]" />
      </div>
      <div className="relative container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            {eyebrow}
          </p>
        ) : null}
        <div className="mt-4 space-y-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
            {title}
          </h1>
          {description ? (
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              {description}
            </p>
          ) : null}
          {badges?.length ? (
            <div className="flex flex-wrap gap-3 text-sm">
              {badges.map((badge) =>
                badge.tone === "secondary" ? (
                  <Badge key={badge.label} variant="secondary" className="rounded-sm">
                    {badge.label}
                  </Badge>
                ) : badge.tone === "outline" ? (
                  <Badge key={badge.label} variant="outline" className="rounded-sm">
                    {badge.label}
                  </Badge>
                ) : (
                  <Badge key={badge.label} className="bg-primary text-white px-4 py-2 rounded-sm">
                    {badge.label}
                  </Badge>
                ),
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
