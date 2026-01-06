"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  Users,
  Award,
  BookOpen,
  Settings, // Industrial/Mechanical
  Factory, // Manufacturing
  Truck, // Supply Chain
  Wrench, // Metal Machining
  Leaf, // Bio Mass/Green
  BarChart, // Strategic Planning
  Zap, // Energy Audit
  Cpu, // CAD/CAM
  Cog, // General Eng
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Guides",
    value: "06",
    icon: Users,
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    label: "Registered",
    value: "13",
    icon: BookOpen,
    color: "text-slate-600",
    bg: "bg-slate-50",
  },
  {
    label: "Awarded",
    value: "12",
    icon: Award,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const researchAreas = [
  { name: "Industrial Engg. & Management", icon: Settings },
  { name: "Material science", icon: Cog },
  { name: "Metal Machining", icon: Wrench },
  { name: "Energy Audit & Management", icon: Zap },
  { name: "Strategic Planning", icon: BarChart },
  { name: "Supply Chain and Management", icon: Truck },
  { name: "Scheduling", icon: BarChart },
  { name: "Bio Mass", icon: Leaf },
  { name: "CAD/CAM, FMS", icon: Cpu },
];

const scholars = [
  {
    slNo: "1",
    name: "H. R. Patil",
    usn: "2BA16PMJ01",
    guide: "Dr. C. M. Javalagi",
    coGuide: "--",
    title:
      "Modelling and analyses of green supply chain management (GSCM) issues and practices in process industries.",
    status: "Comprehensive Viva -Voce completed",
    category: "GM",
  },
  {
    slNo: "2",
    name: "Bhuvaneshwari Alias Sunita Kulkarni",
    usn: "2BA15PMJ11",
    guide: "Dr. V. S. Puranik",
    coGuide: "--",
    title:
      "Investigating the status of lean manufacturing practices in SMEs and development of a conceptual implementation model for production performance evaluation.",
    status: "Submitted",
    category: "GM",
  },
  {
    slNo: "3",
    name: "Parasuram Madar",
    usn: "2BA17PMA04",
    guide: "Dr. S. T. Dundur",
    coGuide: "--",
    title:
      "An investigation into the use age of Argo based trash as the alternative fuel for all season co-generation of electricity in sugar industries.",
    status: "Course work completed",
    category: "SC",
  },
  {
    slNo: "4",
    name: "S S Davanageri",
    usn: "2BA17PMA15",
    guide: "Dr. S. T. Dundur",
    coGuide: "--",
    title:
      "Finite element analysis of machining of work material synthesized from metal matrix composites from micro photographs",
    status: "Course work completed",
    category: "GM",
  },
  {
    slNo: "5",
    name: "Mahesh Latte",
    usn: "2BA18PIP03",
    guide: "Dr. C. M. Javalagi",
    coGuide: "--",
    title:
      "Analysis of key supply chain drivers in medium and small scale industries. (MSME's)",
    status: "Open Seminar I and II completed",
    category: "GM",
  },
  {
    slNo: "6",
    name: "Mallik Bhagawan",
    usn: "2BA18PIP02",
    guide: "Dr. S. T. Dundur",
    coGuide: "--",
    title:
      "An investigation on the characteristics associated with cryogenic machining of elastomers",
    status: "Open Seminar I and II completed",
    category: "OBC",
  },
  {
    slNo: "7",
    name: "Rajat Acharya",
    usn: "2BA16PMJ07",
    guide: "Dr. C. M. Javalagi",
    coGuide: "--",
    title:
      "Lean Supply Chain key performance indicator Analysis in Small and Medium Scale Industries",
    status: "Comprehensive Viva -Voce completed",
    category: "GM",
  },
  {
    slNo: "8",
    name: "Taware Shree Dnyanoba",
    usn: "2BA13PMN09",
    guide: "Dr. D. G. Mallapur",
    coGuide: "--",
    title:
      "Aluminium Die Casting Simulation Modeling for Cost benefit Analysis",
    status: "Course work completed",
    category: "OBC",
  },
  {
    slNo: "9",
    name: "G.H.Rathod",
    usn: "2BA10PMN01",
    guide: "Dr. V. S. Puranik",
    coGuide: "--",
    title:
      "A new comprehensive methodology for enabling Environmentally conscious design and assessment of sustainability in an Indian Manufacturing organization",
    status: "Comprehensive Viva -Voce completed",
    category: "ST",
  },
];

export default function IPResearchPage() {
  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-red-900 to-slate-900 p-8 md:p-12 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-red-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-800/50 border border-red-700/50 text-red-100 text-sm font-medium mb-4"
            >
              <Factory className="w-4 h-4" />
              Research Centre
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
            >
              Industrial & Production Engineering
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-100 max-w-xl text-lg leading-relaxed"
            >
              Driving efficiency in Manufacturing, Supply Chain, and Strategic
              Management.
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
              <span className="w-2 h-8 rounded-full bg-red-600" />
              Research Areas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {researchAreas.map((area, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-red-50 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-red-600 group-hover:scale-110 transition-transform">
                    <area.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-slate-700 group-hover:text-red-900 transition-colors">
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
              src="/ip-dept.png"
              alt="Department of Industrial & Production Engineering"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold mb-2">
                Campus
              </span>
              <h3 className="text-xl font-bold text-white">
                Dept. of I & P Engineering
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
            <span className="w-2 h-8 rounded-full bg-red-600" />
            Research Scholars
          </h2>
        </div>

        <div className="overflow-x-auto custom-scrollbar pb-2">
          <table className="w-full min-w-[1400px] text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap w-16">
                  Sl.
                </th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">
                  Research Scholar
                </th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  USN
                </th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">
                  Name of the Guide
                </th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[150px]">
                  Co-Guide
                </th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider min-w-[400px]">
                  Title of Ph.D.
                </th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  Current Status
                </th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  Category
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {scholars.map((scholar, index) => (
                <tr
                  key={scholar.usn || index}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="p-3 md:p-4 text-sm font-medium text-slate-500 whitespace-nowrap">
                    {scholar.slNo}
                  </td>
                  <td className="p-3 md:p-4 text-sm font-bold text-slate-900 whitespace-nowrap">
                    {scholar.name}
                  </td>
                  <td className="p-3 md:p-4 text-sm font-mono text-slate-500 whitespace-nowrap">
                    {scholar.usn}
                  </td>
                  <td className="p-3 md:p-4 text-sm text-slate-600 whitespace-nowrap">
                    {scholar.guide}
                  </td>
                  <td className="p-3 md:p-4 text-sm text-slate-500 whitespace-nowrap text-center">
                    {scholar.coGuide}
                  </td>
                  <td className="p-3 md:p-4 text-sm text-slate-700 leading-relaxed">
                    {scholar.title}
                  </td>
                  <td className="p-3 md:p-4 text-sm text-slate-600 whitespace-nowrap">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium",
                        scholar.status.toLowerCase().includes("completed")
                          ? "bg-green-100 text-green-800"
                          : scholar.status.toLowerCase().includes("submitted")
                          ? "bg-blue-100 text-blue-800"
                          : "bg-orange-100 text-orange-800"
                      )}
                    >
                      {scholar.status}
                    </span>
                  </td>
                  <td className="p-3 md:p-4 text-sm text-slate-600 whitespace-nowrap font-medium text-center">
                    {scholar.category}
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
