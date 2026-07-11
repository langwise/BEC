import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink, Mail, Phone } from "lucide-react";

import { DocumentDirectory } from "@/components/common/document-directory";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { asset } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Innovation & Entrepreneurship Policy",
  description:
    "BEC Bagalkote's Innovation and Entrepreneurship Policy — aligned with MoE and Karnataka start-up policies, with source documents and contacts for student and faculty innovators.",
  path: "/institute/cells/iep",
});

const contacts = [
  {
    name: "Dr. Santhosh M. Malkapur",
    role: "Convener and Startup Activity Coordinator, IIC 8.0 BEC Bagalkote",
    affiliation: "Professor, Dept. of Civil Engg., Basaveshwar Engineering College, Bagalkote - 587 102",
    phone: "+91-9945417886",
    email: "sm.malkapur@gmail.com",
    photo: asset("cells/iic/santhosh-malkapur.webp"),
  },
];

const governmentLinks = [
  {
    title: "NISP portal",
    href: "https://nisp.mic.gov.in",
  },
  {
    title: "Karnataka Startup portal",
    href: "https://eitbt.karnataka.gov.in/startup/public/41/vision-&-objectives-/en",
  },
];

export default function IepPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Institute · Cells & Centres"
        title="BEC Innovation & Entrepreneurship Policy"
        description="Basaveshwar Engineering College has framed an innovation and entrepreneurship policy for students and faculty, aligned with the National Innovation and Startup Policy framework."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_220px] lg:items-start">
          <div className="space-y-5">
            <SectionHeading eyebrow="About" title="About BEC-IEP" />
            <div className="max-w-3xl space-y-4 text-base leading-relaxed text-gray-700 text-justify">
              <p>
                Basaveshwar Engineering College (BEC), Bagalkote has framed the
                innovation and entrepreneurship policy for students and faculty
                of the college.
              </p>
              <p>
                The BEC innovation and entrepreneurship policy has been framed in
                line with guidelines given in the NISP 2019 policy document. The
                policy at BEC aims to provide services, support and facilities
                available for potential innovators and entrepreneurs to excel in
                the field of innovation and entrepreneurship.
              </p>
            </div>
          </div>

          <div className="relative mx-auto h-36 w-52 lg:mx-0">
            <Image
              src={asset("cells/iic/iic-logo.webp")}
              alt="Institution's Innovation Council logo"
              fill
              sizes="208px"
              className="object-contain"
            />
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Documents"
            title="Policy documents"
            description="The legacy BEC-IEP page linked these policy documents and public resource portals."
          />
          <DocumentDirectory
            groups={[
              {
                label: "Policy Downloads",
                documents: [
                  {
                    title: "BEC Innovation and Entrepreneurship Policy",
                    url: asset("documents/cells/iic/bec-ie-policy.pdf"),
                  },
                  {
                    title: "MoE National Innovation and Startup Policy 2019",
                    url: asset("documents/cells/iic/nisp-2019.pdf"),
                    meta: "NISP resource linked from the legacy page",
                  },
                  {
                    title: "Karnataka State Startup Policy 2025-2030",
                    url: "https://eitbt.karnataka.gov.in/startup/public/uploads/media_to_upload1763380262.pdf",
                  },
                ],
              },
            ]}
          />

          <div className="grid gap-3 sm:grid-cols-2">
            {governmentLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 rounded-md border border-stone-200 bg-white p-4 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-md"
              >
                {item.title}
                <ExternalLink className="h-4 w-4 shrink-0 text-stone-400 group-hover:text-primary" />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Contact"
            title="Contact information"
            description="Contact details displayed on the legacy BEC-IEP page."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {contacts.map((person) => (
              <article
                key={person.email}
                className="grid gap-5 rounded-md border border-stone-200 bg-white p-5 shadow-sm sm:grid-cols-[128px_1fr]"
              >
                <div className="relative aspect-square overflow-hidden rounded-sm bg-stone-100">
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    sizes="128px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="min-w-0 space-y-3">
                  <div>
                    <h2 className="text-lg font-semibold leading-snug text-gray-900">
                      {person.name}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {person.role}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {person.affiliation}
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <a
                      href={`tel:${person.phone}`}
                      className="flex items-center gap-2 font-medium text-gray-700 hover:text-primary"
                    >
                      <Phone className="h-4 w-4 text-primary" />
                      {person.phone}
                    </a>
                    <a
                      href={`mailto:${person.email}`}
                      className="flex items-center gap-2 font-medium text-gray-700 hover:text-primary"
                    >
                      <Mail className="h-4 w-4 text-primary" />
                      {person.email}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
