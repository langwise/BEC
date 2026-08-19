"use client";

import * as React from "react";

/**
 * Stops an Editor walking away from work they have not published.
 *
 * `beforeunload` covers closing the tab, but the likelier accident is smaller
 * and quieter: half an announcement typed, a glance at the sidebar, one click
 * on "Home page", and the browser never left the page so nothing warned them.
 * Nothing here autosaves and there is no draft to come back to, so that click
 * has to ask.
 *
 * The flag lives in a ref rather than state on purpose — the sidebar only
 * needs to read it at the moment of a click, and re-rendering the whole shell
 * on every keystroke to keep a boolean in sync would be a real cost for no
 * visible gain.
 */
const UnsavedChangesContext = React.createContext<React.RefObject<boolean> | null>(null);

export function UnsavedChangesProvider({ children }: { children: React.ReactNode }) {
  const dirtyRef = React.useRef(false);
  return (
    <UnsavedChangesContext.Provider value={dirtyRef}>{children}</UnsavedChangesContext.Provider>
  );
}

/** Editor screens report their unpublished state here. */
export function useReportUnsavedChanges(dirty: boolean): void {
  const dirtyRef = React.useContext(UnsavedChangesContext);

  React.useEffect(() => {
    if (!dirtyRef) return;
    dirtyRef.current = dirty;
    // Leaving the screen clears the flag: the next one has its own answer, and
    // a stale `true` would make every later click ask about work that is gone.
    return () => {
      dirtyRef.current = false;
    };
  }, [dirtyRef, dirty]);
}

/**
 * Ask before leaving, if there is anything to lose. Returns true when the
 * caller should go ahead.
 */
export function useConfirmDiscard(): () => boolean {
  const dirtyRef = React.useContext(UnsavedChangesContext);

  return () => {
    if (!dirtyRef?.current) return true;
    return window.confirm(
      "You have changes on this screen that have not been published yet.\n\n" +
        "If you leave now they are lost. Leave anyway?",
    );
  };
}
