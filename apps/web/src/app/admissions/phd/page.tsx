import { pageMetadata } from "@/lib/seo";
import { AdmissionsHeader } from "@/components/admissions/admissions-header";
import { AdmissionDetail } from "@/components/admissions/sections";
import { BreadcrumbsJsonLd, ProgramJsonLd } from "@/components/seo/jsonld";
import { getAdmissionProgramme } from "@/data/admissions";

const programme = getAdmissionProgramme("phd");

export const metadata = pageMetadata({
  title: "Ph.D & M.Sc. (Engg.) Research Admissions",
  description:
    "Ph.D and M.Sc. (Engg.) research admissions at BEC Bagalkote across 9 VTU-recognized research centres. Eligibility, VTU application procedure and registration & admission documents.",
  path: "/admissions/phd",
});

export default function PhDAdmissionsPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Admissions", path: "/admissions" },
          { name: "Ph.D / M.Sc. (Engg.)", path: "/admissions/phd" },
        ]}
      />
      <ProgramJsonLd
        name="Doctor of Philosophy (Ph.D) / M.Sc. (Engg.)"
        description={programme.description}
        path="/admissions/phd"
        credential={programme.credential}
      />
      <AdmissionsHeader
        title={programme.title}
        description={programme.description}
        credential={programme.credential}
      />
      <AdmissionDetail programme={programme} />
    </>
  );
}
