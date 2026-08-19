"use client";

import * as React from "react";
import { ChevronDown, ChevronRight, ChevronUp, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * One entry of a list, with the chrome every list entry needs: where it sits,
 * move up/move down, and a delete that asks first.
 *
 * Up/down buttons rather than drag-and-drop on purpose. Drag is fiddly on a
 * touchpad, impossible to do accurately on a phone, and invisible to anyone
 * using a keyboard — and "move this one up" is the whole of what an Editor
 * wants. Reordering by button is also undoable by pressing the other button.
 */

export function RowCard({
  index,
  total,
  title,
  subtitle,
  onMove,
  onDelete,
  deleteLabel,
  collapsed,
  onToggle,
  highlight,
  children,
}: {
  index: number;
  total: number;
  /** What this row is, shown in the header — a name, a title, a department. */
  title: string;
  subtitle?: string;
  onMove?: (to: number) => void;
  onDelete?: () => void;
  /** Sentence shown in the confirm dialog, e.g. `“Dr. A. B. Patil” will be removed`. */
  deleteLabel?: string;
  /** Undefined for an always-open row; set to make the row collapsible. */
  collapsed?: boolean;
  onToggle?: () => void;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  const collapsible = collapsed !== undefined && onToggle !== undefined;

  return (
    <div
      className={cn(
        "rounded-lg border bg-card",
        highlight && "border-green-600/40 bg-green-50/40",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 px-4 py-3 md:px-5",
          !collapsed && "border-b",
        )}
      >
        <button
          type="button"
          onClick={onToggle}
          disabled={!collapsible}
          className={cn(
            "flex min-w-0 flex-1 items-center gap-2 text-left",
            collapsible && "hover:text-primary cursor-pointer transition-colors",
          )}
          {...(collapsible ? { "aria-expanded": !collapsed } : {})}
        >
          {/*
            A disclosure arrow, not a drag handle. The header used to wear a
            grip, which promised a drag this list deliberately does not support
            — an Editor pulls at it, nothing moves, and they conclude the tool
            is broken. Rows that cannot collapse get no arrow rather than a
            greyed one, because there is nothing to hint at.
          */}
          {collapsible ? (
            collapsed ? (
              <ChevronRight className="text-muted-foreground size-4 shrink-0" />
            ) : (
              <ChevronDown className="text-muted-foreground size-4 shrink-0" />
            )
          ) : null}
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium">
              {title.trim() || `Item ${index + 1}`}
            </span>
            {subtitle ? (
              <span className="text-muted-foreground block truncate text-xs">{subtitle}</span>
            ) : null}
          </span>
        </button>

        <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
          {index + 1}/{total}
        </span>

        {onMove ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onMove(index - 1)}
              disabled={index === 0}
              aria-label="Move up"
            >
              <ChevronUp />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onMove(index + 1)}
              disabled={index === total - 1}
              aria-label="Move down"
            >
              <ChevronDown />
            </Button>
          </>
        ) : null}

        {onDelete ? (
          <DeleteButton label={deleteLabel ?? title} onDelete={onDelete} />
        ) : null}
      </div>

      {collapsed ? null : <div className="space-y-4 p-4 md:p-5">{children}</div>}
    </div>
  );
}

export function DeleteButton({
  label,
  onDelete,
  noun = "item",
}: {
  label: string;
  onDelete: () => void;
  noun?: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={`Delete this ${noun}`}>
          <Trash2 className="text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this {noun}?</AlertDialogTitle>
          <AlertDialogDescription>
            {label.trim()
              ? `“${label.trim()}” will be removed once you publish.`
              : `This empty ${noun} will be removed once you publish.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep it</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
