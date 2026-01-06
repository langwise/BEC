"use client";

import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import {
  Settings,
  Cpu,
  Wind,
  Activity,
  Zap,
  CheckCircle2,
  ChevronRight,
  Factory,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const labFeatures = [
  {
    title: "Industrial Hydraulics",
    description:
      "State-of-the-art hydraulic training systems for understanding fluid power generation, control, and actuation in heavy machinery.",
    icon: Factory,
    color: "text-red-600",
    bg: "bg-red-50",
    borderColor: "border-red-100",
  },
  {
    title: "Pneumatics & Electro-Pneumatics",
    description:
      "Advanced pneumatic workstations for designing and simulating automated air-driven control circuits used in manufacturing lines.",
    icon: Wind,
    color: "text-sky-600",
    bg: "bg-sky-50",
    borderColor: "border-sky-100",
  },
  {
    title: "PLCs & Sensorics",
    description:
      "Hands-on training with IndroLogic L20 PLCs and diverse industrial sensors (inductive, capacitive, optical) for logic control.",
    icon: Cpu,
    color: "text-blue-600",
    bg: "bg-blue-50",
    borderColor: "border-blue-100",
  },
  {
    title: "Mechatronics & Robotics",
    description:
      "Integrated mechatronic systems combining mechanics, electronics, and computing for automated handling and assembly.",
    icon: Settings,
    color: "text-slate-600",
    bg: "bg-slate-50",
    borderColor: "border-slate-100",
  },
];

const objectives = [
  "To bridge the gap between industry requirements and academic curriculum through practical exposure.",
  "To provide hands-on training on industrial-grade automation components and systems.",
  "To facilitate research in the field of fluid power, automation, and control engineering.",
  "To offer certification programs for students and industry professionals in association with Bosch Rexroth.",
];

export default function BoschLabPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-orange-600 to-amber-600 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-orange-900/20 rounded-full blur-3xl" />

        <div className="relative z-10 p-10 md:p-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold uppercase tracking-wider mb-6">
              <Zap className="w-4 h-4" />
              Industry 4.0 Center
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              Bosch Rexroth Centre for <br className="hidden md:block" />{" "}
              Industrial Automation
            </h1>
            <p className="text-orange-50 max-w-3xl text-lg md:text-xl leading-relaxed">
              A premier collaborative facility bridging the gap between academia
              and industry through cutting-edge automation technology and
              practical training.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Features */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-orange-600 rounded-full" />
              Core Technologies
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {labFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className={cn(
                      "bg-white p-6 rounded-2xl border hover:shadow-lg transition-all duration-300 group",
                      feature.borderColor
                    )}
                  >
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                        feature.bg,
                        feature.color
                      )}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Sidebar / Objectives */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden"
          >
            {/* Decorative Gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 blur-xl" />

            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10 text-slate-900">
              <CheckCircle2 className="w-5 h-5 text-orange-600" />
              Key Objectives
            </h3>

            <ul className="space-y-4 relative z-10">
              {objectives.map((obj, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600">
                  <ChevronRight className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-slate-100 relative z-10">
              <div className="bg-orange-50/80 rounded-xl p-4 border border-orange-100">
                <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1">
                  Established In Collaboration With
                </div>
                <div className="text-lg font-bold text-slate-900">
                  Bosch Rexroth India Ltd.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
