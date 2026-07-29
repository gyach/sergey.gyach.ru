# GitHub Pages Migration Design

## Goal

Migrate `sergey.gyach.ru` from a standalone Dockerized Next.js deployment on
Timeweb to a static Next.js site hosted by GitHub Pages.

The target deployment:

- keeps `https://sergey.gyach.ru` as the public URL;
- publishes automatically from `main` through GitHub Actions;
- removes the Docker, GHCR, Timeweb, and runtime health-check deployment path;
- preserves the current bilingual UI, themes, metadata, assets, PDFs, and
  Yandex Metrika integration.

## Chosen Approach

Keep the existing Next.js application and use the framework's static export
mode. `npm run build` will generate a complete site in `out/`, and the official
GitHub Pages artifact workflow will publish that directory.

This approach retains the existing React components and client-side
localization and theme behavior. It avoids both a separate `gh-pages` branch
and an unnecessary rewrite to plain HTML, CSS, and JavaScript.

## Application Configuration

`next.config.ts` will use:

```ts
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true
  }
};
```

The site uses a custom domain at the URL root, so `basePath` and `assetPrefix`
will not be set. Existing root-relative URLs for `_next`, images, icons, and
resume PDFs will therefore resolve correctly on `sergey.gyach.ru`.

The default `next/image` optimizer requires a server and cannot be used in a
static export. `images.unoptimized: true` preserves the current component and
serves the existing public image directly.

The `/api/health` route will be removed. Although a simple GET route could be
rendered as a static JSON file, it would no longer represent runtime
application health on GitHub Pages.

## Package Scripts and Removed Infrastructure

The following server-specific package scripts will be removed:

- `prepare:standalone`;
- `start`.

The following infrastructure files will be removed:

- `Dockerfile`;
- `.dockerignore`;
- `scripts/timeweb-deploy.sh`;
- `src/app/api/health/route.ts`.

The project will retain `dev`, `build`, `lint`, and `generate:resume`.

`README.md` and `AGENTS.md` will be updated to remove standalone, Docker,
Timeweb, GHCR, deployment-secret, health-check, and server-runtime
instructions. The documentation will describe local static builds, GitHub
Pages publishing, and the limitations of static export. The outdated statement
that the resume directory contains only a future-PDF placeholder will also be
corrected.

## GitHub Actions Architecture

`.github/workflows/deploy.yml` will continue to run on pushes to `main` and
manual dispatches. Both paths will be restricted to the `main` ref.

The workflow will have two jobs:

1. `build` checks out the repository, installs Node from `.nvmrc`, restores the
   npm cache, installs dependencies with `npm ci`, runs `npm run lint`, runs
   `npm run build`, validates required files in `out/`, and uploads `out/` as
   the GitHub Pages artifact.
2. `deploy` depends on `build`, targets the `github-pages` environment, and
   publishes the artifact.

The workflow will use the versions in GitHub's current official Next.js Pages
starter:

- `actions/checkout@v4`;
- `actions/setup-node@v4`;
- `actions/configure-pages@v5`;
- `actions/upload-pages-artifact@v3`;
- `actions/deploy-pages@v5`.

`actions/configure-pages@v5` will be called without
`static_site_generator: next`. Its Next.js auto-configuration does not support
the repository's `next.config.ts`; the required export and image settings will
instead remain explicit in that file.

The workflow will grant:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

The `deploy` job will declare:

```yaml
needs: build
environment:
  name: github-pages
  url: ${{ steps.deployment.outputs.page_url }}
```

The deployment step will use `id: deployment`. Concurrency will use a single
`pages` group with `cancel-in-progress: false`, allowing an active production
deployment to finish while GitHub skips obsolete queued deployments.

## Artifact Validation

After the static build, the workflow will fail unless these files exist:

- `out/index.html`;
- `out/images/avatar-2026.jpg`;
- `out/icons/icon-light.svg`;
- `out/icons/icon-dark.svg`;
- `out/resume/sergey-gyach-cv-ru.pdf`;
- `out/resume/sergey-gyach-cv-en.pdf`.

A lint, build, or artifact validation failure prevents the deploy job from
running. The previously published GitHub Pages version remains active.

## Compatibility and Content Behavior

The current application is compatible with static export:

- theme and locale state use browser `localStorage` from client components;
- metadata, canonical URL, Open Graph image, favicons, and resume URLs already
  target `https://sergey.gyach.ru`;
- Yandex Metrika runs in the browser and does not require a Next.js server;
- all current public content is available at build time.

Future features must stay within static-export constraints. Request-dependent
route handlers, cookies, Server Actions, runtime redirects and headers,
incremental static regeneration, and the default Next.js image optimizer cannot
be introduced while GitHub Pages remains the host.

Because no project `basePath` is configured, the temporary project URL
`https://gyach.github.io/sergey.gyach.ru/` is not a supported production URL.
End-to-end production verification must use the custom domain.

## Verification

Local automated validation will include:

```bash
npm run lint
npm run build
```

The generated `out/` directory will be served by a local static HTTP server.
Checks will cover:

- the homepage and generated Next.js assets;
- the hero image and theme-aware favicons;
- both resume PDFs;
- Russian and English switching and locale persistence;
- light, dark, and automatic theme modes and persistence;
- desktop and mobile layouts, including the existing 1180 px and 720 px
  breakpoints;
- browser console and network errors;
- Yandex Metrika script inclusion.

After publication, the same functional checks will be repeated on
`https://sergey.gyach.ru`.

## External Cutover

Repository changes alone do not enable GitHub Pages or move the domain. The
following steps remain manual:

1. In repository settings, select **Pages → Build and deployment → Source:
   GitHub Actions**.
2. Restrict the `github-pages` environment to `main`.
3. Push the implementation and wait for a successful Pages deployment.
4. Add `sergey.gyach.ru` as the custom domain in Pages settings before changing
   DNS.
5. Replace the current `sergey.gyach.ru` A record with a CNAME for host
   `sergey` pointing to `gyach.github.io`. The target contains no repository
   path.
6. Keep the existing GitHub domain-verification TXT record.
7. Wait for DNS and certificate provisioning, verify the custom domain, and
   enable **Enforce HTTPS**.
8. Run the production verification checklist.
9. Only after successful cutover, stop and remove the Timeweb container,
   reverse-proxy configuration, and old health monitoring. Remove obsolete
   `TIMEWEB_*` and `GHCR_TOKEN` repository secrets and, if desired, the old GHCR
   package.

If Timeweb continues to host the authoritative DNS zone, the DNS service must
not be removed with the application hosting. Moving authoritative DNS is a
separate migration outside this repository.

No `CNAME` or `.nojekyll` file is required in the repository when Pages is
published through a custom GitHub Actions workflow. GitHub Pages custom-domain
settings and DNS are the source of truth.

## Acceptance Criteria

The migration is complete when:

- the repository has no Docker, Timeweb, GHCR, standalone-server, or runtime
  health-check deployment path;
- `npm run lint` and the static `npm run build` pass;
- `out/` contains the required site assets and PDFs;
- pushes to `main` publish through the `github-pages` environment;
- `https://sergey.gyach.ru` serves the GitHub Pages deployment over enforced
  HTTPS;
- locale, theme, responsive layout, assets, PDFs, metadata, and analytics
  behave as before.

## References

- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Official Next.js Pages starter workflow](https://github.com/actions/starter-workflows/blob/main/pages/nextjs.yml)
