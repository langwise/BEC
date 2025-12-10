"use client";

import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import { User2, CheckCircle2 } from "lucide-react";

// Data extracted from the image
const committeeMembers = [
    {
        name: "Dr. S. S. Injaganeri",
        designation: "Principal",
        affiliation: "BEC Bagalkote",
        role: "Chairman",
    },
    {
        name: "Dr. Veena S. Soraganvi",
        designation: "Dean (R&D)",
        affiliation: "BEC Bagalkote",
        role: "Member",
    },
    {
        name: "Dr. P. N. Kulkarni",
        designation: "Dean (Academic)",
        affiliation: "BEC Bagalkote",
        role: "Member",
    },
    {
        name: "Dr. Bharti S. Meti",
        designation: "Professor & Head",
        affiliation: "Biotechnology",
        role: "Member",
    },
    {
        name: "Dr. S. G. Kambalimath",
        designation: "Assoc. Professor",
        affiliation: "ECE Dept. BEC Bagalkote",
        role: "Member Secretary",
    },
];

const rolesAndResponsibilities = [
    "To ensure that, the research conforms to recognised ethical standards, which includes respecting the dignity, rights, safety and well-being of the people who take part in research in general",
    "To ensure that, appropriate strategies are in place to protect the individuals who participate and are associated with research from potential adverse consequences of the research",
    "To guarantee fairness, confidentiality and privacy of data of all the subjects involved in the study and consent of the concerned has to be sought, when data is to be shared",
    "To review research proposals to assess whether the research is ethical",
    "To ensure that the copyright of original work is protected and due credit is given to all researchers",
    "To ensure and verify that, all the research papers and theses submitted have to pass the similarity test compulsorily",
    "To ensure that, full transparency is maintained about data-sharing and methodology followed in such cases where absolute confidentiality is not possible or required",
];

export default function EthicsCommitteePage() {
    return (
        <div className="space-y-12 max-w-7xl mx-auto">
            {/* Header Section */}
            <PageHeader
                title="Research Ethics Committee"
                description="Upholding integrity, protecting rights, and ensuring ethical standards in all research endeavors."
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
