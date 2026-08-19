"use client";

import * as React from "react";
import { ChevronDown, ChevronsDownUp, ChevronsUpDown, ChevronUp, ClipboardPaste, Plus, Search, Trash2 } from "lucide-react";
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
import { RowCard } from "@/components/admin/row-card";
import type { Column } from "@/components/admin/table-editor";
import { parsePastedRows } from "@/lib/admin/paste-rows";
import { patchRow, rowId } from "@/lib/admin/row-id";
import { move, removeAt } from "@/lib/admin/rows";
import { cn } from "@/lib/utils";

/**
 * `ListEditor` and `TableEditor`, for arrays that go into the document exactly
 * as the Editor left them.
 *
 * The two originals mint their React handle by spreading a `key` field onto
 * each row, which is safe when a mapper rebuilds every row on the way out. The
 * departments editor has no such mapper — its state is the department itself —
 * and the departments schema already uses `key` for the asset key of a photo,
 * so the handle has to live beside the row instead (`row-id.ts`). That is the
 * whole of the difference; the chrome, the confirm dialog and the spreadsheet
 * paste are the same ones the other screens use.
 */

/** Above this many rows, a list opens collapsed. */
const COLLAPSE_THRESHOLD = 6;
/** Above this many rows, a table grows a filter box. */
const FILTER_THRESHOLD = 12;

export function ObjectList<T extends object>({
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
  addToTop = false,
}: {
  /** The content array, or undefined for a field nothing has been added to. */
  items: readonly T[] | undefined;
  onChange: (next: T[]) => void;
  /**
   * A blank row. `NoInfer` so the row type is read off `items` alone: a `make`
   * that fills in only the required fields would otherwise be taken as the whole
   * shape, and every optional field would go missing from `T`.
   */
  make: () => NoInfer<T>;
  /** Singular noun for buttons and dialogs, e.g. "lab", "association". */
  noun: string;
  title: (item: T, index: number) => string;
  subtitle?: (item: T, index: number) => string | undefined;
  children: (item: T, patch: (values: Partial<T>) => void, index: number) => React.ReactNode;
  empty?: string;
  addable?: boolean;
  reorderable?: boolean;
  addToTop?: boolean;
}) {
  const rows = React.useMemo(() => items ?? [], [items]);
  const [open, setOpen] = React.useState<Set<string>>(
    () => new Set(rows.length > COLLAPSE_THRESHOLD ? [] : rows.map(rowId)),
  );
  const collapsible = rows.length > COLLAPSE_THRESHOLD;
  const allOpen = collapsible && rows.every((row) => open.has(rowId(row)));

  const toggle = (id: string) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const add = () => {
    const row = make();
    onChange(addToTop ? [row, ...rows] : [...rows, row]);
    setOpen((current) => new Set(current).add(rowId(row)));
  };

  return (
    <div className="space-y-3">
      {rows.length === 0 ? (
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
                onClick={() => setOpen(allOpen ? new Set() : new Set(rows.map(rowId)))}
              >
                {allOpen ? <ChevronsDownUp /> : <ChevronsUpDown />}
                {allOpen ? "Collapse all" : "Expand all"}
              </Button>
            </div>
          ) : null}

          <ol className="space-y-3">
            {rows.map((row, index) => {
              const id = rowId(row);
              return (
                <li key={id}>
                  <RowCard
                    index={index}
                    total={rows.length}
                    title={title(row, index)}
                    subtitle={subtitle?.(row, index)}
                    {...(reorderable
                      ? { onMove: (to: number) => onChange(move(rows, index, to)) }
                      : {})}
                    {...(addable ? { onDelete: () => onChange(removeAt(rows, index)) } : {})}
                    deleteLabel={title(row, index)}
                    {...(collapsible ? { collapsed: !open.has(id), onToggle: () => toggle(id) } : {})}
                  >
                    {children(row, (values) => onChange(patchRow(rows, index, values)), index)}
                  </RowCard>
                </li>
              );
            })}
          </ol>
        </>
      )}

      {addable ? (
        <Button type="button" variant="outline" size="sm" onClick={add}>
          <Plus /> Add {/^[aeiou]/i.test(noun) ? "an" : "a"} {noun}
        </Button>
      ) : null}
    </div>
  );
}

/**
 * The same, as a table — right when a row is a handful of short cells repeated
 * dozens of times (patents, scholars, MoUs) rather than a paragraph of related
 * fields. Rows are memoized and the callbacks read through a ref, because these
 * tables run to hundreds of rows and a keystroke must not re-render all of them.
 */
export function ObjectTable<T extends object>({
  items,
  onChange,
  columns,
  make,
  noun,
  pasteHint,
  reorderable = false,
}: {
  items: readonly T[] | undefined;
  onChange: (next: T[]) => void;
  columns: readonly Column<T>[];
  /** A blank row — `NoInfer` for the reason given on `ObjectList`. */
  make: () => NoInfer<T>;
  noun: string;
  pasteHint?: string;
  reorderable?: boolean;
}) {
  const rows = React.useMemo(() => items ?? [], [items]);

  const latest = React.useRef({ rows, onChange });
  React.useEffect(() => {
    latest.current = { rows, onChange };
  });

  const patch = React.useCallback((index: number, values: Partial<T>) => {
    const { rows: current, onChange: emit } = latest.current;
    emit(patchRow(current, index, values));
  }, []);
  const remove = React.useCallback((index: number) => {
    const { rows: current, onChange: emit } = latest.current;
    emit(removeAt(current, index));
  }, []);
  const shift = React.useCallback((index: number, to: number) => {
    const { rows: current, onChange: emit } = latest.current;
    emit(move(current, index, to));
  }, []);

  const [query, setQuery] = React.useState("");
  const needle = query.trim().toLowerCase();
  const visible = React.useMemo(() => {
    const all = rows.map((item, index) => ({ item, index }));
    if (!needle) return all;
    return all.filter(({ item }) =>
      columns.some((column) => String(item[column.field] ?? "").toLowerCase().includes(needle)),
    );
  }, [rows, needle, columns]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {rows.length > FILTER_THRESHOLD ? (
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
            {rows.length === 1 ? `1 ${noun}` : `${rows.length} ${noun}s`}
          </span>
        )}
        {needle ? (
          <span className="text-muted-foreground text-sm">
            {visible.length} of {rows.length}
          </span>
        ) : null}
        <PasteRows
          columns={columns}
          make={make}
          noun={noun}
          hint={pasteHint}
          onAdd={(added) => {
            onChange([...rows, ...added]);
            setQuery("");
          }}
        />
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...rows, make()])}>
          <Plus /> Add
        </Button>
      </div>

      {rows.length === 0 ? (
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
                <ObjectRow
                  key={rowId(item)}
                  row={item}
                  index={index}
                  total={rows.length}
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

type ObjectRowProps<T extends object> = {
  row: T;
  index: number;
  total: number;
  columns: readonly Column<T>[];
  reorderable: boolean;
  onPatch: (index: number, values: Partial<T>) => void;
  onRemove: (index: number) => void;
  onMove: (index: number, to: number) => void;
};

function ObjectRowInner<T extends object>({
  row,
  index,
  total,
  columns,
  reorderable,
  onPatch,
  onRemove,
  onMove,
}: ObjectRowProps<T>) {
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
            className="focus-visible:border-input focus-visible:bg-background h-8 min-w-24 border-transparent bg-transparent shadow-none"
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

const ObjectRow = React.memo(ObjectRowInner) as typeof ObjectRowInner;

function PasteRows<T extends object>({
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

          <Label htmlFor="paste-rows" className="sr-only">
            Pasted rows
          </Label>
          <Textarea
            id="paste-rows"
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
