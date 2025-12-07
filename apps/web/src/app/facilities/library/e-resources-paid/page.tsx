"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/animations/fade-in";
import { LibraryBreadcrumb } from "@/components/library/library-breadcrumb";
import { LibraryPageHeader } from "@/components/library/library-page-header";
import { LibrarySidebar } from "@/components/library/library-sidebar";
import { ResourceCard } from "@/components/library/resource-card";
import { Globe } from "lucide-react";

export default function EResourcesPaidPage() {
  const paidResources = [
    {
      name: "IEEE Xplore Digital Library",
      description: "Access to IEEE journals, conference papers, and standards in electrical engineering and computer science",
      url: "https://ieeexplore.ieee.org",
      category: "Journals & Conferences",
      type: "paid" as const
    },
    {
      name: "Science Direct",
      description: "Elsevier's platform providing access to scientific, technical, and medical research",
      url: "https://www.sciencedirect.com",
      category: "Research Database",
      type: "paid" as const
    },
    {
      name: "Springer Link",
      description: "Access to Springer journals, books, and reference works across all disciplines",
      url: "https://link.springer.com",
      category: "Journals & Books",
      type: "paid" as const
    },
    {
      name: "ASCE Library",
      description: "American Society of Civil Engineers publications and research papers",
      url: "https://ascelibrary.org",
      category: "Civil Engineering",
      type: "paid" as const
    },
    {
      name: "ASME Digital Collection",
      description: "American Society of Mechanical Engineers journals and conference proceedings",
      url: "https://asmedigitalcollection.asme.org",
      category: "Mechanical Engineering",
      type: "paid" as const
    },
    {
      name: "ACM Digital Library",
      description: "Association for Computing Machinery's comprehensive database",
      url: "https://dl.acm.org",
      category: "Computer Science",
      type: "paid" as const
    },
    {
      name: "Taylor & Francis Online",
      description: "Access to journals across science, technology, medicine, and social sciences",
      url: "https://www.tandfonline.com",
      category: "Multidisciplinary",
      type: "paid" as const
    },
    {
      name: "Wiley Online Library",
      description: "Research articles, books, and reference works from Wiley publications",
      url: "https://onlinelibrary.wiley.com",
      category: "Research Database",
      type: "paid" as const
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <LibraryBreadcrumb 
        items={[
          { label: "Facilities", href: "/facilities" },
          { label: "Library", href: "/facilities/library" },
          { label: "E-Resources (Paid)" }
        ]} 
      />

      <LibraryPageHeader
        icon={Globe}
        title="E-Resources (Paid)"
        subtitle="Access premium digital databases and research materials"
        bgGradient="from-red-600 to-orange-600"
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

      <Footer />
    </div>
  );
}
