import { NextResponse } from "next/server";
import { GitHubError, GitHubTokenMissingError } from "./github.ts";
import { R2NotConfiguredError } from "./r2.ts";

/**
 * Shared shape for the Admin's route handlers. Every message here is read by a
 * non-technical Editor mid-task, so they say what happened and what to do —
 * never a raw status code or a GitHub error string.
 */

export function unauthorized(): NextResponse {
  return NextResponse.json(
    { error: "Your session has expired. Please sign in again." },
    { status: 401 },
  );
}

export function apiError(error: unknown): NextResponse {
  if (error instanceof GitHubTokenMissingError) {
    return NextResponse.json(
      {
        error:
          "The Admin cannot reach GitHub on this deployment. Ask the site administrator to check GITHUB_CONTENT_TOKEN.",
      },
      { status: 500 },
    );
  }

  if (error instanceof R2NotConfiguredError) {
    console.error("[admin]", error.message);
    return NextResponse.json(
      {
        error:
          "The Admin cannot reach the photo storage on this deployment. Ask the site administrator to check the R2 settings.",
      },
      { status: 500 },
    );
  }

  if (error instanceof GitHubError) {
    if (error.status === 401 || error.status === 403) {
      return NextResponse.json(
        {
          error:
            "GitHub refused the Admin's access token. It may have expired — ask the site administrator to renew it.",
        },
        { status: 502 },
      );
    }
    if (error.status === 404) {
      return NextResponse.json(
        {
          error:
            "That content is no longer on the site, so it could not be saved. Please tell the site administrator.",
        },
        { status: 404 },
      );
    }
    if (error.status === 409 || error.status === 422) {
      return NextResponse.json(
        {
          error:
            "Someone else published at the same moment and the save could not be applied. Please try again.",
        },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "The site's files could not be reached just now. Please try again in a moment." },
      { status: 502 },
    );
  }

  console.error("[admin] unhandled route error", error);
  return NextResponse.json(
    { error: "Something went wrong. Please try again." },
    { status: 500 },
  );
}
