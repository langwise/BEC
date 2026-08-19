"use client";

import * as React from "react";
import Link from "next/link";
import { useConfirmDiscard } from "@/lib/admin/unsaved-changes";

/**
 * A link that asks first when the screen has unpublished work.
 *
 * Every way out of an editor goes through here — the sidebar, the logo, the
 * mobile menu — because a client-side route change never unloads the page, so
 * the browser's own "leave site?" prompt is not offered and the work simply
 * disappears.
 */
export function GuardedLink({
  onClick,
  ...props
}: React.ComponentProps<typeof Link>) {
  const confirmDiscard = useConfirmDiscard();

  return (
    <Link
      {...props}
      onClick={(event) => {
        if (!confirmDiscard()) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
    />
  );
}
