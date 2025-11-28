#!/bin/bash
# ==========================================================
# 🗳️ Elections360 Full-Stack Orchestrator (Docker-first)
# Backend: Laravel 10 | Frontend: React + TypeScript
# PostgreSQL + Redis services with socket readiness checks
# ==========================================================

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$PROJECT_ROOT/backend"
COMPOSE_FILE="$PROJECT_ROOT/docker-compose.yml"
APP_KEY_FILE="$BACKEND_DIR/.env.docker"

print_section() { echo -e "\n\e[1;36m$1\e[0m"; }

require_command() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "❌ Missing required command: $cmd"
    exit 1
  fi
}

usage() {
  cat <<'USAGE'
Usage: ./start.sh [up|down|logs|rebuild]
  up      - Build containers if needed and start the full stack in detached mode
  down    - Stop containers and remove network/anonymous volumes
  logs    - Tail logs from all services
  rebuild - Force rebuild of images before starting
USAGE
}

# ==========================================================
# Environment preparation
# ==========================================================
prepare_backend_env() {
  if [ -f "$APP_KEY_FILE" ]; then
    return
  fi

  print_section "🧩 Preparing backend .env.docker"
  require_command openssl
  cp "$BACKEND_DIR/.env.example" "$APP_KEY_FILE"

  # Generate a Laravel app key compatible with base64 format
  local generated_key="base64:$(openssl rand -base64 32)"
  sed -i "s|^APP_URL=.*$|APP_URL=http://localhost:8000|" "$APP_KEY_FILE"
  sed -i "s|^APP_KEY=.*$|APP_KEY=$generated_key|" "$APP_KEY_FILE"
  sed -i "s|^DB_CONNECTION=.*$|DB_CONNECTION=pgsql|" "$APP_KEY_FILE"

  cat <<ENV_OVERRIDES >> "$APP_KEY_FILE"

# Docker overrides
DB_HOST=db
DB_PORT=5432
DB_DATABASE=app
DB_USERNAME=app
DB_PASSWORD=app_password
ENV_OVERRIDES
}

# ==========================================================
# Docker helpers
# ==========================================================
docker_up() {
  local build_flag="$1"
  local compose_cmd=(docker compose -f "$COMPOSE_FILE")

  print_section "🐳 Starting Docker stack"
  if [ "$build_flag" = "--build" ]; then
    "${compose_cmd[@]}" up -d --build
  else
    "${compose_cmd[@]}" up -d
  fi

  echo "🌐 Frontend: http://localhost:8080"
  echo "⚖️ Backend:  http://localhost:8000"
  echo "🗄  Postgres: localhost:5432"
  echo "🧠 Redis:    localhost:6379"
}

case "${1:-up}" in
  up)
    require_command docker
    prepare_backend_env
    docker_up ""
    ;;
  rebuild)
    require_command docker
    prepare_backend_env
    docker_up "--build"
    ;;
  down)
    require_command docker
    print_section "🛑 Stopping containers"
    docker compose -f "$COMPOSE_FILE" down -v
    ;;
  logs)
    require_command docker
    print_section "📜 Aggregated logs"
    docker compose -f "$COMPOSE_FILE" logs -f
    ;;
  *)
    usage
    exit 1
    ;;
esac
