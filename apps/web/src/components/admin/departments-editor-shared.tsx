"use client";

import type * as React from "react";
import { ExternalLink } from "lucide-react";
import { GuardedLink } from "@/components/admin/guarded-link";
import { Button } from "@/components/ui/button";
import type { DepartmentContent } from "@/content/schema/departments";

/**
 * What every tab of the departments editor is handed, and the one piece of
 * chrome they share. Its own module so the shell and the tabs can both reach it
 * without importing each other.
 */
export type TabProps = {
  /** The department as it currently stands in the form. */
  value: DepartmentContent;
  /** Replace one top-level field; `undefined` removes it. */
  set: <K extends keyof DepartmentContent>(
    field: K,
    value: DepartmentContent[K] | undefined,
  ) => void;
  /** Where an upload from this tab belongs, optionally in a named subfolder. */
  folder: (subfolder?: string) => string | undefined;
  /** This department's key in departments.json, e.g. "civil-engg". */
  contentKey: string;
};

/**
 * A pointer at the screen that owns something this one only frames.
 *
 * Faculty profiles and placement figures are edited elsewhere and are shown
 * here as a link rather than hidden: an Editor looking for them on the
 * department's own screen is looking in the obvious place, and being told where
 * they actually live is the answer they need.
 */
export function CrossLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <p className="text-muted-foreground rounded-lg border border-dashed p-4 text-sm leading-relaxed">
      {children}{" "}
      <Button asChild variant="link" className="h-auto p-0 text-sm">
        <GuardedLink href={href}>
          Open it <ExternalLink className="size-3.5" />
        </GuardedLink>
      </Button>
    </p>
  );
}
