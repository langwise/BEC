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
  Book,
  Target,
  Eye,
  LucideIcon,
} from "lucide-react";

// Map string identifiers to icon components
const iconMap: Record<string, LucideIcon> = {
  "home": Home,
  "graduation-cap": GraduationCap,
  "users": Users,
  "users-round": UsersRound,
  "calendar": Calendar,
  "file-text": FileText,
  "building-2": Building2,
  "clipboard": Clipboard,
  "book": Book,
  "target": Target,
  "eye": Eye,
};

interface SidebarItem {
    id: string;
    label: string;
    icon: string;
}

interface DepartmentSidebarProps {
    items?: SidebarItem[];
    activeId: string;
    onSelect: (id: string) => void;
}

const defaultItems: SidebarItem[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "about", label: "About Department", icon: "graduation-cap" },
  { id: "faculty", label: "Teaching Faculty", icon: "users" },
  { id: "staff", label: "Supporting Staff", icon: "users-round" },
  { id: "timetable", label: "Time Table", icon: "calendar" },
  { id: "syllabus", label: "Scheme & Syllabus", icon: "file-text" },
  { id: "infrastructure", label: "Infrastructure", icon: "building-2" },
  { id: "board", label: "Board of Studies", icon: "clipboard" },
];

export default function DepartmentSidebar({ items = defaultItems, activeId, onSelect }: DepartmentSidebarProps) {
  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-24">
        <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 px-2">
            Department Menu
        </h2>
        
        <nav className="flex flex-col space-y-1">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || Home; // Fallback to Home if icon not found
            const isActive = activeId === item.id;
            
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => onSelect(item.id)}
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
