"use client";

import { motion } from "motion/react";
import { useState } from "react";
import {
  Home,
  GraduationCap,
  Users,
  UsersRound,
  Calendar,
  FileText,
  Building2,
  Clipboard,
} from "lucide-react";

const menuItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About Department", icon: GraduationCap },
  { id: "faculty", label: "Teaching Faculty", icon: Users },
  { id: "staff", label: "Supporting Staff", icon: UsersRound },
  { id: "timetable", label: "Time Table", icon: Calendar },
  { id: "syllabus", label: "Scheme & Syllabus", icon: FileText },
  { id: "infrastructure", label: "Infrastructure", icon: Building2 },
  { id: "board", label: "Board of Studies", icon: Clipboard },
];

export default function DepartmentSidebar() {
  const [active, setActive] = useState("home");

  return (
    <aside className="w-full lg:w-64 bg-primary text-white shrink-0 lg:min-h-screen">
      <div className="lg:sticky lg:top-0">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-bold">Navigation</h2>
        </div>

        <nav>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActive(item.id)}
                className={`w-full text-left px-6 py-3 flex items-center gap-3 transition-all duration-300 border-l-4 
                ${
                  active === item.id
                    ? "bg-white/20 border-secondary"
                    : "border-transparent hover:bg-white/10 hover:border-white/30"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
