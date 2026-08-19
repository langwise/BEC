/**
 * Which strings in a content file are R2 asset keys — asked of the schema, not
 * of the string.
 *
 * Guessing by shape does not work here: `departments.json` carries filter lists
 * like `galleryExclude: ["cine1770.webp"]` whose entries look exactly like keys
 * and are not. The Zod contract already marks the real ones with `assetKey()`,
 * so the marker is the answer, and this walks the schema and the data together
 * to collect them.
 *
 * Used by the build gate in scripts/validate-content.mjs, which fails when a
 * marked field names a file the manifest has never heard of.
 */

import type { z } from "zod";

/** One asset key found in a content file, with the JSON path that holds it. */
export type AssetKeyRef = { path: string; key: string };

type ZodNode = { _zod?: { def?: Record<string, unknown> } };

function defOf(schema: unknown): (Record<string, unknown> & { type: string }) | undefined {
  const def = (schema as ZodNode)?._zod?.def;
  return typeof def?.type === "string" ? (def as Record<string, unknown> & { type: string }) : undefined;
}

function isAssetKeyField(schema: unknown): boolean {
  const meta = (schema as { meta?: () => Record<string, unknown> | undefined }).meta?.();
  return meta?.assetKey === true;
}

/**
 * Every asset key `data` holds, according to `schema`.
 *
 * An unhandled node type throws rather than being skipped: a gate that quietly
 * stops covering a field is worse than no gate at all, because it still reads
 * as coverage.
 */
export function collectAssetKeys(schema: z.ZodType, data: unknown): AssetKeyRef[] {
  const found: AssetKeyRef[] = [];

  const walk = (node: unknown, value: unknown, path: string): void => {
    if (value === undefined || value === null) return;
    const def = defOf(node);
    if (!def) return;

    switch (def.type) {
      case "string":
        if (isAssetKeyField(node) && typeof value === "string") found.push({ path, key: value });
        return;

      case "boolean":
      case "number":
      case "bigint":
      case "date":
      case "literal":
      case "enum":
      case "null":
      case "undefined":
      case "any":
      case "unknown":
      case "never":
        return;

      case "object": {
        const shape = def.shape as Record<string, unknown>;
        if (typeof value !== "object" || Array.isArray(value)) return;
        for (const [key, child] of Object.entries(shape)) {
          walk(child, (value as Record<string, unknown>)[key], `${path}.${key}`);
        }
        return;
      }

      case "array": {
        if (!Array.isArray(value)) return;
        value.forEach((item, i) => walk(def.element, item, `${path}[${i}]`));
        return;
      }

      case "record": {
        if (typeof value !== "object" || Array.isArray(value)) return;
        for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
          walk(def.valueType, item, `${path}[${JSON.stringify(key)}]`);
        }
        return;
      }

      case "optional":
      case "nullable":
      case "default":
      case "prefault":
      case "readonly":
      case "nonoptional":
      case "catch":
        walk(def.innerType, value, path);
        return;

      case "union": {
        // `string | { ... }` fields are common in departments.json. Only the
        // branch that actually accepts this value can describe it.
        for (const option of def.options as z.ZodType[]) {
          if (option.safeParse(value).success) {
            walk(option, value, path);
            return;
          }
        }
        return;
      }

      case "tuple": {
        if (!Array.isArray(value)) return;
        (def.items as unknown[]).forEach((item, i) => walk(item, value[i], `${path}[${i}]`));
        return;
      }

      case "lazy":
        walk((def.getter as () => unknown)(), value, path);
        return;

      case "pipe":
        walk(def.out, value, path);
        return;

      default:
        throw new Error(
          `collectAssetKeys: unhandled Zod node "${def.type}" at ${path}. ` +
            `Add it to src/content/schema/asset-fields.ts — until then this field's asset keys go unchecked.`,
        );
    }
  };

  walk(schema, data, "$");
  return found;
}
