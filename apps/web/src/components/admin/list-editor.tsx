"use client";

import * as React from "react";
import { ChevronsDownUp, ChevronsUpDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RowCard } from "@/components/admin/row-card";
import { move, patchAt, removeAt, withKey, type Keyed } from "@/lib/admin/rows";

/**
 * A list of things an Editor can add to, reorder and delete from — the shape
 * almost every content array takes. Each editor supplies only the fields inside
 * a row; add/move/delete/collapse are the same everywhere and belong here.
 *
 * Long lists (the 16 HoDs, the 14 Board members) start collapsed, because a
 * screen that opens on 16 expanded cards is a screen nobody scrolls to the
 * bottom of. Short ones start open, because collapsing three slides just adds
 * a click before any work can happen.
 */

/** Above this many rows, the list opens collapsed. */
const COLLAPSE_THRESHOLD = 6;

export type ListEditorProps<T extends object> = {
  items: Keyed<T>[];
  onChange: (next: Keyed<T>[]) => void;
  /** A blank row, used by "Add". */
  make: () => T;
  /** Singular noun for buttons and dialogs, e.g. "slide", "dean". */
  noun: string;
  /** Row header text. Falls back to "Item n" when blank. */
  title: (item: T, index: number) => string;
  subtitle?: (item: T, index: number) => string | undefined;
  /** The fields inside one row. */
  children: (item: T, patch: (values: Partial<T>) => void, index: number) => React.ReactNode;
  /** Shown in place of the list when it is empty. */
  empty?: string;
  /** Set when rows are fixed, e.g. a Board seat that always exists. */
  addable?: boolean;
  reorderable?: boolean;
  highlight?: (item: T) => boolean;
  /** Prepend rather than append — right when newest belongs at the top. */
  addToTop?: boolean;
};

export function ListEditor<T extends object>({
  items,
  onChange,
  make,
  noun,
  title,
  subtitle,
  children,
  empty,
  addable = true,
  reorderable = true,
  highlight,
  addToTop = false,
}: ListEditorProps<T>) {
  const [open, setOpen] = React.useState<Set<string>>(
    () => new Set(items.length > COLLAPSE_THRESHOLD ? [] : items.map((item) => item.key)),
  );
  const collapsible = items.length > COLLAPSE_THRESHOLD;
  const allOpen = collapsible && items.every((item) => open.has(item.key));

  const toggle = (key: string) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const add = () => {
    const row = withKey(make());
    onChange(addToTop ? [row, ...items] : [...items, row]);
    // A row you just asked for should be open, whatever the list's default.
    setOpen((current) => new Set(current).add(row.key));
  };

  return (
    <div className="space-y-3">
      {items.length === 0 ? (
        <p className="text-muted-foreground rounded-lg border border-dashed p-8 text-center text-sm">
          {empty ?? `No ${noun}s yet.`}
        </p>
      ) : (
        <>
          {collapsible ? (
            <div className="flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  setOpen(allOpen ? new Set() : new Set(items.map((item) => item.key)))
                }
              >
                {allOpen ? <ChevronsDownUp /> : <ChevronsUpDown />}
                {allOpen ? "Collapse all" : "Expand all"}
              </Button>
            </div>
          ) : null}

          <ol className="space-y-3">
            {items.map((item, index) => (
              <li key={item.key}>
                <RowCard
                  index={index}
                  total={items.length}
                  title={title(item, index)}
                  subtitle={subtitle?.(item, index)}
                  highlight={highlight?.(item)}
                  {...(reorderable
                    ? { onMove: (to: number) => onChange(move(items, index, to)) }
                    : {})}
                  {...(addable
                    ? { onDelete: () => onChange(removeAt(items, index)) }
                    : {})}
                  deleteLabel={title(item, index)}
                  {...(collapsible
                    ? { collapsed: !open.has(item.key), onToggle: () => toggle(item.key) }
                    : {})}
                >
                  {children(
                    item,
                    (values) => onChange(patchAt(items, index, values as Partial<Keyed<T>>)),
                    index,
                  )}
                </RowCard>
              </li>
            ))}
          </ol>
        </>
      )}

      {addable ? (
        <Button type="button" variant="outline" size="sm" onClick={add}>
          <Plus /> Add {article(noun)} {noun}
        </Button>
      ) : null}
    </div>
  );
}

function article(noun: string): string {
  return /^[aeiou]/i.test(noun) ? "an" : "a";
}
