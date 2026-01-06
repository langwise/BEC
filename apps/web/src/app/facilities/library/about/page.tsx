// File: src/app/facilities/library/about/page.tsx
"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { LibraryBreadcrumb } from "@/components/library/library-breadcrumb";
import { LibraryPageHeader } from "@/components/library/library-page-header";
import { LibrarySidebar } from "@/components/library/library-sidebar";
import { BookOpen, Target, Eye, Award, ChevronRight } from "lucide-react";

export default function AboutLibraryPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <LibraryBreadcrumb
        items={[
          { label: "Facilities", href: "/facilities" },
          { label: "Library", href: "/facilities/library" },
          { label: "About" },
        ]}
      />

      <LibraryPageHeader
        icon={BookOpen}
        title="About the Library"
        subtitle="Empowering minds through knowledge since 1963"
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <LibrarySidebar />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Introduction */}
              <FadeIn delay={0.1}>
                <div className="bg-white rounded-lg p-8 mb-8 border border-stone-200">
                  <div className="prose prose-lg max-w-none">
                    <div className="bg-stone-50 border-l-4 border-primary p-6 rounded-r-lg mb-6">
                      <p className="text-lg text-gray-700 leading-relaxed mb-0">
                        The Central Library at Basaveshwar Engineering College
                        serves as the academic heart of the institution,
                        supporting teaching, learning, and research activities.
                        Established alongside the college in 1963, the library
                        has grown into a comprehensive information resource
                        center with over <strong>1,40,000 volumes</strong>
                        covering diverse engineering disciplines and allied
                        sciences.
                      </p>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-4">
                      Our library is committed to providing state-of-the-art
                      facilities and resources to students, faculty, and
                      researchers. With a perfect blend of traditional print
                      resources and modern digital collections, we ensure that
                      our users have access to the latest information and
                      knowledge resources essential for academic excellence.
                    </p>

                    <p className="text-gray-700 leading-relaxed">
                      The library operates with a user-centric approach,
                      offering personalized services and maintaining extended
                      hours to accommodate the diverse needs of our academic
                      community. Our collection is continuously updated to
                      reflect current trends in engineering education and
                      research.
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* Vision & Mission */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <FadeIn delay={0.2}>
                  <div className="bg-blue-50 rounded-lg p-8 h-full border border-blue-100">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-blue-600 text-white p-3 rounded-lg">
                        <Eye className="h-6 w-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Our Vision
                      </h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      To be recognized as a premier library and information
                      center that fosters innovation, supports research
                      excellence, and cultivates lifelong learning habits among
                      students and faculty through world-class resources and
                      services.
                    </p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="bg-orange-50 rounded-lg p-8 h-full border border-orange-100">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-orange-600 text-white p-3 rounded-lg">
                        <Target className="h-6 w-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Our Mission
                      </h2>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex gap-2">
                        <ChevronRight className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                        <span>
                          Provide comprehensive access to quality information
                          resources
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <ChevronRight className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                        <span>
                          Support teaching, learning, and research activities
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <ChevronRight className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                        <span>
                          Promote information literacy and digital skills
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <ChevronRight className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                        <span>
                          Foster a culture of continuous learning and innovation
                        </span>
                      </li>
                    </ul>
                  </div>
                </FadeIn>
              </div>

              {/* Key Features */}
              <FadeIn delay={0.4}>
                <div className="bg-white rounded-lg p-8 border border-stone-200">
                  <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Award className="h-8 w-8 text-primary" />
                    Key Features & Services
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Extensive Collection",
                        description:
                          "Over 1,40,000 books, journals, and reference materials across all engineering disciplines",
                      },
                      {
                        title: "Digital Resources",
                        description:
                          "Access to premium e-journals, e-books, and international databases for research",
                      },
                      {
                        title: "Modern Infrastructure",
                        description:
                          "Spacious reading halls, digital library section, and group study rooms",
                      },
                      {
                        title: "High-Speed Internet",
                        description:
                          "1 Gbps Wi-Fi connectivity throughout the library premises",
                      },
                      {
                        title: "Automated Services",
                        description:
                          "Online catalog (OPAC), digital lending system, and web-based resource discovery",
                      },
                      {
                        title: "Research Support",
                        description:
                          "Dedicated assistance for research scholars and faculty members",
                      },
                      {
                        title: "Extended Hours",
                        description:
                          "Open from 8:00 AM to 8:00 PM on weekdays to support student needs",
                      },
                      {
                        title: "Professional Staff",
                        description:
                          "Experienced librarians and support staff ready to assist users",
                      },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-primary pl-4"
                      >
                        <h3 className="font-bold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
