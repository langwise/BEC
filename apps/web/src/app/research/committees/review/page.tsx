"use client";

import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import { User2, CheckCircle2 } from "lucide-react";

// Data extracted from the image
const committeeMembers = [
    {
        name: "Dr. S. S. Injaganeri",
        designation: "Principal",
        role: "Chairman",
        affiliation: "BEC Bagalkot" // Inferred as they are internal
    },
    {
        name: "Dr. P. N. Kulkarni",
        designation: "Dean (Academic)",
        role: "Member",
        affiliation: "BEC Bagalkot"
    },
    {
        name: "Dr. Vinay Kuppast",
        designation: "HoD, Mech. Engg.",
        role: "Member",
        affiliation: "Dept. of Mechanical"
    },
    {
        name: "Dr. P. L. Timmanagoudar",
        designation: "HoD, Chemistry",
        role: "Member",
        affiliation: "Dept. of Chemistry"
    },
    {
        name: "Dr. Anil D. Devangavi",
        designation: "HoD, AIML",
        role: "Member",
        affiliation: "Dept. of AIML"
    },
    {
        name: "Dr. Mahabaleshwar M. K.",
        designation: "Assoc. Prof. ECE",
        role: "Member",
        affiliation: "Dept. of ECE"
    },
    {
        name: "Dr. Veena S. Soraganvi",
        designation: "Dean (R&D)",
        role: "Member Secretary",
        affiliation: "BEC Bagalkot"
    },
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
        <div className="space-y-12 max-w-7xl mx-auto">
            {/* Header Section */}
            <PageHeader
                title="Research Review Committee"
                description="Enhancing research quality and fostering academic excellence through rigorous review and guidance."
            />

            {/* Members Grid */}
            <section>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {committeeMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-300 group"
                        >
                            {/* Image Placeholder */}
                            <div className="w-24 h-24 rounded-full bg-orange-50 mb-4 flex items-center justify-center border-2 border-orange-100 group-hover:border-primary transition-colors duration-300">
                                <User2 className="w-10 h-10 text-orange-300 group-hover:text-primary transition-colors" />
                            </div>

                            <h3 className="font-bold text-lg text-gray-900 mb-1">{member.name}</h3>
                            <div className="text-primary font-medium text-sm mb-2">{member.designation}</div>
                            <div className="text-gray-500 text-sm mb-4">{member.affiliation}</div>

                            <div className="mt-auto pt-4 border-t border-gray-100 w-full">
                                <span className="inline-block px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-semibold">
                                    {member.role}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Roles & Responsibilities */}
            <section className="bg-white rounded-2xl p-8 border border-orange-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />

                <h2 className="text-2xl font-bold text-gray-900 mb-8 relative z-10 flex items-center gap-3">
                    <span className="w-1 h-8 bg-primary rounded-full"></span>
                    Roles and Responsibilities
                </h2>

                <div className="grid gap-4 relative z-10">
                    {rolesAndResponsibilities.map((role, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + (index * 0.05) }}
                            className="flex items-start gap-4 p-4 rounded-lg hover:bg-orange-50/50 transition-colors duration-200"
                        >
                            <div className="mt-1 shrink-0">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                            </div>
                            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                                {role}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
