"use client";

import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import { User2, CheckCircle2, ShieldCheck, Award, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Data extracted from the image
const committeeMembers = [
    {
        name: "Dr. S. S. Injaganeri",
        designation: "Principal",
        affiliation: "BEC, Bagalkot",
        role: "Chairman",
        icon: Award,
        color: "text-orange-600",
        bg: "bg-orange-50"
    },
    {
        name: "Dr. M. S. Mohan Kumar",
        designation: "Professor (Emeritus)",
        affiliation: "IISc., Bangalore",
        role: "Member (External)",
        icon: User2,
        color: "text-amber-600",
        bg: "bg-amber-50"
    },
    {
        name: "Dr. Ravindra Gudi",
        designation: "Professor",
        affiliation: "IIT Mumbai",
        role: "Member (External)",
        icon: User2,
        color: "text-amber-600",
        bg: "bg-amber-50"
    },
    {
        name: "Dr. Rajendra Hegadi",
        designation: "Assoc. Prof.",
        affiliation: "IIIT Dharwad",
        role: "Member (External)",
        icon: User2,
        color: "text-amber-600",
        bg: "bg-amber-50"
    },
    {
        name: "Dr. Veena S. Soraganvi",
        designation: "Dean (R & D)",
        affiliation: "BEC Bagalkot",
        role: "Member",
        icon: ShieldCheck,
        color: "text-slate-600",
        bg: "bg-slate-50"
    },
    {
        name: "Dr. P. N. Kulkarni",
        designation: "Dean (Academic)",
        affiliation: "BEC Bagalkot",
        role: "Member",
        icon: ShieldCheck,
        color: "text-slate-600",
        bg: "bg-slate-50"
    },
    {
        name: "Dr. Mamata Sataraddi",
        designation: "Assoc. Prof.",
        affiliation: "Dept. of E&CE",
        role: "Member Secretary",
        icon: CheckCircle2,
        color: "text-orange-600",
        bg: "bg-orange-50"
    },
];

const rolesAndResponsibilities = [
    "To periodically review and assist in the progress of research in the college",
    "To formulate the guidelines for evaluation of research quality, ethical standards and further guidance",
    "To promote interdisciplinary and multidisciplinary research between the departments, and in collaboration with the institutes of national importance",
    "To promote collaborative research in association with industries and provide innovative solutions to real life problems",
    "To ensure that the ethical and scientific standards expected by society are met",
    "To adhere to similarity check to strictly avoid plagiarism",
    "To ensure that all the contributors of research are given due credit",
    "To ensure that appropriate strategies are in place to protect participants from potential adverse consequences of the research",
];

export default function AdvisoryCommitteePage() {
    return (
        <div className="space-y-12">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 to-amber-600 p-10 text-white shadow-xl">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold uppercase tracking-wider mb-4">
                        <Award className="w-4 h-4" />
                        Leadership Body
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Research Advisory Committee</h1>
                    <p className="text-orange-50 max-w-2xl mx-auto text-lg">
                        Guiding the strategic direction and upholding the highest standards of research excellence at BEC.
                    </p>
                </motion.div>
            </div>

            {/* Members Grid */}
            <section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {committeeMembers.map((member, index) => {
                        const Icon = member.icon;
                        return (
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
                                        <Icon className={cn("w-10 h-10 transition-colors", member.color)} />
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
                        );
                    })}
                </div>
            </section>

            {/* Roles & Responsibilities */}
            <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-orange-50 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60" />

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center justify-center gap-3">
                        <span className="w-12 h-1 bg-orange-500 rounded-full"></span>
                        Key Responsibilities
                        <span className="w-12 h-1 bg-orange-500 rounded-full"></span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                        {rolesAndResponsibilities.map((role, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (index * 0.05) }}
                                className="flex gap-4"
                            >
                                <div className="mt-1.5 shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">
                                    {index + 1}
                                </div>
                                <p className="text-slate-600 leading-relaxed text-sm">
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
