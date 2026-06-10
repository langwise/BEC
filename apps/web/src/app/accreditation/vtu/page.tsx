import type { Metadata } from "next";

import { PageHero } from "@/components/common/page-hero";
import { DocumentDirectory } from "@/components/common/document-directory";
import { asset } from "@/lib/assets";

export const metadata: Metadata = {
  title: "VTU Affiliation | Basaveshwar Engineering College, Bagalkote",
  description:
    "Visvesvaraya Technological University (VTU), Belagavi affiliation orders for Basaveshwar Engineering College, Bagalkote.",
};

export default function VtuPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Affiliation"
        title="VTU Affiliation"
        description="Basaveshwar Engineering College is affiliated to Visvesvaraya Technological University (VTU), Belagavi. The affiliation orders issued by the University are published below."
        badges={[{ label: "Affiliated to VTU, Belagavi" }]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
        <DocumentDirectory
          groups={[
            {
              label: "Affiliation Orders",
              documents: [
                { title: "VTU Affiliation Order (2018)", url: asset("documents/vtu/vtuaffiliation2018.pdf") },
                { title: "VTU Affiliation Order (2019–20)", url: asset("documents/vtu/vtu-affiliation19-20.pdf") },
              ],
            },
          ]}
        />
      </section>
    </main>
  );
}
