"use client";

import * as React from "react";
import { ChevronDown, ChevronUp, ClipboardPaste, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { parsePastedRows } from "@/lib/admin/paste-rows";
import { move, patchAt, removeAt, withKeys, type Keyed } from "@/lib/admin/rows";
import { cn } from "@/lib/utils";

/**
 * A content array that is genuinely a table — a placement summary, a recruiter
 * list, 192 students of one batch — edited as one.
 *
 * The card list from [15] is the right shape for a slide or a person, where a
 * row is a paragraph of related fields. It is the wrong shape for five short
 * columns repeated two hundred times: the columns stop lining up, and a typo
 * in one figure takes four scrolls to find. So this is a real table, and the
 * three things that scale come with it — a filter, a paste, and rows that only
 * re-render when they change.
 */

/** Above this many rows, the filter box appears. */
const FILTER_THRESHOLD = 12;

export type Column<T> = {
  field: keyof T & string;
  label: string;
  hint?: string;
  /** Tailwind width for the column, e.g. "w-32". Equal share when unset. */
  width?: string;
};

export function TableEditor<T extends object>({
  items,
  onChange,
  columns,
  make,
  noun,
  reorderable = false,
  pasteHint,
}: {
  items: Keyed<T>[];
  onChange: (next: Keyed<T>[]) => void;
  columns: readonly Column<T>[];
  make: () => T;
  /** Singular, for buttons and counts, e.g. "student", "recruiter". */
  noun: string;
  reorderable?: boolean;
  /** One line about where this table's rows usually come from. */
  pasteHint?: string;
}) {
  // The callbacks below must not change identity, or every row re-renders on
  // every keystroke. They read the current items through a ref, which is only
  // ever touched inside an event handler — never during a render.
  const latest = React.useRef({ items, onChange });
  React.useEffect(() => {
    latest.current = { items, onChange };
  });

  const patch = React.useCallback((index: number, values: Partial<T>) => {
    const { items: current, onChange: emit } = latest.current;
    emit(patchAt(current, index, values as Partial<Keyed<T>>));
  }, []);
  const remove = React.useCallback((index: number) => {
    const { items: current, onChange: emit } = latest.current;
    emit(removeAt(current, index));
  }, []);
  const shift = React.useCallback((index: number, to: number) => {
    const { items: current, onChange: emit } = latest.current;
    emit(move(current, index, to));
  }, []);

  const [query, setQuery] = React.useState("");
  const needle = query.trim().toLowerCase();
  const visible = React.useMemo(() => {
    const rows = items.map((item, index) => ({ item, index }));
    if (!needle) return rows;
    return rows.filter(({ item }) =>
      columns.some((column) => String(item[column.field] ?? "").toLowerCase().includes(needle)),
    );
  }, [items, needle, columns]);

  const add = () => onChange([...items, ...withKeys([make()])]);

  const addMany = (rows: T[]) => {
    onChange([...items, ...withKeys(rows)]);
    setQuery("");
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {items.length > FILTER_THRESHOLD ? (
          <div className="relative min-w-48 flex-1">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Find a ${noun}…`}
              className="h-9 pl-8"
            />
          </div>
        ) : (
          <span className="text-muted-foreground flex-1 text-sm">
            {items.length === 1 ? `1 ${noun}` : `${items.length} ${noun}s`}
          </span>
        )}
        {needle ? (
          <span className="text-muted-foreground text-sm">
            {visible.length} of {items.length}
          </span>
        ) : null}
        <PasteButton columns={columns} make={make} noun={noun} hint={pasteHint} onAdd={addMany} />
        <Button type="button" variant="outline" size="sm" onClick={add}>
          <Plus /> Add
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="text-muted-foreground rounded-lg border border-dashed p-6 text-center text-sm">
          No {noun}s yet. Add one, or paste them in from a spreadsheet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-max border-collapse text-sm">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="text-muted-foreground w-10 px-2 py-2 text-right text-xs font-medium">
                  #
                </th>
                {columns.map((column) => (
                  <th
                    key={column.field}
                    className={cn("px-2 py-2 text-left text-xs font-medium", column.width)}
                    title={column.hint}
                  >
                    {column.label}
                  </th>
                ))}
                <th className="w-px px-2 py-2">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map(({ item, index }) => (
                <TableRow
                  key={item.key}
                  row={item}
                  index={index}
                  total={items.length}
                  columns={columns}
                  reorderable={reorderable && !needle}
                  onPatch={patch}
                  onRemove={remove}
                  onMove={shift}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {needle && visible.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No {noun} matches “{query.trim()}”.
        </p>
      ) : null}
    </div>
  );
}

type TableRowProps<T extends object> = {
  row: Keyed<T>;
  index: number;
  total: number;
  columns: readonly Column<T>[];
  reorderable: boolean;
  onPatch: (index: number, values: Partial<T>) => void;
  onRemove: (index: number) => void;
  onMove: (index: number, to: number) => void;
};

function TableRowInner<T extends object>({
  row,
  index,
  total,
  columns,
  reorderable,
  onPatch,
  onRemove,
  onMove,
}: TableRowProps<T>) {
  return (
    <tr className="border-b last:border-0">
      <td className="text-muted-foreground px-2 py-1 text-right text-xs tabular-nums">
        {index + 1}
      </td>
      {columns.map((column) => (
        <td key={column.field} className="px-1 py-1">
          <Input
            value={String(row[column.field] ?? "")}
            onChange={(event) =>
              onPatch(index, { [column.field]: event.target.value } as Partial<T>)
            }
            aria-label={`${column.label}, row ${index + 1}`}
            className="h-8 min-w-24 border-transparent bg-transparent shadow-none focus-visible:border-input focus-visible:bg-background"
          />
        </td>
      ))}
      <td className="px-1 py-1 whitespace-nowrap">
        {reorderable ? (
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => onMove(index, index - 1)}
              disabled={index === 0}
              aria-label={`Move row ${index + 1} up`}
            >
              <ChevronUp />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => onMove(index, index + 1)}
              disabled={index === total - 1}
              aria-label={`Move row ${index + 1} down`}
            >
              <ChevronDown />
            </Button>
          </>
        ) : null}
        {/*
          No confirm dialog here, unlike a card. A table row is five short
          boxes an Editor can see all of, deleting one is obvious the instant
          it happens, and nothing reaches the site until Publish — while a
          confirm on every row of a 192-row table would be its own hazard.
        */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() => onRemove(index)}
          aria-label={`Delete row ${index + 1}`}
        >
          <Trash2 className="text-destructive" />
        </Button>
      </td>
    </tr>
  );
}

/**
 * Memoized, and the reason the ref dance above exists: with 192 students on
 * screen, a keystroke that re-rendered every one of them would be felt. The
 * cast keeps the type parameter, which `React.memo` otherwise swallows.
 */
const TableRow = React.memo(TableRowInner) as typeof TableRowInner;

/**
 * Rows arrive from the placement office as a sheet, not as a form. Pasting the
 * sheet in is the difference between a five-minute job and an afternoon.
 */
function PasteButton<T extends object>({
  columns,
  make,
  noun,
  hint,
  onAdd,
}: {
  columns: readonly Column<T>[];
  make: () => T;
  noun: string;
  hint?: string;
  onAdd: (rows: T[]) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");

  const parsed = React.useMemo(
    () => parsePastedRows<T>(text, columns, make),
    [text, columns, make],
  );

  const close = () => {
    setOpen(false);
    setText("");
  };

  return (
    <>
      <Button type="button" variant="outline" size="sm" onClick={() => setOpen(true)}>
        <ClipboardPaste /> Paste from a spreadsheet
      </Button>

      <Dialog open={open} onOpenChange={(next) => (next ? setOpen(true) : close())}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Paste {noun}s from a spreadsheet</DialogTitle>
            <DialogDescription>
              {hint ? `${hint} ` : ""}Select the rows in Excel or Google Sheets, copy them, and
              paste here. The columns are read in this order:{" "}
              {columns.map((column) => column.label).join(" · ")}.
            </DialogDescription>
          </DialogHeader>

          <Label htmlFor="paste-box" className="sr-only">
            Pasted rows
          </Label>
          <Textarea
            id="paste-box"
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={10}
            className="font-mono text-xs"
            placeholder={columns.map((column) => column.label).join("\t")}
            autoFocus
          />

          <p className="text-muted-foreground text-sm">
            {parsed.rows.length === 0
              ? "Nothing to add yet."
              : `${parsed.rows.length} ${parsed.rows.length === 1 ? noun : `${noun}s`} will be added to the end of the table.`}
            {parsed.skippedHeader ? " The heading row was left out." : ""}
            {parsed.droppedCells > 0
              ? ` ${parsed.droppedCells} extra ${parsed.droppedCells === 1 ? "cell" : "cells"} past the last column will be ignored.`
              : ""}
          </p>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button
              type="button"
              disabled={parsed.rows.length === 0}
              onClick={() => {
                onAdd(parsed.rows);
                close();
              }}
            >
              Add {parsed.rows.length > 0 ? parsed.rows.length : ""}{" "}
              {parsed.rows.length === 1 ? noun : `${noun}s`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
