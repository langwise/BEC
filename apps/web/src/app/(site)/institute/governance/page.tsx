import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Governance",
  description:
    "Governance at BEC Bagalkote — the institute's leadership, statutory bodies and administrative structure. This page now lives under Administration; you are being redirected there.",
  path: "/institute/governance",
});

export default function LegacyGovernanceRedirect() {
  redirect("/administration/governance");
}
