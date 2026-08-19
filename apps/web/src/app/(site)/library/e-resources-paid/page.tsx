import { FadeIn } from "@/components/animations/fade-in";
import { LibraryBreadcrumb } from "@/components/library/library-breadcrumb";
import { LibraryPageHeader } from "@/components/library/library-page-header";
import { LibrarySidebar } from "@/components/library/library-sidebar";
import { ResourceCard } from "@/components/library/resource-card";
import { Globe } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Library Paid E-Resources",
  description:
    "BEC Library subscribed databases: IEEE Xplore, ScienceDirect, SpringerLink, Taylor & Francis, Emerald, ProQuest, N-LIST and more via campus IP access.",
  path: "/library/e-resources-paid",
});

export default function EResourcesPaidPage() {
  // Subscribed/paid databases as listed on becbgk.edu/Library (e-resources paid).
  const paidResources = [
    { name: "IEEE", description: "IEEE journals, conference papers and standards in electrical engineering and computer science.", url: "https://ieeexplore.ieee.org/Xplore/home.jsp", category: "Journals & Conferences", type: "paid" as const },
    { name: "Science Direct", description: "Elsevier's platform for scientific, technical and medical research literature.", url: "https://www.sciencedirect.com/", category: "Research Database", type: "paid" as const },
    { name: "Springer Link", description: "Springer journals and reference works — 667 titles subscribed.", url: "http://link.springer.com", category: "Journals & Books", type: "paid" as const },
    { name: "Springer Link Comp Sc", description: "Specialized Springer collection for computer science.", url: "http://link.springer.com/", category: "Computer Science", type: "paid" as const },
    { name: "Taylor & Francis", description: "Journals across science, technology and social sciences — 239 titles subscribed.", url: "https://www.tandfonline.com/", category: "Multidisciplinary", type: "paid" as const },
    { name: "EMRALD 120", description: "Management, engineering and social science journals — 120 titles subscribed.", url: "https://www.emerald.com/insight/", category: "Journals", type: "paid" as const },
    { name: "ICE", description: "Institution of Civil Engineers / Emerald Insight access.", url: "https://www.emerald.com/insight/", category: "Journals", type: "paid" as const },
    { name: "ProQuest 3900", description: "Dissertations and multidisciplinary research database — 3,900 titles.", url: "https://www.proquest.com/165290", category: "Research Database", type: "paid" as const },
    { name: "Cambridge University Press", description: "Academic journals and books from Cambridge University Press.", url: "https://www.cambridge.org", category: "Journals & Books", type: "paid" as const },
    { name: "CRC", description: "CRC Press technical and engineering reference e-books.", url: "http://www.crcnetbase.com/", category: "E-Books", type: "paid" as const },
    { name: "EBSCOHOST", description: "Multi-disciplinary database platform aggregating journals and e-books.", url: "https://search.ebscohost.com/", category: "Research Database", type: "paid" as const },
    { name: "Cengage Learning", description: "Academic e-library of textbooks and learning resources.", url: "https://cengageindiaelibrary.ipublishcentral.net/explore", category: "E-Books", type: "paid" as const },
    { name: "PACKT", description: "Technology and programming learning platform.", url: "https://learning.packt.com", category: "E-Learning", type: "paid" as const },
    { name: "BSP E-Books", description: "BS Publications engineering e-books collection.", url: "https://ebookstore.bspublications.net/library/", category: "E-Books", type: "paid" as const },
    { name: "Edisol informatics", description: "Subscribed e-books collection.", url: "https://ebooks.edsolinformatics.com/", category: "E-Books", type: "paid" as const },
    { name: "N-LIST", description: "National Library and Information Services Infrastructure consortium for e-journals and e-books.", url: "https://nlist.inflibnet.ac.in/", category: "Consortium", type: "paid" as const },
    { name: "DELNET", description: "Developing Library Network — union catalogue and resource-sharing network.", url: "http://164.100.247.26/", category: "Consortium", type: "paid" as const },
    { name: "MAP Systems", description: "VTU consortium access provided through MAP Systems.", url: "https://access.vtuconsortium.com/becbgk", category: "Consortium", type: "paid" as const },
    { name: "PAT Technology", description: "VTU educational platform access.", url: "https://vtu.edutainer.in/", category: "E-Learning", type: "paid" as const },
    { name: "Eduport Global-CBS", description: "Educational resources platform.", url: "https://eduport-global.com", category: "E-Learning", type: "paid" as const },
    { name: "IEEE Blended e-Learning Platform", description: "IEEE blended learning courses and modules.", url: "http://blendedlearning.ieee.org", category: "E-Learning", type: "paid" as const },
    { name: "Quiklrn", description: "Learning platform with language-lab support.", url: "https://home.quiklrn.com", category: "E-Learning", type: "paid" as const },
    { name: "Quiklrn language lab", description: "Learning platform with language-lab support.", url: "https://home.quiklrn.com", category: "E-Learning", type: "paid" as const },
    { name: "Magzter database", description: "Digital magazine subscription service.", url: "https://library.magzter.com", category: "Magazines", type: "paid" as const },
    { name: "DrillBit", description: "Plagiarism detection / similarity-check tool.", url: "https://www.drillbitplagiarism.com", category: "Plagiarism Tool", type: "paid" as const },
    { name: "NewAge International", description: "New Age International publication e-books.", url: "https://digital.elib4u.com", category: "E-Books", type: "paid" as const },
    { name: "Elsevier", description: "Elsevier research platform.", url: "https://www.sciencedirect.com/", category: "Research Database", type: "paid" as const },
  ];

  return (
    <div className="min-h-screen bg-stone-50">


      <LibraryBreadcrumb
        items={[
          { label: "Campus" },
          { label: "Library", href: "/library" },
          { label: "E-Resources (Paid)" }
        ]}
      />

      <LibraryPageHeader
        icon={Globe}
        title="E-Resources (Paid)"
        subtitle="Access premium digital databases and research materials"
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <LibrarySidebar />
            </div>

            <div className="lg:col-span-3">
              <FadeIn delay={0.1}>
                <div className="bg-white rounded-lg p-8 mb-8 border border-stone-200">
                  <p className="text-lg text-gray-700 leading-relaxed mb-4 text-justify">
                    The library subscribes to various premium e-resources providing access to millions of research
                    articles, journals, and databases. These resources are accessible on campus through IP-based
                    authentication.
                  </p>
                  <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded-r">
                    <p className="text-sm text-orange-900">
                      <strong>Access Note:</strong> All paid e-resources are accessible within the campus network.
                      For remote access, please contact the library for VPN credentials.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paidResources.map((resource, index) => (
                  <ResourceCard key={index} {...resource} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
