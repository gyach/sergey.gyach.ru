import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { localizedContent, site } from "../src/data/site.ts";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const rendererPath = resolve(rootDir, "scripts/render-resume-pdfs.py");
const python = process.env.RESUME_PDF_PYTHON || process.env.PYTHON || "python3";

const data = {
  rootDir,
  site,
  localizedContent
};

const result = spawnSync(python, [rendererPath], {
  input: JSON.stringify(data),
  encoding: "utf8",
  stdio: ["pipe", "inherit", "inherit"]
});

if (result.error) {
  throw result.error;
}

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
