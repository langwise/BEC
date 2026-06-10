import type { Metadata } from "next";

import { SymposiaPage } from "@/components/student-life/symposia-page";

export const metadata: Metadata = {
  title: "Symposia Archive | Basaveshwar Engineering College, Bagalkote",
  description:
    "SYMPOSIA 2023 archive: themes, event facts, brochure and schedules from Basaveshwar Engineering College, Bagalkote.",
};

export default function Page() {
  return <SymposiaPage />;
}
