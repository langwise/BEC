"use client";

import { PhotoGallery } from "@/components/common/photo-gallery";
import { assetsUnder } from "@/lib/assets";
import { motion } from "motion/react";
import {
  Bot,
  Glasses,
  Boxes,
  Zap,
  CheckCircle2,
  ChevronRight,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";

const labFeatures = [
  {
    title: "Articulated Robotic Arms",
    description:
      "AI-based Mitsubishi 6-DoF articulated robots with a 6 kg payload and VR set-up for programming, manipulation, and pick-and-place experiments.",
    icon: Bot,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    borderColor: "border-indigo-100",
  },
  {
    title: "SCARA Robotics",
    description:
      "An AI-based Mitsubishi 2-DoF, 3 kg payload SCARA robot with VR set-up for high-speed assembly, sorting, and precision positioning tasks.",
    icon: Workflow,
    color: "text-blue-600",
    bg: "bg-blue-50",
    borderColor: "border-blue-100",
  },
  {
    title: "Modular Swarm Robots",
    description:
      "Smorphi modular, shape-shifting robots that reconfigure into multiple forms, enabling hands-on study of swarm behaviour and modular robotics.",
    icon: Boxes,
    color: "text-violet-600",
    bg: "bg-violet-50",
    borderColor: "border-violet-100",
  },
  {
    title: "VR & Simulation Workstations",
    description:
      "Networked computing workstations paired with virtual-reality set-ups for robot simulation, programming, and immersive design before live deployment.",
    icon: Glasses,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    borderColor: "border-cyan-100",
  },
];

const objectives = [
  "To provide students with hands-on exposure to industrial-grade robotic manipulators and automation systems.",
  "To foster research and innovation in robotics, artificial intelligence, and human-robot interaction.",
  "To support project work and skill development through articulated, SCARA, and modular robotic platforms.",
  "To bridge classroom learning with industry practice through virtual-reality-assisted robot programming.",
];

const galleryImages = assetsUnder("research/labs/robotics/").map(
  (src, index) => ({
    src,
    alt: `Centre of Excellence in Robotics at Basaveshwar Engineering College ${
      index + 1
    }`,
  }),
);

export default function RoboticsLabPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-900/20 rounded-full blur-3xl" />

        <div className="relative z-10 p-10 md:p-16 text-center">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold uppercase tracking-wider mb-6">
              <Zap className="w-4 h-4" />
              Centre of Excellence
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              Centre of Excellence <br className="hidden md:block" /> in Robotics
            </h1>
            <p className="text-indigo-50 max-w-3xl text-lg md:text-xl leading-relaxed">
              A dedicated facility equipping students and researchers with
              industrial-grade robotic manipulators, modular robots, and
              virtual-reality-assisted programming for the next generation of
              automation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Features */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-indigo-600 rounded-full" />
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
                      feature.borderColor,
                    )}
                  >
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                        feature.bg,
                        feature.color,
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
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden"
          >
            {/* Decorative Gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 blur-xl" />

            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10 text-slate-900">
              <CheckCircle2 className="w-5 h-5 text-indigo-600" />
              Key Objectives
            </h3>

            <ul className="space-y-4 relative z-10">
              {objectives.map((obj, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600">
                  <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-slate-100 relative z-10">
              <div className="bg-indigo-50/80 rounded-xl p-4 border border-indigo-100">
                <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
                  Equipped With
                </div>
                <div className="text-lg font-bold text-slate-900">
                  Mitsubishi Articulated &amp; SCARA Robots
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <motion.div
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-indigo-600 rounded-full" />
            Inside the Lab
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-3xl mb-6">
            A glimpse of the robotic manipulators, modular robots, and
            workstations at the Centre of Excellence in Robotics.
          </p>
          <PhotoGallery images={galleryImages} />
        </motion.div>
      )}
    </div>
  );
}
