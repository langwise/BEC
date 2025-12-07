"use client";

import Link from "next/link";

import {
  SenateMember,
  senateLastUpdated,
  senateMembers,
} from "@/data/governance/senate";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const categoryLabels: Record<
  NonNullable<SenateMember["category"]>,
  string
> = {
  chair: "Chair",
  member: "Member",
  nominee: "Nominee",
  invitee: "Invitee",
  "ex-officio": "Ex-officio",
};

export default function SenatePage() {
  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f97316_0%,transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#0f172a_0%,transparent_28%)]" />
        </div>
        <div className="relative container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            Administration · Senate
          </p>
          <div className="mt-4 space-y-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
              Senate
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              Statutory academic body responsible for academic policies, approvals, and quality
              oversight. Official composition will be published as soon as received from the
              institute.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Badge className="bg-primary text-white px-4 py-2 rounded-sm">
                Governing body
              </Badge>
              <Badge variant="secondary" className="rounded-sm">
                Academic oversight
              </Badge>
              <Badge variant="outline" className="rounded-sm">
                {senateLastUpdated}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-18 container mx-auto max-w-6xl px-4 lg:px-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Current placeholders
          </h2>
          <p className="text-base text-gray-700 leading-relaxed">
            Roles mirrored from the official site structure. Names and affiliations will be updated
            once shared by administration.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {senateMembers.map((member, idx) => (
            <Card key={member.role ?? idx} className="rounded-sm border-stone-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {member.name || member.role || "To be confirmed"}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-2">
                  {member.role ? (
                    <Badge className="rounded-sm bg-primary text-white">{member.role}</Badge>
                  ) : null}
                  {member.category ? (
                    <Badge variant="outline" className="rounded-sm text-xs">
                      {categoryLabels[member.category]}
                    </Badge>
                  ) : null}
                  {member.placeholder && (
                    <Badge variant="outline" className="rounded-sm text-xs">
                      Awaiting update
                    </Badge>
                  )}
                </div>
              </CardHeader>
              {member.affiliation ? (
                <CardContent className="text-sm text-gray-700 leading-relaxed">
                  {member.affiliation}
                </CardContent>
              ) : null}
            </Card>
          ))}
        </div>

        <Card className="rounded-sm border-stone-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Need official details?
            </CardTitle>
            <CardDescription className="text-sm text-gray-700">
              Please share the latest Senate notification/PDF. We will replace placeholders
              immediately.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-gray-700 leading-relaxed">
            <Link
              href="mailto:principal@becbgk.edu"
              className="text-primary font-semibold hover:underline underline-offset-4"
            >
              Send Senate composition
            </Link>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
