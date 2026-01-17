"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  Users,
  Award,
  BookOpen,
  Radio, // Wireless/Antenna
  Cpu, // VLSI
  Mic, // Speech
  Network, // Networks
  Wifi, // Wireless
  Cloud, // Cloud
  Activity, // Signal
  CircuitBoard, // PCB/Embedded
  Zap, // Electronics
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Guides",
    value: "12",
    icon: Users,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "Registered",
    value: "29",
    icon: BookOpen,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    label: "Awarded",
    value: "12",
    icon: Award,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
];

const researchAreas = [
  { name: "VLSI & Embedded Systems", icon: Cpu },
  { name: "Wireless Networks", icon: Wifi },
  { name: "MEMS", icon: CircuitBoard },
  { name: "Speech Processing", icon: Mic },
  { name: "Computer Networks", icon: Network },
  { name: "Speech Signal Processing", icon: Activity },
  { name: "Wireless Sensor Networks", icon: Radio },
  { name: "Image Signal Processing", icon: Activity },
  { name: "Cloud Computing", icon: Cloud },
  { name: "Internet of Things", icon: Wifi },
];

const scholars = [
  {
    slNo: "1",
    name: "Mr. Adappa Angadi",
    usn: "2BA16PEJ04",
    guide: "Dr. Shridhar K.",
    year: "2014",
    topic: "Efficient structures for speech enhancement",
  },
  {
    slNo: "2",
    name: "Mr. Sanjay Choudry",
    usn: "2BA17PEA08",
    guide: "Dr. Shridhar K.",
    year: "2016",
    topic: "VLSI structures for speech enhancement",
  },
  {
    slNo: "3",
    name: "Mahaveer.J.Chougala",
    usn: "2BA18PEC04",
    guide: "Dr. Shridhar K.",
    year: "2018",
    topic: "Speech enhancement using Transform Domain Techniques",
  },
  {
    slNo: "4",
    name: "Rashmi Yala",
    usn: "2BA17PEA06",
    guide: "Dr. Shridhar K.",
    year: "2017",
    topic: "Speech Enhancement using Improved Speech estimation Techniques",
  },
  {
    slNo: "5",
    name: "Jyoti Katagi",
    usn: "2BA17PEA04",
    guide: "Dr. P.N.Kulkarni",
    year: "2016",
    topic:
      "Effect of monaural and binaural hearing aids on source localization",
  },
  {
    slNo: "6",
    name: "Aparna Chilakawad",
    usn: "2BA18PEC03",
    guide: "Dr. P.N.Kulkarni",
    year: "2017",
    topic:
      "Spectral Splitting of Speech signal to reduce effect of masking due to sensorinual using time varying filters for binaural dichotic presentation",
  },
  {
    slNo: "7",
    name: "Ujwala.Nandini",
    usn: "2BA18PEC02",
    guide: "Dr. B.G.Sheeparamatti",
    year: "2018",
    topic: "Optimization of Micro pressure sensor for performance enhancement",
  },
  {
    slNo: "8",
    name: "Vinay Shettar",
    usn: "2BA20PEC05",
    guide: "Dr. B.G.Sheeparamatti",
    year: "June 2022",
    topic:
      "Fabrication and characterization of novel thin, films for energy applications",
  },
  {
    slNo: "9",
    name: "Mallikarjun.Aralimarad",
    usn: "2BA23PEC02",
    guide: "Dr. Anand H.U.",
    year: "1st October 2024",
    topic:
      "Development of effective speech recognition system and vocabulary building for children with cochlear implants",
  },
  {
    slNo: "10",
    name: "Sunil kumar Hattarki",
    usn: "2BA 20PEC04",
    guide: "Dr. Chayalakshmi C.L.",
    year: "2021",
    topic: "High Resolution Broadband Beamforming based on the MVDR",
  },
  {
    slNo: "11",
    name: "Vinod Kumar M. Sonar",
    usn: "2BA 20PEC06",
    guide: "Dr. S. G. Kambalimath",
    year: "2021",
    topic: "AI based Programmable Digital Hearing AID",
  },
  {
    slNo: "12",
    name: "Achyut Yargal",
    usn: "2BA20PEC01",
    guide: "Dr. Kiran Y. Bendigeri",
    year: "2021",
    topic:
      "IoT Data Aggregation for vertical and Horizontal with Edge Computing",
  },
  {
    slNo: "13",
    name: "Basavaraj S. Soratur",
    usn: "2BA21PEC01",
    guide: "Dr. Mahabaleshwar S.K.",
    year: "2023",
    topic:
      "Design and Development of Contactless care system using RADAR Sensors for Differently abled and Geriatric People",
  },
  {
    slNo: "14",
    name: "Supriya Harlapur",
    usn: "2BA21PEC06",
    guide: "Dr. Mahabaleshwar S.K.",
    year: "2023",
    topic: "Design and Development of Data Management Techniques in IoT",
  },
  {
    slNo: "15",
    name: "Benazir Hifzurrehman Muntasher",
    usn: "2BA22PEC03",
    guide: "Dr. Mahabaleshwar S.K.",
    year: "May 2024",
    topic: "Efficient data security schemes for internet of medical things",
  },
  {
    slNo: "16",
    name: "Vinayak A. Telsang",
    usn: "2BA20PCS10",
    guide: "Dr. Mahabaleshwar S.K.",
    year: "2020",
    topic: "Data security management techniques for edge computing",
  },
  {
    slNo: "17",
    name: "Mr. Kotrappa B. Korlahalli",
    usn: "2BA23PEC01",
    guide: "Dr. Mahabaleshwar S.K.",
    year: "2023",
    topic:
      "Machine learning based algorithms to mitigate eavesdropping spoofing and privacy leakage attacks in IoT.",
  },
  {
    slNo: "18",
    name: "Mallikarjun Deshamuk",
    usn: "2BA20PEC02",
    guide: "Dr. Santosh Kumblawati",
    year: "2021",
    topic:
      "Optimizing Resource Utliazation and Enchnancing Performanance of LTE Advance Communication System.",
  },
  {
    slNo: "19",
    name: "Sudheendra Yalagur",
    usn: "2BA23PEC03",
    guide: "Dr. Santosh Kumblawati",
    year: "2023",
    topic:
      "Design and performance evaluation of smart and secured routing protocol for VANET's",
  },
  {
    slNo: "20",
    name: "Sneha Kotin",
    usn: "2BA21PEC05",
    guide: "Dr Ashok Sutagundar",
    year: "2023",
    topic: "Design Simulation and Optimization of MEMS based thin films",
  },
  {
    slNo: "21",
    name: "Prof. Rashmi Kittali",
    usn: "2BA21PEC",
    guide: "Dr Ashok Sutagundar",
    year: "2021",
    topic: "Structural Health Monitoring using AI and ML",
  },
  {
    slNo: "22",
    name: "Mr. Sadashiv R. Badiger",
    usn: "2BA21PEC04",
    guide: "Dr. Chayalakshmi C.L.",
    year: "2021",
    topic: "Data management techniques in edge computing for IoT applications",
  },
  {
    slNo: "23",
    name: "Mr. Shrishail Chamatagoudar",
    usn: "2BA22PEC02",
    guide: "Dr. Rajani S. Pujar Dr. Chayalakshmi C.L.",
    year: "2022",
    topic:
      "Artificial intelegence based resource management techniques for edge computing",
  },
];

export default function ECResearchPage() {
  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-amber-700 to-orange-800 p-8 md:p-12 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-red-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-800/50 border border-orange-700/50 text-orange-100 text-sm font-medium mb-4"
            >
              <Zap className="w-4 h-4" />
              Research Centre
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
            >
              Electronics & Communications
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-orange-50 max-w-xl text-lg leading-relaxed"
            >
              Innovating in Signal Processing, VLSI, and Communication Networks.
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
              <span className="w-2 h-8 rounded-full bg-amber-600" />
              Research Areas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {researchAreas.map((area, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-amber-50 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-amber-600 group-hover:scale-110 transition-transform">
                    <area.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-slate-700 group-hover:text-amber-900 transition-colors">
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
              src="/ec-dept.png"
              alt="Department of E&C Engineering"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold mb-2">
                Campus
              </span>
              <h3 className="text-xl font-bold text-white">
                Dept. of E & C Engineering
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
            <span className="w-2 h-8 rounded-full bg-amber-600" />
            Research Scholars
          </h2>
        </div>

        <div className="overflow-x-auto custom-scrollbar pb-2">
          <table className="w-full min-w-[1400px] text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap w-16 hidden md:table-cell">
                  Sl.
                </th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">
                  Name of the Student
                </th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  USN
                </th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">
                  Name of the Guide
                </th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  Year of Reg.
                </th>
                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider min-w-[400px]">
                  Research Topic
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {scholars.map((scholar, index) => (
                <tr
                  key={scholar.usn || index}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="p-3 md:p-4 text-sm font-medium text-slate-500 whitespace-nowrap hidden md:table-cell">
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
                  <td className="p-3 md:p-4 text-sm text-slate-600 whitespace-nowrap font-medium text-center bg-amber-50/50 rounded-lg mx-2">
                    {scholar.year}
                  </td>
                  <td className="p-3 md:p-4 text-sm text-slate-700 leading-relaxed">
                    {scholar.topic}
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
