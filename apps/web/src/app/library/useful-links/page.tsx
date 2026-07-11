import { FadeIn } from "@/components/animations/fade-in";
import { LibraryBreadcrumb } from "@/components/library/library-breadcrumb";
import { LibraryPageHeader } from "@/components/library/library-page-header";
import { LibrarySidebar } from "@/components/library/library-sidebar";
import { Link as LinkIcon, ExternalLink } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Library Useful Links",
  description:
    "Quick links from the BEC Central Library to academic and government resources including W3Schools, UPSC, Aadhaar, Indian Railways and India Post.",
  path: "/library/useful-links",
});

export default function UsefulLinksPage() {
  // Useful links as listed on becbgk.edu/Library (useful links).
  const linkCategories = [
    {
      category: "Useful Links",
      links: [
        {
          name: "W3Schools",
          url: "http://www.w3schools.com",
          description: "Web development tutorials and references",
        },
        {
          name: "Election Commission of India",
          url: "https://www.eci.gov.in/",
          description: "Official ECI website",
        },
        {
          name: "Aadhaar",
          url: "https://uidai.gov.in/en/",
          description: "Official UIDAI portal for Aadhaar services",
        },
        {
          name: "UPSC",
          url: "https://www.upsc.gov.in",
          description: "Union Public Service Commission",
        },
        {
          name: "Indian Railways",
          url: "https://www.indianrail.gov.in",
          description: "Indian Railways passenger services",
        },
        {
          name: "India Post",
          url: "https://www.indiapost.gov.in",
          description: "Department of Posts, Government of India",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <LibraryBreadcrumb
        items={[
          { label: "Campus" },
          { label: "Library", href: "/library" },
          { label: "Useful Links" },
        ]}
      />

      <LibraryPageHeader
        icon={LinkIcon}
        title="Useful Links"
        subtitle="Quick access to important library and academic resources"
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
                  <p className="text-lg text-gray-700 leading-relaxed text-justify">
                    This page provides quick access to important library
                    services, academic resources, and useful external links that
                    support teaching, learning, and research activities.
                  </p>
                </div>
              </FadeIn>

              <div className="space-y-8">
                {linkCategories.map((category, catIndex) => (
                  <FadeIn key={catIndex} delay={0.1 + catIndex * 0.05}>
                    <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
                      <div className="border-b border-stone-200 bg-stone-50 px-6 py-4">
                        <h2 className="text-lg font-bold text-gray-900">
                          {category.category}
                        </h2>
                      </div>
                      <div className="p-6">
                        <div className="grid sm:grid-cols-2 gap-3">
                          {category.links.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target={
                                link.url.startsWith("http") ? "_blank" : "_self"
                              }
                              rel={
                                link.url.startsWith("http")
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="group flex items-start gap-3 p-4 rounded-lg hover:bg-orange-50 transition-colors duration-200 border border-stone-200 hover:border-primary/40"
                            >
                              <ExternalLink className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                                  {link.name}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  {link.description}
                                </p>
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
    </div>
  );
}
