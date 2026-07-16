"use client";

import { useRef } from "react";
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

export const DEPT_PANEL_ID = "dept-panel";

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

/** The sections are one panel swapped in place, so this is a tab interface:
 *  roving tabindex, arrow/Home/End keys, and automatic activation per APG. */
function TabList({
  items,
  activeId,
  onSelect,
  idPrefix,
  variant,
  className,
}: DepartmentSidebarProps & {
  items: SidebarItem[];
  idPrefix: string;
  variant: "sidebar" | "chip";
  className?: string;
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const index = items.findIndex((item) => item.id === activeId);
    let next: number;
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        next = (index + 1) % items.length;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        next = (index - 1 + items.length) % items.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = items.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    const nextId = items[next].id;
    onSelect(nextId);
    refs.current[nextId]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-orientation={variant === "sidebar" ? "vertical" : "horizontal"}
      aria-label="Department sections"
      onKeyDown={handleKeyDown}
      className={className}
    >
      {items.map((item) => {
        const Icon = iconMap[item.icon] || Home; // Fallback to Home if icon not found
        const isActive = activeId === item.id;

        return (
          <motion.button
            key={item.id}
            ref={(el) => {
              refs.current[item.id] = el;
            }}
            id={`${idPrefix}-${item.id}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={DEPT_PANEL_ID}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(item.id)}
            className={cn(
              "group flex shrink-0 items-center text-sm font-medium transition-all duration-200",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              variant === "sidebar"
                ? "w-full justify-between rounded-lg px-4 py-3 text-left"
                : "gap-2 rounded-full border px-3.5 py-2",
              isActive
                ? variant === "sidebar"
                  ? "bg-primary text-white shadow-md shadow-orange-200"
                  : "border-primary bg-primary text-white"
                : variant === "sidebar"
                  ? "text-gray-600 hover:bg-orange-50 hover:text-primary"
                  : "border-stone-200 bg-white text-gray-600 hover:border-primary/40 hover:text-primary",
            )}
          >
            <div className={cn("flex min-w-0 items-center", variant === "sidebar" ? "gap-3" : "gap-2")}>
                <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : "text-gray-400 group-hover:text-primary")} />
                <span className={variant === "sidebar" ? "truncate" : "whitespace-nowrap"}>
                  {item.label}
                </span>
            </div>
            {variant === "sidebar" && isActive && (
              <motion.div
                layoutId="dept-nav-indicator"
                className="w-1.5 h-1.5 rounded-full bg-white shrink-0 ml-2"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

export default function DepartmentSidebar({ items = defaultItems, activeId, onSelect }: DepartmentSidebarProps) {
  return (
    <>
      {/* Mobile / tablet: every section visible at once, wrapped instead of stacked */}
      <TabList
        items={items}
        activeId={activeId}
        onSelect={onSelect}
        idPrefix="dept-tab-compact"
        variant="chip"
        className="flex flex-wrap gap-2 lg:hidden"
      />

      {/* Desktop: vertical menu, capped to the viewport so long menus stay reachable */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-[calc(var(--header-h)+1rem)] flex max-h-[calc(100svh-var(--header-h)-2rem)] flex-col">
          <h2 className="mb-4 shrink-0 px-2 text-sm font-bold uppercase tracking-wider text-primary">
            Department Menu
          </h2>

          <TabList
            items={items}
            activeId={activeId}
            onSelect={onSelect}
            idPrefix="dept-tab"
            variant="sidebar"
            className={cn(
              "flex min-h-0 flex-1 flex-col space-y-1 overflow-y-auto overscroll-contain pr-2",
              // Force a persistent scrollbar: macOS overlay scrollbars fade out, which
              // leaves a capped menu looking like it simply ends.
              "[scrollbar-width:thin] [scrollbar-color:#d6d3d1_transparent]",
              "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent",
              "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-stone-300",
            )}
          />
        </div>
      </aside>
    </>
  );
}
