"use client";

import { FadeIn } from "@/components/animations/fade-in";
import Link from "next/link";
import {
    FlaskConical,
    Building2,
    Award,
    FileText,
    Globe,
    BookOpen,
    ChevronRight,
    Microscope,
    Cpu
} from "lucide-react";

export default function ResearchFacilitiesPage() {
    const researchStats = [
        { value: "10", label: "Research Centres" },
        { value: "9", label: "Centres of Excellence" },
        { value: "50+", label: "Patents Filed" },
        { value: "100+", label: "Active Scholars" },
    ];

    const researchFacilities = [
        {
            icon: Building2,
            title: "Research Centres",
            description: "Dedicated centres across various engineering disciplines fostering advanced research and development.",
            href: "/research/centres",
            color: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            icon: Award,
            title: "Centres of Excellence",
            description: "Specialized centres focused on cutting-edge technologies and industry collaborations.",
            href: "/research/centres-of-excellence",
            color: "text-purple-600",
            bgColor: "bg-purple-50"
        },
        {
            icon: FlaskConical,
            title: "Research Laboratories",
            description: "State-of-the-art laboratories equipped with modern instrumentation for experimental research.",
            href: "/research/labs",
            color: "text-green-600",
            bgColor: "bg-green-50"
        },
        {
            icon: FileText,
            title: "IPR & Patents",
            description: "Support for intellectual property rights, patent filing, and innovation protection.",
            href: "/research/patents",
            color: "text-orange-600",
            bgColor: "bg-orange-50"
        },
        {
            icon: Globe,
            title: "Scopus Publications",
            description: "Showcasing high-impact research publications by our faculty and scholars.",
            href: "/research/scopus",
            color: "text-teal-600",
            bgColor: "bg-teal-50"
        },
        {
            icon: BookOpen,
            title: "Research Guidelines",
            description: "Comprehensive guidelines, policies, and ethics for conducting research at BEC.",
            href: "/research/guidelines",
            color: "text-indigo-600",
            bgColor: "bg-indigo-50"
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
                            <Microscope className="h-12 w-12 text-white/90" />
                            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white">
                                Research Facilities
                            </h1>
                        </div>
                        <p className="text-xl text-white/90 leading-relaxed">
                            Fostering a culture of innovation and discovery through world-class infrastructure
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="bg-white border-b border-stone-200">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {researchStats.map((stat, index) => (
                            <FadeIn key={index} delay={index * 0.1}>
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600 uppercase tracking-wider">
                                        {stat.label}
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <FadeIn className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                            Explore Our Research Ecosystem
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our comprehensive research facilities support interdisciplinary studies and advanced technological development
                        </p>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {researchFacilities.map((facility, index) => {
                            const Icon = facility.icon;
                            return (
                                <FadeIn key={index} delay={index * 0.05}>
                                    <Link href={facility.href}>
                                        <div className="group h-full bg-white rounded-lg border border-stone-200 hover:border-primary hover:shadow-xl transition-all duration-300 overflow-hidden">
                                            <div className={`${facility.bgColor} p-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
                                                <Icon className={`h-12 w-12 ${facility.color}`} />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                                    {facility.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                                    {facility.description}
                                                </p>
                                                <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                                                    Explore
                                                    <ChevronRight className="h-4 w-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </FadeIn>
                            );
                        })}
                    </div>

                    {/* Additional Info / Vision */}
                    <FadeIn delay={0.4}>
                        <div className="bg-white rounded-2xl p-8 md:p-12 border border-stone-200 shadow-sm">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        Committed to Excellence in Research
                                    </h3>
                                    <div className="prose text-gray-600 mb-6">
                                        <p className="mb-4">
                                            Basaveshwar Engineering College has established a robust ecosystem for research and development.
                                            Our facilities are designed to encourage collaboration between different engineering disciplines
                                            and promote industry-academia interaction.
                                        </p>
                                        <p>
                                            With recognized research centres in 10 disciplines and numerous funded projects,
                                            we provide our scholars and faculty with the resources needed to push the boundaries of knowledge.
                                        </p>
                                    </div>
                                    <Link
                                        href="/research/policy"
                                        className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-orange-700 transition-colors"
                                    >
                                        Read Research Policy
                                    </Link>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-6 rounded-xl text-center">
                                        <Cpu className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                                        <div className="font-bold text-gray-900">Advanced Labs</div>
                                    </div>
                                    <div className="bg-purple-50 p-6 rounded-xl text-center">
                                        <Globe className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                                        <div className="font-bold text-gray-900">Global Connect</div>
                                    </div>
                                    <div className="bg-green-50 p-6 rounded-xl text-center">
                                        <Building2 className="h-8 w-8 text-green-600 mx-auto mb-3" />
                                        <div className="font-bold text-gray-900">Infrastructure</div>
                                    </div>
                                    <div className="bg-orange-50 p-6 rounded-xl text-center">
                                        <Award className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                                        <div className="font-bold text-gray-900">Innovation</div>
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
