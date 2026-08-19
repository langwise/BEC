/**
 * Laying the picker's tiles out.
 *
 * The grid is virtualized by row, so the component needs its entries already
 * arranged into rows of a known length. Splitting that out keeps the browsing
 * rules — folders first, then assets, search replaces both — testable without a
 * DOM, and leaves the component to do nothing but draw.
 */

import { childFolders, filesIn, searchKeys, type Folder } from "./asset-tree.ts";

export type GridEntry =
  | { type: "folder"; id: string; folder: Folder }
  | { type: "asset"; id: string; key: string };

/**
 * What to show for a given browsing state. A search looks everywhere and
 * returns assets only; without one, the current folder's subfolders come first
 * so an editor can keep drilling down.
 */
export function gridEntries(
  keys: readonly string[],
  prefix: string,
  query: string,
): GridEntry[] {
  if (query.trim()) {
    return searchKeys(keys, query).map((key) => ({ type: "asset", id: key, key }));
  }
  return [
    ...childFolders(keys, prefix).map(
      (folder): GridEntry => ({ type: "folder", id: `folder:${folder.prefix}`, folder }),
    ),
    ...filesIn(keys, prefix).map((key): GridEntry => ({ type: "asset", id: key, key })),
  ];
}

export function chunk<T>(items: readonly T[], size: number): T[][] {
  if (size < 1) return items.length ? [[...items]] : [];
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
}

/** Tile sizing, shared between the layout maths and the component's styles. */
export const TILE_MIN_WIDTH = 132;
export const TILE_GAP = 12;
export const ROW_HEIGHT = 168;

const MAX_COLUMNS = 8;

/** How many tiles fit across `width` pixels; never fewer than two, never absurd. */
export function columnsForWidth(width: number): number {
  if (!Number.isFinite(width) || width <= 0) return 2;
  const fits = Math.floor((width + TILE_GAP) / (TILE_MIN_WIDTH + TILE_GAP));
  return Math.min(MAX_COLUMNS, Math.max(2, fits));
}

/** The row a key sits on, so opening the picker can scroll to the current photo. */
export function rowOf(entries: readonly GridEntry[], key: string, columns: number): number {
  const index = entries.findIndex((entry) => entry.type === "asset" && entry.key === key);
  return index === -1 ? -1 : Math.floor(index / Math.max(1, columns));
}
