import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import { BreadcrumbsJsonLd } from "@/components/seo/jsonld";
import HistoryContent from "./history-content";

export const metadata: Metadata = pageMetadata({
  title: "History of BEC Bagalkote",
  description:
    "From its 1963 founding by the B.V.V. Sangha to autonomous status in 2007, trace six decades of BEC Bagalkote — its expansion, TEQIP grants, accreditations and research growth on a 93-acre campus.",
  path: "/institute/history",
});

export default function Page() {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Institute", path: "/institute/about" },
          { name: "History", path: "/institute/history" },
        ]}
      />
      <HistoryContent />
    </>
  );
}
