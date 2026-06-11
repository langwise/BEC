import { pageMetadata } from "@/lib/seo";
import { SymposiaPage } from "@/components/student-life/symposia-page";

export const metadata = pageMetadata({
  title: "Symposia Archive",
  description:
    "SYMPOSIA 2023 archive — the national technical symposia held 8-9 September 2023 during BEC Bagalkote's Diamond Jubilee year, with themes, brochure and schedules.",
  path: "/student-life/symposia",
});

export default function Page() {
  return <SymposiaPage />;
}
