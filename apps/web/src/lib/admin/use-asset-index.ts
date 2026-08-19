"use client";

import * as React from "react";
import type { AssetKind } from "./asset-index";

export type AssetCatalogue = { base: string; keys: string[] };

type State =
  | { status: "loading" }
  | { status: "ready"; catalogue: AssetCatalogue }
  | { status: "error"; message: string };

/**
 * One fetch per kind for the whole page, shared by every picker on it. The
 * catalogue is ~2,950 keys; a component that refetched on each mount would
 * download it once per image field on a form.
 */
const cache = new Map<string, Promise<AssetCatalogue>>();

function load(kind: AssetKind | "all"): Promise<AssetCatalogue> {
  const existing = cache.get(kind);
  if (existing) return existing;

  const request = fetch(`/api/admin/assets?kind=${kind}`)
    .then(async (response) => {
      const body = (await response.json().catch(() => ({}))) as Partial<AssetCatalogue> & {
        error?: string;
      };
      if (!response.ok || !body.base || !body.keys) {
        throw new Error(body.error ?? "The photo library could not be loaded.");
      }
      return { base: body.base, keys: body.keys };
    })
    .catch((error: unknown) => {
      // A failed load must not be cached, or the picker stays broken until reload.
      cache.delete(kind);
      throw error;
    });

  cache.set(kind, request);
  return request;
}

export function useAssetIndex(kind: AssetKind | "all", enabled = true): State {
  const [state, setState] = React.useState<State>({ status: "loading" });

  React.useEffect(() => {
    if (!enabled) return;
    let live = true;
    setState({ status: "loading" });
    load(kind)
      .then((catalogue) => live && setState({ status: "ready", catalogue }))
      .catch((error: unknown) => {
        if (!live) return;
        setState({
          status: "error",
          message:
            error instanceof Error ? error.message : "The photo library could not be loaded.",
        });
      });
    return () => {
      live = false;
    };
  }, [kind, enabled]);

  return state;
}

/** The public URL for a key, built from the base the manifest was generated with. */
export function assetUrl(base: string, key: string): string {
  return `${base}/${key}`;
}
