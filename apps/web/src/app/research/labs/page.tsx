"use client";

import { FadeIn } from "@/components/animations/fade-in";
import Link from "next/link";
import {
    FlaskConical,
    Fuel,
    Cpu,
    CircuitBoard,
    Microscope,
    Radio,
    Network,
    Zap,
    Monitor,
    ChevronRight
} from "lucide-react";

export default function ResearchLabsPage() {
    const labs = [
        {
            title: "Biodiesel Research",
            href: "/research/labs/biodiesel",
            icon: Fuel,
            description: "Focusing on sustainable biofuel production, alternative energy sources, and green technology.",
            color: "text-green-600",
            bgColor: "bg-green-50"
        },
        {
            title: "Bosch Rexroth",
            href: "/research/labs/bosch",
            icon: Cog,
            description: "Center of Competence in Automation Technologies, Hydraulics, and Pneumatics.",
            color: "text-red-600",
            bgColor: "bg-red-50"
        },
        {
            title: "Intel Intelligent Systems",
            href: "/research/labs/intel",
            icon: Cpu,
            description: "Advanced research in embedded systems, IoT, and intelligent computing architectures.",
            color: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            title: "Material Science",
            href: "/research/labs/materials",
            icon: Microscope,
            description: "Characterization and development of novel materials for engineering applications.",
            color: "text-purple-600",
            bgColor: "bg-purple-50"
        },
        {
            title: "MEMS Design Centre",
            href: "/research/labs/mems",
            icon: CircuitBoard,
            description: "Micro-Electro-Mechanical Systems design, simulation, and fabrication technologies.",
            color: "text-indigo-600",
            bgColor: "bg-indigo-50"
        },
        {
            title: "Multimedia Processing",
            href: "/research/labs/multimedia",
            icon: Monitor,
            description: "Research in image processing, computer vision, and multimedia communication systems.",
            color: "text-pink-600",
            bgColor: "bg-pink-50"
        },
        {
            title: "Nokia Mobile Innovation",
            href: "/research/labs/nokia",
            icon: Radio,
            description: "Innovation in mobile technologies, 5G networks, and wireless communication applications.",
            color: "text-cyan-600",
            bgColor: "bg-cyan-50"
        },
        {
            title: "Renewable Energy",
            href: "/research/labs/renewable",
            icon: Zap,
            description: "Solar, wind, and hybrid energy systems research for a sustainable future.",
            color: "text-yellow-600",
            bgColor: "bg-yellow-50"
        },
        {
            title: "SCADA Laboratory",
            href: "/research/labs/scada",
            icon: Network,
            description: "Supervisory Control and Data Acquisition systems for power grid and industrial automation.",
            color: "text-slate-600",
            bgColor: "bg-slate-50"
        }
    ];

    // Helper for Bosch icon since Cog is not imported yet, wait I imported Cog below... wait I need to import Cog.
    // Actually I see I missed importing Cog in the imports above. I'll add it.

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 sm:px-12 sm:py-24 lg:px-16">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                <div className="relative z-10 max-w-2xl">
                    <FadeIn>
                        <h1 className="text-4xl font-serif font-bold tracking-tight text-white sm:text-5xl">
                            Research Laboratories
                        </h1>
                        <p className="mt-6 text-lg text-slate-300">
                            Our specialized research laboratories provide state-of-the-art infrastructure for
                            advanced experimentation and innovation in emerging technologies.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Grid */}
            <section>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {labs.map((lab, index) => {
                        const Icon = lab.icon;
                        return (
                            <FadeIn key={lab.title} delay={index * 0.05}>
                                <Link href={lab.href} className="group block h-full">
                                    <div className="relative h-full overflow-hidden rounded-2xl bg-white p-8 shadow-xs border border-slate-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                                        <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl ${lab.bgColor}`}>
                                            <Icon className={`h-6 w-6 ${lab.color}`} />
                                        </div>

                                        <h3 className="mb-3 text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                                            {lab.title}
                                        </h3>

                                        <p className="mb-6 text-sm leading-relaxed text-slate-600">
                                            {lab.description}
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

// Importing Cog here to avoid reference error in the object definition if I use it before definition? 
// No, imports are hoisted. I just need to add it to the import list.
import { Cog } from "lucide-react";
