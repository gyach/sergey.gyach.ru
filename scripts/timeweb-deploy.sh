#!/usr/bin/env bash
set -euo pipefail

APP_NAME="${APP_NAME:-sergey-gyach-ru}"
APP_PORT="${APP_PORT:-3000}"
CONTAINER_PORT="${CONTAINER_PORT:-3000}"
BIND_HOST="${BIND_HOST:-127.0.0.1}"
HEALTHCHECK_PATH="${HEALTHCHECK_PATH:-/api/health}"
DOCKER_NETWORK="${DOCKER_NETWORK:-}"
IMAGE="${IMAGE:?IMAGE is required}"

if ! [[ "$APP_PORT" =~ ^[0-9]+$ ]]; then
  echo "APP_PORT must be a number, got: $APP_PORT" >&2
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is not installed or not available on PATH." >&2
  exit 1
fi

if [ -n "${REGISTRY_HOST:-}" ] && [ -n "${REGISTRY_USER:-}" ] && [ -n "${REGISTRY_TOKEN:-}" ]; then
  echo "$REGISTRY_TOKEN" | docker login "$REGISTRY_HOST" -u "$REGISTRY_USER" --password-stdin >/dev/null
fi

other_containers="$(
  docker ps --filter "publish=${APP_PORT}" --format "{{.Names}}" |
    awk -v app="$APP_NAME" '$0 != app { print }'
)"

if [ -n "$other_containers" ]; then
  echo "Port $APP_PORT is already published by another Docker container:" >&2
  echo "$other_containers" >&2
  exit 1
fi

current_app_on_port="$(
  docker ps --filter "name=^/${APP_NAME}$" --filter "publish=${APP_PORT}" --format "{{.Names}}" || true
)"

listeners=""
if command -v ss >/dev/null 2>&1; then
  listeners="$(ss -ltn 2>/dev/null | awk -v port=":$APP_PORT" '$4 ~ port "$" { print }' || true)"
elif command -v lsof >/dev/null 2>&1; then
  listeners="$(lsof -nP -iTCP:"$APP_PORT" -sTCP:LISTEN 2>/dev/null || true)"
elif command -v netstat >/dev/null 2>&1; then
  listeners="$(netstat -ltn 2>/dev/null | awk -v port=":$APP_PORT" '$4 ~ port "$" { print }' || true)"
fi

if [ -n "$listeners" ] && [ -z "$current_app_on_port" ]; then
  echo "Port $APP_PORT is already occupied by a non-$APP_NAME process:" >&2
  echo "$listeners" >&2
  exit 1
fi

network_args=()
if [ -n "$DOCKER_NETWORK" ]; then
  if ! docker network inspect "$DOCKER_NETWORK" >/dev/null 2>&1; then
    echo "Docker network does not exist: $DOCKER_NETWORK" >&2
    exit 1
  fi

  network_args=(--network "$DOCKER_NETWORK" --network-alias "$APP_NAME")
fi

docker pull "$IMAGE"

if docker ps -a --format "{{.Names}}" | grep -Fxq "$APP_NAME"; then
  docker rm -f "$APP_NAME" >/dev/null
fi

docker run \
  -d \
  --name "$APP_NAME" \
  --restart unless-stopped \
  "${network_args[@]}" \
  -p "${BIND_HOST}:${APP_PORT}:${CONTAINER_PORT}" \
  -e NODE_ENV=production \
  -e PORT="$CONTAINER_PORT" \
  -e HOSTNAME=0.0.0.0 \
  "$IMAGE" >/dev/null

health_url="http://127.0.0.1:${APP_PORT}${HEALTHCHECK_PATH}"
for attempt in $(seq 1 30); do
  if curl -fsS "$health_url" >/dev/null 2>&1; then
    echo "Deployed $APP_NAME on $BIND_HOST:$APP_PORT using $IMAGE"
    exit 0
  fi

  sleep 2
done

echo "Deployment started, but health check did not pass: $health_url" >&2
docker logs --tail=80 "$APP_NAME" >&2 || true
exit 1
