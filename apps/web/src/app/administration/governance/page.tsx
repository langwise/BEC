"use client";

import Link from "next/link";
import { useState } from "react";

import {
  BogMember,
  bogLastUpdated,
  bogMembers,
} from "@/data/governance/bog-members";
import { deans } from "@/data/governance/deans";
import { departmentHods } from "@/data/governance/hods";
import { orgChartLevels } from "@/data/governance/org-chart";
import { BogGrid, bogCategoryLabels } from "@/components/governance/bog-grid";
import { DeansGrid } from "@/components/governance/deans-grid";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const governanceLinks = [
  {
    label: "BoG Members (becbgk.edu)",
    href: "https://www.becbgk.edu/BOG%20Members.php",
    description: "Official Board of Governors list published on becbgk.edu.",
  },
  {
    label: "Governance (becbgk.edu)",
    href: "https://www.becbgk.edu/Governance.php",
    description: "Governing Council listing from the main site.",
  },
  {
    label: "Mandatory Disclosure",
    href: "https://www.becbgk.edu/Documents/Mandatory_Disclosure/Mandatory_Disclosure.pdf",
    description: "Statutory disclosure including organization details.",
  },
  {
    label: "Academic Council Members (PDF)",
    href: "https://www.becbgk.edu/Documents/AC%20Members.pdf",
    description: "Academic Council composition from the official PDF.",
  },
];

const anchorNav = [
  { id: "overview", label: "Overview" },
  { id: "deans", label: "Deans" },
  { id: "bog", label: "Board of Governors" },
  { id: "org-chart", label: "Organization Chart" },
  { id: "hods", label: "HOD Directory" },
  { id: "documents", label: "Documents" },
];

export default function GovernancePage() {
  const [activeCategory, setActiveCategory] =
    useState<"all" | BogMember["category"]>("all");

  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f97316_0%,transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#0f172a_0%,transparent_28%)]" />
        </div>
        <div className="relative container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            Administration · Governance
          </p>
          <div className="mt-4 space-y-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
              Transparent, accountable governance that keeps BEC future-ready
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              Oversight by the Board of Governors, leadership from the Principal and Deans,
              and quality stewardship by Heads of Department work together to uphold
              autonomy, accreditation, and academic excellence.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Badge className="bg-primary text-white px-4 py-2 rounded-sm">
                Board of Governors
              </Badge>
              <Badge variant="secondary" className="rounded-sm">
                Organization chart
              </Badge>
              <Badge variant="outline" className="rounded-sm">
                Statutory oversight
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <nav className="sticky top-[72px] z-30 hidden border-b border-stone-200 bg-background/85 backdrop-blur md:block">
        <div className="container mx-auto max-w-6xl px-4 lg:px-6">
          <div className="flex flex-wrap items-center gap-3 py-3 text-sm font-medium">
            {anchorNav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section
        id="overview"
        className="py-14 md:py-18"
      >
        <div className="container mx-auto max-w-6xl px-4 lg:px-6 grid gap-10 md:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Governance overview
            </h2>
            <p className="text-base leading-relaxed text-gray-700">
              Basaveshwar Engineering College operates under the aegis of B.V.V. Sangha with
              statutory oversight by the Board of Governors. The Principal (Member Secretary)
              leads day-to-day execution alongside Deans, Controllers, and Heads of Departments,
              ensuring policies, accreditation, and student outcomes remain aligned to mission.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Card className="rounded-sm border-stone-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Autonomy & Compliance
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Guided by BoG, VTU/UGC/AICTE norms, and institutional policies.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="rounded-sm border-stone-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Academic Quality
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Deans & HODs steward curriculum, accreditation, and learner success.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
          <Card className="rounded-sm border-stone-200">
            <CardHeader className="space-y-2 border-b border-stone-200 pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                At a glance
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Snapshot of key governance touchpoints.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-5 grid gap-4">
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" />
                <div>
                  <p className="font-semibold text-gray-900">Board of Governors</p>
                  <p className="text-sm text-gray-600">
                    Strategy, compliance, approvals, and oversight.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-secondary" />
                <div>
                  <p className="font-semibold text-gray-900">Principal & Deans</p>
                  <p className="text-sm text-gray-600">
                    Execution, academic administration, exams, placements, and development.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-amber-500" />
                <div>
                  <p className="font-semibold text-gray-900">Heads of Department</p>
                  <p className="text-sm text-gray-600">
                    Programme delivery, labs, BOS inputs, and student success per department.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section
        id="deans"
        className="py-14 md:py-18 container mx-auto max-w-6xl px-4 lg:px-6 space-y-6"
      >
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Deans
          </h2>
          <p className="text-base text-gray-700 leading-relaxed">
            Academic and administrative portfolios. Official names will be updated; contact
            emails are provided where available.
          </p>
        </div>
        <DeansGrid deans={deans} />
      </section>

      <section
        id="bog"
        className="border-t border-stone-200 bg-stone-50/70 py-14 md:py-18"
      >
        <div className="container mx-auto max-w-6xl px-4 lg:px-6 space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Board of Governors
              </h2>
              <p className="text-base text-gray-700 leading-relaxed">
                Official BoG composition sourced from becbgk.edu. Filter by category to skim
                core members, nominees, invitees, and student representatives.
              </p>
              <p className="text-xs text-gray-500">{bogLastUpdated}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
              <Badge variant="secondary" className="rounded-sm">
                VTU & UGC nominees included
              </Badge>
              <Badge variant="outline" className="rounded-sm">
                Student invitees listed
              </Badge>
            </div>
          </div>

          <Tabs
            value={activeCategory}
            onValueChange={(value) =>
              setActiveCategory(value as "all" | BogMember["category"])
            }
            className="w-full"
          >
            <TabsList className="flex w-full flex-wrap gap-2 rounded-sm bg-white p-2 shadow-sm">
              <TabsTrigger
                value="all"
                className="rounded-sm px-3 py-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                All ({bogMembers.length})
              </TabsTrigger>
              {Object.entries(bogCategoryLabels).map(([id, label]) => (
                <TabsTrigger
                  key={id}
                  value={id}
                  className="rounded-sm px-3 py-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <BogGrid members={bogMembers} />
            </TabsContent>
            {Object.keys(bogCategoryLabels).map((id) => {
              const membersForCategory = bogMembers.filter(
                (member) => member.category === (id as BogMember["category"]),
              );
              return (
                <TabsContent key={id} value={id} className="mt-6">
                  <BogGrid members={membersForCategory} />
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      <section
        id="org-chart"
        className="py-14 md:py-18 container mx-auto max-w-6xl px-4 lg:px-6 space-y-6"
      >
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Organization chart
          </h2>
          <p className="text-base text-gray-700 leading-relaxed">
            Simplified governance stack derived from the mandatory disclosure and official pages.
            Mobile users can scroll sideways to view all levels.
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
      </section>

      <section
        id="hods"
        className="border-t border-stone-200 bg-stone-50/70 py-14 md:py-18"
      >
        <div className="container mx-auto max-w-6xl px-4 lg:px-6 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              HOD directory
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Department heads as published on the main site will be populated here. Placeholder
              rows indicate data to be confirmed from department pages.
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
                    {hod.placeholder ? "Official HOD details will be published soon." : hod.title}
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
                      Awaiting update
                    </Badge>
                  )}
                  {hod.email ? (
                    <Link
                      href={`mailto:${hod.email}`}
                      className="text-primary hover:underline underline-offset-4"
                    >
                      {hod.email}
                    </Link>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="documents"
        className="py-14 md:py-18 container mx-auto max-w-6xl px-4 lg:px-6 space-y-6"
      >
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Documents & links
          </h2>
          <p className="text-base text-gray-700 leading-relaxed">
            Official governance references from becbgk.edu for verification and downloads.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {governanceLinks.map((item) => (
            <Card
              key={item.href}
              className="group rounded-sm border-stone-200 transition-shadow hover:shadow-md"
            >
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {item.label}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {item.description}
                  </CardDescription>
                </div>
                <span className="text-primary opacity-80 group-hover:opacity-100">↗</span>
              </CardHeader>
              <CardContent>
                <Link
                  href={item.href}
                  className="text-primary font-semibold hover:underline underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open link
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
