"use client";

import * as React from "react";
import { useReportUnsavedChanges } from "./unsaved-changes.tsx";
import { usePublish } from "./use-publish.ts";

/**
 * What every content editor does around its own fields: hold working state,
 * know whether it differs from what was published, warn before the tab closes,
 * and hand the document to `usePublish`.
 *
 * The baseline goes through the *same builder* as the payload, so "changed"
 * means the published document would actually differ — not that a form control
 * touched a value and put it back. Without that, opening a select and picking
 * the option that was already selected leaves the Publish button lit, which
 * teaches Editors to press it for no reason.
 */
export function useEditorDoc<S, D>({
  file,
  content,
  toState,
  toDocument,
  scope,
}: {
  /** The content file name, e.g. "home.json". */
  file: string;
  /** The document as it was loaded from the repository. */
  content: D;
  /** Loaded document → the editor's working shape (row keys minted here). */
  toState: (content: D) => S;
  /** Working shape → the document that gets committed. */
  toDocument: (state: S, content: D) => D;
  /** Set when `content` is one entry of the file rather than the whole of it. */
  scope?: string;
}) {
  const [state, setState] = React.useState<S>(() => toState(content));
  const { state: publishState, publish, reset } = usePublish(file, scope);

  // `toState` and `toDocument` must be module-level functions, not inline
  // closures: they are memo dependencies here, and a new identity each render
  // would rebuild the baseline every time and make `dirty` meaningless.
  const baseline = React.useMemo(
    () => JSON.stringify(toDocument(toState(content), content)),
    [content, toState, toDocument],
  );
  const [publishedAt, setPublishedAt] = React.useState(baseline);

  const document = React.useMemo(
    () => toDocument(state, content),
    [state, content, toDocument],
  );
  const serialized = JSON.stringify(document);
  const dirty = serialized !== publishedAt;

  // Non-technical editors close tabs. Nothing here autosaves, so say so.
  React.useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  // …and the same for a click on the sidebar, which never unloads the page.
  useReportUnsavedChanges(dirty);

  const onPublish = React.useCallback(async () => {
    const sent = serialized;
    if (await publish(document)) setPublishedAt(sent);
  }, [document, serialized, publish]);

  return { state, setState, document, dirty, publishState, onPublish, reset };
}
