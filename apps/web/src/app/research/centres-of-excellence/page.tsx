"use client";

import { motion } from "motion/react";
import {
    ArrowUpRight,
    Cpu,
    Eye,
    Smartphone,
    FlaskConical,
    Layers,
    Mountain,
    Building2,
    Satellite,
    Cog,
    Wind,
    Zap,
    Leaf,
    Microscope,
    Atom
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CentresOfExcellencePage() {
    const centres = [
        {
            id: 1,
            title: "National MEMS Design Center",
            description: "Promoting micro and nano technology in India under NPMASS (GoI). Advanced sensor design and fabrication.",
            icon: Cpu,
            color: "text-blue-500",
            bg: "bg-blue-50"
        },
        {
            id: 2,
            title: "Intel Intelligent System Laboratory",
            description: "Exclusive innovation lab established in association with INTEL for embedded systems and IoT research.",
            icon: Microscope,
            color: "text-sky-500",
            bg: "bg-sky-50"
        },
        {
            id: 3,
            title: "Multimedia & Vision Computing",
            description: "High-end computing systems for advanced image processing, wireless networks, and multimedia analytics.",
            icon: Eye,
            color: "text-purple-500",
            bg: "bg-purple-50"
        },
        {
            id: 4,
            title: "NOKIA Research Laboratory",
            description: "Dedicated lab under Nokia University India Grant to study and develop latest mobile technologies.",
            icon: Smartphone,
            color: "text-indigo-500",
            bg: "bg-indigo-50"
        },
        {
            id: 5,
            title: "Adv. Materials Research (CAMRS)",
            description: "Synthesis and characterization of new alloys. Established with 2.62 Crores grant from DRDO.",
            icon: FlaskConical,
            color: "text-emerald-500",
            bg: "bg-emerald-50"
        },
        {
            id: 6,
            title: "Smart Composite Structures (SCSRC)",
            description: "Pioneering research into advanced composite materials and smart structures for aerospace applications.",
            icon: Layers,
            color: "text-amber-500",
            bg: "bg-amber-50"
        },
        {
            id: 7,
            title: "Advanced Geotechnical Engg.",
            description: "State-of-the-art soil mechanics and geotechnical investigations for complex infrastructure projects.",
            icon: Mountain,
            color: "text-stone-500",
            bg: "bg-stone-50"
        },
        {
            id: 8,
            title: "Structural Engineering Lab",
            description: "Advanced testing facilities and analysis tools for structural integrity and earthquake engineering.",
            icon: Building2,
            color: "text-orange-500",
            bg: "bg-orange-50"
        },
        {
            id: 9,
            title: "Remote Sensing & GIS",
            description: "Geospatial technology application for environmental monitoring, resource management, and mapping.",
            icon: Satellite,
            color: "text-cyan-500",
            bg: "bg-cyan-50"
        },
        {
            id: 10,
            title: "BOSCH-REXROTH Automation",
            description: "Industrial automation technology hub involving hydraulic and pneumatic drives for aerospace.",
            icon: Cog,
            color: "text-red-500",
            bg: "bg-red-50"
        },
        {
            id: 11,
            title: "Renewable Energy Research",
            description: "Modeling and Simulation of Wind Energy Conversion Systems and Solar-Wind Hybrid implementations.",
            icon: Wind,
            color: "text-green-500",
            bg: "bg-green-50"
        },
        {
            id: 12,
            title: "SCADA Distribution Automation",
            description: "Supervisory Control and Data Acquisition systems for smart grid distribution and automation.",
            icon: Zap,
            color: "text-yellow-500",
            bg: "bg-yellow-50"
        },
        {
            id: 13,
            title: "Bioenergy Research (BRIDC)",
            description: "Research, Information and Demonstration Centre focused on sustainable bioenergy solutions.",
            icon: Leaf,
            color: "text-lime-500",
            bg: "bg-lime-50"
        },
    ];

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 md:p-12 text-white shadow-2xl">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 text-center max-w-2xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6">
                        <Atom className="w-4 h-4" />
                        World-Class Facilities
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
                        Centres of Excellence
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        State-of-the-art research hubs driving innovation through industry collaboration and advanced technology.
                    </p>
                </motion.div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                {centres.map((centre, index) => {
                    const Icon = centre.icon;
                    return (
                        <motion.div
                            key={centre.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="h-full"
                        >
                            <div className="group h-full relative bg-white rounded-2xl border border-slate-100 hover:border-indigo-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden flex flex-col">
                                {/* Gradient BG Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 opacity-100 group-hover:opacity-0 transition-opacity" />
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="p-8 relative z-10 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg", centre.bg, centre.color, "group-hover:bg-white")}>
                                            <Icon className="w-7 h-7" />
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0">
                                            <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-400" />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors leading-tight">
                                        {centre.title}
                                    </h3>

                                    <p className="text-slate-500 text-sm leading-relaxed flex-grow">
                                        {centre.description}
                                    </p>

                                    {/* Decorative ID */}
                                    <div className="absolute -bottom-4 -right-4 text-8xl font-black text-slate-50 group-hover:text-indigo-50/50 transition-colors z-0 select-none pointer-events-none">
                                        {centre.id}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
