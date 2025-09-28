#!/bin/bash

# Navigate to project root (adjust if needed)
PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_ROOT"

# Start frontend
echo "Starting React frontend on port 3000..."
cd "$PROJECT_ROOT/frontend"
if [ ! -d "node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install
fi
npm run dev -- --port 3000 &

# Start backend
echo "Starting Laravel backend..."
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
