"use client";

import { AlertCircle, CheckCircle2, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PublishState } from "@/lib/admin/use-publish";
import { cn } from "@/lib/utils";

/**
 * The bar every editor screen ends with: whether there is anything to publish,
 * the button, and what happened afterwards. Deploy progress is spelled out
 * rather than left as a spinner — "saved" and "live on the site" are two
 * different things and an editor needs to know which one they have.
 */
export function PublishBar({
  state,
  dirty,
  onPublish,
  blockedReason,
  viewUrl,
}: {
  state: PublishState;
  dirty: boolean;
  onPublish: () => void;
  /** Set when the form is not publishable yet; explains why, and disables the button. */
  blockedReason?: string;
  /**
   * The page on the site this screen edits. Offered once the change is live,
   * because "is it really there?" is the question every Editor has next, and
   * looking is the only answer they can check for themselves.
   */
  viewUrl?: string;
}) {
  const busy = state.phase === "saving" || state.phase === "deploying";
  const disabled = busy || !dirty || Boolean(blockedReason);

  return (
    <div className="sticky bottom-0 z-10 -mx-4 border-t bg-background/95 px-4 py-3 backdrop-blur md:-mx-6 md:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Status state={state} dirty={dirty} blockedReason={blockedReason} viewUrl={viewUrl} />
        <Button onClick={onPublish} disabled={disabled} size="lg">
          {busy ? <Loader2 className="animate-spin" /> : null}
          {state.phase === "saving"
            ? "Saving…"
            : state.phase === "deploying"
              ? "Updating the site…"
              : "Publish"}
        </Button>
      </div>

      {state.issues && state.issues.length > 0 ? (
        <ul className="text-destructive mt-3 space-y-1 text-sm">
          {state.issues.map((issue) => (
            <li key={`${issue.path}-${issue.message}`}>
              <span className="font-medium">{issue.path}</span> — {issue.message}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Status({
  state,
  dirty,
  blockedReason,
  viewUrl,
}: {
  state: PublishState;
  dirty: boolean;
  blockedReason?: string;
  viewUrl?: string;
}) {
  if (blockedReason) {
    return <Line tone="warn" icon={AlertCircle} text={blockedReason} />;
  }

  switch (state.phase) {
    case "saving":
      return <Line tone="muted" icon={Loader2} spin text="Saving your changes…" />;
    case "deploying":
      return (
        <Line
          tone="muted"
          icon={Loader2}
          spin
          text="Saved. The site is updating — this usually takes about two minutes."
        />
      );
    case "live":
      return (
        <Line tone="ok" icon={CheckCircle2} text="Published. Your change is live on the site.">
          {viewUrl ? <SiteLink url={viewUrl} /> : null}
        </Line>
      );
    case "unchanged":
      return <Line tone="muted" icon={CheckCircle2} text={state.message ?? "Nothing to publish."} />;
    case "error":
      return (
        <Line tone="error" icon={AlertCircle} text={state.message ?? "Something went wrong."}>
          {state.signedOut ? <SignInAgainLink /> : null}
        </Line>
      );
    default:
      return (
        <Line
          tone="muted"
          icon={dirty ? AlertCircle : CheckCircle2}
          text={dirty ? "You have unpublished changes." : "Everything here is published."}
        />
      );
  }
}

/** Same wording and icon as the gallery screen's own link, on purpose. */
function SiteLink({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="ml-2 inline-flex items-center gap-1 underline underline-offset-2"
    >
      See it on the site
      <ExternalLink className="size-3" />
    </a>
  );
}

/**
 * Opens in a new tab, deliberately: signing in here would replace this screen
 * and take the unpublished work with it. Sign in there, come back, press
 * Publish again.
 */
function SignInAgainLink() {
  return (
    <a
      href="/admin/login"
      target="_blank"
      rel="noopener noreferrer"
      className="ml-2 inline-flex items-center gap-1 underline underline-offset-2"
    >
      Sign in again in a new tab
      <ExternalLink className="size-3" />
    </a>
  );
}

function Line({
  tone,
  icon: Icon,
  text,
  spin,
  children,
}: {
  tone: "muted" | "ok" | "warn" | "error";
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  spin?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-sm",
        tone === "muted" && "text-muted-foreground",
        tone === "ok" && "text-green-700",
        tone === "warn" && "text-amber-700",
        tone === "error" && "text-destructive",
      )}
    >
      <Icon className={cn("h-4 w-4 shrink-0", spin && "animate-spin")} />
      <span>
        {text}
        {children}
      </span>
    </p>
  );
}
