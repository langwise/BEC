"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { orgChartLevels } from "@/data/governance/org-chart";
import { asset } from "@/lib/assets";
import {
  BogMember,
  bogLastUpdated,
  bogMembers,
  deans,
  hods,
  officers,
  principal,
  sangha,
} from "@/content/governance";
import { BogTable, bogCategoryLabels } from "@/components/governance/bog-table";
import { DeansGrid } from "@/components/governance/deans-grid";
import { DocumentDirectory } from "@/components/common/document-directory";
import { FilterChips } from "@/components/common/filter-chips";
import { PersonCard, PersonGrid } from "@/components/common/person-card";
import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const governanceLinks = [
  {
    label: "Mandatory Disclosure (PDF)",
    href: asset("documents/disclosures/mandatory-disclosure.pdf"),
    description: "Statutory disclosure including organization details.",
  },
  {
    label: "Academic Council Members (PDF)",
    href: asset("documents/misc/ac-members.pdf"),
    description: "Academic Council composition from the official PDF.",
  },
];

const academicCouncilDocuments = [
  {
    label: "Academic Council Resolutions",
    description: "Resolutions from the 9th to 12th Academic Council meetings.",
    documents: [
      {
        title: "12th ACM Resolutions",
        url: asset("documents/governance/academic-council/resolutions/12-acm-resolutions.pdf"),
      },
      {
        title: "11th ACM Resolutions",
        url: asset("documents/governance/academic-council/resolutions/11-acm-resolutions.pdf"),
      },
      {
        title: "10th ACM Resolutions",
        url: asset("documents/governance/academic-council/resolutions/10-acm-resolutions.pdf"),
      },
      {
        title: "9th ACM Resolutions",
        url: asset("documents/governance/academic-council/resolutions/9-acm-resolutions.pdf"),
      },
    ],
  },
  {
    label: "Academic Council Proceedings",
    description:
      "Proceedings from the 20th to 25th Academic Council meetings. The legacy 26th ACM link duplicated the 25th ACM PDF, so it is not repeated here until BEC confirms the correct source document.",
    documents: [
      {
        title: "25th ACM Proceedings",
        url: asset("documents/governance/academic-council/proceedings/25-acm-proceedings.pdf"),
      },
      {
        title: "24th ACM Proceedings",
        url: asset("documents/governance/academic-council/proceedings/24-acm-proceedings.pdf"),
      },
      {
        title: "23rd ACM Proceedings",
        url: asset("documents/governance/academic-council/proceedings/23-acm-proceedings.pdf"),
      },
      {
        title: "22nd ACM Proceedings",
        url: asset("documents/governance/academic-council/proceedings/22-acm-proceedings.pdf"),
      },
      {
        title: "21st ACM Proceedings",
        url: asset("documents/governance/academic-council/proceedings/21-acm-proceedings.pdf"),
      },
      {
        title: "20th ACM Proceedings",
        url: asset("documents/governance/academic-council/proceedings/20-acm-proceedings.pdf"),
      },
    ],
  },
];

const anchorNav = [
  { id: "overview", label: "Overview" },
  { id: "leadership", label: "Leadership" },
  { id: "deans", label: "Deans & Officers" },
  { id: "sangha", label: "B.V.V. Sangha" },
  { id: "bog", label: "Board of Governors" },
  { id: "org-chart", label: "Organization Chart" },
  { id: "hods", label: "HOD Directory" },
  { id: "documents", label: "Documents" },
];

// Build the Board-of-Governors filter chips from the categories actually present,
// so empty categories never show a chip that yields an empty grid.
const bogFilterOptions = [
  { value: "all" as const, label: "All", count: bogMembers.length },
  ...(Object.keys(bogCategoryLabels) as BogMember["category"][])
    .filter((category) => bogMembers.some((m) => m.category === category))
    .map((category) => ({
      value: category,
      label: bogCategoryLabels[category],
      count: bogMembers.filter((m) => m.category === category).length,
    })),
];

export function GovernanceContent() {
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
        id="leadership"
        className="border-t border-stone-200 bg-stone-50/70 py-14 md:py-18"
      >
        <div className="container mx-auto max-w-6xl px-4 lg:px-6 grid gap-8 md:grid-cols-[0.8fr_1.2fr] items-center">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm border border-stone-200 bg-stone-100 shadow-sm">
            <Image
              src={principal.photo}
              alt={principal.name}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-top"
              priority
            />
          </div>
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
              Leadership
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              {principal.name}
            </h2>
            <Badge className="rounded-sm bg-primary text-white">
              {principal.role}
            </Badge>
            <p className="text-base leading-relaxed text-gray-700">
              The Principal serves as Member Secretary to the Board of Governors and leads
              the institution&apos;s academic and administrative execution alongside the Deans,
              Controller of Examinations, and Heads of Department.
            </p>
            {principal.email ? (
              <Link
                href={`mailto:${principal.email}`}
                className="inline-flex text-primary text-sm font-semibold hover:underline underline-offset-4"
              >
                {principal.email}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section
        id="deans"
        className="py-14 md:py-18 container mx-auto max-w-6xl px-4 lg:px-6 space-y-10"
      >
        <div className="space-y-6">
          <SectionHeading
            title="Deans"
            description="Academic and administrative portfolios steering curriculum, placements, research, and quality."
          />
          <DeansGrid deans={deans} />
        </div>

        <div className="space-y-6">
          <SectionHeading
            title="Key officers"
            description="Statutory and support functions essential to day-to-day operations."
          />
          <DeansGrid deans={officers} />
        </div>
      </section>

      <section
        id="sangha"
        className="py-14 md:py-18 container mx-auto max-w-6xl px-4 lg:px-6 space-y-8"
      >
        <SectionHeading
          eyebrow="Parent Trust"
          title="B.V.V. Sangha leadership"
          description={sangha.intro}
        />

        <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-stone-200 bg-stone-100 shadow-sm">
          <Image
            src={sangha.groupPhoto}
            alt="B.V.V. Sangha leadership"
            fill
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="object-cover"
          />
        </div>

        <PersonGrid>
          {sangha.members.map((member) => (
            <PersonCard
              key={member.name}
              photo={member.photo}
              name={member.name}
              badges={[
                { label: member.role, tone: "primary" },
                ...(member.verify
                  ? [{ label: "To confirm", tone: "muted" as const }]
                  : []),
              ]}
            />
          ))}
        </PersonGrid>
      </section>

      <section
        id="bog"
        className="border-t border-stone-200 bg-stone-50/70 py-14 md:py-18"
      >
        <div className="container mx-auto max-w-6xl px-4 lg:px-6 space-y-8">
          <SectionHeading
            title="Board of Governors"
            description="Official BoG composition sourced from becbgk.edu. Filter by category to skim core members, nominees, invitees, and student representatives."
          />
          <p className="text-xs text-gray-500">{bogLastUpdated}</p>

          <div className="rounded-sm border border-stone-200 bg-white p-3 shadow-sm md:p-4">
            <FilterChips
              aria-label="Filter Board of Governors by category"
              options={bogFilterOptions}
              value={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          <BogTable
            members={
              activeCategory === "all"
                ? bogMembers
                : bogMembers.filter((member) => member.category === activeCategory)
            }
          />
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
          <SectionHeading
            title="HOD directory"
            description="Heads of Department across all programmes. Cards awaiting an update will be confirmed from the department pages."
          />

          <PersonGrid>
            {hods.map((hod) => (
              <PersonCard
                key={hod.department}
                photo={hod.photo}
                name={hod.name || hod.department}
                description={hod.name ? hod.department : undefined}
                email={hod.email}
                badges={[
                  hod.name
                    ? { label: "Head of Department", tone: "muted" }
                    : { label: "Awaiting update", tone: "outline" },
                ]}
              />
            ))}
          </PersonGrid>
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

        <div id="academic-council" className="scroll-mt-24 space-y-6">
          <SectionHeading
            eyebrow="Academic Council"
            title="Resolutions & proceedings"
            description="Official Academic Council meeting records migrated from the legacy BEC website."
          />
          <DocumentDirectory groups={academicCouncilDocuments} />
        </div>
      </section>
    </main>
  );
}
