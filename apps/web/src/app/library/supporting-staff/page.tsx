import { FadeIn } from "@/components/animations/fade-in";
import { LibraryBreadcrumb } from "@/components/library/library-breadcrumb";
import { LibraryPageHeader } from "@/components/library/library-page-header";
import { LibrarySidebar } from "@/components/library/library-sidebar";
import { StaffCard } from "@/components/library/staff-card";
import { Users } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Library Supporting Staff",
  description:
    "The BEC Central Library supporting staff handle book circulation, shelving, maintenance and day-to-day operations, ensuring smooth service for all library users.",
  path: "/library/supporting-staff",
});

export default function SupportingStaffPage() {
  const supportStaff = [
    {
      name: "Mrs. Meribegum P. Wanti",
      designation: "SDA"
    },
    {
      name: "Mr. Basayya I. Ganachari",
      designation: "Mechanic"
    },
    {
      name: "Mr. S. F. Madiwalar",
      designation: "SDA"
    },
    {
      name: "Mrs. Shridevi P. Shirur",
      designation: "SDA / Computer Operator"
    },
    {
      name: "Mr. Vittal Y. Ajjodi",
      designation: "Helper"
    },
    {
      name: "Mr. Manikesh G. Kaladagi",
      designation: "Attender"
    },
    {
      name: "Mr. M. G. Pindarki",
      designation: "Peon"
    },
    {
      name: "Mr. A. S. Naragund",
      designation: "Peon"
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">


      <LibraryBreadcrumb
        items={[
          { label: "Campus" },
          { label: "Library", href: "/library" },
          { label: "Supporting Staff" }
        ]}
      />

      <LibraryPageHeader
        icon={Users}
        title="Supporting Staff"
        subtitle="Our dedicated support team ensuring smooth library operations"
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
                    Our supporting staff plays a crucial role in maintaining the day-to-day operations of the library.
                    They assist in book circulation, shelving, maintenance, and providing general support to library users.
                  </p>
                </div>
              </FadeIn>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {supportStaff.map((staff, index) => (
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