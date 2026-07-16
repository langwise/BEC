"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
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
  Briefcase,
  Handshake,
  Award,
  Image as ImageIcon,
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
  "briefcase": Briefcase,
  "handshake": Handshake,
  "award": Award,
  "image": ImageIcon,
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
  const stripRef = useRef<HTMLDivElement>(null);
  const activeChipRef = useRef<HTMLButtonElement>(null);

  // Keep the active chip centred in the mobile strip. Scrolls the strip only —
  // scrollIntoView would drag the page vertically as a side effect.
  useEffect(() => {
    const strip = stripRef.current;
    const chip = activeChipRef.current;
    if (!strip || !chip) return;
    strip.scrollTo({
      left: Math.max(0, chip.offsetLeft - (strip.clientWidth - chip.offsetWidth) / 2),
      behavior: "smooth",
    });
  }, [activeId]);

  return (
    <>
      {/* Mobile / tablet: horizontal strip pinned under the header */}
      <nav className="sticky top-[var(--header-h)] z-30 -mx-4 border-b border-stone-200 bg-background/90 backdrop-blur lg:hidden">
        <div
          ref={stripRef}
          className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => {
            const Icon = iconMap[item.icon] || Home;
            const isActive = activeId === item.id;

            return (
              <button
                key={item.id}
                ref={isActive ? activeChipRef : undefined}
                type="button"
                onClick={() => onSelect(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-primary bg-primary text-white"
                    : "border-stone-200 bg-white text-gray-600 hover:border-primary/30 hover:text-primary",
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-gray-400")} />
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop: vertical menu, capped to the viewport so long menus stay reachable */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-[calc(var(--header-h)+1rem)] flex max-h-[calc(100svh-var(--header-h)-2rem)] flex-col">
          <h2 className="mb-4 shrink-0 px-2 text-sm font-bold uppercase tracking-wider text-primary">
            Department Menu
          </h2>

          <nav className="flex min-h-0 flex-1 flex-col space-y-1 overflow-y-auto overscroll-contain pr-1">
            {items.map((item) => {
              const Icon = iconMap[item.icon] || Home; // Fallback to Home if icon not found
              const isActive = activeId === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group flex shrink-0 items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 w-full text-left",
                    isActive
                      ? "bg-primary text-white shadow-md shadow-orange-200"
                      : "text-gray-600 hover:bg-orange-50 hover:text-primary"
                  )}
                >
                  <div className="flex items-center gap-3">
                      <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : "text-gray-400 group-hover:text-primary")} />
                      <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="dept-nav-indicator"
                      className="w-1.5 h-1.5 rounded-full bg-white shrink-0"
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
