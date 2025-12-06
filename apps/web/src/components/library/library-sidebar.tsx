// File: src/components/library/library-sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BookOpen, 
  Users, 
  Building2, 
  Globe, 
  Link as LinkIcon, 
  Phone 
} from "lucide-react";
import { cn } from "@/lib/utils";

const libraryLinks = [
  {
    href: "/facilities/library",
    label: "Library Home",
    icon: BookOpen,
  },
  {
    href: "/facilities/library/about",
    label: "About Library",
    icon: BookOpen,
  },
  {
    href: "/facilities/library/staff",
    label: "Staff Profile",
    icon: Users,
  },
  {
    href: "/facilities/library/supporting-staff",
    label: "Supporting Staff",
    icon: Users,
  },
  {
    href: "/facilities/library/infrastructure",
    label: "Infrastructure",
    icon: Building2,
  },
  {
    href: "/facilities/library/e-resources-paid",
    label: "E-Resources (Paid)",
    icon: Globe,
  },
  {
    href: "/facilities/library/e-resources-free",
    label: "E-Resources (Free)",
    icon: Globe,
  },
  {
    href: "/facilities/library/useful-links",
    label: "Useful Links",
    icon: LinkIcon,
  },
  {
    href: "/facilities/library/contact",
    label: "Contact",
    icon: Phone,
  },
];

export function LibrarySidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-white border border-stone-200 rounded-lg overflow-hidden sticky top-24">
      <div className="bg-gradient-to-r from-primary to-accent p-4">
        <h3 className="text-lg font-bold text-white">Library Navigation</h3>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {libraryLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-700 hover:bg-stone-50 hover:text-primary"
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}