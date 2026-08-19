"use client";

import * as React from "react";
import { ArrowDownUp, Pin, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AttachmentField } from "@/components/admin/attachment-field";
import { ImagePicker } from "@/components/admin/image-picker";
import { PublishBar } from "@/components/admin/publish-bar";
import { RowCard } from "@/components/admin/row-card";
import { formatNewsDate, isIsoDate, sortByDateDesc } from "@/content/news-date";
import type { NewsContent } from "@/content/schema/news";
import {
  firstIncompleteItem,
  move,
  newRowKey,
  rowsFromContent,
  STREAM_LABEL,
  STREAMS,
  toContent,
  today,
  type Row,
  type RowImage,
  type Rows,
  type Stream,
} from "@/lib/admin/news-rows";
import { useEditorDoc } from "@/lib/admin/use-editor-doc";

/** Where a News/Announcement attachment is filed — the ticket's own folder. */
const NEWS_ATTACHMENT_FOLDER = "documents/news";

/** And where its scans go. Separate folder: these are pictures, not downloads. */
const NEWS_IMAGE_FOLDER = "announcements";

const buildDocument = (rows: Rows, content: NewsContent) => toContent(rows, content.$schema);

export function NewsEditor({ content }: { content: NewsContent }) {
  const {
    state: rows,
    setState: setRows,
    dirty,
    publishState,
    onPublish,
    reset,
  } = useEditorDoc<Rows, NewsContent>({
    file: "news.json",
    content,
    toState: rowsFromContent,
    toDocument: buildDocument,
  });

  const blockedReason = React.useMemo(() => firstIncompleteItem(rows), [rows]);

  // Both streams live in one file and publish together; the tab only decides
  // which page "See it on the site" should open afterwards.
  const [stream, setStream] = React.useState<Stream>("news");

  const update = React.useCallback(
    (stream: Stream, next: (rows: Row[]) => Row[]) => {
      setRows((current) => ({ ...current, [stream]: next(current[stream]) }));
    },
    [setRows],
  );

  return (
    <div className="space-y-6">
      <Tabs
        value={stream}
        onValueChange={(value) => {
          setStream(value as Stream);
          reset();
        }}
      >
        <TabsList>
          {STREAMS.map((stream) => (
            <TabsTrigger key={stream} value={stream}>
              {STREAM_LABEL[stream]}
              <span className="ml-1.5 text-muted-foreground">({rows[stream].length})</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {STREAMS.map((stream) => (
          <TabsContent key={stream} value={stream} className="mt-6 space-y-4">
            <StreamToolbar
              stream={stream}
              count={rows[stream].length}
              onAdd={() =>
                update(stream, (current) => [
                  {
                    key: newRowKey(),
                    date: today(),
                    title: "",
                    link: "",
                    pinned: false,
                    images: [],
                  },
                  ...current,
                ])
              }
              onSort={() => update(stream, (current) => sortByDateDesc(current))}
            />

            {rows[stream].length === 0 ? (
              <p className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
                No {STREAM_LABEL[stream].toLowerCase()} yet. Use “Add item” to write the first one.
              </p>
            ) : (
              <ol className="space-y-4">
                {rows[stream].map((row, index) => (
                  <li key={row.key}>
                    <ItemCard
                      row={row}
                      index={index}
                      total={rows[stream].length}
                      onChange={(patch) =>
                        update(stream, (current) =>
                          current.map((item, i) => (i === index ? { ...item, ...patch } : item)),
                        )
                      }
                      onMove={(to) => update(stream, (current) => move(current, index, to))}
                      onDelete={() =>
                        update(stream, (current) => current.filter((_, i) => i !== index))
                      }
                    />
                  </li>
                ))}
              </ol>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <PublishBar
        state={publishState}
        dirty={dirty}
        onPublish={onPublish}
        blockedReason={blockedReason}
        viewUrl={stream === "news" ? "/news" : "/announcements"}
      />
    </div>
  );
}

function StreamToolbar({
  stream,
  count,
  onAdd,
  onSort,
}: {
  stream: Stream;
  count: number;
  onAdd: () => void;
  onSort: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground">
        The order here is the order on the site. Pinned items always show first.
      </p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onSort} disabled={count < 2}>
          <ArrowDownUp /> Sort by date
        </Button>
        <Button size="sm" onClick={onAdd}>
          <Plus /> Add {stream === "news" ? "news item" : "announcement"}
        </Button>
      </div>
    </div>
  );
}

function ItemCard({
  row,
  index,
  total,
  onChange,
  onMove,
  onDelete,
}: {
  row: Row;
  index: number;
  total: number;
  onChange: (patch: Partial<Row>) => void;
  onMove: (to: number) => void;
  onDelete: () => void;
}) {
  const id = row.key;
  const usesCalendarDate = isIsoDate(row.date) || row.date === "";

  return (
    <RowCard
      index={index}
      total={total}
      title={row.title}
      subtitle={row.date ? formatNewsDate(row.date) : undefined}
      onMove={onMove}
      onDelete={onDelete}
      highlight={row.pinned}
    >
      <>
        <div className="space-y-2">
          <Label htmlFor={`${id}-title`}>Title</Label>
          <Textarea
            id={`${id}-title`}
            value={row.title}
            rows={2}
            onChange={(event) => onChange({ title: event.target.value })}
            placeholder="What happened, in one sentence."
          />
        </div>

        <DateField row={row} id={id} usesCalendarDate={usesCalendarDate} onChange={onChange} />

        <AttachmentField
          id={id}
          value={row.link}
          onChange={(link) => onChange({ link })}
          folder={NEWS_ATTACHMENT_FOLDER}
        />

        <ImagesField
          id={id}
          images={row.images}
          onChange={(images) => onChange({ images })}
        />

        <div className="flex items-center gap-3 pt-1">
          <Switch
            id={`${id}-pinned`}
            checked={row.pinned}
            onCheckedChange={(checked) => onChange({ pinned: checked })}
          />
          <Label htmlFor={`${id}-pinned`} className="flex items-center gap-1.5 font-normal">
            <Pin className="h-3.5 w-3.5 rotate-45" />
            Keep this at the top
          </Label>
        </div>
      </>
    </RowCard>
  );
}

/**
 * Scans shown under the item — the brochure and the programme card the college
 * sends for a graduation day, say.
 *
 * Distinct from the attachment above it, and the labels say so: the attachment
 * is what a *click on the title* does, these are pictures the announcement is
 * partly made of. An Editor who confuses the two ends up with a PDF nobody can
 * see or a poster nobody can open.
 *
 * No reordering. An item carries two or three of these, so up/down buttons
 * would be three more controls to explain for a rearrangement nobody asks for;
 * remove and re-add is enough.
 */
function ImagesField({
  id,
  images,
  onChange,
}: {
  id: string;
  images: RowImage[];
  onChange: (images: RowImage[]) => void;
}) {
  const patch = (index: number, next: Partial<RowImage>) =>
    onChange(images.map((image, i) => (i === index ? { ...image, ...next } : image)));

  return (
    <div className="space-y-2">
      <Label>Pictures</Label>
      <p className="text-muted-foreground text-xs">
        Shown under the item, side by side. Use these for a scanned notice or
        poster — not for a PDF, which belongs above.
      </p>

      {images.map((image, index) => (
        // Position is the identity: this list is add-and-remove only, and the
        // one stable field it has is `key`, which is the asset key itself.
        <div key={index} className="flex items-start gap-3 rounded-lg border p-3">
          <ImagePicker
            value={image.key || undefined}
            onChange={(key) => patch(index, { key: key ?? "" })}
            uploadFolder={NEWS_IMAGE_FOLDER}
          />
          <div className="min-w-0 flex-1 space-y-2">
            <Label htmlFor={`${id}-image-${index}-alt`} className="text-xs font-normal">
              What this picture shows
            </Label>
            <Input
              id={`${id}-image-${index}-alt`}
              value={image.alt}
              onChange={(event) => patch(index, { alt: event.target.value })}
              placeholder="16th Graduation Day programme schedule"
            />
            <p className="text-muted-foreground text-xs">
              Read aloud to anyone using a screen reader, and shown if the
              picture fails to load.
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Remove picture ${index + 1}`}
            onClick={() => onChange(images.filter((_, i) => i !== index))}
          >
            <Trash2 />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...images, { key: "", alt: "" }])}
      >
        <Plus /> Add a picture
      </Button>
    </div>
  );
}

/**
 * A date is either a day on the calendar or a period ("A.Y. 2026-27"). Both are
 * legitimate and both live in one field, so the editor picks the kind and gets
 * the right control for it, with a preview of exactly what the site will show.
 */
function DateField({
  row,
  id,
  usesCalendarDate,
  onChange,
}: {
  row: Row;
  id: string;
  usesCalendarDate: boolean;
  onChange: (patch: Partial<Row>) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Label htmlFor={`${id}-date`}>Date</Label>
        <div className="flex gap-1 rounded-md border p-0.5">
          <Button
            type="button"
            variant={usesCalendarDate ? "secondary" : "ghost"}
            size="sm"
            className="h-7"
            onClick={() => onChange({ date: isIsoDate(row.date) ? row.date : today() })}
          >
            A date
          </Button>
          <Button
            type="button"
            variant={usesCalendarDate ? "ghost" : "secondary"}
            size="sm"
            className="h-7"
            onClick={() => onChange({ date: isIsoDate(row.date) ? "" : row.date })}
          >
            A period
          </Button>
        </div>
      </div>

      {usesCalendarDate ? (
        <Input
          id={`${id}-date`}
          type="date"
          value={row.date}
          onChange={(event) => onChange({ date: event.target.value })}
          className="w-auto"
        />
      ) : (
        <Input
          id={`${id}-date`}
          value={row.date}
          onChange={(event) => onChange({ date: event.target.value })}
          placeholder="A.Y. 2026-27"
        />
      )}

      <p className="text-xs text-muted-foreground">
        {row.date.trim()
          ? `Shows on the site as “${formatNewsDate(row.date)}”.`
          : "Pick the day it happened, or switch to “A period” for things like “2025-26 EVEN SEM”."}
      </p>
    </div>
  );
}
