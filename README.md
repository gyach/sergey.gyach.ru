# sergey.gyach.ru

Next.js site for a resume and publications.

## Local development

```bash
npm install
npm run dev
```

The app runs on `http://localhost:3000` by default.

For a local production run after `npm run build`:

```bash
HOSTNAME=127.0.0.1 PORT=3000 npm start
```

## Content

Main editable content is in `src/data/site.ts`:

- profile and contact links
- resume timeline
- skill groups
- publications
- RU/EN localized copy

The language switcher stores the selected locale in `localStorage` under `sergey.gyach.ru.locale`. If no value is saved, the app uses the browser locale for `ru`/`en` and falls back to `ru`.

The hero image is stored at `public/images/avatar-2026.jpg`.

## Docker

```bash
docker build -t sergey-gyach-ru .
docker run --rm -p 3000:3000 sergey-gyach-ru
```

Health check endpoint:

```bash
curl http://127.0.0.1:3000/api/health
```

## GitHub Actions deploy to Timeweb

The workflow `.github/workflows/deploy.yml` builds the Docker image, pushes it to GHCR, then connects to Timeweb over SSH and runs `scripts/timeweb-deploy.sh`.

Required repository secrets:

- `TIMEWEB_HOST` - Timeweb server host or IP
- `TIMEWEB_USER` - SSH user
- `TIMEWEB_SSH_KEY` - private SSH key with access to the server

Optional repository secrets:

- `TIMEWEB_SSH_PORT` - defaults to `22`
- `TIMEWEB_APP_PORT` - host port to publish, defaults to `3000`
- `TIMEWEB_BIND_HOST` - bind address, defaults to `127.0.0.1`
- `GHCR_TOKEN` - optional token for GHCR pull if the default GitHub token cannot pull the package

Before replacing the running container, the deploy script checks that `TIMEWEB_APP_PORT` is not occupied by another Docker container or a non-app process. If the port is busy, deployment stops before touching the current app container.
