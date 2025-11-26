#!/bin/bash

# Navigate to project root (one level up from this script)
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT"

# Kill existing processes on ports 3000 and 8000
echo "🔴 Checking ports 3000 and 8000..."
if command -v lsof >/dev/null 2>&1; then
  kill -9 $(lsof -t -i:3000) 2>/dev/null || true
  kill -9 $(lsof -t -i:8000) 2>/dev/null || true
else
  echo "lsof not found; skipping port pre-checks."
fi

# Start frontend
echo "🚀 Starting React frontend on port 3000..."
cd "$PROJECT_ROOT/frontend"
if [ ! -d "node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install
fi
npm run dev -- --port 3000 &

# Start backend
echo "⚖️ Starting Laravel backend on port 8000..."
cd "$PROJECT_ROOT/backend"
if [ ! -d "vendor" ]; then
  echo "Installing backend dependencies..."
  composer install
  cp .env.example .env 2>/dev/null || true
  php artisan key:generate
fi
php artisan serve --host=127.0.0.1 --port=8000 &

# Wait so both servers run in background
wait
