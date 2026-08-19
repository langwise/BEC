import { AlertCircle } from "lucide-react";
import type { LoadFailure } from "@/lib/admin/github";

/**
 * The three ways a screen can fail to open, told apart because the advice
 * differs. "Try again" is the right thing to say to a bad minute at GitHub and
 * the wrong thing to say to a file that is not there — an Editor told to retry
 * something that can never succeed will sit and retry it.
 *
 * None of them name the API that failed, or call anything a repository: those
 * are words an Editor can neither act on nor be expected to know.
 */
const ADVICE: Record<LoadFailure, string> = {
  missing:
    "This screen's content has not been set up yet, so there is nothing to open. Trying again will not help; please tell the site administrator.",
  unconfigured:
    "This Admin has not been given access to the site's files, so nothing here can be opened or saved. Please tell the site administrator — the fix is on their side.",
  unreachable:
    "The site's files could not be reached just now. Please try again in a moment — if it keeps happening, tell the site administrator.",
};

export function LoadFailed({
  what,
  reason = "unreachable",
}: {
  what: string;
  reason?: LoadFailure;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-destructive border-destructive/30 bg-destructive/5 flex gap-3 rounded-lg border p-5">
        <AlertCircle className="mt-0.5 size-5 shrink-0" />
        <div className="text-sm leading-relaxed">
          <p className="font-medium">The {what} content could not be loaded.</p>
          <p className="mt-1">{ADVICE[reason]}</p>
        </div>
      </div>
    </div>
  );
}
