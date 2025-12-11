"use client";

import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import { User2, CheckCircle2, FileSearch, ClipboardCheck, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const committeeMembers = [
    { name: "Dr. S. S. Injaganeri", designation: "Principal", role: "Chairman", affiliation: "BEC Bagalkot", bg: "bg-orange-50", color: "text-orange-600" },
    { name: "Dr. Veena S. Soraganvi", designation: "Dean (R&D)", role: "Member Secretary", affiliation: "BEC Bagalkot", bg: "bg-orange-50", color: "text-orange-600" },
    { name: "Dr. P. N. Kulkarni", designation: "Dean (Academic)", role: "Member", affiliation: "BEC Bagalkot", bg: "bg-slate-50", color: "text-slate-600" },
    { name: "Dr. Vinay Kuppast", designation: "HoD, Mech. Engg.", role: "Member", affiliation: "Dept. of Mechanical", bg: "bg-slate-50", color: "text-slate-600" },
    { name: "Dr. P. L. Timmanagoudar", designation: "HoD, Chemistry", role: "Member", affiliation: "Dept. of Chemistry", bg: "bg-slate-50", color: "text-slate-600" },
    { name: "Dr. Anil D. Devangavi", designation: "HoD, AIML", role: "Member", affiliation: "Dept. of AIML", bg: "bg-slate-50", color: "text-slate-600" },
    { name: "Dr. Mahabaleshwar M. K.", designation: "Assoc. Prof. ECE", role: "Member", affiliation: "Dept. of ECE", bg: "bg-slate-50", color: "text-slate-600" },
];

const rolesAndResponsibilities = [
    "To review the research proposals prepared by faculty/investigators to meet higher standards",
    "To provide information to faculty members about the research funding opportunities",
    "To ascertain quality of UG/PG/PhD student projects and reports",
    "To promote professional bodies activities",
    "Any other responsibility assigned by Principal and Dean (R&D)",
];

export default function ReviewCommitteePage() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 to-amber-600 p-10 text-white shadow-xl">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold uppercase tracking-wider mb-4">
                        <FileSearch className="w-4 h-4" />
                        Quality Assurance
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Research Review Committee</h1>
                    <p className="text-orange-50 max-w-2xl mx-auto text-lg">
                        Enhancing research quality and fostering academic excellence through rigorous standards and analysis.
                    </p>
                </motion.div>
            </div>

            {/* Members Grid */}
            <section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {committeeMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group h-full"
                        >
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col items-center text-center hover:shadow-xl hover:shadow-orange-100/50 hover:border-orange-100 transition-all duration-300 h-full relative overflow-hidden">
                                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                                <div className={cn("w-20 h-20 rounded-2xl mb-6 flex items-center justify-center transition-all duration-300 group-hover:scale-110", member.bg)}>
                                    <User2 className={cn("w-10 h-10 transition-colors", member.color)} />
                                </div>

                                <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">{member.name}</h3>
                                <div className="text-slate-600 font-medium text-sm mb-1">{member.designation}</div>
                                <div className="text-slate-400 text-sm mb-6">{member.affiliation}</div>

                                <div className="mt-auto w-full pt-6 border-t border-slate-100">
                                    <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider group-hover:bg-orange-50 group-hover:text-orange-800 transition-colors">
                                        {member.role}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Responsibilities */}
            <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center justify-center gap-3">
                        <ClipboardCheck className="w-6 h-6 text-orange-600" />
                        Key Objectives
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {rolesAndResponsibilities.map((role, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + (index * 0.05) }}
                                className="flex gap-4 p-5 bg-slate-50 rounded-2xl hover:bg-orange-50 transition-colors duration-300 border border-transparent hover:border-orange-100"
                            >
                                <div className="shrink-0 mt-0.5">
                                    <div className="w-6 h-6 rounded-full bg-white text-orange-600 flex items-center justify-center text-xs font-bold shadow-sm">
                                        {index + 1}
                                    </div>
                                </div>
                                <p className="text-slate-700 leading-relaxed text-sm font-medium">
                                    {role}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
