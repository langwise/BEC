"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
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
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-24">
        <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 px-2">
            Department Menu
        </h2>
        
        <nav className="flex flex-col space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => setActive(item.id)}
                className={cn(
                  "group flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 w-full text-left",
                  isActive
                    ? "bg-primary text-white shadow-md shadow-orange-200"
                    : "text-gray-600 hover:bg-orange-50 hover:text-primary"
                )}
              >
                <div className="flex items-center gap-3">
                    <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-gray-400 group-hover:text-primary")} />
                    <span>{item.label}</span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="dept-nav-indicator"
                    className="w-1.5 h-1.5 rounded-full bg-white"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Quick Contact / Info Card could go here similar to Placements */}
      </div>
    </aside>
  );
}
