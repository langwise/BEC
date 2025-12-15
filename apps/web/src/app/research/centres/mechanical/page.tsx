"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
    Users,
    Award,
    BookOpen,
    Settings, // Mechanical/Gears
    Wrench, // Tools
    Zap, // Energy
    Sun, // Solar
    Flame, // Combustion/Alt Fuels
    Activity, // Vibration
    Layers, // Materials
    Droplet, // Spray
    PenTool, // Design
    Cog, // Mechanisms
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
    { label: "Guides", value: "18", icon: Users, color: "text-slate-600", bg: "bg-slate-50" },
    { label: "Registered", value: "85", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Awarded", value: "47", icon: Award, color: "text-green-600", bg: "bg-green-50" },
];

const researchAreas = [
    { name: "Engine Dynamics", icon: Settings },
    { name: "Design", icon: PenTool },
    { name: "Synthesis of Mechanisms", icon: Cog },
    { name: "Noise Vibration and Harshness", icon: Activity },
    { name: "Advanced Materials & Engg.", icon: Layers },
    { name: "Solidification, Grain refinement", icon: Layers },
    { name: "Alternate Fuels for IC Engines", icon: Flame },
    { name: "Tribology, Spray technology, Ceramics", icon: Droplet },
    { name: "Solar Energy & Engineering", icon: Sun },
];

const scholars = [
    { slNo: "1", guide: "Dr. P. B. Gangavathi", scholar: "Smt. S. B. Wadawadagi", usn: "2BA17PMA07" },
    { slNo: "2", guide: "Dr. S. S. Balli", scholar: "Prashant Tadalagi", usn: "2BA17PMA13" },
    { slNo: "3", guide: "Dr. S. S. Balli", scholar: "Anilkumar Balavani", usn: "2BA17PMA11" },
    { slNo: "4", guide: "Dr. S. A. Kori", scholar: "Shrikant Badi", usn: "2BA13PMN08" },
    { slNo: "5", guide: "Dr. S. A. Kori", scholar: "Gurugouda Patil", usn: "2BA17PMA12" },
    { slNo: "6", guide: "Dr. V. V. Kuppast", scholar: "Shashank M Hebbal", usn: "2BA18PME04" },
    { slNo: "7", guide: "Dr. V. V. Kuppast", scholar: "Neeraj R Kurahatti", usn: "2BA21PME01" },
    { slNo: "8", guide: "Dr. V. V. Kuppast", scholar: "Umeshkumar H D", usn: "--" },
    { slNo: "9", guide: "Dr. S. G. Sarganachari", scholar: "Basavaraj Endigeri", usn: "2BA15PMJ08" },
    { slNo: "10", guide: "Dr. S. G. Sarganachari", scholar: "Praveen Kolur", usn: "2BA17PMA05" },
    { slNo: "11", guide: "Dr. R. V. Kurhatti", scholar: "K. H. Pulikeshi", usn: "2BA15PMJ10" },
    { slNo: "12", guide: "Dr. R. V. Kurhatti", scholar: "Rajath Mallikarjun Handi", usn: "2BA20PME02" },
    { slNo: "13", guide: "Dr. R. V. Kurhatti", scholar: "Bhambure Pradip Dnyaneshwar", usn: "2BA22PME01" },
    { slNo: "14", guide: "Dr. S.M. Jigajinni", scholar: "Ramchandra Bingi", usn: "2BA15PMJ07" },
    { slNo: "15", guide: "Dr. S.M. Jigajinni", scholar: "Anupkumar Desai", usn: "2BA20PME01" },
    { slNo: "16", guide: "Dr. S. S. Hiremath", scholar: "Iranna Hanapur", usn: "2BA19PME03" },
];


export default function MechanicalResearchPage() {
    return (
        <div className="space-y-12">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-700 to-slate-900 p-8 md:p-12 text-white shadow-xl">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-600/50 border border-slate-500/50 text-slate-100 text-sm font-medium mb-4"
                        >
                            <Settings className="w-4 h-4" />
                            Research Centre
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
                        >
                            Mechanical Engineering
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-200 max-w-xl text-lg leading-relaxed"
                        >
                            Innovating in Design, Thermal Engineering, and Advanced Materials.
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column - Stats & Areas */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="bg-white p-6 rounded-2xl shadow-xs border border-slate-100 hover:shadow-md transition-shadow"
                                >
                                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", stat.bg)}>
                                        <Icon className={cn("w-6 h-6", stat.color)} />
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                                    <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Research Areas */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white rounded-3xl p-8 shadow-xs border border-slate-100"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="w-2 h-8 rounded-full bg-slate-600" />
                            Research Areas
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {researchAreas.map((area, index) => (
                                <div
                                    key={index}
                                    className="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-300"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-600 group-hover:scale-110 transition-transform">
                                        <area.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                                        {area.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>

                {/* Right Column - Image */}
                <div className="lg:col-span-4 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="relative h-[400px] rounded-3xl overflow-hidden shadow-lg group"
                    >
                        <Image
                            src="/mech-dept.png"
                            alt="Department of Mechanical Engineering"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold mb-2">
                                Campus
                            </span>
                            <h3 className="text-xl font-bold text-white">Dept. of Mechanical Engg.</h3>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scholars Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xs border border-slate-100"
            >
                <div className="p-8 border-b border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                        <span className="w-2 h-8 rounded-full bg-slate-600" />
                        Research Scholars
                    </h2>
                </div>

                <div className="overflow-x-auto custom-scrollbar pb-2">
                    <table className="w-full min-w-[1000px] text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap w-16">Sl.</th>
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">Guide Name</th>
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">Research Scholar</th>
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">USN</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {scholars.map((scholar, index) => (
                                <tr key={scholar.usn || index} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="p-3 md:p-4 text-sm font-medium text-slate-500 whitespace-nowrap">{scholar.slNo}</td>
                                    <td className="p-3 md:p-4 text-sm text-slate-600 whitespace-nowrap">{scholar.guide}</td>
                                    <td className="p-3 md:p-4 text-sm font-bold text-slate-900 whitespace-nowrap">{scholar.scholar}</td>
                                    <td className="p-3 md:p-4 text-sm font-mono text-slate-500 whitespace-nowrap">{scholar.usn}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
