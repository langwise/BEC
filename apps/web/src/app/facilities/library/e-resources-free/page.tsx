"use client";



import { FadeIn } from "@/components/animations/fade-in";
import { LibraryBreadcrumb } from "@/components/library/library-breadcrumb";
import { LibraryPageHeader } from "@/components/library/library-page-header";
import { LibrarySidebar } from "@/components/library/library-sidebar";
import { ResourceCard } from "@/components/library/resource-card";
import { Globe } from "lucide-react";

export default function EResourcesFreePage() {
  const freeResources = [
    {
      name: "NPTEL",
      description: "National Programme on Technology Enhanced Learning - Free online courses from IITs and IISc",
      url: "https://nptel.ac.in",
      category: "Video Lectures",
      type: "free" as const
    },
    {
      name: "SWAYAM",
      description: "Study Webs of Active Learning for Young Aspiring Minds - MOOC platform by Govt. of India",
      url: "https://swayam.gov.in",
      category: "Online Courses",
      type: "free" as const
    },
    {
      name: "DOAJ",
      description: "Directory of Open Access Journals - Free, peer-reviewed scholarly journals",
      url: "https://doaj.org",
      category: "Open Access Journals",
      type: "free" as const
    },
    {
      name: "arXiv",
      description: "Open-access repository for research papers in physics, mathematics, and computer science",
      url: "https://arxiv.org",
      category: "Preprint Repository",
      type: "free" as const
    },
    {
      name: "Google Scholar",
      description: "Freely accessible web search engine for scholarly literature",
      url: "https://scholar.google.com",
      category: "Search Engine",
      type: "free" as const
    },
    {
      name: "MIT OpenCourseWare",
      description: "Free lecture notes, exams, and videos from MIT courses",
      url: "https://ocw.mit.edu",
      category: "Educational Resources",
      type: "free" as const
    },
    {
      name: "PubMed Central",
      description: "Free full-text archive of biomedical and life sciences journal literature",
      url: "https://www.ncbi.nlm.nih.gov/pmc",
      category: "Life Sciences",
      type: "free" as const
    },
    {
      name: "Project Gutenberg",
      description: "Over 70,000 free eBooks - classic literature and historical documents",
      url: "https://www.gutenberg.org",
      category: "eBooks",
      type: "free" as const
    },
    {
      name: "INFLIBNET e-ShodhSindhu",
      description: "Consortium providing access to electronic resources to academic institutions",
      url: "https://ess.inflibnet.ac.in",
      category: "Consortium",
      type: "free" as const
    },
    {
      name: "NDLI",
      description: "National Digital Library of India - Educational content across disciplines",
      url: "https://ndl.iitkgp.ac.in",
      category: "Digital Library",
      type: "free" as const
    },
    {
      name: "Khan Academy",
      description: "Free educational videos and practice exercises across subjects",
      url: "https://www.khanacademy.org",
      category: "Learning Platform",
      type: "free" as const
    },
    {
      name: "Coursera (Audit)",
      description: "Audit online courses from top universities for free",
      url: "https://www.coursera.org",
      category: "Online Courses",
      type: "free" as const
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">


      <LibraryBreadcrumb
        items={[
          { label: "Facilities", href: "/facilities" },
          { label: "Library", href: "/facilities/library" },
          { label: "E-Resources (Free)" }
        ]}
      />

      <LibraryPageHeader
        icon={Globe}
        title="E-Resources (Free)"
        subtitle="Discover free online resources and open-access materials"
        bgGradient="from-teal-600 to-green-600"
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
                    Explore our curated collection of free online resources, open-access journals, and educational
                    platforms. These resources are freely accessible to everyone and provide valuable learning materials
                    across various disciplines.
                  </p>
                  <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r">
                    <p className="text-sm text-green-900">
                      <strong>Open Access:</strong> All resources listed here are freely accessible without any
                      subscription. However, some platforms may require free registration.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {freeResources.map((resource, index) => (
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