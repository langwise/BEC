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
    { name: "IEEE Xplore Digital Library", description: "IEEE journals, conference papers and standards in electrical engineering and computer science.", url: "https://ieeexplore.ieee.org", category: "Journals & Conferences", type: "paid" as const },
    { name: "Science Direct (Elsevier)", description: "Elsevier's platform for scientific, technical and medical research literature.", url: "https://www.sciencedirect.com", category: "Research Database", type: "paid" as const },
    { name: "Springer Link", description: "Springer journals and reference works — 667 titles subscribed.", url: "https://link.springer.com", category: "Journals & Books", type: "paid" as const },
    { name: "Springer Link – Computer Science", description: "Specialized Springer collection for computer science.", url: "https://link.springer.com", category: "Computer Science", type: "paid" as const },
    { name: "Taylor & Francis", description: "Journals across science, technology and social sciences — 239 titles subscribed.", url: "https://www.tandfonline.com", category: "Multidisciplinary", type: "paid" as const },
    { name: "Emerald", description: "Management, engineering and social science journals — 120 titles subscribed.", url: "https://www.emerald.com", category: "Journals", type: "paid" as const },
    { name: "ProQuest", description: "Dissertations and multidisciplinary research database — 3,900 titles.", url: "https://www.proquest.com", category: "Research Database", type: "paid" as const },
    { name: "Cambridge University Press", description: "Academic journals and books from Cambridge University Press.", url: "https://www.cambridge.org/core", category: "Journals & Books", type: "paid" as const },
    { name: "CRCnetbase", description: "CRC Press technical and engineering reference e-books.", category: "E-Books", type: "paid" as const },
    { name: "EBSCOHOST", description: "Multi-disciplinary database platform aggregating journals and e-books.", url: "https://www.ebsco.com", category: "Research Database", type: "paid" as const },
    { name: "Cengage Learning", description: "Academic e-library of textbooks and learning resources.", category: "E-Books", type: "paid" as const },
    { name: "PACKT", description: "Technology and programming learning platform.", url: "https://www.packtpub.com", category: "E-Learning", type: "paid" as const },
    { name: "BSP E-Books", description: "BS Publications engineering e-books collection.", category: "E-Books", type: "paid" as const },
    { name: "Edisol Informatics", description: "Subscribed e-books collection.", category: "E-Books", type: "paid" as const },
    { name: "N-LIST (INFLIBNET)", description: "National Library and Information Services Infrastructure consortium for e-journals and e-books.", url: "https://nlist.inflibnet.ac.in", category: "Consortium", type: "paid" as const },
    { name: "DELNET", description: "Developing Library Network — resource sharing and cooperative cataloguing.", url: "https://delnet.in", category: "Consortium", type: "paid" as const },
    { name: "MAP Systems (VTU Consortium)", description: "VTU consortium access provided through MAP Systems.", category: "Consortium", type: "paid" as const },
    { name: "PAT Technology (VTU)", description: "VTU educational platform access.", category: "E-Learning", type: "paid" as const },
    { name: "Eduport Global – CBS", description: "Educational resources platform.", category: "E-Learning", type: "paid" as const },
    { name: "IEEE Blended e-Learning Platform", description: "IEEE blended learning courses and modules.", category: "E-Learning", type: "paid" as const },
    { name: "Quiklrn", description: "Learning platform with language-lab support.", category: "E-Learning", type: "paid" as const },
    { name: "Magzter", description: "Digital magazine subscription service.", url: "https://www.magzter.com", category: "Magazines", type: "paid" as const },
    { name: "DrillBit", description: "Plagiarism detection / similarity-check tool.", url: "https://www.drillbitplagiarism.com", category: "Plagiarism Tool", type: "paid" as const },
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
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
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
