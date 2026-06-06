import Image from "next/image";
import { Check } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export type LeadershipMessageProps = {
  /** Small uppercase label above the title, e.g. "Academic Leadership". */
  eyebrow: string;
  /** Page title, e.g. "Principal's Message". */
  title: string;
  /** One-line supporting subtitle under the title. */
  subtitle?: string;
  name: string;
  role: string;
  /** Resolved image URL (through asset()). */
  image: string;
  /** How the portrait sits in its frame. Cutout PNGs look better "contain". */
  imageFit?: "cover" | "contain";
  /** Optional pull-quote shown under the name card. */
  quote?: { text: string; attribution?: string };
  /** Body copy; blank lines separate paragraphs. */
  message: string;
  /** Optional achievements list rendered as a panel. */
  achievements?: string[];
  /** Optional closing paragraphs after the achievements. */
  closingMessage?: string;
};

function toParagraphs(text?: string): string[] {
  if (!text) return [];
  return text
    .trim()
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/**
 * Shared layout for every "message from a leader" page (Principal, Chairman,
 * Director, …). Uses the site design system — stone borders, rounded-sm cards,
 * the standard eyebrow/title header, muted quote and signature treatments — so
 * all leadership pages look identical. Reuse this; don't hand-roll per page.
 */
export function LeadershipMessage({
  eyebrow,
  title,
  subtitle,
  name,
  role,
  image,
  imageFit = "cover",
  quote,
  message,
  achievements,
  closingMessage,
}: LeadershipMessageProps) {
  const paragraphs = toParagraphs(message);
  const closing = toParagraphs(closingMessage);

  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f97316_0%,transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#0f172a_0%,transparent_28%)]" />
        </div>
        <div className="relative container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            {eyebrow}
          </p>
          <div className="mt-4 max-w-3xl space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
              {title}
            </h1>
            {subtitle ? (
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-18">
        <div className="container mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.9fr_1.4fr] lg:px-6 items-start">
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm border border-stone-200 bg-stone-100 shadow-sm">
              <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 1024px) 100vw, 36vw"
                className={
                  imageFit === "contain"
                    ? "object-contain p-4"
                    : "object-cover object-top"
                }
                priority
              />
            </div>

            <Card className="rounded-sm border-stone-200 shadow-sm">
              <CardContent className="space-y-4 p-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    {role}
                  </p>
                </div>
                {quote ? (
                  <blockquote className="border-l-2 border-primary pl-4">
                    <p className="text-sm italic leading-relaxed text-gray-700">
                      &ldquo;{quote.text}&rdquo;
                    </p>
                    {quote.attribution ? (
                      <footer className="mt-1 text-xs text-gray-500">
                        — {quote.attribution}
                      </footer>
                    ) : null}
                  </blockquote>
                ) : null}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div className="space-y-5 text-base leading-relaxed text-gray-700">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-justify">
                  {paragraph}
                </p>
              ))}
            </div>

            {achievements?.length ? (
              <Card className="rounded-sm border-stone-200 bg-stone-50/70 shadow-sm">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Key achievements
                  </h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {achievements.map((achievement, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm leading-relaxed text-gray-700"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}

            {closing.length ? (
              <div className="space-y-5 text-base leading-relaxed text-gray-700">
                {closing.map((paragraph, index) => (
                  <p key={index} className="text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}

            <div className="border-t border-stone-200 pt-6">
              <p className="text-sm text-gray-500">With best wishes,</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">{name}</p>
              <p className="text-sm text-gray-600">{role}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
