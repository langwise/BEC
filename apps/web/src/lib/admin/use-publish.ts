"use client";

import * as React from "react";
import type { ValidationIssue } from "./publish";

/**
 * The publish lifecycle as an editor experiences it: press Publish, wait for the
 * site to rebuild, get told it is live. Deploying is the slow part (~2 minutes),
 * so it is a phase of its own rather than a spinner on the button.
 */
export type PublishPhase =
  | "idle"
  | "saving"
  | "deploying"
  | "live"
  | "unchanged"
  | "error";

export type PublishState = {
  phase: PublishPhase;
  message?: string;
  /** Field-level problems, when the server rejected the document. */
  issues?: ValidationIssue[];
  /** The failure was an expired session, so the bar can offer a way back in. */
  signedOut?: boolean;
};

const POLL_MS = 5_000;
/** Vercel builds this site in ~2 minutes; give up reporting after 8. */
const POLL_TIMEOUT_MS = 8 * 60_000;

type DeployResponse = { state: "pending" | "success" | "failure"; description?: string };

/**
 * The half that is the same wherever a Publish button is: send the request,
 * then watch the deploy it produced until the change is actually live.
 *
 * `send` is what differs — a content file goes to its own route as a document,
 * a gallery ([11]) goes to a route that commits the manifest instead. Both come
 * back with the same `{ commit, unchanged }` and both are followed by the same
 * two-minute wait, so only the request itself is worth passing in.
 */
export function usePublishRequest() {
  const [state, setState] = React.useState<PublishState>({ phase: "idle" });
  // Survives re-renders and lets an unmount stop the poll loop mid-flight.
  const cancelled = React.useRef(false);

  React.useEffect(() => {
    cancelled.current = false;
    return () => {
      cancelled.current = true;
    };
  }, []);

  const run = React.useCallback(
    async (send: () => Promise<Response>) => {
      setState({ phase: "saving" });

      let response: Response;
      try {
        response = await send();
      } catch {
        setState({
          phase: "error",
          message: "Could not reach the server. Check your connection and try again.",
        });
        return false;
      }

      const body = (await response.json().catch(() => ({}))) as {
        error?: string;
        issues?: ValidationIssue[];
        unchanged?: boolean;
        commit?: { sha: string } | null;
      };

      if (!response.ok) {
        setState({
          phase: "error",
          message: body.error ?? "Something went wrong while publishing.",
          issues: body.issues,
          signedOut: response.status === 401,
        });
        return false;
      }

      if (body.unchanged || !body.commit) {
        setState({ phase: "unchanged", message: "Nothing had changed, so nothing was published." });
        return true;
      }

      const { sha } = body.commit;
      setState({ phase: "deploying" });

      const startedAt = Date.now();
      while (!cancelled.current) {
        await new Promise((resolve) => setTimeout(resolve, POLL_MS));
        if (cancelled.current) return true;

        let deploy: DeployResponse;
        try {
          const res = await fetch(`/api/admin/deploy/${sha}`);
          if (!res.ok) throw new Error();
          deploy = (await res.json()) as DeployResponse;
        } catch {
          // A blip in the status check is not a failed deploy — keep waiting.
          continue;
        }
        if (cancelled.current) return true;

        if (deploy.state === "success") {
          setState({ phase: "live" });
          return true;
        }
        if (deploy.state === "failure") {
          // Three things an editor needs, in this order: their work is safe, the
          // site is not half-updated, and pressing Publish again is not the fix.
          // A build fails for reasons that have nothing to do with the document
          // — the same Zod contract already passed on the way in — so retrying
          // publishes an identical commit and fails identically.
          setState({
            phase: "error",
            message:
              "Saved, but the site could not rebuild, so it still shows the previous version. " +
              "Your change is not lost — it will appear the next time the site builds. " +
              "Publishing again will not help; please tell the site administrator.",
          });
          return true;
        }

        if (Date.now() - startedAt > POLL_TIMEOUT_MS) {
          setState({
            phase: "error",
            message:
              "Your change was saved, but the site is taking longer than usual to update. It should appear shortly.",
          });
          return true;
        }
      }

      return true;
    },
    [],
  );

  const reset = React.useCallback(() => setState({ phase: "idle" }), []);

  return { state, run, reset };
}

/**
 * Publishing one content file, which is what every editor screen but [11] does.
 *
 * `scope` names one entry of the file's map when that is all this screen edits
 * — the departments editor works a department at a time and the server splices
 * it into HEAD, so the other seventeen never travel.
 */
export function usePublish(file: string, scope?: string) {
  const { state, run, reset } = usePublishRequest();

  const publish = React.useCallback(
    (data: unknown) =>
      run(() =>
        fetch(`/api/admin/content/${file}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(scope === undefined ? { data } : { data, scope }),
        }),
      ),
    [file, scope, run],
  );

  return { state, publish, reset };
}
