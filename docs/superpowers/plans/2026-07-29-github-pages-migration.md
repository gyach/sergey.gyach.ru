# GitHub Pages Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `sergey.gyach.ru` from a standalone Docker/Timeweb deployment to a static Next.js export published from `main` by GitHub Pages.

**Architecture:** Next.js remains the application framework, but `next build` produces a serverless `out/` directory with unoptimized public images. A two-job GitHub Actions workflow validates and uploads that directory, then deploys it to the `github-pages` environment; custom-domain and DNS cutover remain explicit external operations.

**Tech Stack:** Node.js 22 from `.nvmrc`, npm, Next.js 16 App Router static export, React 19, TypeScript, ESLint 9, GitHub Actions, GitHub Pages.

## Global Constraints

- Keep `https://sergey.gyach.ru` as the canonical and production URL.
- Do not configure `basePath` or `assetPrefix`.
- Keep RU/EN localization, light/dark/auto themes, metadata, assets, resume PDFs, and Yandex Metrika behavior unchanged.
- Use npm and `package-lock.json`; do not introduce yarn, pnpm, or new dependencies.
- Use `actions/checkout@v7`, `actions/setup-node@v6`, `actions/configure-pages@v6`, `actions/upload-pages-artifact@v4`, and `actions/deploy-pages@v5`.
- Call `actions/configure-pages@v6` without `static_site_generator: next`.
- Restrict push and manual deployments to `refs/heads/main`.
- Do not add `CNAME`, `.nojekyll`, `basePath`, or `assetPrefix`.
- Do not modify Pages settings, DNS, Timeweb, repository secrets, or GHCR as part of repository implementation.
- Do not commit, push, deploy, or perform external cutover unless the user explicitly authorizes that action. Commit steps below are gates and must be skipped when authorization is absent.
- Preserve unrelated user changes if the working tree is not clean at execution time.

## Execution Baseline

Before Task 1, capture the existing working-tree state:

```bash
git status --short --untracked-files=all
git diff --check
git diff --cached --check
```

At plan-writing time, the documentation changes are pre-existing task state:

```text
 M docs/superpowers/specs/2026-07-29-github-pages-migration-design.md
?? docs/superpowers/plans/2026-07-29-github-pages-migration.md
```

Re-check this baseline at execution time because the user may commit or edit
the documents first. Never delete, stage, or overwrite a baseline path unless
the user explicitly authorizes that exact scope. Task-level reviews compare
against the recorded baseline plus that task's named files; they do not require
an absolutely clean working tree.

## File Structure

- Modify `next.config.ts`: select static export and disable the server image optimizer.
- Modify `package.json`: remove scripts that start or prepare a standalone server.
- Modify `.github/workflows/deploy.yml`: replace the Docker/Timeweb workflow with Pages build and deploy jobs.
- Modify `README.md`: document static builds, Pages deployment, and manual custom-domain cutover.
- Modify `AGENTS.md`: make agent guidance consistent with static export and GitHub Pages.
- Delete `src/app/api/health/route.ts`: remove the obsolete runtime health endpoint.
- Delete `Dockerfile`: remove the container build.
- Delete `.dockerignore`: remove container-only ignore rules.
- Delete `scripts/timeweb-deploy.sh`: remove the remote container deployment implementation.
- Preserve `public/resume/README.md`: its current PDF regeneration instructions are already accurate.
- Preserve `package-lock.json`: script-only `package.json` edits do not change the dependency graph.

---

### Task 1: Produce a Serverless Next.js Export

**Files:**
- Modify: `next.config.ts:3-5`
- Modify: `package.json:5-12`
- Delete: `src/app/api/health/route.ts`
- Delete: `Dockerfile`
- Delete: `.dockerignore`
- Delete: `scripts/timeweb-deploy.sh`

**Interfaces:**
- Consumes: existing `next/image` usage with root-relative public asset paths.
- Produces: `npm run build` writes the complete deployable site to `out/`.

- [ ] **Step 1: Confirm the current configuration fails the static-hosting contract**

Run:

```bash
rg -q 'output: "export"' next.config.ts
```

Expected: FAIL with exit code 1 because the current configuration uses
`output: "standalone"`.

Run:

```bash
node -e 'const scripts = require("./package.json").scripts; if (scripts.start || scripts["prepare:standalone"]) process.exit(1)'
```

Expected: FAIL with exit code 1 because both server-only scripts exist.

- [ ] **Step 2: Configure Next.js for static export**

Replace `next.config.ts` with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true
  }
};

export default nextConfig;
```

- [ ] **Step 3: Remove standalone server scripts**

Change the `scripts` object in `package.json` to:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "generate:resume": "node --no-warnings scripts/generate-resume-pdfs.mjs",
  "lint": "eslint ."
}
```

Do not run `npm install`; the dependency graph and `package-lock.json` must
remain unchanged.

- [ ] **Step 4: Delete the obsolete runtime and deployment files**

Delete exactly:

```text
src/app/api/health/route.ts
Dockerfile
.dockerignore
scripts/timeweb-deploy.sh
```

Do not delete `scripts/generate-resume-pdfs.mjs`,
`scripts/render-resume-pdfs.py`, or any files under `public/`.

- [ ] **Step 5: Verify the configuration and removed surface**

Run:

```bash
rg -q 'output: "export"' next.config.ts
node -e 'const scripts = require("./package.json").scripts; if (scripts.start || scripts["prepare:standalone"]) process.exit(1)'
test ! -e src/app/api/health/route.ts
test ! -e Dockerfile
test ! -e .dockerignore
test ! -e scripts/timeweb-deploy.sh
git diff -- package-lock.json
```

Expected: all assertions pass and `git diff -- package-lock.json` prints
nothing.

- [ ] **Step 6: Build and inspect the static export**

Run:

```bash
npm ci
npm run lint
npm run build
test -f out/index.html
test -f out/images/avatar-2026.jpg
test -f out/icons/icon-light.svg
test -f out/icons/icon-dark.svg
test -f out/resume/sergey-gyach-cv-ru.pdf
test -f out/resume/sergey-gyach-cv-en.pdf
test -d out/_next/static
test -n "$(find out/_next/static -type f -print -quit)"
rg -q '/_next/static/' out/index.html
test ! -e out/api/health
git diff -- package-lock.json
git diff --cached -- package-lock.json
```

Expected: lint and build pass, all required files exist, and no health route is
exported. Both lockfile diffs print nothing.

- [ ] **Step 7: Review and commit Task 1 if commits are authorized**

Run:

```bash
git diff --check
git status --short
git diff -- next.config.ts package.json src/app/api/health/route.ts Dockerfile .dockerignore scripts/timeweb-deploy.sh
```

Compare the output with the recorded baseline and confirm that Task 1 added
only its named files. If the user has explicitly authorized implementation
commits:

```bash
git add next.config.ts package.json src/app/api/health/route.ts Dockerfile .dockerignore scripts/timeweb-deploy.sh
git commit -m "Convert site to static Next.js export"
```

Otherwise leave the verified changes uncommitted and continue only with the
user's approval.

---

### Task 2: Publish the Export Through GitHub Pages

**Files:**
- Modify: `.github/workflows/deploy.yml:1-74`

**Interfaces:**
- Consumes: Task 1's `npm run build` contract and generated `out/` directory.
- Produces: a `github-pages` artifact and a deployment URL in
  `steps.deployment.outputs.page_url`.

- [ ] **Step 1: Confirm the current workflow fails the Pages contract**

Run:

```bash
rg -q 'actions/deploy-pages@v5' .github/workflows/deploy.yml
```

Expected: FAIL with exit code 1 because the current workflow deploys a Docker
image to Timeweb.

- [ ] **Step 2: Replace the deployment workflow**

Replace `.github/workflows/deploy.yml` with:

```yaml
name: Deploy Next.js site to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: read

    steps:
      - name: Checkout
        uses: actions/checkout@v7

      - name: Setup Node
        uses: actions/setup-node@v6
        with:
          node-version-file: .nvmrc
          cache: npm

      - name: Setup Pages
        uses: actions/configure-pages@v6

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build

      - name: Validate static export
        run: |
          set -euo pipefail
          test -f out/index.html
          test -f out/images/avatar-2026.jpg
          test -f out/icons/icon-light.svg
          test -f out/icons/icon-dark.svg
          test -f out/resume/sergey-gyach-cv-ru.pdf
          test -f out/resume/sergey-gyach-cv-en.pdf
          test -d out/_next/static
          test -n "$(find out/_next/static -type f -print -quit)"
          rg -q '/_next/static/' out/index.html
          out_kib="$(du -sk out | cut -f1)"
          test "$out_kib" -lt 1048576

      - name: Upload GitHub Pages artifact
        uses: actions/upload-pages-artifact@v4
        with:
          path: ./out

  deploy:
    if: github.ref == 'refs/heads/main'
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

Do not add `static_site_generator: next`; `next.config.ts` is the source of
truth for export and image behavior.

- [ ] **Step 3: Validate the workflow's required structure**

Run:

```bash
for needle in \
  'actions/checkout@v7' \
  'actions/setup-node@v6' \
  'actions/configure-pages@v6' \
  'actions/upload-pages-artifact@v4' \
  'actions/deploy-pages@v5' \
  'node-version-file: .nvmrc' \
  'contents: read' \
  'pages: read' \
  'pages: write' \
  'id-token: write' \
  'needs: build' \
  'name: github-pages' \
  'cancel-in-progress: false'
do
  rg -Fq "$needle" .github/workflows/deploy.yml
done

test "$(rg -Fc "if: github.ref == 'refs/heads/main'" .github/workflows/deploy.yml)" -eq 2
! rg -ni 'static_site_generator|docker|ghcr|ssh|timeweb|GHCR_TOKEN' .github/workflows/deploy.yml
```

Expected:

- every required action, permission, Node, environment, and concurrency value
  is present;
- exactly two jobs contain the `main` ref guard;
- the final negated search prints nothing and exits successfully.

- [ ] **Step 4: Re-run repository build gates**

Run:

```bash
npm run lint
npm run build
test -f out/index.html
test -d out/_next/static
test -n "$(find out/_next/static -type f -print -quit)"
rg -q '/_next/static/' out/index.html
git diff --check
git diff -- package-lock.json
git diff --cached -- package-lock.json
```

Expected: every command succeeds.

- [ ] **Step 5: Review and commit Task 2 if commits are authorized**

Run:

```bash
git status --short
git diff -- .github/workflows/deploy.yml
```

Compare the output with the recorded baseline and Task 1, then confirm that
Task 2 adds only the workflow. If the user has explicitly authorized
implementation commits:

```bash
git add .github/workflows/deploy.yml
git commit -m "Deploy static site to GitHub Pages"
```

Otherwise leave the verified workflow uncommitted.

---

### Task 3: Align Repository Documentation With Static Hosting

**Files:**
- Modify: `README.md:1-64`
- Modify: `AGENTS.md:6-200`

**Interfaces:**
- Consumes: Task 1's static build contract and Task 2's Pages workflow.
- Produces: contributor and agent instructions that contain no obsolete
  standalone, Docker, Timeweb, GHCR, or runtime-health guidance.

- [ ] **Step 1: Confirm that obsolete deployment guidance is present**

Run:

```bash
rg -n 'standalone|Docker|Timeweb|GHCR|api/health|npm start|timeweb-deploy' README.md AGENTS.md
```

Expected: the command prints the existing server deployment instructions.

- [ ] **Step 2: Rewrite the README deployment guidance**

Keep the existing title, content description, localization behavior, and hero
image information. Make the operational sections read:

````markdown
## Local development

```bash
npm ci
npm run dev
```

The development server runs at `http://localhost:3000` by default.

## Production build

```bash
npm run lint
npm run build
```

Next.js exports the complete static site to `out/`. To inspect that output
locally, serve `out/` with any static HTTP server.

## GitHub Pages deployment

Pushes to `main` run `.github/workflows/deploy.yml`. The workflow validates the
project, builds `out/`, uploads it as a GitHub Pages artifact, and deploys it to
the `github-pages` environment.

Repository setup:

1. Select **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Restrict the `github-pages` environment to `main`.
3. Add `sergey.gyach.ru` as the custom domain.
4. Configure the `sergey` DNS CNAME to `gyach.github.io`.
5. After GitHub provisions the certificate, enable **Enforce HTTPS**.

The site intentionally has no `basePath` because production is served from the
root of `https://sergey.gyach.ru`. Do not validate the final asset paths through
the repository subpath URL.

GitHub Pages only serves static files. Features that require a Next.js runtime,
including request-dependent route handlers, cookies, Server Actions, runtime
redirects or headers, incremental static regeneration, and the default image
optimizer, are not supported.
````

- [ ] **Step 3: Update AGENTS.md facts and commands**

Make these exact semantic changes without altering unrelated content,
localization, UI, or React guidance:

1. In **Project Overview**, replace “deployed as a standalone Dockerized Next.js
   app” with “statically exported and deployed to GitHub Pages”.
2. In **Stack and Runtime**, replace `output: "standalone"` with
   `output: "export"` and state that `images.unoptimized: true` is required for
   GitHub Pages.
3. In **Useful Commands**, keep `npm ci`, `npm run dev`, `npm run lint`, and
   `npm run build`. Replace standalone, Docker, and health-check commands with:

   ```bash
   python3 -m http.server 3000 --directory out
   ```

   State that any static HTTP server may be used and that no production Node
   server is part of the repository.
4. In **Repository Map**, remove the health route, Docker deploy script, and
   GHCR/Timeweb descriptions. Describe:

   ```text
   public/resume/ - committed RU and EN CV PDFs plus regeneration instructions.
   .github/workflows/deploy.yml - validates and deploys out/ to GitHub Pages.
   ```

5. Replace the obsolete singular `site.cvUrl` rule with the actual
   `site.cvUrls` rule: both locale-specific paths must continue to point to the
   corresponding files under `public/resume/`.
6. In **React and Next.js Performance Notes**, retain `next/image` guidance but
   add that static Pages hosting requires unoptimized images or an explicitly
   configured external loader.
7. In **Validation Expectations**, remove the `/api/health` assertion and add
   checks for `out/index.html`, images, favicons, both PDFs, browser console, and
   network failures.
8. Replace **Deployment Notes** with:

   ```markdown
   ## Deployment Notes

   - `.github/workflows/deploy.yml` deploys only `main`.
   - The build job runs lint and static export before uploading `out/`.
   - The deploy job publishes through the protected `github-pages` environment.
   - The custom domain and DNS are configured outside the repository.
   - Do not change Pages settings, DNS, or the production domain unless the user
     explicitly asks.
   - Static hosting does not support cookies, Server Actions, request-dependent
     route handlers, runtime redirects or headers, incremental static
     regeneration, or the default Next.js image optimizer.
   ```

- [ ] **Step 4: Verify documentation against the implemented repository**

Run:

```bash
! rg -n 'standalone|Docker|Timeweb|GHCR|api/health|npm start|timeweb-deploy|TIMEWEB_' README.md AGENTS.md
rg -n 'output: "export"|GitHub Pages|github-pages|out/|sergey.gyach.ru|site.cvUrls' README.md AGENTS.md
git diff --check
```

Expected: the obsolete-term search prints nothing; the positive search shows
the static export, deployment, custom-domain, and localized-PDF guidance.

- [ ] **Step 5: Review and commit Task 3 if commits are authorized**

Run:

```bash
git status --short
git diff -- README.md AGENTS.md
```

Compare the output with the recorded baseline and Tasks 1–2, then confirm that
the documentation matches the actual files and workflow. If the user has
explicitly authorized implementation commits:

```bash
git add README.md AGENTS.md
git commit -m "Document GitHub Pages deployment"
```

Otherwise leave the verified documentation uncommitted.

---

### Task 4: Run Integrated Static-Site Verification

**Files:**
- Verify: `next.config.ts`
- Verify: `package.json`
- Verify: `.github/workflows/deploy.yml`
- Verify: `README.md`
- Verify: `AGENTS.md`
- Verify generated output: `out/` (ignored; do not commit)

**Interfaces:**
- Consumes: the completed repository migration from Tasks 1–3.
- Produces: evidence that the repository is ready for an authorized push and
  external Pages cutover.

- [ ] **Step 1: Run all automated gates from a clean generated-output state**

First prove that `out/` is ignored, untracked, and not a symbolic link. Then
remove only that generated export, reinstall exactly from the lockfile, and
rebuild:

```bash
test -z "$(git ls-files -- out)"
git check-ignore -q out
test ! -L out
rm -rf -- out
npm ci
npm run lint
npm run build
git diff -- package-lock.json
git diff --cached -- package-lock.json
```

Expected: every command exits successfully, Next.js recreates `out/`, and both
lockfile diffs print nothing.

- [ ] **Step 2: Validate the generated artifact**

Run:

```bash
test -f out/index.html
test -f out/images/avatar-2026.jpg
test -f out/icons/icon-light.svg
test -f out/icons/icon-dark.svg
test -f out/resume/sergey-gyach-cv-ru.pdf
test -f out/resume/sergey-gyach-cv-en.pdf
test -d out/_next/static
test -n "$(find out/_next/static -type f -print -quit)"
rg -q '/_next/static/' out/index.html
test ! -e out/api/health
out_kib="$(du -sk out | cut -f1)"
test "$out_kib" -lt 1048576
du -sh out
```

Expected: every assertion succeeds, generated Next.js chunks exist and are
referenced by the homepage, and the output is below GitHub Pages' 1 GB
supported artifact limit.

- [ ] **Step 3: Serve the export and run HTTP smoke checks**

Start a static server in one terminal:

```bash
python3 -m http.server 3000 --directory out
```

Then run in another terminal:

```bash
curl -fsS http://127.0.0.1:3000/ >/dev/null
curl -fsS http://127.0.0.1:3000/images/avatar-2026.jpg >/dev/null
curl -fsS http://127.0.0.1:3000/icons/icon-light.svg >/dev/null
curl -fsS http://127.0.0.1:3000/icons/icon-dark.svg >/dev/null
curl -fsS http://127.0.0.1:3000/resume/sergey-gyach-cv-ru.pdf >/dev/null
curl -fsS http://127.0.0.1:3000/resume/sergey-gyach-cv-en.pdf >/dev/null
test "$(curl -sS -o /dev/null -w '%{http_code}' http://127.0.0.1:3000/api/health)" = "404"
```

Expected: the homepage and every public asset return 200; `/api/health` returns
404. Stop the static server after the checks.

- [ ] **Step 4: Inspect the rendered application at desktop and mobile widths**

Open `http://127.0.0.1:3000` and verify:

1. Russian and English switching works and persists after reload.
2. Light, dark, and auto theme modes work and persist after reload.
3. The layout has no overlap or horizontal overflow above and below 1180 px and
   720 px.
4. The hero image, both favicons, and both locale-specific resume links load.
5. The document contains the canonical URL and Open Graph image for
   `https://sergey.gyach.ru`.
6. The Yandex Metrika script remains present.
7. The browser console and network panel contain no application or asset
   errors.

Expected: all seven checks pass.

- [ ] **Step 5: Audit the final diff and repository state**

Run:

```bash
git diff --check
git status --short
git diff --stat
git diff
git diff -- package-lock.json
git diff --cached -- package-lock.json
```

Expected:

- no whitespace errors;
- no `out/`, `.next/`, `node_modules/`, logs, or environment files are staged or
  tracked;
- `package-lock.json` is unchanged;
- compared with the recorded baseline, the implementation diff contains only
  the migration files named in Tasks 1–3.

- [ ] **Step 6: Create a final commit only if authorized and earlier task commits were skipped**

If the user explicitly authorized implementation commits but Tasks 1–3 were
left uncommitted, create one scoped commit:

```bash
git add next.config.ts package.json .github/workflows/deploy.yml README.md AGENTS.md
git add -u src/app/api/health/route.ts Dockerfile .dockerignore scripts/timeweb-deploy.sh
git diff --cached --check
git diff --cached --stat
git commit -m "Migrate site deployment to GitHub Pages"
```

Do not push. If commits are not authorized, report the verified uncommitted
state instead.

## External Cutover After Repository Implementation

These are not implementation steps and require separate user authorization:

1. Set **Settings → Pages → Build and deployment → Source** to **GitHub
   Actions**.
2. Restrict the `github-pages` environment to `main`.
3. Push the implementation and wait for a successful workflow.
4. Add `sergey.gyach.ru` in Pages settings before changing DNS.
5. Replace the `sergey.gyach.ru` A record with `sergey CNAME gyach.github.io`;
   keep the existing GitHub domain-verification TXT record.
6. Verify certificate provisioning and enable **Enforce HTTPS**.
7. Repeat the browser checklist on `https://sergey.gyach.ru`.
8. Only after successful cutover, stop and remove the Timeweb application,
   reverse proxy, and health monitor; remove obsolete `TIMEWEB_*` and
   `GHCR_TOKEN` secrets and optionally remove the old GHCR package.
9. Keep Timeweb DNS active if it remains the authoritative DNS provider;
   authoritative DNS migration is a separate project.
