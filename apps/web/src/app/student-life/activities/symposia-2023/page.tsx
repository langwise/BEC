import type { Metadata } from "next";

import { SymposiaPage } from "@/components/student-life/symposia-page";

export const metadata: Metadata = {
  title: "Symposia 2023 | Basaveshwar Engineering College, Bagalkote",
  description:
    "Archived details, brochure and schedules for SYMPOSIA 2023 at Basaveshwar Engineering College, Bagalkote.",
};

export default function Symposia2023Page() {
  return <SymposiaPage />;
}
