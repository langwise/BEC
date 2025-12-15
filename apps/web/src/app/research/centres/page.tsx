"use client";

import { FadeIn } from "@/components/animations/fade-in";
import Link from "next/link";
import {
    Cog,
    Building2,
    Dna,
    Code,
    Radio,
    Zap,
    Factory,
    Database,
    Briefcase,
    Atom,
    ChevronRight
} from "lucide-react";

export default function ResearchCentresPage() {
    const centres = [
        {
            title: "Biotechnology",
            href: "/research/centres/biotech",
            icon: Dna,
            description: "Advanced research in biological systems, genetic engineering, and bioprocess technology.",
            color: "text-green-600",
            bgColor: "bg-green-50"
        },
        {
            title: "Civil Engineering",
            href: "/research/centres/civil",
            icon: Building2,
            description: "Focusing on structural health monitoring, sustainable materials, and environmental engineering.",
            color: "text-yellow-600",
            bgColor: "bg-yellow-50"
        },
        {
            title: "Computer Science & Engg.",
            href: "/research/centres/cs",
            icon: Code,
            description: "Exploring AI/ML, data science, cybersecurity, and cloud computing paradigms.",
            color: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            title: "Electronics & Communication",
            href: "/research/centres/ec",
            icon: Radio,
            description: "Research in VLSI, signal processing, communication systems, and embedded technologies.",
            color: "text-indigo-600",
            bgColor: "bg-indigo-50"
        },
        {
            title: "Electrical & Electronics",
            href: "/research/centres/ee",
            icon: Zap,
            description: "Innovating in power systems, renewable energy, electric drives, and control systems.",
            color: "text-amber-600",
            bgColor: "bg-amber-50"
        },
        {
            title: "Industrial & Production",
            href: "/research/centres/ip",
            icon: Factory,
            description: "Optimizing manufacturing processes, supply chain management, and ergonomics.",
            color: "text-orange-600",
            bgColor: "bg-orange-50"
        },
        {
            title: "Information Science",
            href: "/research/centres/is",
            icon: Database,
            description: "Researching information retrieval, big data analytics, and software engineering.",
            color: "text-teal-600",
            bgColor: "bg-teal-50"
        },
        {
            title: "Management Studies (MBA)",
            href: "/research/centres/mba",
            icon: Briefcase,
            description: "Studies in organizational behavior, finance, marketing, and strategic management.",
            color: "text-rose-600",
            bgColor: "bg-rose-50"
        },
        {
            title: "Mechanical Engineering",
            href: "/research/centres/mechanical",
            icon: Cog,
            description: "Development in thermal engineering, machine design, robotics, and materials science.",
            color: "text-slate-600",
            bgColor: "bg-slate-50"
        },
        {
            title: "Physics",
            href: "/research/centres/physics",
            icon: Atom,
            description: "Fundamental research in material science, nanotechnology, and condensed matter physics.",
            color: "text-purple-600",
            bgColor: "bg-purple-50"
        }
    ];

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 sm:px-12 sm:py-24 lg:px-16">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                <div className="relative z-10 max-w-2xl">
                    <FadeIn>
                        <h1 className="text-4xl font-serif font-bold tracking-tight text-white sm:text-5xl">
                            Research Centres
                        </h1>
                        <p className="mt-6 text-lg text-slate-300">
                            Our 10 recognized research centres are at the forefront of innovation, fostering a culture of
                            inquiry and development across diverse engineering and scientific disciplines.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Stats/Info Grid */}
            <section>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {centres.map((centre, index) => {
                        const Icon = centre.icon;
                        return (
                            <FadeIn key={centre.title} delay={index * 0.05}>
                                <Link href={centre.href} className="group block h-full">
                                    <div className="relative h-full overflow-hidden rounded-2xl bg-white p-8 shadow-xs border border-slate-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                                        <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl ${centre.bgColor}`}>
                                            <Icon className={`h-6 w-6 ${centre.color}`} />
                                        </div>

                                        <h3 className="mb-3 text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                                            {centre.title}
                                        </h3>

                                        <p className="mb-6 text-sm leading-relaxed text-slate-600">
                                            {centre.description}
                                        </p>

                                        <div className="flex items-center text-sm font-semibold text-primary">
                                            View Details
                                            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            </FadeIn>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
