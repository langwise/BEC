"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { asset, assetsUnder } from "@/lib/assets";
import Image from "next/image";
import {
  Building2,
  Store,
  Stethoscope,
  Landmark,
  CreditCard,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function AmenitiesPage() {
  const amenities = [
    {
      title: "Bank Branch",
      description:
        "An on-campus banking branch serves the day-to-day banking needs of students and staff, handling accounts, deposits and fee transactions without leaving the campus.",
      features: ["Savings Accounts", "Fee Transactions", "Banking Support"],
      image: asset("facilities/general/cine0366.webp"),
      icon: Landmark,
    },
    {
      title: "ATM Facility",
      description:
        "A 24-hour ATM kiosk on campus gives students and staff round-the-clock access to cash and basic banking services.",
      features: ["24x7 Access", "Cash Withdrawal", "Balance Enquiry"],
      image: asset("facilities/general/cine0364.webp"),
      icon: CreditCard,
    },
    {
      title: "India Post Office",
      description:
        "A branch India Post office within the campus offers postal, parcel and small-savings services for the college community and the neighbouring locality.",
      features: ["Postal Services", "Parcel & Speed Post", "Savings Schemes"],
      image: asset("facilities/general/cine1255.webp"),
      icon: Mail,
    },
    {
      title: "Campus Health Centre",
      description:
        "The campus health centre provides primary medical care and first aid for students and staff, with support available for routine check-ups and emergencies.",
      features: ["First Aid", "Primary Care", "Emergency Support"],
      image: asset("facilities/general/cine1256.webp"),
      icon: Stethoscope,
    },
    {
      title: "Canteen",
      description:
        "A spacious campus canteen serves a varied menu of meals, snacks and beverages at affordable rates, giving students and staff a comfortable place to eat and unwind.",
      features: ["Varied Menu", "Snacks & Beverages", "Affordable Rates"],
      image: asset("facilities/general/cine1257.webp"),
      icon: Store,
    },
    {
      title: "Co-operative Store & Book Stall",
      description:
        "The campus co-operative store and book stall supply textbooks, stationery, practical records and other academic essentials for everyday student needs.",
      features: ["Textbooks", "Stationery", "Academic Essentials"],
      image: asset("facilities/general/cine1260.webp"),
      icon: Building2,
    },
  ];

  const adminOfficeImages = assetsUnder(
    "facilities/amenities/admission-section/",
  ).map((src, index) => ({
    src,
    alt: `Administrative office at Basaveshwar Engineering College ${index + 1}`,
  }));

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}

      <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f97316_0%,transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#0f172a_0%,transparent_28%)]" />
        </div>
        <div className="relative container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            Campus · Amenities
          </p>
          <div className="mt-4 space-y-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
              Campus Amenities
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              Everything you need for a comfortable and convenient campus life,
              right at your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="container mx-auto px-4 text-center">
          <FadeIn className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              A Self-Sufficient Campus
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Basaveshwar Engineering College ensures that students have access
              to all essential facilities within the campus premises. From
              banking and a post office to a health centre, canteen and
              co-operative store, our amenities are designed to support the
              daily needs of our vibrant community.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200 h-full flex flex-col group">
                    {/* Image Area */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60"></div>
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                        <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                        {item.description}
                      </p>

                      <div className="mt-auto">
                        {/* Features */}
                        <div className="flex flex-wrap gap-2">
                          {item.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-orange-50 text-orange-700 text-xs font-semibold rounded-md border border-orange-100"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Administrative Office */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="container mx-auto px-4">
          <FadeIn className="max-w-5xl mx-auto">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                Administrative Office
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                The college administrative office handles admissions,
                examination records, fee payments and student services from a
                single, centrally located block, making routine administrative
                work convenient for students and parents alike.
              </p>
            </div>
            <PhotoGallery images={adminOfficeImages} />
          </FadeIn>
        </div>
      </section>

      {/* Additional Info / Footer Callout */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="bg-linear-to-r from-slate-900 to-slate-800 rounded-2xl p-6 md:p-12 text-white shadow-xl max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Need Assistance?</h2>
                <p className="text-slate-300">
                  For inquiries regarding campus facilities, please visit the
                  administrative office.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full md:w-auto">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-full">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Call Us</div>
                    <div className="font-semibold whitespace-nowrap">
                      +91-8354-234060
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-full">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Visit</div>
                    <div className="font-semibold whitespace-nowrap">
                      Admin Block
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
