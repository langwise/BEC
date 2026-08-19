import { pageMetadata } from "@/lib/seo";
import { AdmissionsHeader } from "@/components/admissions/admissions-header";
import { AdmissionDetail } from "@/components/admissions/sections";
import { BreadcrumbsJsonLd, ProgramJsonLd } from "@/components/seo/jsonld";
import { getAdmissionProgramme } from "@/data/admissions";

const programme = getAdmissionProgramme("mba");

export const metadata = pageMetadata({
  title: "MBA Admissions",
  description:
    "MBA admissions at BEC Bagalkote (College Code B124) — 60 seats split equally between Government and Management quotas, via PGCET or KMAT. Eligibility, fees and intake.",
  path: "/admissions/mba",
});

export default function MBAAdmissionsPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Admissions", path: "/admissions" },
          { name: "MBA", path: "/admissions/mba" },
        ]}
      />
      <ProgramJsonLd
        name="Master of Business Administration (MBA)"
        description={programme.description}
        path="/admissions/mba"
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
