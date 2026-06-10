import type { Metadata } from "next";

import { PageHero } from "@/components/common/page-hero";
import { DocumentDirectory } from "@/components/common/document-directory";
import { SectionHeading } from "@/components/common/section-heading";
import {
  naacCertification,
  naacCriteria,
  naacDvv,
  naacReview,
} from "@/data/accreditation/naac";

export const metadata: Metadata = {
  title: "NAAC Accreditation | Basaveshwar Engineering College, Bagalkote",
  description:
    "NAAC Self-Study Report (Cycle 2), criterion-wise metrics, DVV clarifications, appeal documents and the accreditation certificate for Basaveshwar Engineering College, Bagalkote.",
};

export default function NaacPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Accreditation"
        title="NAAC Accreditation"
        description="Assessment and accreditation by the National Assessment and Accreditation Council (NAAC), Bengaluru. The Self-Study Report, criterion-wise metrics, Data Validation & Verification (DVV) clarifications, appeal records and the accreditation certificate are published below."
        badges={[
          { label: "NAAC Accredited" },
          { label: "Self-Study Report — Cycle 2", tone: "outline" },
        ]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="space-y-8">
          <DocumentDirectory groups={naacCertification} />
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Self-Study Report"
            title="Criterion-wise metrics"
            description="Supporting documents organised under the seven NAAC assessment criteria."
          />
          <DocumentDirectory groups={naacCriteria} />
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="DVV"
            title="Data Validation & Verification"
            description="Metric-wise clarifications submitted during the DVV process."
          />
          <DocumentDirectory groups={naacDvv} />
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Review"
            title="Revised DVV & Appeal"
            description="Revised DVV submissions and appeal records."
          />
          <DocumentDirectory groups={naacReview} />
        </div>
      </section>
    </main>
  );
}
