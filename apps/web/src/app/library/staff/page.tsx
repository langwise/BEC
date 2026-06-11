import { FadeIn } from "@/components/animations/fade-in";
import { LibraryBreadcrumb } from "@/components/library/library-breadcrumb";
import { LibraryPageHeader } from "@/components/library/library-page-header";
import { LibrarySidebar } from "@/components/library/library-sidebar";
import { StaffCard } from "@/components/library/staff-card";
import { Users } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Library Staff",
  description:
    "Meet the BEC Central Library team led by Librarian Dr. Shreekant G. Karkun, with assistant librarians Subhas C. Mahendrakar, Gurunath B. Goudar and Deepa M. Kolli.",
  path: "/library/staff",
});

export default function StaffProfilePage() {
  const staffMembers = [
    {
      name: "Dr. Shreekant G. Karkun",
      designation: "Librarian",
      email: "library@becbgk.edu",
      phone: "+91-94485-14872"
    },
    {
      name: "Mr. Subhas C. Mahendrakar",
      designation: "Assistant Librarian",
      email: "scmlb@becbgk.edu"
    },
    {
      name: "Mr. Gurunath B. Goudar",
      designation: "Assistant Librarian",
      email: "gbglb@becbgk.edu"
    },
    {
      name: "Ms. Deepa M. Kolli",
      designation: "Assistant Librarian"
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">


      <LibraryBreadcrumb
        items={[
          { label: "Campus" },
          { label: "Library", href: "/library" },
          { label: "Staff Profile" }
        ]}
      />

      <LibraryPageHeader
        icon={Users}
        title="Staff Profile"
        subtitle="Meet our dedicated team of library professionals"
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
                    Our library team comprises highly qualified and experienced professionals dedicated to
                    providing excellent library services. Each member brings unique expertise and commitment
                    to supporting the academic and research needs of our community.
                  </p>
                </div>
              </FadeIn>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staffMembers.map((staff, index) => (
                  <StaffCard key={index} {...staff} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
