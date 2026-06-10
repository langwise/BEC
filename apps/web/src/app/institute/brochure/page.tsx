import type { Metadata } from "next";

import { PageHero } from "@/components/common/page-hero";
import { DocumentDirectory } from "@/components/common/document-directory";
import { asset } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Institute Brochure | Basaveshwar Engineering College, Bagalkote",
  description:
    "Download the Basaveshwar Engineering College, Bagalkote institute brochure — scheme, programmes and prospectus.",
};

export default function BrochurePage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="About Us"
        title="Institute Brochure"
        description="An overview of Basaveshwar Engineering College — its programmes, scheme of study and admission information. Download the brochure below."
        badges={[{ label: "Established 1963" }]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
        <DocumentDirectory
          groups={[
            {
              documents: [
                {
                  title: "Institute Brochure (Scheme & Prospectus)",
                  url: asset("documents/institute/brochure.pdf"),
                },
              ],
            },
          ]}
        />
      </section>
    </main>
  );
}
