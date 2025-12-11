"use client";

import { PageHeader } from "@/components/placements/page-header";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { Calendar, CheckCircle, Clock, FileText, Info, Award, Ribbon, Scroll } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PatentsPage() {
    const patents = [
        {
            appNo: "2453/CHE/2015",
            title: "An Electro-Mechanical System for Prevention of Wastage of Cold Water Stored in Hot Water Pipeline",
            type: "Indian",
            dateApp: "15/05/2015",
            dateAward: "18/09/2020",
            status: "In force",
            remarks: "Dr. Krishnamurthy Bhat, Dr. Ramachandra N. Herkal",
        },
        {
            appNo: "201641042251",
            title: "Cookie mix for special need",
            type: "Indian",
            dateApp: "10/12/2016",
            dateAward: "3/11/2020",
            status: "Patent granted",
            remarks: "Patent number- 350729",
        },
        {
            appNo: "201741034621",
            title: "Soap preparation using organic waste for animal use to remove body pests like ticks",
            type: "Chemical (Product)",
            dateApp: "28/09/2017",
            dateAward: null,
            status: "Waiting for the award",
            remarks: "Hearing completed on 4th Jan 2021, NBA to be produced",
        },
        {
            appNo: "201741034620",
            title: "Process of purification of glycerine.",
            type: "Chemical (Process)",
            dateApp: "10/12/2016",
            dateAward: null,
            status: "Waiting for the award",
            remarks: "Hearing completed on 11th Jan 2021, NBA to be produced",
        },
        {
            appNo: "202011039249",
            title: "Methods and Model for Work Life Balance of Women Entrepreneurs",
            type: "Ordinary",
            dateApp: "11/09/2020",
            dateAward: "-",
            status: "Published",
            remarks: "-",
        },
        {
            appNo: "202041045268",
            title: "A Novel Model for Stress and Coping Strategies",
            type: "Ordinary",
            dateApp: "17/10/2020",
            dateAward: "-",
            status: "Filed",
            remarks: "Awaiting for publication",
        },
    ];

    const getStatusConfig = (status: string) => {
        if (status.includes("granted") || status.includes("In force")) return { color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: Award };
        if (status.includes("Waiting") || status.includes("Filed") || status.includes("Published")) return { color: "bg-blue-50 text-blue-700 border-blue-200", icon: Clock };
        return { color: "bg-slate-100 text-slate-700 border-slate-200", icon: Info };
    };

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-12 text-white shadow-2xl">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-orange-200 text-xs font-semibold uppercase tracking-wider mb-6">
                        <Ribbon className="w-4 h-4" />
                        Intellectual Property
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Patents & Innovation</h1>
                    <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
                        Celebrating the inventive spirit of our research community through awarded patents and published discoveries.
                    </p>
                </motion.div>
            </div>

            {/* Patents Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {patents.map((patent, index) => {
                    const statusConfig = getStatusConfig(patent.status);
                    const StatusIcon = statusConfig.icon;
                    const isGranted = patent.status.includes("granted") || patent.status.includes("In force");

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="h-full"
                        >
                            <div className={cn(
                                "group h-full relative bg-white rounded-2xl border transition-all duration-300 flex flex-col hover:shadow-xl overflow-hidden",
                                isGranted ? "border-emerald-100/50 hover:border-emerald-300" : "border-slate-200 hover:border-blue-300"
                            )}>
                                {/* Texture Background */}
                                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />

                                {isGranted && (
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full -mr-10 -mt-10 blur-xl group-hover:bg-emerald-500/20 transition-colors" />
                                )}

                                <div className="p-8 relative z-10 flex flex-col h-full">
                                    {/* Top Metadata */}
                                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                        <Badge variant="secondary" className="bg-slate-50 text-slate-600 border-slate-200 font-medium px-3 py-1.5">
                                            {patent.type} Patent
                                        </Badge>
                                        <Badge className={cn("px-3 py-1.5 flex items-center gap-1.5", statusConfig.color)}>
                                            <StatusIcon className="w-3.5 h-3.5" />
                                            {patent.status}
                                        </Badge>
                                    </div>

                                    {/* Scroll Icon for decoration - subtle */}
                                    <div className="absolute top-8 right-8 text-slate-100 group-hover:text-slate-200 transition-colors pointer-events-none">
                                        <Scroll className="w-16 h-16" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-slate-900 mb-6 leading-snug group-hover:text-amber-700 transition-colors pr-8">
                                        {patent.title}
                                    </h3>

                                    {/* Details */}
                                    <div className="mt-auto space-y-4 pt-6 border-t border-slate-100 border-dashed">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Application No</p>
                                                <p className="text-slate-700 font-mono text-sm">{patent.appNo}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Filing Date</p>
                                                <p className="text-slate-700 font-medium text-sm">{patent.dateApp}</p>
                                            </div>
                                        </div>

                                        {isGranted && (
                                            <div className="bg-emerald-50/50 rounded-lg p-3 border border-emerald-100 flex items-center justify-between">
                                                <span className="text-emerald-700 text-xs font-bold uppercase">Awarded On</span>
                                                <span className="text-emerald-800 font-bold">{patent.dateAward}</span>
                                            </div>
                                        )}

                                        {patent.remarks && patent.remarks !== "-" && (
                                            <div>
                                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Details / People</p>
                                                <p className="text-slate-600 text-sm leading-relaxed">{patent.remarks}</p>
                                            </div>
                                        )}
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
