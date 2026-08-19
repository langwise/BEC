"use client";

import * as React from "react";
import { ChevronDown, ChevronUp, Columns3, Rows3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ObjectList } from "@/components/admin/content-list";
import { ChoiceField, TextField } from "@/components/admin/fields";
import { ImagePicker } from "@/components/admin/image-picker";
import { parsePastedGrid } from "@/lib/admin/paste-rows";
import { carryId, rowId } from "@/lib/admin/row-id";
import { move, removeAt } from "@/lib/admin/rows";
import type { DataTable, DocRef, Photo, PhotoWidth } from "@/content/schema/shared";

/**
 * One widget per shape the departments schema repeats.
 *
 * The schema has ninety top-level fields but only about a dozen *shapes*: a
 * line of text, a bullet list, a captioned photo, a run of photos, a list of
 * PDFs, a coded statement, a free-form table. Building a form per field would
 * be six thousand lines that drift apart; building one widget per shape means
 * a new field is a line of declaration, and every list in the Admin gains a fix
 * at the same time.
 *
 * Every value here is optional in the document, so every widget takes
 * `undefined` and hands back `undefined` when the Editor empties it —
 * `normalize.ts` then drops the field rather than writing `""` or `[]`, which
 * the schema would reject.
 */

type Labelled = { label: string; hint?: string };

/* ------------------------------------------------------------------ text -- */

export function OptionalText({
  value,
  onChange,
  label,
  hint,
  placeholder,
}: Labelled & {
  value: string | undefined;
  onChange: (next: string | undefined) => void;
  placeholder?: string;
}) {
  return (
    <TextField
      label={label}
      hint={hint}
      placeholder={placeholder}
      value={value ?? ""}
      onChange={(next) => onChange(next || undefined)}
    />
  );
}

export function OptionalProse({
  value,
  onChange,
  label,
  hint,
  placeholder,
  rows = 6,
}: Labelled & {
  value: string | undefined;
  onChange: (next: string | undefined) => void;
  placeholder?: string;
  rows?: number;
}) {
  const id = useFieldId();
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        rows={rows}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value || undefined)}
      />
      {hint ? <p className="text-muted-foreground text-xs">{hint}</p> : null}
    </div>
  );
}

export function OptionalNumber({
  value,
  onChange,
  label,
  hint,
}: Labelled & {
  value: number | undefined;
  onChange: (next: number | undefined) => void;
}) {
  // Held as text while it is being typed: a box cleared to nothing has to mean
  // "no value", not 0, and a half-typed "1" must not be rewritten mid-keystroke.
  const [text, setText] = React.useState(value === undefined ? "" : String(value));
  const [seen, setSeen] = React.useState(value);
  if (value !== seen) {
    setSeen(value);
    setText(value === undefined ? "" : String(value));
  }
  const id = useFieldId();
  const bad = text.trim() !== "" && !Number.isFinite(Number(text));

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        inputMode="numeric"
        value={text}
        onChange={(event) => {
          const next = event.target.value;
          setText(next);
          setSeen(undefined);
          const parsed = Number(next.trim());
          onChange(next.trim() === "" || !Number.isFinite(parsed) ? undefined : parsed);
        }}
      />
      <p className={bad ? "text-destructive text-xs" : "text-muted-foreground text-xs"}>
        {bad ? "That is not a number, so nothing will be saved here." : hint}
      </p>
    </div>
  );
}

/**
 * A bullet list, edited as a block of text with one bullet per line.
 *
 * Fifteen mission statements are fifteen boxes with fifteen delete buttons if
 * this is a list of fields, and a paragraph anyone can retype if it is not.
 * Reordering is dragging a line, which is what an Editor already knows how to
 * do in the document they were sent.
 */
export function LinesField({
  value,
  onChange,
  label,
  hint,
  placeholder,
  rows = 6,
}: Labelled & {
  value: readonly string[] | undefined;
  onChange: (next: string[] | undefined) => void;
  placeholder?: string;
  rows?: number;
}) {
  const published = (value ?? []).join("\n");
  const [text, setText] = React.useState(published);

  // Re-seed only when the value arrives from outside — never mid-keystroke,
  // which is why the guard asks what this box would itself have produced.
  const [seen, setSeen] = React.useState(published);
  if (published !== seen) {
    setSeen(published);
    if (published !== toLines(text).join("\n")) setText(published);
  }

  const id = useFieldId();
  const count = toLines(text).length;

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        rows={rows}
        value={text}
        placeholder={placeholder}
        onChange={(event) => {
          setText(event.target.value);
          const lines = toLines(event.target.value);
          onChange(lines.length === 0 ? undefined : lines);
        }}
      />
      <p className="text-muted-foreground text-xs">
        {hint ? `${hint} ` : ""}One per line — {count === 1 ? "1 item" : `${count} items`} so far.
      </p>
    </div>
  );
}

function toLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function FlagField({
  value,
  onChange,
  label,
  hint,
}: Labelled & {
  value: boolean | undefined;
  onChange: (next: true | undefined) => void;
}) {
  const id = useFieldId();
  return (
    <div className="flex items-start gap-3 rounded-lg border p-3">
      <Switch
        id={id}
        checked={value === true}
        // Off is *absent*, not `false`: the file says what is true of a
        // department, and a hundred `false`s would be noise in every diff.
        onCheckedChange={(next) => onChange(next ? true : undefined)}
      />
      <div className="min-w-0 flex-1 space-y-1">
        <Label htmlFor={id} className="leading-snug">
          {label}
        </Label>
        {hint ? <p className="text-muted-foreground text-xs leading-relaxed">{hint}</p> : null}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- media -- */

const WIDTHS: { value: PhotoWidth | "default"; label: string }[] = [
  { value: "default", label: "Default for this spot" },
  { value: "narrow", label: "Narrow" },
  { value: "medium", label: "Medium" },
  { value: "wide", label: "Wide" },
  { value: "full", label: "Full width" },
];

/** A captioned photo — the `{ key, caption?, width? }` shape, eight fields deep. */
export function PhotoField({
  value,
  onChange,
  label,
  hint,
  uploadFolder,
  widthChoice = false,
}: Labelled & {
  value: Photo | undefined;
  onChange: (next: Photo | undefined) => void;
  uploadFolder?: string;
  /** Offer the width override. Only the spots whose layout honours one do. */
  widthChoice?: boolean;
}) {
  return (
    <div className="space-y-3 rounded-lg border p-3">
      <ImagePicker
        label={label}
        description={hint}
        value={value?.key}
        uploadFolder={uploadFolder}
        // Removing the photo removes its caption with it — a caption with no
        // photo describes nothing and the schema will not have one.
        onChange={(key) => onChange(key ? { ...value, key } : undefined)}
      />
      {value?.key ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <TextField
            label="Caption"
            value={value.caption ?? ""}
            onChange={(caption) => onChange({ ...value, caption: caption || undefined })}
            hint="Printed under the photo. Leave empty for none."
          />
          {widthChoice ? (
            <ChoiceField
              label="Width"
              value={value.width ?? "default"}
              options={WIDTHS}
              onChange={(width) =>
                onChange({ ...value, width: width === "default" ? undefined : width })
              }
              hint="How wide the photo sits on the page."
            />
          ) : null}
        </div>
      ) : null}
      {value?.key ? (
        <TextField
          label="Description for people who cannot see it"
          value={value.alt ?? ""}
          onChange={(alt) => onChange({ ...value, alt: alt || undefined })}
          hint="Usually leave empty — the page describes the photo from where it sits. Fill it in when that would be wrong, e.g. an industry visit in the space meant for a graduating batch."
        />
      ) : null}
    </div>
  );
}

/** A run of photos — a hero, a gallery, the photos under one lab. */
export function PhotosField({
  value,
  onChange,
  label,
  hint,
  uploadFolder,
}: Labelled & {
  value: readonly string[] | undefined;
  onChange: (next: string[] | undefined) => void;
  uploadFolder?: string;
}) {
  const keys = value ?? [];
  const emit = (next: string[]) => onChange(next.length === 0 ? undefined : next);

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {hint ? <p className="text-muted-foreground mt-1 text-xs">{hint}</p> : null}
      </div>

      {keys.length > 0 ? (
        <ul className="grid gap-3 sm:grid-cols-2">
          {keys.map((key, index) => (
            <li key={`${key}-${index}`} className="space-y-2 rounded-lg border p-3">
              <ImagePicker
                label={`Photo ${index + 1}`}
                value={key}
                uploadFolder={uploadFolder}
                onChange={(next) =>
                  emit(next ? keys.map((k, i) => (i === index ? next : k)) : removeAt(keys, index))
                }
              />
              {keys.length > 1 ? (
                <div className="flex justify-end gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    disabled={index === 0}
                    onClick={() => emit(move(keys, index, index - 1))}
                    aria-label={`Move photo ${index + 1} earlier`}
                  >
                    <ChevronUp />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    disabled={index === keys.length - 1}
                    onClick={() => emit(move(keys, index, index + 1))}
                    aria-label={`Move photo ${index + 1} later`}
                  >
                    <ChevronDown />
                  </Button>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      {/*
        The adder is a picker with nothing in it: choosing a photo appends it and
        the field empties itself, ready for the next one.
      */}
      <div className="rounded-lg border border-dashed p-3">
        <ImagePicker
          key={keys.length}
          label={keys.length === 0 ? "Add the first photo" : "Add another photo"}
          value={undefined}
          uploadFolder={uploadFolder}
          onChange={(next) => (next ? emit([...keys, next]) : undefined)}
        />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- records -- */

/** A list of downloadable PDFs — curricula, newsletters, alumni records. */
export function DocsField({
  value,
  onChange,
  label,
  hint,
  noun = "document",
  uploadFolder,
}: Labelled & {
  value: readonly DocRef[] | undefined;
  onChange: (next: DocRef[] | undefined) => void;
  noun?: string;
  uploadFolder?: string;
}) {
  return (
    <Block label={label} hint={hint}>
      <ObjectList<DocRef>
        items={value}
        onChange={(next) => onChange(next.length === 0 ? undefined : next)}
        make={() => ({ title: "", file: "" })}
        noun={noun}
        title={(doc) => doc.title}
        subtitle={(doc) => doc.file || "No file chosen yet"}
        empty={`No ${noun}s yet.`}
      >
        {(doc, patch) => (
          <>
            <TextField
              label="What the link says"
              value={doc.title}
              onChange={(title) => patch({ title })}
              placeholder="B.E. Scheme 2022–23"
            />
            <ImagePicker
              kind="document"
              label="PDF"
              value={doc.file || undefined}
              uploadFolder={uploadFolder}
              onChange={(file) => patch({ file: file ?? "" })}
            />
          </>
        )}
      </ObjectList>
    </Block>
  );
}

export type TitledImages = { title?: string; images: string[] };

/** Photo galleries that carry their own heading — facilities, research labs. */
export function TitledImagesField({
  value,
  onChange,
  label,
  hint,
  uploadFolder,
}: Labelled & {
  value: readonly TitledImages[] | undefined;
  onChange: (next: TitledImages[] | undefined) => void;
  uploadFolder?: string;
}) {
  return (
    <Block label={label} hint={hint}>
      <ObjectList<TitledImages>
        items={value}
        onChange={(next) => onChange(next.length === 0 ? undefined : next)}
        make={() => ({ images: [] })}
        noun="gallery"
        title={(group) => group.title ?? ""}
        subtitle={(group) =>
          group.images.length === 1 ? "1 photo" : `${group.images.length} photos`
        }
      >
        {(group, patch) => (
          <>
            <TextField
              label="Heading"
              value={group.title ?? ""}
              onChange={(title) => patch({ title: title || undefined })}
              hint="Printed above this run of photos. Leave empty for none."
            />
            <PhotosField
              label="Photos"
              value={group.images}
              uploadFolder={uploadFolder}
              onChange={(images) => patch({ images: images ?? [] })}
            />
          </>
        )}
      </ObjectList>
    </Block>
  );
}

/** The free-form tables a department writes its own headings for. */
export function TablesField({
  value,
  onChange,
  label,
  hint,
}: Labelled & {
  value: readonly DataTable[] | undefined;
  onChange: (next: DataTable[] | undefined) => void;
}) {
  return (
    <Block label={label} hint={hint}>
      <ObjectList<DataTable>
        items={value}
        onChange={(next) => onChange(next.length === 0 ? undefined : next)}
        make={() => ({ title: "", columns: ["", ""], rows: [] })}
        noun="table"
        title={(table) => table.title}
        subtitle={(table) => (table.rows.length === 1 ? "1 row" : `${table.rows.length} rows`)}
      >
        {(table, patch) => (
          <>
            <TextField
              label="Heading"
              value={table.title}
              onChange={(title) => patch({ title })}
              placeholder="Faculty Awards"
            />
            <Grid
              columns={table.columns}
              rows={table.rows}
              onChange={(columns, rows) => patch({ columns, rows })}
            />
            <FlagField
              label="Start folded up"
              hint="Long tables can open as a “show more” fold so they do not bury the rest of the page."
              value={table.collapsed}
              onChange={(collapsed) => patch({ collapsed })}
            />
          </>
        )}
      </ObjectList>
    </Block>
  );
}

/** A single optional table, for a block that may carry one — a lab, a group. */
export function OptionalTableField({
  value,
  onChange,
  label,
  hint,
}: Labelled & {
  value: DataTable | undefined;
  onChange: (next: DataTable | undefined) => void;
}) {
  return (
    <Block label={label} hint={hint}>
      {value ? (
        <div className="space-y-3 rounded-lg border p-3">
          <div className="flex items-end gap-2">
            <div className="min-w-0 flex-1">
              <TextField
                label="Heading"
                value={value.title}
                onChange={(title) => onChange({ ...value, title })}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onChange(undefined)}
              aria-label="Delete this table"
            >
              <Trash2 className="text-destructive" />
            </Button>
          </div>
          <Grid
            columns={value.columns}
            rows={value.rows}
            onChange={(columns, rows) => onChange({ ...value, columns, rows })}
          />
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onChange({ title: "", columns: ["", ""], rows: [] })}
        >
          Add a table
        </Button>
      )}
    </Block>
  );
}

export type CaptionedPhoto = { key: string; caption?: string };

/** Event photos — a run of pictures that each say what they show. */
export function CaptionedPhotosField({
  value,
  onChange,
  label,
  hint,
  uploadFolder,
}: Labelled & {
  value: readonly CaptionedPhoto[] | undefined;
  onChange: (next: CaptionedPhoto[] | undefined) => void;
  uploadFolder?: string;
}) {
  return (
    <Block label={label} hint={hint}>
      <ObjectList<CaptionedPhoto>
        items={value}
        onChange={(next) => onChange(next.length === 0 ? undefined : next)}
        make={() => ({ key: "" })}
        noun="photo"
        title={(photo) => photo.caption ?? ""}
        subtitle={(photo) => photo.key || "No photo chosen yet"}
      >
        {(photo, patch) => (
          <>
            <ImagePicker
              label="Photograph"
              value={photo.key || undefined}
              uploadFolder={uploadFolder}
              onChange={(key) => patch({ key: key ?? "" })}
            />
            <TextField
              label="Caption"
              value={photo.caption ?? ""}
              onChange={(caption) => patch({ caption: caption || undefined })}
            />
          </>
        )}
      </ObjectList>
    </Block>
  );
}

export type GroupItem = string | { label: string; value?: string; image?: string };

/**
 * A list whose entries are usually just a line of text, and occasionally a
 * label with a detail and a picture beside it.
 *
 * The content carries both forms, and converting the plain ones on load would
 * rewrite every department that only ever used plain ones. So both are drawn as
 * they are, and a plain line grows the extra boxes only when an Editor asks it
 * to — which is also how it shrinks back.
 */
export function GroupItemsField({
  value,
  onChange,
  label,
  hint,
  uploadFolder,
}: Labelled & {
  value: readonly GroupItem[] | undefined;
  onChange: (next: GroupItem[] | undefined) => void;
  uploadFolder?: string;
}) {
  const items = value ?? [];
  const emit = (next: GroupItem[]) => onChange(next.length === 0 ? undefined : next);
  const replace = (index: number, item: GroupItem) =>
    emit(items.map((entry, i) => (i === index ? item : entry)));

  return (
    <Block label={label} hint={hint}>
      {items.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item, index) => (
            // Position is the handle: an entry is one or three short boxes with
            // no state of its own, and an entry can change shape in place.
            <li key={index} className="space-y-3 rounded-lg border p-3">
              {typeof item === "string" ? (
                <div className="flex items-end gap-2">
                  <div className="min-w-0 flex-1">
                    <TextField
                      label={`Item ${index + 1}`}
                      value={item}
                      onChange={(text) => replace(index, text)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => replace(index, { label: item })}
                  >
                    Add a detail
                  </Button>
                  <RowButtons index={index} total={items.length} items={items} emit={emit} />
                </div>
              ) : (
                <>
                  <div className="flex items-end justify-end gap-2">
                    {!item.value && !item.image ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => replace(index, item.label)}
                      >
                        Back to one line
                      </Button>
                    ) : null}
                    <RowButtons index={index} total={items.length} items={items} emit={emit} />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <TextField
                      label="Label"
                      value={item.label}
                      onChange={(next) => replace(index, { ...item, label: next })}
                    />
                    <TextField
                      label="Detail"
                      value={item.value ?? ""}
                      onChange={(next) => replace(index, { ...item, value: next || undefined })}
                      hint="Printed beside the label, in a lighter colour."
                    />
                  </div>
                  <ImagePicker
                    label="Photograph"
                    value={item.image}
                    uploadFolder={uploadFolder}
                    onChange={(image) => replace(index, { ...item, image })}
                  />
                </>
              )}
            </li>
          ))}
        </ul>
      ) : null}

      <Button type="button" variant="outline" size="sm" onClick={() => emit([...items, ""])}>
        Add an item
      </Button>
    </Block>
  );
}

function RowButtons<T>({
  index,
  total,
  items,
  emit,
}: {
  index: number;
  total: number;
  items: readonly T[];
  emit: (next: T[]) => void;
}) {
  return (
    <div className="flex shrink-0">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-9"
        disabled={index === 0}
        onClick={() => emit(move(items, index, index - 1))}
        aria-label={`Move item ${index + 1} up`}
      >
        <ChevronUp />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-9"
        disabled={index === total - 1}
        onClick={() => emit(move(items, index, index + 1))}
        aria-label={`Move item ${index + 1} down`}
      >
        <ChevronDown />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-9"
        onClick={() => emit(removeAt(items, index))}
        aria-label={`Delete item ${index + 1}`}
      >
        <Trash2 className="text-destructive" />
      </Button>
    </div>
  );
}

/**
 * One table's headings and cells. Columns are content here — every department
 * names its own — so the header row is editable and a column can be added or
 * taken away, which a fixed `Column[]` spec cannot express.
 */
function Grid({
  columns,
  rows,
  onChange,
}: {
  columns: readonly string[];
  rows: readonly string[][];
  onChange: (columns: string[], rows: string[][]) => void;
}) {
  const [paste, setPaste] = React.useState("");
  const width = Math.max(columns.length, 1);

  const setColumn = (index: number, text: string) =>
    onChange(
      columns.map((column, i) => (i === index ? text : column)),
      rows as string[][],
    );

  const setCell = (row: number, column: number, text: string) =>
    onChange(
      columns as string[],
      patchGridCell(rows, row, column, text),
    );

  const addColumn = () =>
    onChange(
      [...columns, ""],
      rows.map((row) => [...row, ""]),
    );

  const dropColumn = (index: number) =>
    onChange(
      removeAt(columns, index),
      rows.map((row) => removeAt(row, index)),
    );

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-max border-collapse text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="w-10 px-2 py-1" />
              {columns.map((column, index) => (
                <th key={index} className="px-1 py-1">
                  <div className="flex items-center gap-1">
                    <Input
                      value={column}
                      onChange={(event) => setColumn(index, event.target.value)}
                      aria-label={`Heading for column ${index + 1}`}
                      placeholder={`Column ${index + 1}`}
                      className="h-8 min-w-28 font-medium"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-8 shrink-0"
                      disabled={columns.length <= 1}
                      onClick={() => dropColumn(index)}
                      aria-label={`Delete column ${index + 1}`}
                    >
                      <Trash2 className="text-destructive" />
                    </Button>
                  </div>
                </th>
              ))}
              <th className="w-px" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowId(row)} className="border-b last:border-0">
                <td className="text-muted-foreground px-2 py-1 text-right text-xs tabular-nums">
                  {rowIndex + 1}
                </td>
                {Array.from({ length: width }, (_, columnIndex) => (
                  <td key={columnIndex} className="px-1 py-1">
                    <Input
                      value={row[columnIndex] ?? ""}
                      onChange={(event) => setCell(rowIndex, columnIndex, event.target.value)}
                      aria-label={`${columns[columnIndex] || `Column ${columnIndex + 1}`}, row ${rowIndex + 1}`}
                      className="focus-visible:border-input focus-visible:bg-background h-8 min-w-24 border-transparent bg-transparent shadow-none"
                    />
                  </td>
                ))}
                <td className="px-1 py-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => onChange(columns as string[], removeAt(rows, rowIndex))}
                    aria-label={`Delete row ${rowIndex + 1}`}
                  >
                    <Trash2 className="text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            onChange(columns as string[], [...rows, Array.from({ length: width }, () => "")])
          }
        >
          <Rows3 /> Add a row
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={addColumn}>
          <Columns3 /> Add a column
        </Button>
      </div>

      <details className="rounded-lg border p-3">
        <summary className="cursor-pointer text-sm font-medium">
          Paste the whole table from a spreadsheet
        </summary>
        <p className="text-muted-foreground mt-2 text-xs">
          Copy the table including its heading row. Pasting replaces the headings and every row
          below.
        </p>
        <Textarea
          value={paste}
          rows={6}
          className="mt-2 font-mono text-xs"
          onChange={(event) => setPaste(event.target.value)}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          disabled={paste.trim() === ""}
          onClick={() => {
            const grid = parsePastedGrid(paste);
            if (grid.columns.length > 0) onChange(grid.columns, grid.rows);
            setPaste("");
          }}
        >
          Replace the table
        </Button>
      </details>
    </div>
  );
}

/**
 * A new grid for one changed cell. The rewritten row carries the handle its
 * predecessor had — an identity minted afresh on every keystroke would remount
 * the row and take the cursor out of the box being typed into. Short rows are
 * padded to reach the edited column, so a table that grew a column has cells
 * under it rather than holes.
 */
function patchGridCell(
  rows: readonly string[][],
  row: number,
  column: number,
  text: string,
): string[][] {
  return rows.map((cells, index) => {
    if (index !== row) return cells;
    const next = Array.from({ length: Math.max(cells.length, column + 1) }, (_, i) =>
      i === column ? text : (cells[i] ?? ""),
    );
    return carryId(cells, next);
  });
}

/**
 * A field that is a *map* — extra PDFs keyed by section id, per-section heading
 * overrides. The Editor types the key beside the value, because that is what
 * the field is; there is no way to present "keyed by section id" as anything
 * else without hiding which section a value belongs to.
 *
 * The rows are held locally rather than rebuilt from the map on every render:
 * clearing a key to retype it would otherwise collide with any other cleared
 * key and merge two entries into one, losing whichever was typed first.
 */
export function MapField<V>({
  value,
  onChange,
  label,
  hint,
  keyLabel,
  keyPlaceholder,
  noun,
  blank,
  children,
}: Labelled & {
  value: Record<string, V> | undefined;
  onChange: (next: Record<string, V> | undefined) => void;
  keyLabel: string;
  keyPlaceholder?: string;
  noun: string;
  /** A blank value — `NoInfer` so the map's type is read off `value` alone. */
  blank: () => NoInfer<V>;
  children: (value: V, set: (next: V) => void) => React.ReactNode;
}) {
  const published = React.useMemo(() => Object.entries(value ?? {}), [value]);
  const [entries, setEntries] = React.useState(published);

  const [seen, setSeen] = React.useState(published);
  if (published !== seen) {
    setSeen(published);
    if (JSON.stringify(published) !== JSON.stringify(entries)) setEntries(published);
  }

  const emit = (next: [string, V][]) => {
    setEntries(next);
    const map: Record<string, V> = {};
    for (const [key, item] of next) if (key.trim()) map[key.trim()] = item;
    onChange(Object.keys(map).length === 0 ? undefined : map);
  };

  const duplicated = new Set(
    entries
      .map(([key]) => key.trim())
      .filter((key, index, all) => key && all.indexOf(key) !== index),
  );

  return (
    <Block label={label} hint={hint}>
      {entries.length === 0 ? (
        <p className="text-muted-foreground rounded-lg border border-dashed p-6 text-center text-sm">
          No {noun}s yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {entries.map(([key, item], index) => (
            // Position is the handle here: these rows are a short box and a
            // value, with no collapse state of their own to get out of step.
            <li key={index} className="space-y-3 rounded-lg border p-3">
              <div className="flex items-end gap-2">
                <div className="min-w-0 flex-1">
                  <TextField
                    label={keyLabel}
                    value={key}
                    placeholder={keyPlaceholder}
                    onChange={(next) =>
                      emit(entries.map((entry, i) => (i === index ? [next, entry[1]] : entry)))
                    }
                    hint={
                      duplicated.has(key.trim())
                        ? "Another row already uses this — only the last one will be saved."
                        : undefined
                    }
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => emit(entries.filter((_, i) => i !== index))}
                  aria-label={`Delete ${noun} ${index + 1}`}
                >
                  <Trash2 className="text-destructive" />
                </Button>
              </div>
              {children(item, (next) =>
                emit(entries.map((entry, i) => (i === index ? [entry[0], next] : entry))),
              )}
            </li>
          ))}
        </ul>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => emit([...entries, ["", blank()]])}
      >
        Add {/^[aeiou]/i.test(noun) ? "an" : "a"} {noun}
      </Button>
    </Block>
  );
}

/* ----------------------------------------------------------------- shell -- */

/** A labelled block around a widget that draws its own list. */
export function Block({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {hint ? <p className="text-muted-foreground mt-1 text-xs leading-relaxed">{hint}</p> : null}
      </div>
      {children}
    </div>
  );
}

let seed = 0;
function useFieldId(): string {
  const [id] = React.useState(() => {
    seed += 1;
    return `content-field-${seed}`;
  });
  return id;
}
