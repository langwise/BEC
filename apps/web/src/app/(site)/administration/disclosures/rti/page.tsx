import { pageMetadata } from "@/lib/seo";
import { RtiContent } from "./rti-content";

export const metadata = pageMetadata({
  title: "Right to Information (RTI)",
  description:
    "RTI disclosures for BEC Bagalkote under the Right to Information Act, 2005: Public Information Officer, Assistant PIO and First Appellate Authority details, plus the mandatory disclosure.",
  path: "/administration/disclosures/rti",
});

export default function RtiPage() {
  return <RtiContent />;
}
