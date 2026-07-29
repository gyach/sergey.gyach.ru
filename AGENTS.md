# AGENTS.md

This file gives coding agents the project-specific context needed to work in
this repository without rediscovering the basics.

## Project Overview

`sergey.gyach.ru` is a personal resume and publications site built with the
Next.js App Router. The site is bilingual (`ru` and `en`), has light, dark, and
system theme modes, and is statically exported and deployed to GitHub Pages.

The primary editable content lives in `src/data/site.ts`.

## Stack and Runtime

- Node.js 22, declared in `.nvmrc`.
- npm with `package-lock.json`; use npm, not yarn or pnpm.
- Next.js 16 with `output: "export"` in `next.config.ts`.
- `images.unoptimized: true` is required for GitHub Pages.
- React 19.
- TypeScript with `strict: true`.
- ESLint 9 flat config through `eslint.config.mjs`.
- Styling is plain global CSS in `src/app/globals.css`; there is no Tailwind.
- Icons are mostly from `lucide-react`, with local SVG components for GitHub and
  MAX.

## Useful Commands

Install dependencies:

```bash
npm ci
```

Run locally:

```bash
npm run dev
```

The dev server runs at `http://localhost:3000` by default.

Validate changes:

```bash
npm run lint
npm run build
```

Inspect the production static export after a successful build:

```bash
python3 -m http.server 3000 --directory out
```

Any static HTTP server may be used. No production Node server is part of the
repository.

## Repository Map

- `src/app/layout.tsx` - root metadata, viewport config, theme initialization
  script, global CSS import.
- `src/app/page.tsx` - wraps the homepage in theme and language providers.
- `src/app/globals.css` - all layout, responsive, theme, and component styles.
- `src/components/` - small presentational and client components.
- `src/components/language-provider.tsx` - locale state and localStorage sync.
- `src/components/theme-provider.tsx` - theme mode state and localStorage sync.
- `src/data/site.ts` - site identity, contacts, navigation, localized copy,
  experience, skills, and publications.
- `public/images/` - public images used by the site.
- `public/icons/` - theme-aware favicon SVGs.
- `public/resume/` - committed RU and EN CV PDFs plus regeneration instructions.
- `.github/workflows/deploy.yml` - validates and deploys `out/` to GitHub Pages.

## Content and Localization Rules

- Keep `src/data/site.ts` as the source of truth for public content.
- When adding or changing user-facing copy, update both `ru` and `en` entries in
  `localizedContent`.
- `defaultLocale` is `ru`. The initial HTML language and default metadata come
  from the Russian content.
- Keep the shape of `LocalizedSiteContent` synchronized with actual usage in
  components.
- If changing SEO copy, update both `metadataTitle` and
  `metadataDescription` for each locale.
- If adding navigation links, update `navItems` in both locales and make sure
  the target section has a matching `id`.
- `site.cvUrls` contains the locale-specific CV paths. Both paths must continue
  to point to their corresponding files under `public/resume/`.
- If replacing the hero image, update the image file under `public/images/`,
  keep the `next/image` dimensions accurate, and update localized alt text.

## UI and Component Rules

- Components that use browser APIs, hooks, or localStorage must be client
  components with `"use client"`.
- Keep browser-only logic out of server components unless it is protected and
  intentional.
- Preserve the theme initialization script in `src/app/layout.tsx`; it prevents
  a visible theme flash before hydration.
- Theme state uses localStorage key `sergey.gyach.ru.theme`.
- Locale state uses localStorage key `sergey.gyach.ru.locale`.
- Prefer `lucide-react` icons for new icon buttons or links when an icon exists.
- Keep styling in `src/app/globals.css` unless a future local pattern introduces
  CSS modules or another styling system.
- Maintain the existing responsive breakpoints at `1180px` and `720px` unless a
  layout change requires a deliberate adjustment.
- Preserve accessibility attributes on navigation, grouped controls, icons, and
  external links.
- External links should use `target="_blank"` and `rel="noopener noreferrer"`.

## React and Next.js Performance Notes

- Keep server components as the default for new App Router files. Add
  `"use client"` only when a component needs hooks, browser APIs, or event
  handlers.
- Avoid moving large static content or metadata into client components unless it
  is needed for locale switching or browser interaction.
- Prefer direct imports from libraries. Do not introduce barrel files that cause
  unrelated components or icons to enter the bundle.
- Do not add memoization by default. Use `useMemo`, `useCallback`, or
  `React.memo` only when there is a real expensive calculation, stable identity
  requirement, or measured re-render issue.
- Keep default arrays and objects outside component bodies when they are static,
  as done by `themeOptions` and `labels` in `src/components/theme-switcher.tsx`.
- Use `next/image` for public images that are rendered in React components, and
  set accurate dimensions to avoid layout shift.
- Static Pages hosting requires unoptimized images or an explicitly configured
  external loader.
- If a future page fetches independent data sources, start requests early and
  await them together with `Promise.all`.
- If a future feature needs a heavy widget, editor, chart, or third-party
  integration, load it with `next/dynamic` or only after the user activates that
  feature.
- Keep localStorage payloads small and version them before storing structured
  objects. Current theme and locale storage keys intentionally store only short
  strings.
- For client-side global event listeners, centralize subscriptions and clean
  them up in effects. Use passive listeners for scroll or touch listeners.

## Validation Expectations

Before handing off code changes, run:

```bash
npm run lint
npm run build
```

For UI or responsive layout changes, also run `npm run dev` and inspect the page
at `http://localhost:3000` on desktop and mobile widths. Check that:

- language switching works for `ru` and `en`;
- light, dark, and auto theme modes work;
- text does not overlap or overflow on mobile;
- `out/index.html`, images, favicons, and both CV PDFs are present and load
  correctly;
- the browser console has no errors and the network has no failed asset
  requests.

There is no dedicated test suite in this repository at the time of writing, so
lint and build are the primary automated gates.

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

## Agent Workflow

- Start by checking `git status --short` and avoid overwriting unrelated user
  changes.
- Use `rg` or `rg --files` for searching.
- Keep changes scoped to the requested behavior; do not refactor unrelated
  components or deployment files.
- Do not commit, push, or deploy unless the user explicitly asks.
- Do not commit `.env`, local logs, `.next`, `node_modules`, or generated
  artifacts.
- Keep `package-lock.json` synchronized with `package.json` if dependencies
  change.
- Prefer small, direct edits over new abstractions unless the existing code
  clearly benefits from one.
