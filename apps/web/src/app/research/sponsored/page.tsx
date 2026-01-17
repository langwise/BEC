"use client";

import { motion } from "motion/react";
import {
  Calendar,
  IndianRupee,
  User,
  CheckCircle,
  Clock,
  Briefcase,
  Award,
  FileText,
  TrendingUp,
  Landmark,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Types
type Project = {
  id: number;
  scheme: string;
  title: string;
  amount: number;
  coordinator: string;
  status: "Completed" | "On going" | "Procurement of Equipments";
};

type YearGroup = {
  year: string;
  projects: Project[];
};

const years: YearGroup[] = [
  {
    year: "2018-19",
    projects: [
      {
        id: 1,
        scheme: "Establishing R&D Centres to Support Industries",
        title:
          "Solar PV Module testing, Installation, Training Certification and R&D",
        amount: 60.0,
        coordinator: "Dr. S. H. Jangamshetti",
        status: "Procurement of Equipments",
      },
      {
        id: 2,
        scheme: "Establishing R&D Centres to Support Industries",
        title: "Centre for Water and Waste Water Research",
        amount: 78.0,
        coordinator: "Dr. Veena Soraganvi",
        status: "On going",
      },
      {
        id: 3,
        scheme: "Establishing R&D Centres to Support Industries",
        title: "NABL Approved Food testing",
        amount: 105.0,
        coordinator: "Dr. Bharati Meti",
        status: "On going",
      },
    ],
  },
  {
    year: "2017-18",
    projects: [
      {
        id: 1,
        scheme: "K-BITS",
        title: "Biotechnology Skill Enhancement Program (BiSEP)",
        amount: 162.5,
        coordinator: "Dr. Virupakshayya DBM",
        status: "On going",
      },
      {
        id: 2,
        scheme: "AICTE-RPS",
        title:
          "Comprehensive experimental investigations on combustion performance & emission characteristics of Biodiesel/Oxygen compounds/Diesel fuel in a compression ignition engine",
        amount: 10.73,
        coordinator: "Dr. B. K. Venkanna",
        status: "On going",
      },
      {
        id: 3,
        scheme: "AICTE-RPS",
        title: "Resource Management in IoT",
        amount: 5.76,
        coordinator: "Dr. A. V. Sutagundar",
        status: "On going",
      },
    ],
  },
  {
    year: "2015-2016",
    projects: [
      {
        id: 1,
        scheme: "VGST K-FIST level-1",
        title: "Smart Composites Structures Research Centre (SCSRC)",
        amount: 20.0,
        coordinator: "Dr. S. B. Kerur",
        status: "On going",
      },
      {
        id: 2,
        scheme: "VGST",
        title:
          "Design & Development of Intelligent routing algorithms for vehicular Ad hoc networks",
        amount: 4.0,
        coordinator: "Dr. Mahabaleshwar S. K.",
        status: "Completed",
      },
      {
        id: 3,
        scheme: "NRB New Delhi",
        title:
          "Development of ultrafine grained (UPG) Al-mg SC alloys by Repetitive Corrugation and Straightening",
        amount: 12.88,
        coordinator: "Dr. S. A. Kori",
        status: "On going",
      },
      {
        id: 4,
        scheme: "SERB DST",
        title:
          "Sustainable Agriculture Empowerement & Equity Opportunities for Excellence in Science Programme",
        amount: 5.0,
        coordinator: "Dr. K. Y . Bendigeri",
        status: "On going",
      },
      {
        id: 5,
        scheme: "KSBDB GoK",
        title: "Bioenergy Research, Information & Demonstration Center",
        amount: 2.0,
        coordinator: "Dr. Bharati Meti",
        status: "On going",
      },
      {
        id: 6,
        scheme: "K-Bits GoK",
        title: "Incubation Network under NIAN",
        amount: 30.0,
        coordinator: "Prof. A. D. Devanagavi",
        status: "On going",
      },
    ],
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "Completed":
      return {
        color: "bg-emerald-100 text-emerald-800 border-emerald-200",
        icon: CheckCircle,
      };
    case "On going":
      return {
        color: "bg-amber-100 text-amber-800 border-amber-200",
        icon: TrendingUp,
      };
    default:
      return {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: Clock,
      };
  }
};

export default function SponsoredResearchPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700/50 border border-slate-600 backdrop-blur-md text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Landmark className="w-4 h-4" />
            Research Grants
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white to-slate-300"
          >
            Sponsored Research
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 max-w-2xl text-lg leading-relaxed"
          >
            Pioneering initiatives funded by premier government bodies and
            industry partners, driving innovation across disciplines.
          </motion.p>
        </div>
      </div>

      {/* Timelines */}
      <div className="space-y-16">
        {years.map((yearGroup, yearIndex) => (
          <motion.section
            key={yearGroup.year}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + yearIndex * 0.1 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-linear-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/20 transform -rotate-3">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Academic Year {yearGroup.year}
                </h2>
                <p className="text-slate-500 font-medium">
                  Research Projects & Grants
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {yearGroup.projects.map((project, index) => {
                const statusConfig = getStatusConfig(project.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <motion.div
                    key={project.id}
                    whileHover={{ y: -5 }}
                    className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-amber-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="p-6 md:p-8 flex flex-col h-full">
                      {/* Header tags */}
                      <div className="flex flex-wrap gap-2 mb-4 justify-between items-start">
                        <Badge
                          variant="secondary"
                          className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200 whitespace-normal h-auto text-left max-w-full"
                        >
                          <Briefcase className="w-3 h-3 mr-1.5 shrink-0" />
                          {project.scheme}
                        </Badge>
                        <Badge
                          className={cn("pl-2 pr-3 py-1 whitespace-nowrap shrink-0", statusConfig.color)}
                        >
                          <StatusIcon className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                          {project.status}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-900 mb-6 leading-tight group-hover:text-orange-700 transition-colors">
                        {project.title}
                      </h3>

                      {/* Footer Info */}
                      <div className="mt-auto pt-6 border-t border-slate-50 grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-wider mb-1.5">
                            <User className="w-3 h-3 mr-1.5" />
                            Coordinator
                          </div>
                          <div className="font-semibold text-slate-700 text-sm">
                            {project.coordinator}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end text-slate-400 text-xs font-bold uppercase tracking-wider mb-1.5">
                            <Award className="w-3 h-3 mr-1.5" />
                            Grant Amount
                          </div>
                          <div className="font-bold text-2xl text-slate-900 flex items-center justify-end">
                            <IndianRupee className="w-4 h-4 mr-0.5 text-slate-400" />
                            {project.amount}
                            <span className="text-sm font-medium text-slate-500 ml-1">
                              Lakhs
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
