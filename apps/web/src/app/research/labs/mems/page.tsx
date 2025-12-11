"use client";

import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import { Cpu, Maximize2, Layers, Microscope, Monitor, ChevronRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const labFeatures = [
    {
        title: "MEMS Design Software",
        description: "Industry-standard suites like Intellisuite and COMSOL Multiphysics for finite element analysis and process simulation.",
        icon: Monitor,
        color: "text-orange-600",
        bg: "bg-orange-50",
        borderColor: "border-orange-100"
    },
    {
        title: "Micro-Sensors Focus",
        description: "Design and modeling of capacitive pressure sensors, varied-gap accelerometers, and RF MEMS components.",
        icon: ActivityIcon,
        color: "text-amber-600",
        bg: "bg-amber-50",
        borderColor: "border-amber-100"
    },
    {
        title: "Micro-Actuators",
        description: "Research into thermal and electrostatic actuators for micro-fluidic applications and precision control systems.",
        icon: Layers,
        color: "text-slate-600",
        bg: "bg-slate-50",
        borderColor: "border-slate-100"
    },
    {
        title: "Device Characterization",
        description: "Facilities for simulating mechanical, thermal, and electrical properties of micro-machined structures.",
        icon: Microscope,
        color: "text-red-600",
        bg: "bg-red-50",
        borderColor: "border-red-100"
    }
];

// Custom icon for Activity to avoid conflict if needed, or just import Activity
import { Activity as ActivityIcon } from "lucide-react";

const objectives = [
    "To promote interdisciplinary research in Micro-Electro-Mechanical Systems (MEMS).",
    "To provide advanced training in MEMS design, simulation, and fabrication processes.",
    "To facilitate the development of novel micro-sensors for industrial and biomedical applications.",
    "To foster collaboration with NPMASS (National Program on Micro and Smart Systems) and other research bodies."
];

export default function MEMSLabPage() {
    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xl">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-orange-900/20 rounded-full blur-3xl" />

                <div className="relative z-10 p-10 md:p-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold uppercase tracking-wider mb-6">
                            <Cpu className="w-4 h-4" />
                            Advanced Manufacturing
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                            MEMS Design Centre
                        </h1>
                        <p className="text-orange-50 max-w-3xl text-lg md:text-xl leading-relaxed">
                            Exploring the microscopic world of sensors and intelligent systems through advanced simulation and design.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Features */}
                <div className="lg:col-span-2 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-8 bg-orange-600 rounded-full" />
                            Research Focus
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {labFeatures.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={index} className={cn("bg-white p-6 rounded-2xl border hover:shadow-lg transition-all duration-300 group", feature.borderColor)}>
                                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", feature.bg, feature.color)}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar / Objectives */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden"
                    >
                        {/* Decorative Gradient */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -mr-16 -mt-16 blur-xl" />

                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10 text-slate-900">
                            <CheckCircle2 className="w-5 h-5 text-amber-600" />
                            Key Objectives
                        </h3>

                        <ul className="space-y-4 relative z-10">
                            {objectives.map((obj, i) => (
                                <li key={i} className="flex gap-3 text-sm text-slate-600">
                                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                    <span className="leading-relaxed">{obj}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 pt-6 border-t border-slate-100 relative z-10">
                            <div className="bg-amber-50/80 rounded-xl p-4 border border-amber-100">
                                <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">Supported By</div>
                                <div className="text-lg font-bold text-slate-900">NPMASS & TEQIP</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
