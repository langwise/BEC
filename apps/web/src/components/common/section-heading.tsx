import { cn } from "@/lib/utils";

/**
 * Standard section heading used across all pages: optional uppercase eyebrow,
 * an h2 title, and an optional supporting paragraph. Keeps heading rhythm and
 * type scale consistent site-wide — reuse this instead of hand-writing headings.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">{title}</h2>
      {description ? (
        <p className="max-w-3xl text-base leading-relaxed text-gray-700 text-justify">
          {description}
        </p>
      ) : null}
    </div>
  );
}
