// File: src/app/library/about/page.tsx
import { FadeIn } from "@/components/animations/fade-in";
import { LibraryBreadcrumb } from "@/components/library/library-breadcrumb";
import { LibraryPageHeader } from "@/components/library/library-page-header";
import { LibrarySidebar } from "@/components/library/library-sidebar";
import { asset } from "@/lib/assets";
import { BookOpen, Target, Eye, Award, ChevronRight } from "lucide-react";
import Image from "next/image";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About the Library",
  description:
    "Established in 1963, the BEC Library and Information Centre spans 2,100 sq.m across six sections, holding 1,45,874 volumes over 46,532 titles plus e-resources.",
  path: "/library/about",
});

export default function AboutLibraryPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <LibraryBreadcrumb
        items={[
          { label: "Campus" },
          { label: "Library", href: "/library" },
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
              {/* Feature image */}
              <FadeIn delay={0.05}>
                <div className="relative aspect-16/9 overflow-hidden rounded-lg border border-stone-200 mb-8">
                  <Image
                    src={asset("facilities/library/cine1239.webp")}
                    alt="Students studying in the Central Library reading hall"
                    fill
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-cover"
                  />
                </div>
              </FadeIn>

              {/* Introduction */}
              <FadeIn delay={0.1}>
                <div className="bg-white rounded-lg p-8 mb-8 border border-stone-200">
                  <div className="prose prose-lg max-w-none">
                    <div className="bg-stone-50 border-l-4 border-primary p-6 rounded-r-lg mb-6">
                      <p className="text-lg text-gray-700 leading-relaxed mb-0 text-justify">
                        The Library and Information Centre was established in
                        1963 with three departments, housed in a small building.
                        It now occupies its own dedicated facility of 2,100 sq.m
                        and operates through six sections, holding{" "}
                        <strong>1,45,874 volumes</strong> across 46,532 titles
                        along with a rich collection of e-journals, e-books and
                        subscribed databases supporting every engineering
                        discipline and allied science.
                      </p>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                      Our library is committed to providing state-of-the-art
                      facilities and resources to students, faculty, and
                      researchers. With a perfect blend of traditional print
                      resources and modern digital collections, we ensure that
                      our users have access to the latest information and
                      knowledge resources essential for academic excellence.
                    </p>

                    <p className="text-gray-700 leading-relaxed text-justify">
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
                  <div className="bg-white rounded-lg p-8 h-full border border-stone-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-orange-50 text-primary p-3 rounded-xl">
                        <Eye className="h-6 w-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Our Vision
                      </h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-justify">
                      Engaged in learning and discovery as essential
                      participants in the educational community — to develop,
                      organize, provide access to and preserve materials to meet
                      the needs of present and future generations of students and
                      scholars.
                    </p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="bg-white rounded-lg p-8 h-full border border-stone-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-orange-50 text-primary p-3 rounded-xl">
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
                          Strengthen and enhance the teaching, research and
                          service of the users
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <ChevronRight className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                        <span>
                          Promote intellectual growth and creativity
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <ChevronRight className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                        <span>
                          Develop collections and facilitate access to
                          information resources
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <ChevronRight className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                        <span>
                          Teach the effective use of information resources
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
                          "1,45,874 volumes across 46,532 titles, with 160 national and 3 international print journals",
                      },
                      {
                        title: "Digital Resources",
                        description:
                          "10,300+ e-journals, 24,351 e-books and 14 subscribed databases for research",
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
