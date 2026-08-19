"use client";

import * as React from "react";
import { FileText, Link2, Minus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { linkMode, type LinkMode } from "@/content/news-link";
import { labelFor } from "@/lib/admin/asset-tree";
import { uploadPdf } from "@/lib/admin/upload-pdf";
import { cn } from "@/lib/utils";

/**
 * The "what happens when someone clicks this" control: nothing, an attached
 * PDF, or a link (CONTEXT.md "Attachment").
 *
 * One stored field with three modes rather than three fields, so an Editor
 * chooses an outcome instead of guessing which box applies. The mode is held in
 * state rather than derived from the value, because "a link, not yet typed" and
 * "no link" are the same empty string and the toggle must not snap back while
 * someone is mid-sentence.
 */

const MODES: { mode: LinkMode; label: string; icon: React.ElementType }[] = [
  { mode: "none", label: "Nothing", icon: Minus },
  { mode: "attachment", label: "A PDF", icon: FileText },
  { mode: "url", label: "A link", icon: Link2 },
];

export function AttachmentField({
  value,
  onChange,
  folder,
  id,
  label = "When someone clicks it",
}: {
  value: string;
  onChange: (value: string) => void;
  /** Where an attached PDF is filed, e.g. "documents/news". */
  folder: string;
  id: string;
  label?: string;
}) {
  const [mode, setMode] = React.useState<LinkMode>(() => linkMode(value || undefined));
  // Remembered so flicking between modes does not throw away a typed URL.
  const [draftUrl, setDraftUrl] = React.useState(
    linkMode(value || undefined) === "url" ? value : "",
  );
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const fileInput = React.useRef<HTMLInputElement>(null);

  const attached = mode === "attachment" && value ? value : null;

  const switchTo = (next: LinkMode) => {
    setError(null);
    setMode(next);
    if (next === "none") onChange("");
    else if (next === "url") onChange(draftUrl);
    else if (linkMode(value || undefined) !== "attachment") onChange("");
  };

  const attach = async (file: File) => {
    setBusy(true);
    setError(null);
    try {
      onChange(await uploadPdf(file, folder));
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "That file could not be uploaded.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={mode === "url" ? `${id}-url` : undefined}>{label}</Label>

      <div className="flex flex-wrap gap-1.5">
        {MODES.map((option) => (
          <Button
            key={option.mode}
            type="button"
            size="sm"
            variant={mode === option.mode ? "secondary" : "ghost"}
            className={cn(
              "border",
              mode === option.mode ? "border-input" : "border-transparent",
            )}
            aria-pressed={mode === option.mode}
            onClick={() => switchTo(option.mode)}
          >
            <option.icon className="size-3.5" />
            {option.label}
          </Button>
        ))}
      </div>

      {mode === "none" ? (
        <p className="text-muted-foreground text-xs">
          The item shows as plain text — that is right for most items.
        </p>
      ) : null}

      {mode === "url" ? (
        <>
          <Input
            id={`${id}-url`}
            value={draftUrl}
            onChange={(event) => {
              setDraftUrl(event.target.value);
              onChange(event.target.value);
            }}
            placeholder="/admissions or https://…"
          />
          <p className="text-muted-foreground text-xs">
            A page on this site starts with “/”. Anything else opens in a new tab.
          </p>
        </>
      ) : null}

      {mode === "attachment" ? (
        <>
          <input
            ref={fileInput}
            type="file"
            accept="application/pdf,.pdf"
            hidden
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (file) void attach(file);
            }}
          />

          {attached ? (
            <div className="flex items-center gap-2 rounded-md border px-3 py-2">
              <FileText className="text-muted-foreground size-4 shrink-0" />
              <span className="min-w-0 flex-1 truncate text-sm">{labelFor(attached)}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={busy}
                onClick={() => fileInput.current?.click()}
              >
                Replace
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                disabled={busy}
                onClick={() => onChange("")}
              >
                <Trash2 className="size-4" />
                <span className="sr-only">Remove the attached file</span>
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={busy}
              onClick={() => fileInput.current?.click()}
            >
              {busy ? <Spinner className="size-4" /> : <Upload className="size-4" />}
              {busy ? "Uploading…" : "Choose a PDF"}
            </Button>
          )}

          <p className="text-muted-foreground text-xs">
            {attached
              ? "The file goes on the site when you publish this page."
              : "PDFs up to 15 MB. The file opens in a new tab."}
          </p>
        </>
      ) : null}

      {error ? <p className="text-destructive text-sm">{error}</p> : null}
    </div>
  );
}
