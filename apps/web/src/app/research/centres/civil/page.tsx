"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
    Users,
    Award,
    BookOpen,
    HardHat,
    Droplets,
    BrickWall, // Using BrickWall as a substitute for Pickaxe/Layers if needed
    Waves,
    Recycle,
    Construction,
    Pickaxe
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
    { label: "Guides", value: "10", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Registered", value: "38", icon: BookOpen, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Awarded", value: "17", icon: Award, color: "text-green-600", bg: "bg-green-50" },
];

const researchAreas = [
    { name: "High Strength and High Performance Concrete", icon: BrickWall },
    { name: "Fiber Reinforced Polymer Composites", icon: Construction },
    { name: "Surface and Sub-surface Water Studies", icon: Waves },
    { name: "Ground Water Modeling", icon: Droplets },
    { name: "Wastewater treatment", icon: Recycle },
    { name: "Stabilization of Expansive Soils", icon: Pickaxe },
    { name: "Reinforced Earth", icon: HardHat },
    { name: "Soil Dynamics", icon: Pickaxe },
];

const scholars = [
    {
        slNo: "1",
        usn: "2BA15PCJ01",
        name: "Chandrakanth Watawati",
        guide: "Dr. C. B. Shivayogimath",
        coGuide: "-",
        title: "Treatment of Dairy Waste water using Electro coagulation",
        status: "Comprehensive Viva Completed",
        category: "GM",
    },
    {
        slNo: "2",
        usn: "2BA16PCJ04",
        name: "Praveen Meti",
        guide: "Dr. C. B. Shivayogimath",
        coGuide: "-",
        title: "Treatment of Sugar Industry Wastewater by Electro coagulation Process Using Bipolar Electrodes System",
        status: "Registered",
        category: "GM",
    },
    {
        slNo: "3",
        usn: "2BA16PCJ05",
        name: "Sheerifa Nadaf",
        guide: "Dr.P.B.Kalburgi",
        coGuide: "-",
        title: "An Experimental Investigation on Degradation of Imidazolium Based Ionic Liquids from Aqueous Solution Using Advanced Oxidation Process",
        status: "Pre-Submission colloquium Completed",
        category: "OBC",
    },
    {
        slNo: "4",
        usn: "2BA16PCJ04",
        name: "Keshavraj Girinivas",
        guide: "Dr.M. M. Hanamsagar",
        coGuide: "-",
        title: "Fracture Behaviour of Fibre- Reinforced Stabilised Rammed Earth Using Industrial Waste",
        status: "Comprehensive viva completed",
        category: "SC",
    },
    {
        slNo: "5",
        usn: "2BA17PCA05",
        name: "Yogesh Uday Kulkarni",
        guide: "Dr.R. B. Khadiranaikar",
        coGuide: "-",
        title: "Early age shrinkage of HPC",
        status: "Open Seminar 1 Completed",
        category: "GM",
    },
    {
        slNo: "6",
        usn: "2BA17PCA01",
        name: "Gururaj Bandihal",
        guide: "Dr.V. S.Soraganvi",
        coGuide: "-",
        title: "Groundwater Recharge Sites Identification Using GIS",
        status: "Comprehensive Viva Completed",
        category: "GM",
    },
    {
        slNo: "7",
        usn: "2BA17PCA04",
        name: "Mahadevi Ganiger",
        guide: "Dr.V. S.Soraganvi",
        coGuide: "-",
        title: "A Study on Fluoride Contaminating Groundwater at Source and its Retention",
        status: "DC Formed",
        category: "GM",
    },
];

export default function CivilResearchPage() {
    return (
        <div className="space-y-12">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-900 to-blue-900 p-8 md:p-12 text-white shadow-xl">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl" />

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/50 border border-blue-700/50 text-blue-200 text-sm font-medium mb-4"
                        >
                            <HardHat className="w-4 h-4" />
                            Research Centre
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
                        >
                            Civil Engineering
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-blue-100 max-w-xl text-lg leading-relaxed"
                        >
                            Pioneering research in structural integrity, environmental sustainability, and geotechnical engineering.
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
                        transition={{ delay: 0.5 }}
                        className="bg-white rounded-3xl p-8 shadow-xs border border-slate-100"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="w-2 h-8 rounded-full bg-blue-600" />
                            Research Areas
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {researchAreas.map((area, index) => (
                                <div
                                    key={index}
                                    className="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors duration-300"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-blue-600 group-hover:scale-110 transition-transform">
                                        <area.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-slate-700 group-hover:text-blue-900 transition-colors">
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
                            src="/civil-dept.png"
                            alt="Department of Civil Engineering"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold mb-2">
                                Campus
                            </span>
                            <h3 className="text-xl font-bold text-white">Department of Civil Engineering</h3>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scholars Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xs border border-slate-100"
            >
                <div className="p-8 border-b border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                        <span className="w-2 h-8 rounded-full bg-blue-600" />
                        Research Scholars
                    </h2>
                </div>

                <div className="overflow-x-auto custom-scrollbar pb-2">
                    <table className="w-full min-w-[1400px] text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap w-16">Sl. No</th>
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">USN</th>
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">Research Scholar</th>
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">Guide</th>
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[100px]">Co-Guide</th>
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider min-w-[400px]">Ph.D. Title</th>
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Current Status</th>
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Category</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {scholars.map((scholar, index) => (
                                <tr key={scholar.usn || index} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="p-3 md:p-4 text-sm font-medium text-slate-500 whitespace-nowrap">{scholar.slNo}</td>
                                    <td className="p-3 md:p-4 text-sm font-mono text-slate-500 whitespace-nowrap">{scholar.usn}</td>
                                    <td className="p-3 md:p-4 text-sm font-bold text-slate-900 whitespace-nowrap">{scholar.name}</td>
                                    <td className="p-3 md:p-4 text-sm text-slate-600 whitespace-nowrap">{scholar.guide}</td>
                                    <td className="p-3 md:p-4 text-sm text-slate-600 whitespace-nowrap">{scholar.coGuide}</td>
                                    <td className="p-3 md:p-4 text-sm text-slate-700 leading-relaxed">{scholar.title}</td>
                                    <td className="p-3 md:p-4 text-sm text-slate-600 whitespace-nowrap">
                                        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium",
                                            scholar.status.includes("Completed") ? "bg-green-100 text-green-800" :
                                                scholar.status.includes("Registered") ? "bg-blue-100 text-blue-800" :
                                                    "bg-orange-100 text-orange-800"
                                        )}>
                                            {scholar.status}
                                        </span>
                                    </td>
                                    <td className="p-3 md:p-4 text-sm text-slate-600 whitespace-nowrap font-medium text-center">
                                        {scholar.category}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
