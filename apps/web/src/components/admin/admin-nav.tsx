"use client";

import { usePathname } from "next/navigation";
import { GuardedLink } from "@/components/admin/guarded-link";
import { cn } from "@/lib/utils";
import { ADMIN_SECTIONS } from "@/lib/admin/sections";

/**
 * The Admin's section list. Sections whose slice has not landed yet are shown
 * but not linkable, so Editors can see what the finished tool will cover.
 */
export function AdminNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1" aria-label="Admin sections">
      {ADMIN_SECTIONS.map(({ href, label, icon: Icon, status }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);

        if (status === "planned") {
          return (
            <span
              key={href}
              aria-disabled="true"
              className="text-muted-foreground/60 flex items-center gap-3 rounded-md px-3 py-2 text-sm"
            >
              <Icon className="size-4 shrink-0" />
              <span className="flex-1 truncate">{label}</span>
              <span className="text-[10px] font-medium uppercase tracking-wide">
                Soon
              </span>
            </span>
          );
        }

        return (
          <GuardedLink
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              active
                ? "bg-primary/10 text-primary font-medium"
                : "text-foreground/80 hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className="flex-1 truncate">{label}</span>
          </GuardedLink>
        );
      })}
    </nav>
  );
}
