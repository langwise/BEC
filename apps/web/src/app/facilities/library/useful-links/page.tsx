"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/animations/fade-in";
import { LibraryBreadcrumb } from "@/components/library/library-breadcrumb";
import { LibraryPageHeader } from "@/components/library/library-page-header";
import { LibrarySidebar } from "@/components/library/library-sidebar";
import { Link as LinkIcon, ExternalLink } from "lucide-react";

export default function UsefulLinksPage() {
  const linkCategories = [
    {
      category: "Library Services",
      links: [
        { name: "Online Catalog (OPAC)", url: "#", description: "Search library books and materials online" },
        { name: "Digital Library", url: "#", description: "Access digital collections and e-books" },
        { name: "Institutional Repository", url: "#", description: "Research publications and theses" },
        { name: "Reserve a Book", url: "#", description: "Book reservation system" },
        { name: "Renew Books", url: "#", description: "Extend your book loan period" },
      ]
    },
    {
      category: "Academic Resources",
      links: [
        { name: "AICTE", url: "https://www.aicte-india.org", description: "All India Council for Technical Education" },
        { name: "VTU", url: "https://vtu.ac.in", description: "Visvesvaraya Technological University" },
        { name: "UGC", url: "https://www.ugc.ac.in", description: "University Grants Commission" },
        { name: "MHRD", url: "https://www.education.gov.in", description: "Ministry of Education, Govt. of India" },
      ]
    },
    {
      category: "Research Tools",
      links: [
        { name: "Mendeley", url: "https://www.mendeley.com", description: "Reference management software" },
        { name: "Zotero", url: "https://www.zotero.org", description: "Free bibliography management" },
        { name: "Grammarly", url: "https://www.grammarly.com", description: "Writing enhancement tool" },
        { name: "Turnitin", url: "https://www.turnitin.com", description: "Plagiarism detection (campus access)" },
      ]
    },
    {
      category: "Engineering Portals",
      links: [
        { name: "IEEE", url: "https://www.ieee.org", description: "Institute of Electrical and Electronics Engineers" },
        { name: "ASME", url: "https://www.asme.org", description: "American Society of Mechanical Engineers" },
        { name: "ASCE", url: "https://www.asce.org", description: "American Society of Civil Engineers" },
        { name: "ACM", url: "https://www.acm.org", description: "Association for Computing Machinery" },
      ]
    },
    {
      category: "Open Access Resources",
      links: [
        { name: "DOAJ", url: "https://doaj.org", description: "Directory of Open Access Journals" },
        { name: "arXiv", url: "https://arxiv.org", description: "Open access preprints" },
        { name: "PubMed Central", url: "https://www.ncbi.nlm.nih.gov/pmc", description: "Free biomedical literature" },
        { name: "Google Scholar", url: "https://scholar.google.com", description: "Scholarly literature search" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <LibraryBreadcrumb 
        items={[
          { label: "Facilities", href: "/facilities" },
          { label: "Library", href: "/facilities/library" },
          { label: "Useful Links" }
        ]} 
      />

      <LibraryPageHeader
        icon={LinkIcon}
        title="Useful Links"
        subtitle="Quick access to important library and academic resources"
        bgGradient="from-indigo-600 to-purple-600"
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
                  <p className="text-lg text-gray-700 leading-relaxed">
                    This page provides quick access to important library services, academic resources, and useful 
                    external links that support teaching, learning, and research activities.
                  </p>
                </div>
              </FadeIn>

              <div className="space-y-8">
                {linkCategories.map((category, catIndex) => (
                  <FadeIn key={catIndex} delay={0.1 + catIndex * 0.05}>
                    <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                        <h2 className="text-xl font-bold text-white">{category.category}</h2>
                      </div>
                      <div className="p-6">
                        <div className="space-y-3">
                          {category.links.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target={link.url.startsWith('http') ? "_blank" : "_self"}
                              rel={link.url.startsWith('http') ? "noopener noreferrer" : undefined}
                              className="group flex items-start gap-4 p-4 rounded-lg hover:bg-indigo-50 transition-colors duration-200 border border-transparent hover:border-indigo-200"
                            >
                              <ExternalLink className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                  {link.name}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">{link.description}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}