# sergey.gyach.ru

Next.js site for a resume and publications.

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

The following are manual external configuration actions and require explicit authorization before they are performed.

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

## Content

Main editable content is in `src/data/site.ts`:

- profile and contact links
- resume timeline
- skill groups
- publications
- RU/EN localized copy

The language switcher stores the selected locale in `localStorage` under `sergey.gyach.ru.locale`. If no value is saved, the app uses the browser locale for `ru`/`en` and falls back to `ru`.

The hero image is stored at `public/images/avatar-2026.jpg`.
