"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  Users,
  Award,
  BookOpen,
  Microscope,
  Atom,
  Leaf,
  Dna,
  FlaskConical
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Guides", value: "02", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Registered", value: "09", icon: BookOpen, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Awarded", value: "06", icon: Award, color: "text-green-500", bg: "bg-green-50" },
];

const researchAreas = [
  { name: "Bioinformatics", icon: Dna },
  { name: "Molecular biology", icon: Atom },
  { name: "Genetic Engineering", icon: Microscope },
  { name: "Enzyme tech.", icon: FlaskConical },
  { name: "Fermentation", icon: FlaskConical },
  { name: "Biofuels", icon: Leaf },
  { name: "Environmental Biotechnology", icon: Leaf },
  { name: "Food Processing", icon: FlaskConical },
];

const scholars = [
  {
    slNo: "01",
    name: "Sangamesh K",
    guide: "Dr. Jayachandra S Y",
    coGuide: "-",
    usn: "CSN-2025040006",
    title: "Isolation of Siderophore producing microbial species/ Characterisation and applications",
    status: "Pursuing",
    category: "GM",
    remarks: "Fresh registration",
  },
  {
    slNo: "02",
    name: "Swapna Nikhil Inamdar",
    guide: "Dr. Bharati S Meti",
    coGuide: "-",
    usn: "CSN-2025040004",
    title: "Green synthesis of nanomaterials and their application in medical field",
    status: "Pursuing",
    category: "GM",
    remarks: "Fresh registration",
  },
  {
    slNo: "03",
    name: "Mahananda Math",
    guide: "Dr. Virupakshaiah D.B.M",
    coGuide: "Dr. Bharati S Meti",
    usn: "2BA16PGJ01",
    title: "Isolation and characterisation of Listeria monocytogenes from diary products and development of bacteriophages as biocontrol agents",
    status: "Pursuing",
    category: "GM",
    remarks: "Thesis submitted",
  },
  {
    slNo: "04",
    name: "Sushma Hallad",
    guide: "Dr. Bharati S Meti",
    coGuide: "Dr. Virupakshaiah D.B.M",
    usn: "2BA13PGN04",
    title: "Study on the production of Ethanol from Cellulosic material by Biochemical process",
    status: "Pursuing",
    category: "GM",
    remarks: "-",
  },
];

export default function BiotechResearchPage() {
  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-900 to-teal-800 p-8 md:p-12 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/50 border border-emerald-700/50 text-emerald-200 text-sm font-medium mb-4"
            >
              <Microscope className="w-4 h-4" />
              Research Centre
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
            >
              Biotechnology
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-emerald-100 max-w-xl text-lg leading-relaxed"
            >
              Advancing knowledge in Genetic Engineering, Bioinformatics, and Environmental Biotechnology through innovative research and development.
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
              <span className="w-2 h-8 rounded-full bg-emerald-500" />
              Research Areas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {researchAreas.map((area, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-emerald-600 group-hover:scale-110 transition-transform">
                    <area.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-slate-700 group-hover:text-emerald-900 transition-colors">
                    {area.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Right Column - Image or Contact */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative h-[400px] rounded-3xl overflow-hidden shadow-lg group"
          >
            <Image
              src="/biotech-dept.png"
              alt="Department of Biotechnology"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold mb-2">
                Campus
              </span>
              <h3 className="text-xl font-bold text-white">Department of Biotechnology</h3>
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
            <span className="w-2 h-8 rounded-full bg-orange-500" />
            Research Scholars
          </h2>
        </div>

        <div className="overflow-x-auto custom-scrollbar pb-2">
          <table className="w-full min-w-[1400px] text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap w-16 hidden md:table-cell">Sl.</th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">Scholar Name</th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">Guide</th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">Co-Guide</th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">USN</th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider min-w-[400px]">Research Title</th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {scholars.map((scholar) => (
                <tr key={scholar.usn} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 md:p-4 text-sm font-medium text-slate-500 whitespace-nowrap hidden md:table-cell">{scholar.slNo}</td>
                  <td className="p-3 md:p-4 text-sm font-bold text-slate-900 whitespace-nowrap">{scholar.name}</td>
                  <td className="p-3 md:p-4 text-sm text-slate-600 whitespace-nowrap">{scholar.guide}</td>
                  <td className="p-3 md:p-4 text-sm text-slate-600 whitespace-nowrap">{scholar.coGuide}</td>
                  <td className="p-3 md:p-4 text-sm font-mono text-slate-500 whitespace-nowrap">{scholar.usn}</td>
                  <td className="p-3 md:p-4 text-sm text-slate-700 leading-relaxed">{scholar.title}</td>
                  <td className="p-3 md:p-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {scholar.status}
                    </span>
                  </td>
                  <td className="p-3 md:p-4 text-sm text-slate-600 whitespace-nowrap">
                    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium",
                      scholar.remarks === "Thesis submitted" ? "bg-green-100 text-green-800" :
                        scholar.remarks === "Fresh registration" ? "bg-purple-100 text-purple-800" :
                          "bg-gray-100 text-gray-800"
                    )}>
                      {scholar.remarks === "-" ? "—" : scholar.remarks}
                    </span>
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
