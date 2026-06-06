// Loads apps/web/.env.local into process.env (no dotenv dependency).
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const envPath = join(here, "..", ".env.local");

export function loadEnv() {
  let raw;
  try {
    raw = readFileSync(envPath, "utf8");
  } catch {
    throw new Error(`missing ${envPath} — create it (see .env.example)`);
  }
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const [, k, v] = m;
    if (process.env[k] === undefined) process.env[k] = v.replace(/^["']|["']$/g, "");
  }
  return process.env;
}

export function requireEnv(...keys) {
  const env = loadEnv();
  const missing = keys.filter((k) => !env[k]);
  if (missing.length) throw new Error(`missing env: ${missing.join(", ")}`);
  return env;
}
