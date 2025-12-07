"use client";

import { bogMembers } from "@/data/governance/bog-members";
import { departmentHods } from "@/data/governance/hods";
import { orgChartLevels } from "@/data/governance/org-chart";
import { BogGrid } from "@/components/governance/bog-grid";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Params = { slug?: string[] };

export default function AdministrationCatchAll({ params }: { params: Params }) {
  const slug = params.slug ?? [];
  const path = slug.join("/");
  const title = formatTitle(slug) || "Administration";

  const isBoG = path === "governing/board";
  const isChart = path === "chart";
  const isHods = path === "hods";

  return (
    <main className="bg-background text-foreground">
      <header className="border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50">
        <div className="container mx-auto max-w-6xl px-4 lg:px-6 py-12 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            Administration
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
            {title}
          </h1>
          <p className="text-base text-gray-700 leading-relaxed max-w-3xl">
            {copyForPath(path)}
          </p>
        </div>
      </header>

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-12 space-y-8">
        {isBoG && (
          <>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-gray-900">Board of Governors</h2>
              <p className="text-sm text-gray-700">
                Composition as published on the official site.
              </p>
            </div>
            <BogGrid members={bogMembers} />
          </>
        )}

        {isChart && (
          <>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-gray-900">Organizational Chart</h2>
              <p className="text-sm text-gray-700">
                Simplified structure based on the mandatory disclosure.
              </p>
            </div>
            <div className="overflow-x-auto">
              <div className="flex min-w-full gap-4 md:gap-6">
                {orgChartLevels.map((level) => (
                  <Card
                    key={level.title}
                    className="min-w-[240px] flex-1 rounded-sm border-stone-200 shadow-sm"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {level.title}
                      </CardTitle>
                      {level.description ? (
                        <CardDescription className="text-sm text-gray-600">
                          {level.description}
                        </CardDescription>
                      ) : null}
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2 text-sm text-gray-800">
                        {level.nodes.map((node) => (
                          <li
                            key={node}
                            className="rounded-sm border border-dashed border-stone-200 bg-stone-50 px-3 py-2"
                          >
                            {node}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {isHods && (
          <>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-gray-900">Heads of Departments</h2>
              <p className="text-sm text-gray-700">
                Department leadership as published on the main site (placeholders where data is pending).
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {departmentHods.map((hod) => (
                <Card key={hod.department} className="rounded-sm border-stone-200 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {hod.department}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      {hod.placeholder ? "Data pending" : hod.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-gray-800">
                    {hod.name ? (
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="rounded-sm">
                          HOD
                        </Badge>
                        <span className="font-medium">{hod.name}</span>
                      </div>
                    ) : (
                      <Badge variant="outline" className="rounded-sm text-xs">
                        Placeholder until confirmed
                      </Badge>
                    )}
                    {hod.email ? (
                      <a
                        href={`mailto:${hod.email}`}
                        className="text-primary hover:underline underline-offset-4"
                      >
                        {hod.email}
                      </a>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {!isBoG && !isChart && !isHods && (
          <Card className="rounded-sm border-stone-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Content coming soon
              </CardTitle>
              <CardDescription className="text-sm text-gray-700">
                This page will be populated with official administration content.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 leading-relaxed">
              You reached: <span className="font-semibold">{`/administration/${path}`}</span>
            </CardContent>
          </Card>
        )}
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

function copyForPath(path: string) {
  if (path === "governing/board") return "Official Board of Governors membership.";
  if (path === "chart") return "High-level view of oversight from Sangha to departments.";
  if (path === "hods") return "Directory of department heads across BEC.";
  return "Administrative information, leadership, and statutory bodies.";
}
