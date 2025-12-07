"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/animations/fade-in";
import { LibraryBreadcrumb } from "@/components/library/library-breadcrumb";
import { LibraryPageHeader } from "@/components/library/library-page-header";
import { LibrarySidebar } from "@/components/library/library-sidebar";
import { StaffCard } from "@/components/library/staff-card";
import { Users } from "lucide-react";

export default function SupportingStaffPage() {
  const supportStaff = [
    {
      name: "Mr. Basavaraj Patil",
      designation: "Library Assistant",
      email: "lib.assistant1@becbgk.edu",
      image: "/staff/assistant1.jpg"
    },
    {
      name: "Mrs. Sunita Kamat",
      designation: "Library Assistant",
      email: "lib.assistant2@becbgk.edu",
      image: "/staff/assistant2.jpg"
    },
    {
      name: "Mr. Ravi Kumar",
      designation: "Library Attendant",
      image: "/staff/attendant1.jpg"
    },
    {
      name: "Mr. Manjunath Desai",
      designation: "Library Attendant",
      image: "/staff/attendant2.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <LibraryBreadcrumb 
        items={[
          { label: "Facilities", href: "/facilities" },
          { label: "Library", href: "/facilities/library" },
          { label: "Supporting Staff" }
        ]} 
      />

      <LibraryPageHeader
        icon={Users}
        title="Supporting Staff"
        subtitle="Our dedicated support team ensuring smooth library operations"
        bgGradient="from-purple-600 to-indigo-600"
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

      <Footer />
    </div>
  );
}