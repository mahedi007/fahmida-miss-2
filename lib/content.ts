import fs from "node:fs";
import path from "node:path";
import type { Page, Settings } from "./types";

const ROOT = path.join(process.cwd(), "content");

export function getSettings(): Settings {
  return JSON.parse(fs.readFileSync(path.join(ROOT, "settings.json"), "utf8"));
}

export function getPage(slug: string): Page | null {
  const file = path.join(ROOT, "pages", `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function getPageSlugs(): string[] {
  return fs
    .readdirSync(path.join(ROOT, "pages"))
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""))
    .filter((s) => s !== "home");
}
