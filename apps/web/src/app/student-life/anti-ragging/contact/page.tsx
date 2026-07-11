import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { Phone, Mail, User, Siren, ExternalLink } from "lucide-react";

export const metadata = pageMetadata({
  title: "Anti-Ragging Helpline",
  description:
    "Anti-ragging committee contacts at BEC Bagalkote plus the 24x7 UGC toll-free helpline 1800-180-5522 and the national antiragging.in reporting portal.",
  path: "/student-life/anti-ragging/contact",
});

const committee = [
  {
    name: "Dr. B. R. Hiremath",
    role: "Chairman",
    designation: "Principal, BEC Bagalkote",
    contact: "becprincipal@yahoo.com",
  },
  {
    name: "Dr. P. L. Timmanagoudar",
    role: "Member / Secretary",
    designation: "Professor, Department of Chemistry",
    contact: "9448693600",
  },
  {
    name: "Prof. V. D. Holla",
    role: "Squad Coordinator",
    designation: "Anti-Ragging Squad, E & E Engineering",
    contact: "9342647037",
  },
];

export default function AntiRaggingContactPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Student Safety"
        title="Anti-Ragging Helpline"
        description="Reach out for help — your identity will be protected. Use the national toll-free helpline or contact the college anti-ragging committee directly."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="rounded-md border border-stone-200 bg-orange-50/60 p-6 shadow-sm md:p-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                <Siren className="h-4 w-4 text-primary" />
                24x7 National Helpline
              </div>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
                1800-180-5522
              </p>
              <p className="mt-1 text-sm text-gray-600">
                UGC Anti-Ragging Helpline (Toll Free)
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto">
              <a
                href="tel:18001805522"
                className="rounded-md bg-primary px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                Call Now
              </a>
              <a
                href="mailto:helpline@antiragging.in"
                className="rounded-md border border-stone-300 bg-white px-6 py-3 text-center text-sm font-semibold text-gray-700 transition-colors hover:border-primary/40 hover:text-primary"
              >
                helpline@antiragging.in
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading eyebrow="College Contacts" title="Anti-Ragging Committee" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {committee.map((member) => {
              const isEmail = member.contact.includes("@");
              return (
                <div
                  key={member.name}
                  className="flex flex-col rounded-md border border-stone-200 bg-white p-6 text-center shadow-sm"
                >
                  <span className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-primary">
                    <User className="h-6 w-6" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                    {member.role}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{member.designation}</p>
                  {member.contact && (
                  <a
                    href={isEmail ? `mailto:${member.contact}` : `tel:${member.contact}`}
                    className="mt-4 inline-flex items-center justify-center gap-2 border-t border-stone-100 pt-4 text-sm font-medium text-gray-700 transition-colors hover:text-primary"
                  >
                    {isEmail ? <Mail className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
                    {member.contact}
                  </a>
                  )}
                </div>
              );
            })}

            <div className="flex flex-col justify-center rounded-md border border-stone-200 bg-stone-900 p-6 text-center text-white shadow-sm">
              <h3 className="text-lg font-semibold">Report an Incident</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-300">
                You can also report ragging incidents through the national online
                portal.
              </p>
              <a
                href="https://www.antiragging.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                Visit Portal <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
