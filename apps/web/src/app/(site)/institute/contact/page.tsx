import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import ContactContent from "./contact-content";

export const metadata: Metadata = pageMetadata({
  title: "Contact BEC Bagalkote",
  description:
    "Contact Basaveshwar Engineering College, Bagalkote — address, phone, email and key administrative contacts, plus directions by road, rail and air to the campus in Bagalkote, Karnataka.",
  path: "/institute/contact",
});

export default function Page() {
  return <ContactContent />;
}
