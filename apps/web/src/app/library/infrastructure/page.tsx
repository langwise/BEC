"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { LibraryBreadcrumb } from "@/components/library/library-breadcrumb";
import { LibraryPageHeader } from "@/components/library/library-page-header";
import { LibrarySidebar } from "@/components/library/library-sidebar";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { asset } from "@/lib/assets";
import {
  Building2,
  Wifi,
  BookOpen,
  Monitor,
  Laptop,
  Shield,
} from "lucide-react";

const spaceImages = [
  { src: asset("facilities/library/cine1235.webp"), alt: "Reading hall with study tables" },
  { src: asset("facilities/library/cine1239.webp"), alt: "Students studying in the reading hall" },
  { src: asset("facilities/library/cine1145.webp"), alt: "Book stacks in the Central Library" },
  { src: asset("facilities/library/cine1131.webp"), alt: "Digital library section with computer terminals" },
  { src: asset("facilities/library/cine1178.webp"), alt: "Student using the book scanning station" },
  { src: asset("facilities/library/cine1216.webp"), alt: "Student reading newspapers at the periodicals stand" },
];

export default function InfrastructurePage() {
  // Real infrastructure from becbgk.edu/Library (infrastructure) — Koha ILS,
  // RFID automation and major equipment.
  const facilities = [
    {
      icon: Building2,
      title: "Plinth Area",
      description:
        "1,970 sq.m built-up area housing six operational sections of the library.",
    },
    {
      icon: Laptop,
      title: "Koha ILS",
      description:
        "Fully automated using the Koha open-source Integrated Library Management System (v20.11).",
    },
    {
      icon: Shield,
      title: "RFID Security Gate",
      description:
        "RFID security gate operating at 13.56 MHz, reading up to 8 tags per second.",
    },
    {
      icon: Monitor,
      title: "Self-Check Kiosk",
      description:
        "22-inch touchscreen RFID self-check kiosk for borrower self-service issue and return.",
    },
    {
      icon: Laptop,
      title: "RFID Workstations",
      description:
        "Barcode- and RFID-enabled circulation workstations at the issue/return counter.",
    },
    {
      icon: BookOpen,
      title: "Book Scanner",
      description:
        "e-scan book scanner and TLP2844 / TSC244cPro barcode-label printers for processing.",
    },
    {
      icon: Building2,
      title: "NAS Mirror Server",
      description:
        "Tulsient NAS 8400 server with 8 hot-swappable drives, scalable up to 3.2 TB.",
    },
    {
      icon: Wifi,
      title: "OPAC & Digital Access",
      description:
        "Web OPAC for catalogue search plus access to subscribed e-journals, e-books and databases.",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <LibraryBreadcrumb
        items={[
          { label: "Campus" },
          { label: "Library", href: "/library" },
          { label: "Infrastructure" },
        ]}
      />

      <LibraryPageHeader
        icon={Building2}
        title="Infrastructure Facility"
        subtitle="Modern facilities designed for optimal learning and research"
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
                    Established in 1963, the Library and Information Centre now
                    occupies its own dedicated building of 1,970 sq.m, operating
                    through six sections. It is fully automated on the Koha
                    open-source library management system and RFID-enabled for
                    self-service circulation and security.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-stone-200">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        1,970
                      </div>
                      <div className="text-sm text-gray-600">Sq.m Area</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        6
                      </div>
                      <div className="text-sm text-gray-600">Sections</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        Koha
                      </div>
                      <div className="text-sm text-gray-600">ILS Automated</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        RFID
                      </div>
                      <div className="text-sm text-gray-600">Enabled</div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="bg-white rounded-lg p-8 mb-8 border border-stone-200">
                  <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                    A Glimpse Inside
                  </h2>
                  <PhotoGallery images={spaceImages} />
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
                            <h3 className="font-bold text-gray-900 mb-2">
                              {facility.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {facility.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>

              <FadeIn delay={0.5}>
                <div className="bg-linear-to-r from-primary to-accent rounded-lg p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Special Features</h3>
                  <ul className="space-y-2">
                    <li>• Barrier-free access for differently-abled users</li>
                    <li>• 24x7 CCTV surveillance for security</li>
                    <li>• Automated book issue and return system</li>
                    <li>
                      • Separate sections for reference books, journals, and
                      magazines
                    </li>
                    <li>
                      • Reprographic facilities (Xerox, Printing, Scanning)
                    </li>
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
