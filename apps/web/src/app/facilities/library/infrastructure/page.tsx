"use client";



import { FadeIn } from "@/components/animations/fade-in";
import { LibraryBreadcrumb } from "@/components/library/library-breadcrumb";
import { LibraryPageHeader } from "@/components/library/library-page-header";
import { LibrarySidebar } from "@/components/library/library-sidebar";
import { Building2, Wifi, BookOpen, Users2, Monitor, Laptop, AirVent, Shield } from "lucide-react";
import Image from "next/image";

export default function InfrastructurePage() {
  const facilities = [
    {
      icon: BookOpen,
      title: "Reading Halls",
      description: "Spacious and well-lit reading halls with seating capacity for 300+ students"
    },
    {
      icon: Monitor,
      title: "Digital Library",
      description: "Dedicated section with 50+ computers for accessing digital resources"
    },
    {
      icon: Users2,
      title: "Group Study Rooms",
      description: "4 group study rooms for collaborative learning and discussions"
    },
    {
      icon: Wifi,
      title: "Wi-Fi Connectivity",
      description: "1 Gbps high-speed internet throughout the library premises"
    },
    {
      icon: Laptop,
      title: "OPAC Terminals",
      description: "Online Public Access Catalog terminals for easy book search"
    },
    {
      icon: AirVent,
      title: "Climate Control",
      description: "Centralized air conditioning for comfortable reading environment"
    },
    {
      icon: Shield,
      title: "Security Systems",
      description: "RFID-based security systems and CCTV surveillance"
    },
    {
      icon: Building2,
      title: "Total Area",
      description: "10,000+ sq. ft. of dedicated library space across two floors"
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">


      <LibraryBreadcrumb
        items={[
          { label: "Facilities", href: "/facilities" },
          { label: "Library", href: "/facilities/library" },
          { label: "Infrastructure" }
        ]}
      />

      <LibraryPageHeader
        icon={Building2}
        title="Infrastructure Facility"
        subtitle="Modern facilities designed for optimal learning and research"
        bgGradient="from-orange-600 to-red-600"
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
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    The Central Library building is spread across two floors with modern infrastructure
                    designed to provide an excellent learning environment. The library features state-of-the-art
                    facilities including spacious reading halls, digital library section, group study rooms,
                    and advanced technological support.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-stone-200">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">10,000+</div>
                      <div className="text-sm text-gray-600">Sq. Ft. Area</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">300+</div>
                      <div className="text-sm text-gray-600">Seating Capacity</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">50+</div>
                      <div className="text-sm text-gray-600">Computers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">1 Gbps</div>
                      <div className="text-sm text-gray-600">Internet</div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {facilities.map((facility, index) => {
                  const Icon = facility.icon;
                  return (
                    <FadeIn key={index} delay={0.1 + index * 0.05}>
                      <div className="bg-white rounded-lg p-6 border border-stone-200 hover:border-primary hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="bg-orange-50 p-3 rounded-lg">
                            <Icon className="h-6 w-6 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 mb-2">{facility.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{facility.description}</p>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>

              <FadeIn delay={0.5}>
                <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Special Features</h3>
                  <ul className="space-y-2">
                    <li>• Barrier-free access for differently-abled users</li>
                    <li>• 24x7 CCTV surveillance for security</li>
                    <li>• Automated book issue and return system</li>
                    <li>• Separate sections for reference books, journals, and magazines</li>
                    <li>• Reprographic facilities (Xerox, Printing, Scanning)</li>
                    <li>• Drinking water and rest room facilities</li>
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
