"use client";

import { FadeIn } from "@/components/animations/fade-in";
import Image from "next/image";
import {
  Hotel,
  Wifi,
  Coffee,
  Car,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Armchair,
  Tv,
  ThermometerSun,
} from "lucide-react";

export default function GuestHousePage() {
  const amenities = [
    {
      icon: Wifi,
      title: "High-Speed Wi-Fi",
      description:
        "Complimentary internet access in all rooms and common areas.",
    },
    {
      icon: ThermometerSun,
      title: "Air Conditioned",
      description:
        "Climate-controlled rooms for a comfortable stay in all seasons.",
    },
    {
      icon: Coffee,
      title: "Dining Facility",
      description:
        "In-house dining serving hygienic and delicious meals for guests.",
    },
    {
      icon: Car,
      title: "Ample Parking",
      description:
        "Secure parking space available within the guest house premises.",
    },
    {
      icon: Tv,
      title: "Entertainment",
      description: "Rooms equipped with television and cable connection.",
    },
    {
      icon: Armchair,
      title: "Lounge Area",
      description: "Spacious waiting lounge and common areas for relaxation.",
    },
  ];

  const roomTypes = [
    {
      title: "VIP Suites",
      description:
        "Premium suites with separate living area, ideal for dignitaries and special guests.",
      features: ["King Size Bed", "Living Room", "Work Desk", "Mini Fridge"],
      image: "/facilities/guesthouse/vip-suite.png",
    },
    {
      title: "AC Deluxe Rooms",
      description:
        "Well-furnished rooms with modern amenities suitable for faculty and guests.",
      features: ["Queen Size Bed", "Attached Bath", "Wardrobe", "Study Table"],
      image: "/facilities/guesthouse/standard-room.png",
    },
    {
      title: "Standard Rooms",
      description: "Comfortable twin-sharing rooms designed for short stays.",
      features: ["Twin Beds", "Essential Amenities", "Daily Housekeeping"],
      image: "/facilities/guesthouse/standard-room.png",
    },
  ];

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
            Facilities · Guest House
          </p>
          <div className="mt-4 space-y-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
              Guest House
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              Experience warm hospitality and comfort within the campus
            </p>
          </div>
        </div>
      </section>

      {/* Intro / Overview */}
      <section className="py-12 bg-white border-b border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="/facilities/guesthouse/dining.png"
                    alt="Dining Hall"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg text-sm font-bold text-slate-900 shadow-lg">
                    Dining Hall
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Welcome to{" "}
                  <span className="text-primary">BEC Guest House</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  The Basaveshwar Engineering College Guest House provides
                  specialized accommodation for visiting faculty, officials,
                  alumni, and parents. Located in a serene corner of the campus,
                  it offers a peaceful ambiance combined with modern
                  conveniences to ensure a pleasant stay.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our facility is equipped with a full-service kitchen, spacious
                  dining area, and well-trained staff dedicated to making your
                  visit comfortable and memorable.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodation Types */}
      <section className="py-12 bg-stone-50">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Accommodations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our range of well-appointed rooms designed for comfort
              and convenience
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {roomTypes.map((room, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-stone-200 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60"></div>
                    <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                      {room.title}
                    </h3>
                  </div>

                  <div className="p-8 flex-1 flex flex-col">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {room.description}
                    </p>
                    <div className="mt-auto pt-6 border-t border-stone-100">
                      <ul className="space-y-3">
                        {room.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-3 text-sm text-gray-700"
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn className="mb-12 text-center">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Amenities & Services
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {amenities.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeIn key={index} delay={index * 0.05} className="h-full">
                  <div className="text-center p-6 rounded-2xl bg-stone-50 hover:bg-orange-50/50 transition-colors border border-stone-100 hover:border-orange-100 group h-full flex flex-col items-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm text-gray-400 group-hover:text-primary group-hover:scale-110 transition-all duration-300 mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed grow">
                      {item.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking / Contact */}
      <section className="py-12 bg-linear-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/section_2_diagonals.svg')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-serif font-bold mb-6">
                    Reservation & Enquiries
                  </h2>
                  <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                    Accommodations are subject to availability. Please contact
                    the Registrar's office for booking enquiries at least 48
                    hours in advance.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-400">Phone</div>
                        <div className="font-semibold text-lg">
                          +91-8354-234060
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-400">Email</div>
                        <div className="font-semibold text-lg">
                          registrar@becbgk.edu
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white text-slate-900 p-8 rounded-2xl shadow-xl">
                  <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                    <CheckCircle2 className="text-primary h-6 w-6" />
                    Booking Guidelines
                  </h3>
                  <ul className="space-y-4 text-slate-600">
                    <li className="flex gap-3 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                      <span>
                        Check-in time is{" "}
                        <span className="font-semibold text-slate-900">
                          12:00 PM
                        </span>
                      </span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                      <span>
                        Valid Government ID proof is mandatory for all guests
                        upon arrival
                      </span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                      <span>
                        Prior approval from the Principal or Registrar is
                        required for all bookings
                      </span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                      <span>
                        100% advance payment required for confirmation
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
