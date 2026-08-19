"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { paragraphsToText, textToParagraphs } from "@/lib/admin/paragraphs";

/**
 * The plain fields every editor needs, with the two rules that matter applied
 * once here instead of at ~200 call sites: a label is always tied to its
 * control by id, and the hint under a field says what the value *does on the
 * site* rather than restating the label.
 */

let fieldSeed = 0;
function useFieldId(given?: string): string {
  const [generated] = React.useState(() => {
    fieldSeed += 1;
    return `field-${fieldSeed}`;
  });
  return given ?? generated;
}

type Base = {
  label: string;
  hint?: string;
  id?: string;
  placeholder?: string;
};

export function TextField({
  value,
  onChange,
  label,
  hint,
  id,
  placeholder,
  type = "text",
}: Base & {
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel" | "url";
}) {
  const fieldId = useFieldId(id);
  return (
    <div className="space-y-2">
      <Label htmlFor={fieldId}>{label}</Label>
      <Input
        id={fieldId}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {hint ? <p className="text-muted-foreground text-xs">{hint}</p> : null}
    </div>
  );
}

export function TextAreaField({
  value,
  onChange,
  label,
  hint,
  id,
  placeholder,
  rows = 3,
}: Base & {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  const fieldId = useFieldId(id);
  return (
    <div className="space-y-2">
      <Label htmlFor={fieldId}>{label}</Label>
      <Textarea
        id={fieldId}
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {hint ? <p className="text-muted-foreground text-xs">{hint}</p> : null}
    </div>
  );
}

/**
 * Prose held as an array of paragraphs. The array is rebuilt on every
 * keystroke, but the *text* is what state holds — round-tripping through the
 * array while typing would eat the blank line the moment it was typed.
 */
export function ParagraphsField({
  value,
  onChange,
  label,
  hint,
  id,
  placeholder,
  rows = 8,
}: Base & {
  value: readonly string[];
  onChange: (value: string[]) => void;
  rows?: number;
}) {
  const fieldId = useFieldId(id);
  const published = paragraphsToText(value);
  const [text, setText] = React.useState(published);

  // Re-seed when the value arrives from outside — a reorder, or a row being
  // replaced — but never while the Editor is typing, which is why the guard
  // compares against what this box would itself have produced. Adjusting state
  // during render is the supported way to derive from props without a
  // one-frame flash of the stale value.
  const [seen, setSeen] = React.useState(published);
  if (published !== seen) {
    setSeen(published);
    if (published !== paragraphsToText(textToParagraphs(text))) setText(published);
  }

  const count = textToParagraphs(text).length;

  return (
    <div className="space-y-2">
      <Label htmlFor={fieldId}>{label}</Label>
      <Textarea
        id={fieldId}
        value={text}
        rows={rows}
        placeholder={placeholder}
        onChange={(event) => {
          setText(event.target.value);
          onChange(textToParagraphs(event.target.value));
        }}
      />
      <p className="text-muted-foreground text-xs">
        {hint ? `${hint} ` : ""}
        Leave a blank line between paragraphs — {count === 1 ? "1 paragraph" : `${count} paragraphs`} so far.
      </p>
    </div>
  );
}

export function ChoiceField<T extends string>({
  value,
  onChange,
  label,
  hint,
  id,
  options,
}: Base & {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  const fieldId = useFieldId(id);
  return (
    <div className="space-y-2">
      <Label htmlFor={fieldId}>{label}</Label>
      <Select value={value} onValueChange={(next) => onChange(next as T)}>
        <SelectTrigger id={fieldId} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {hint ? <p className="text-muted-foreground text-xs">{hint}</p> : null}
    </div>
  );
}

/** A titled block of an editor screen — what an Editor thinks of as "a part of the page". */
export function EditorSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{description}</p>
      </div>
      {children}
    </section>
  );
}

/** Two fields side by side on a wide screen, stacked on a phone. */
export function FieldRow({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}
