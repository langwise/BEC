import { pageMetadata } from "@/lib/seo";
import { AdmissionsHeader } from "@/components/admissions/admissions-header";
import { AdmissionDetail } from "@/components/admissions/sections";
import { BreadcrumbsJsonLd, ProgramJsonLd } from "@/components/seo/jsonld";
import { getAdmissionProgramme } from "@/data/admissions";

const programme = getAdmissionProgramme("mca");

export const metadata = pageMetadata({
  title: "MCA Admissions",
  description:
    "MCA admissions at BEC Bagalkote — 60 seats split equally between Government and Management quotas, via PGCET or KMAT. Eligibility, fee structure and sanctioned intake.",
  path: "/admissions/mca",
});

export default function MCAAdmissionsPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Admissions", path: "/admissions" },
          { name: "MCA", path: "/admissions/mca" },
        ]}
      />
      <ProgramJsonLd
        name="Master of Computer Applications (MCA)"
        description={programme.description}
        path="/admissions/mca"
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
