"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
    Users,
    Award,
    BookOpen,
    Briefcase, // Business/MBA
    Heart, // Emotional Intelligence
    Users2, // Diversity/HR
    Smile, // Stress/Wellbeing
    TrendingUp, // Marketing/Growth
    ShoppingBag, // Consumer
    Presentation, // Training
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
    { label: "Guides", value: "04", icon: Users, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Registered", value: "01", icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50" },
    // Awarded not shown in image snippet, omitting.
];

const researchAreas = [
    { name: "Emotional Intelligence", icon: Heart },
    { name: "Diversity Management", icon: Users2 },
    { name: "Stress Management", icon: Smile },
    { name: "Training and Development", icon: Presentation },
    { name: "Marketing Management", icon: TrendingUp },
    { name: "Consumer Behaviour", icon: ShoppingBag },
];

const scholars = [
    {
        slNo: "1",
        name: "Anusha A.",
        usn: "2BA17PBA01",
        admissionYear: "2017",
        title: "An Empirical Investigation on Rural Women Empowerment through Government Sponsored Schemes in Karnataka",
        guide: "Dr. Rashmi R. Hunnur",
        coGuide: "-",
    },
    {
        slNo: "2",
        name: "Vaibhav Deshpande",
        usn: "2BA22PBA01",
        admissionYear: "2022",
        title: "Role of Micro Finance Institutions in Financial Inclusion with Special reference to North Karnataka",
        guide: "Dr. Rashmi R. Hunnur",
        coGuide: "-",
    },
    {
        slNo: "3",
        name: "Arpita Patil",
        usn: "2BA22PBA02",
        admissionYear: "2022",
        title: "An analysis on Investment Strategy among Investors in Kalyana Karnataka Region",
        guide: "Dr. Rashmi R. Hunnur",
        coGuide: "Dr. Bhadrappa",
    },
];

export default function MBAResearchPage() {
    return (
        <div className="space-y-12">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-900 to-purple-900 p-8 md:p-12 text-white shadow-xl">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl" />

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-800/50 border border-rose-700/50 text-rose-100 text-sm font-medium mb-4"
                        >
                            <Briefcase className="w-4 h-4" />
                            Research Centre
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
                        >
                            Master of Business Administration
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-rose-100 max-w-xl text-lg leading-relaxed"
                        >
                            Advanced research in Management, Finance, and Human Resources.
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column - Stats & Areas */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <span className="w-2 h-8 rounded-full bg-rose-600" />
                            Research Areas
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {researchAreas.map((area, index) => (
                                <div
                                    key={index}
                                    className="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-rose-50 transition-colors duration-300"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-rose-600 group-hover:scale-110 transition-transform">
                                        <area.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-slate-700 group-hover:text-rose-900 transition-colors">
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
                            src="/mba-dept.png"
                            alt="Department of MBA"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold mb-2">
                                Campus
                            </span>
                            <h3 className="text-xl font-bold text-white">Department of MBA</h3>
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
                        <span className="w-2 h-8 rounded-full bg-rose-600" />
                        Research Scholars
                    </h2>
                </div>

                <div className="overflow-x-auto custom-scrollbar pb-2">
                    <table className="w-full min-w-[1200px] text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap w-16">Sl.</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">Name</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">USN</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Admission Year</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider min-w-[400px]">Research Title</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">Name of Guide</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">Name of Co-Guide</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {scholars.map((scholar, index) => (
                                <tr key={scholar.usn || index} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="p-4 text-sm font-medium text-slate-500 whitespace-nowrap">{scholar.slNo}</td>
                                    <td className="p-4 text-sm font-bold text-slate-900 whitespace-nowrap">{scholar.name}</td>
                                    <td className="p-4 text-sm font-mono text-slate-500 whitespace-nowrap">{scholar.usn}</td>
                                    <td className="p-4 text-sm text-slate-600 whitespace-nowrap text-center">{scholar.admissionYear}</td>
                                    <td className="p-4 text-sm text-slate-700 leading-relaxed">{scholar.title}</td>
                                    <td className="p-4 text-sm text-slate-600 whitespace-nowrap">{scholar.guide}</td>
                                    <td className="p-4 text-sm text-slate-600 whitespace-nowrap text-center">{scholar.coGuide}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
