"use client";

import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import { User2, CheckCircle2, Scale, Shield, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const committeeMembers = [
  {
    name: "Dr. S. S. Injaganeri",
    designation: "Principal",
    affiliation: "BEC Bagalkote",
    role: "Chairman",
    bg: "bg-orange-50",
    color: "text-orange-600",
  },
  {
    name: "Dr. Veena S. Soraganvi",
    designation: "Dean (R&D)",
    affiliation: "BEC Bagalkote",
    role: "Member",
    bg: "bg-slate-50",
    color: "text-slate-600",
  },
  {
    name: "Dr. P. N. Kulkarni",
    designation: "Dean (Academic)",
    affiliation: "BEC Bagalkote",
    role: "Member",
    bg: "bg-slate-50",
    color: "text-slate-600",
  },
  {
    name: "Dr. Bharti S. Meti",
    designation: "Professor & Head",
    affiliation: "Biotechnology",
    role: "Member",
    bg: "bg-slate-50",
    color: "text-slate-600",
  },
  {
    name: "Dr. S. G. Kambalimath",
    designation: "Assoc. Professor",
    affiliation: "ECE Dept. BEC Bagalkote",
    role: "Member Secretary",
    bg: "bg-amber-50",
    color: "text-amber-600",
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
    <div className="space-y-12">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-orange-600 to-amber-600 p-10 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold uppercase tracking-wider mb-4">
            <Scale className="w-4 h-4" />
            Integrity & Compliance
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Research Ethics Committee
          </h1>
          <p className="text-orange-50 max-w-2xl mx-auto text-lg">
            Upholding integrity, protecting rights, and ensuring ethical
            standards in all research endeavors.
          </p>
        </motion.div>
      </div>

      {/* Members Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {committeeMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group h-full"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col items-center text-center hover:shadow-xl hover:shadow-orange-100/50 hover:border-orange-100 transition-all duration-300 h-full relative overflow-hidden">
                <div className="absolute top-0 w-full h-1 bg-linear-to-r from-orange-500 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                <div
                  className={cn(
                    "w-20 h-20 rounded-2xl mb-6 flex items-center justify-center transition-all duration-300 group-hover:scale-110",
                    member.bg
                  )}
                >
                  <User2
                    className={cn("w-10 h-10 transition-colors", member.color)}
                  />
                </div>

                <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">
                  {member.name}
                </h3>
                <div className="text-slate-600 font-medium text-sm mb-1">
                  {member.designation}
                </div>
                <div className="text-slate-400 text-sm mb-6">
                  {member.affiliation}
                </div>

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
          <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <Shield className="w-6 h-6 text-orange-600" />
            Committee Mandate
          </h2>

          <div className="space-y-4">
            {rolesAndResponsibilities.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-orange-100 transition-colors"
              >
                <div className="shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-orange-500" />
                </div>
                <p className="text-slate-700 leading-relaxed text-sm md:text-base">
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
