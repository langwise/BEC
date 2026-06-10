import type { Metadata } from "next";

import { PageHero } from "@/components/common/page-hero";
import { DocumentDirectory } from "@/components/common/document-directory";
import { asset } from "@/lib/assets";

export const metadata: Metadata = {
  title: "NBA Accreditation | Basaveshwar Engineering College, Bagalkote",
  description:
    "National Board of Accreditation (NBA) programme accreditation and extension letters for Basaveshwar Engineering College, Bagalkote.",
};

export default function NbaPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Accreditation"
        title="NBA Accreditation"
        description="Programme-level accreditation by the National Board of Accreditation (NBA), New Delhi. Accreditation grants, extensions and compliance letters for the college's engineering programmes are published below."
        badges={[
          { label: "NBA Accredited" },
          { label: "Outcome-Based Education", tone: "outline" },
        ]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
        <DocumentDirectory
          groups={[
            {
              label: "Accreditation Grants",
              documents: [
                { title: "NBA Accreditation Grant Letter", url: asset("documents/nba/2431-nba-grant.pdf") },
                { title: "Information Science & Engg. (ISE) — NBA Grant", url: asset("documents/nba/2431-ise-grant.pdf") },
                { title: "Information Science & Engg. (ISE) — Accreditation 2023–2026", url: asset("documents/nba/nba-ise-2023-2026.pdf") },
                { title: "Electronics & Comm. and Computer Science — Accreditation 2022–25", url: asset("documents/nba/ec-cs-6886-22-25.pdf") },
                { title: "Computer Science & Engg. (CSE) — Accreditation 2021", url: asset("documents/nba/663-md-cse-21.pdf") },
                { title: "Electrical, Electronics-Instrumentation & Biotechnology — Accreditation 2021–22", url: asset("documents/nba/ee-ei-bt-accreditition-21-22.pdf") },
              ],
            },
            {
              label: "Extensions & Compliance",
              documents: [
                { title: "Accreditation Extension 2019–22", url: asset("documents/nba/567-accreditation-extension-19-22.pdf") },
                { title: "Accreditation Extension (2020)", url: asset("documents/nba/663-dc-extension-accreditation-20.pdf") },
                { title: "Electrical & Biotechnology — Extension Compliance 2022–23", url: asset("documents/nba/ee-bt-extension-compliance-22-23.pdf") },
              ],
            },
          ]}
        />
      </section>
    </main>
  );
}
