import { pageMetadata } from "@/lib/seo";
import { AdmissionsHeader } from "@/components/admissions/admissions-header";
import { AdmissionDetail } from "@/components/admissions/sections";
import { BreadcrumbsJsonLd, ProgramJsonLd } from "@/components/seo/jsonld";
import { getAdmissionProgramme } from "@/data/admissions";

const programme = getAdmissionProgramme("pg");

export const metadata = pageMetadata({
  title: "M.Tech Postgraduate Admissions",
  description:
    "M.Tech admissions at BEC Bagalkote (College Code T810) in Structural, Geo-Technical, Environmental and Machine Design — 72 seats via PGCET or GATE. Eligibility, fees and intake.",
  path: "/admissions/pg",
});

export default function PGAdmissionsPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Admissions", path: "/admissions" },
          { name: "Post Graduate (M.Tech)", path: "/admissions/pg" },
        ]}
      />
      <ProgramJsonLd
        name="Master of Technology (M.Tech)"
        description={programme.description}
        path="/admissions/pg"
        credential={programme.credential}
      />
      <AdmissionsHeader
        title={programme.title}
        description={programme.description}
        credential={programme.credential}
        duration={programme.duration}
        seats={programme.seats}
      />
      <AdmissionDetail programme={programme} />
    </>
  );
}
