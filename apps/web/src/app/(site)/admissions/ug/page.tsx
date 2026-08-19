import { pageMetadata } from "@/lib/seo";
import { AdmissionsHeader } from "@/components/admissions/admissions-header";
import { AdmissionDetail } from "@/components/admissions/sections";
import { BreadcrumbsJsonLd, ProgramJsonLd } from "@/components/seo/jsonld";
import { getAdmissionProgramme } from "@/data/admissions";

const programme = getAdmissionProgramme("ug");

export const metadata = pageMetadata({
  title: "B.E. Undergraduate Admissions",
  description:
    "B.E. admissions at BEC Bagalkote across 11 disciplines (990 seats) via Karnataka CET, COMED-K or JEE. Eligibility, entrance exams, quota-wise fees, sanctioned intake and college codes.",
  path: "/admissions/ug",
});

export default function UGAdmissionsPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Admissions", path: "/admissions" },
          { name: "Under Graduate (B.E.)", path: "/admissions/ug" },
        ]}
      />
      <ProgramJsonLd
        name="Bachelor of Engineering (B.E.)"
        description={programme.description}
        path="/admissions/ug"
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
