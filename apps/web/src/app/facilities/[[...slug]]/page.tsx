"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Params = { slug?: string[] };

export default function FacilitiesCatchAll({ params }: { params: Params }) {
  const slug = params.slug ?? [];
  const path = slug.join("/");
  const title = formatTitle(slug) || "Facilities";

  return (
    <main className="bg-background text-foreground">
      <header className="border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50">
        <div className="container mx-auto max-w-6xl px-4 lg:px-6 py-12 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            Facilities
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
            {title}
          </h1>
          <p className="text-base text-gray-700 leading-relaxed max-w-3xl">
            Placeholder facility page to keep navigation links active while detailed content is prepared.
          </p>
        </div>
      </header>

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-12">
        <Card className="rounded-sm border-stone-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Content coming soon
            </CardTitle>
            <CardDescription className="text-sm text-gray-700">
              Facility and grievance details will be added from official sources.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-gray-700 leading-relaxed">
            You reached: <span className="font-semibold">{`/facilities/${path}`}</span>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function formatTitle(slug: string[]) {
  if (!slug.length) return "";
  return slug
    .map((segment) =>
      segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
    )
    .join(" / ");
}
