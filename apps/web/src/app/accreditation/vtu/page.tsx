import { PageHero } from "@/components/common/page-hero";
import { DocumentDirectory } from "@/components/common/document-directory";
import { asset } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "VTU Affiliation",
  description:
    "Visvesvaraya Technological University (VTU), Belagavi affiliation orders for BEC Bagalkote, including affiliation orders for 2018, 2019–20, 2020–21, 2021–22, 2022–23, 2023-24 & 2024-25, and 2025–26.",
  path: "/accreditation/vtu",
});

export default function VtuPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Affiliation"
        title="VTU Affiliation"
        description="Basaveshwar Engineering College is affiliated to Visvesvaraya Technological University (VTU), Belagavi. The affiliation orders issued by the University are published below."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
        <DocumentDirectory
          groups={[
            {
              label: "Affiliation Orders",
              documents: [
                { title: "VTU Affiliation Order (2025–26)", url: asset("documents/vtu/vtu-affiliation-2025-26.pdf") },
                { title: "VTU Affiliation Order (2023-24 & 2024-25)", url: asset("documents/vtu/vtu-affiliation-2023-24-and-2024-25.pdf") },
                { title: "VTU Affiliation Order (2022–23)", url: asset("documents/vtu/vtu-affiliation-2022-23.pdf") },
                { title: "VTU Affiliation Order (2021–22)", url: asset("documents/vtu/vtu-affiliation-2021-22.pdf") },
                { title: "VTU Affiliation Order (2020–21)", url: asset("documents/vtu/vtu-affiliation-2020-21.pdf") },
                { title: "VTU Affiliation Order (2019–20)", url: asset("documents/vtu/vtu-affiliation19-20.pdf") },
                { title: "VTU Affiliation Order (2018)", url: asset("documents/vtu/vtuaffiliation2018.pdf") },
              ],
            },
          ]}
        />
      </section>
    </main>
  );
}
