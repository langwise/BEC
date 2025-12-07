"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/animations/fade-in";
import { LibraryBreadcrumb } from "@/components/library/library-breadcrumb";
import { LibraryPageHeader } from "@/components/library/library-page-header";
import { LibrarySidebar } from "@/components/library/library-sidebar";
import { StaffCard } from "@/components/library/staff-card";
import { Users } from "lucide-react";

export default function StaffProfilePage() {
  const staffMembers = [
    {
      name: "Dr. (Mrs.) Rekha Shahapurkar",
      designation: "Librarian",
      qualification: "M.A, M.Lib.Sc., Ph.D.",
      email: "librarian@becbgk.edu",
      phone: "+91-8354-234060",
      image: "/staff/librarian.jpg"
    },
    {
      name: "Mrs. Sandhya Bagali",
      designation: "Assistant Librarian",
      qualification: "M.A., M.Lib.Sc.",
      email: "asst.librarian@becbgk.edu",
      phone: "+91-8354-234061",
      image: "/staff/asst-librarian.jpg"
    },
    {
      name: "Mr. Prakash Naik",
      designation: "Technical Assistant",
      qualification: "B.Lib.Sc.",
      email: "tech.lib@becbgk.edu",
      phone: "+91-8354-234062",
      image: "/staff/tech-assistant.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <LibraryBreadcrumb 
        items={[
          { label: "Facilities", href: "/facilities" },
          { label: "Library", href: "/facilities/library" },
          { label: "Staff Profile" }
        ]} 
      />

      <LibraryPageHeader
        icon={Users}
        title="Staff Profile"
        subtitle="Meet our dedicated team of library professionals"
        bgGradient="from-green-600 to-teal-600"
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

      <Footer />
    </div>
  );
}
