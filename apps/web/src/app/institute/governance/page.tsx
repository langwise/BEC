"use client";

import { redirect } from "next/navigation";

export default function LegacyGovernanceRedirect() {
  redirect("/administration/governance");
}

