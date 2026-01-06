"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  Users,
  Award,
  BookOpen,
  Atom, // Physics
  Zap, // Magnetoelectric/Sensors
  Activity, // Spectroscopy
  Layers, // Material Science
  Microscope, // General Science
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Guides",
    value: "02",
    icon: Users,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    label: "Registered",
    value: "02",
    icon: BookOpen,
    color: "text-fuchsia-600",
    bg: "bg-fuchsia-50",
  },
  // Awarded not shown, omitting to keep accurate to source image or can assume 0.
];

const researchAreas = [
  { name: "Laser Spectroscopy", icon: Activity },
  { name: "Sensors for Biodiesel Applications", icon: Zap },
  { name: "Magnetoelectric composites", icon: Atom },
  { name: "Material Science", icon: Layers },
];

const scholars = [
  {
    slNo: "1",
    guide: "Prof. S.S. Bopardekar",
    usn: "--",
    scholar: "Student Details N/A", // The image format is inconsistent here, it lists "Registered Student Details" : "1. Prof S.S. Bopardekar...". This implies Prof Bopardekar IS the scholar or the guide leading the detail?
    // Wait, looking closer at the image: "03 Registered Students Details : 1. Prof. S.S. Bopardekar... Open seminar 1 completed..."
    // Usually Profs are guides. But here it's listed under "Registered Students Details".
    // AND it says "Registered in the year 2013". A Professor might be doing Ph.D. as a candidate.
    // I will list "Prof. S.S. Bopardekar" as the Scholar Name.
    // The Guide is not explicitly listed next to him in this specific snippet format, or he is the scholar.
    // Given the text "Registered in the year 2013", it strongly suggests he is the scholar.
    title:
      "Open seminar 1 completed on 22th May 2025. Comprehensive Viva-Voce completed on 2019.",
    status: "Registered",
    remarks: "Registered in the year 2013",
  },
];

export default function PhysicsResearchPage() {
  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-purple-800 to-fuchsia-900 p-8 md:p-12 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-700/50 border border-purple-600/50 text-purple-100 text-sm font-medium mb-4"
            >
              <Atom className="w-4 h-4" />
              Research Centre
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
            >
              Department of Physics
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-purple-100 max-w-xl text-lg leading-relaxed"
            >
              Advanced research in Material Science, Spectroscopy, and
              Composites.
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
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                      stat.bg
                    )}
                  >
                    <Icon className={cn("w-6 h-6", stat.color)} />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                    {stat.label}
                  </div>
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
              <span className="w-2 h-8 rounded-full bg-purple-600" />
              Research Areas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {researchAreas.map((area, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-purple-50 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-purple-600 group-hover:scale-110 transition-transform">
                    <area.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-slate-700 group-hover:text-purple-900 transition-colors">
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
              src="/physics-dept.png"
              alt="Department of Physics"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold mb-2">
                Campus
              </span>
              <h3 className="text-xl font-bold text-white">
                Department of Physics
              </h3>
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
            <span className="w-2 h-8 rounded-full bg-purple-600" />
            Research Scholars
          </h2>
        </div>

        <div className="overflow-x-auto custom-scrollbar pb-2">
          <table className="w-full min-w-[1000px] text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap w-16">
                  Sl.
                </th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">
                  Scholar Name
                </th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider min-w-[400px]">
                  Details / Status
                </th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {scholars.map((scholar, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="p-3 md:p-4 text-sm font-medium text-slate-500 whitespace-nowrap">
                    {scholar.slNo}
                  </td>
                  <td className="p-3 md:p-4 text-sm font-bold text-slate-900 whitespace-nowrap">
                    {scholar.guide}
                  </td>
                  <td className="p-3 md:p-4 text-sm text-slate-700 leading-relaxed">
                    {scholar.title}
                  </td>
                  <td className="p-3 md:p-4 text-sm text-slate-600 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                      {scholar.remarks}
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
