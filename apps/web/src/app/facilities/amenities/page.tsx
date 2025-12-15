"use client";

import { FadeIn } from "@/components/animations/fade-in";
import Image from "next/image";
import {
    Building2,
    Store,
    Bus,
    Stethoscope,
    Landmark,
    Mic2,
    Clock,
    MapPin,
    Phone
} from "lucide-react";

export default function AmenitiesPage() {
    const amenities = [
        {
            title: "Syndicate Bank",
            description: "A full-fledged branch of Syndicate Bank (Canara Bank) is located within the campus to serve the banking needs of students and staff.",
            features: ["ATM Facility", "Student Accounts", "Education Loans"],
            timings: "10:00 AM - 4:00 PM",
            image: "/facilities/amenities/bank.png",
            icon: Landmark
        },
        {
            title: "College Canteen",
            description: "A spacious and hygienic canteen serving a variety of delicious and nutritious vegetarian meals and snacks at subsidized rates.",
            features: ["Hygienic Kitchen", "Varied Menu", "Affordable Prices"],
            timings: "7:00 AM - 8:00 PM",
            image: "/facilities/amenities/canteen.png",
            icon: Store
        },
        {
            title: "Health Center",
            description: "A well-equipped health center with a visiting medical officer to provide primary medical care to students and staff.",
            features: ["First Aid", "General Checkup", "Emergency Support"],
            timings: "9:00 AM - 5:00 PM",
            image: "/facilities/amenities/health.png",
            icon: Stethoscope
        },
        {
            title: "Co-operative Store",
            description: "A student-friendly store supplying textbooks, stationery, practical records, and other academic essentials.",
            features: ["Stationery", "Textbooks", "Xerox & Print"],
            timings: "9:30 AM - 5:30 PM",
            image: "/facilities/amenities/coop.png",
            icon: Building2
        },
        {
            title: "Transportation",
            description: "A fleet of college buses providing convenient transportation for students and staff from various parts of the city.",
            features: ["Multiple Routes", "Safe Travel", "Regular Service"],
            timings: "Morning & Evening",
            image: "/facilities/amenities/transport.png",
            icon: Bus
        },
        {
            title: "Auditorium",
            description: "A state-of-the-art auditorium with a seating capacity of 1000+, equipped with advanced audio-visual systems for events.",
            features: ["1000+ Seats", "Acoustic Design", "Green Rooms"],
            timings: "Booking Required",
            image: "/facilities/amenities/auditorium.png",
            icon: Mic2
        }
    ];

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Hero Section */}
            <section className="relative h-[400px] bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/section_2_diagonals.svg')] opacity-10 bg-cover bg-center"></div>
                <div className="container mx-auto px-4 h-full flex items-center relative z-10">
                    <FadeIn className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Building2 className="h-10 w-10 md:h-12 md:w-12 text-white/90" />
                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">
                                Campus Amenities
                            </h1>
                        </div>
                        <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                            Everything you need for a comfortable and convenient campus life, right at your doorstep.
                        </p>
                    </FadeIn>
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
                            Basaveshwar Engineering College ensures that students have access to all essential facilities within the campus premises.
                            From banking and healthcare to dining and transport, our amenities are designed to support the daily needs
                            of our vibrant community.
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
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
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

                                            <div className="mt-auto space-y-4">
                                                {/* Features */}
                                                <div className="flex flex-wrap gap-2">
                                                    {item.features.map((feature, idx) => (
                                                        <span key={idx} className="px-2 py-1 bg-orange-50 text-orange-700 text-xs font-semibold rounded-md border border-orange-100">
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Timings */}
                                                <div className="pt-4 border-t border-stone-100 flex items-center gap-2 text-sm text-gray-500 font-medium">
                                                    <Clock className="h-4 w-4 text-primary" />
                                                    <span>{item.timings}</span>
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

            {/* Additional Info / Footer Callout */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 md:p-12 text-white shadow-xl max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Need Assistance?</h2>
                                <p className="text-slate-300">For inquiries regarding campus facilities, please visit the administrative office.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full md:w-auto">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/10 rounded-full">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-400">Call Us</div>
                                        <div className="font-semibold whitespace-nowrap">+91-8354-234060</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/10 rounded-full">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-400">Visit</div>
                                        <div className="font-semibold whitespace-nowrap">Admin Block</div>
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
