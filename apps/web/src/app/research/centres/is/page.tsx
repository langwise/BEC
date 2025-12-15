"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
    Users,
    Award,
    BookOpen,
    Monitor, // General Info Science
    Wifi, // Wireless/Networks
    Globe, // Semantic Web/Internet
    Cpu, // AI/Machine Learning
    Server, // FOG Computing
    Radio, // Adhoc Networks
    Scan, // Image Processing
    Database // Data Management
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
    { label: "Guides", value: "05", icon: Users, color: "text-cyan-600", bg: "bg-cyan-50" },
    { label: "Registered", value: "03", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
    // Awarded is not shown in image, omitting or setting to 0 if needed. 
    // Assuming 0 or generic placeholder is better than mismatching data. 
    // Given previous pages had 3 cards, I'll allow a placeholder or skip. 
    // The first image cropped it out or it doesn't exist. I will assume "0" for consistency or omit.
    // Let's stick to the 2 visible stats to be strictly accurate to the image provided.
];

const researchAreas = [
    { name: "Image Processing", icon: Scan },
    { name: "Wireless Sensor Networks", icon: Wifi },
    { name: "Vehicular Adhoc Networks", icon: Radio },
    { name: "Semantic Sensor Web", icon: Globe },
    { name: "Internet of Things", icon: Wifi },
    { name: "Ubiquitous Networks", icon: Globe },
    { name: "Machine Learning", icon: Cpu },
    { name: "Artificial Intelligence", icon: Cpu },
];

const scholars = [
    {
        slNo: "01",
        name: "Rajakumar Sikkeri",
        admissionYear: "2021",
        usn: "2BA20PIS02",
        guide: "Dr. Shobha R. Patil",
        title: "Cloud Based real Time Monitoring of Crops using machine Learning",
    },
    {
        slNo: "02",
        name: "Basavaraj G. Kumbar",
        admissionYear: "2021",
        usn: "2BA20PIS01",
        guide: "Dr. Lokesh B. Bhajantri",
        title: "Agent Based Secure Resource and Data Management in FOG Computing",
    },
    {
        slNo: "03",
        name: "Sumadevi Benkikeri",
        admissionYear: "2023",
        usn: "2BA23PIS01",
        guide: "Dr. Lokesh B. Bhajantri",
        title: "Secure Data Management and Processing in Semantic Web using Cognitive Approach",
    },
];

export default function ISResearchPage() {
    return (
        <div className="space-y-12">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-700 to-blue-800 p-8 md:p-12 text-white shadow-xl">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/50 border border-blue-700/50 text-blue-100 text-sm font-medium mb-4"
                        >
                            <Monitor className="w-4 h-4" />
                            Research Centre
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
                        >
                            Information Science & Engineering
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-blue-100 max-w-xl text-lg leading-relaxed"
                        >
                            Exploring the frontiers of Cloud Computing, IoT, and Artificial Intelligence.
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column - Stats & Areas */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
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
                            <span className="w-2 h-8 rounded-full bg-cyan-600" />
                            Research Areas
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {researchAreas.map((area, index) => (
                                <div
                                    key={index}
                                    className="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-cyan-50 transition-colors duration-300"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-cyan-600 group-hover:scale-110 transition-transform">
                                        <area.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-slate-700 group-hover:text-cyan-900 transition-colors">
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
                            src="/is-dept.png"
                            alt="Department of Information Science"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold mb-2">
                                Campus
                            </span>
                            <h3 className="text-xl font-bold text-white">Dept. of Information Science</h3>
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
                        <span className="w-2 h-8 rounded-full bg-cyan-600" />
                        Research Scholars
                    </h2>
                </div>

                <div className="overflow-x-auto custom-scrollbar pb-2">
                    <table className="w-full min-w-[1400px] text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap w-16">Sl.</th>
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">Name of the Research Scholar</th>
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Admission Year</th>
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">USN</th>
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">Name of the Guide</th>
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider min-w-[400px]">Title of Ph.D.</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {scholars.map((scholar, index) => (
                                <tr key={scholar.usn || index} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="p-3 md:p-4 text-sm font-medium text-slate-500 whitespace-nowrap">{scholar.slNo}</td>
                                    <td className="p-3 md:p-4 text-sm font-bold text-slate-900 whitespace-nowrap">{scholar.name}</td>
                                    <td className="p-3 md:p-4 text-sm font-medium text-slate-600 whitespace-nowrap text-center">{scholar.admissionYear}</td>
                                    <td className="p-3 md:p-4 text-sm font-mono text-slate-500 whitespace-nowrap">{scholar.usn}</td>
                                    <td className="p-3 md:p-4 text-sm text-slate-600 whitespace-nowrap">{scholar.guide}</td>
                                    <td className="p-3 md:p-4 text-sm text-slate-700 leading-relaxed">{scholar.title}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
