#!/usr/bin/env bash
# Serve the repo root so the studio can quick-load /public/images/*.png
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
PORT="${PORT:-4321}"
URL="http://localhost:$PORT/tools/mockup-studio/"
echo "Mockup Studio -> $URL"
(sleep 1 && open "$URL") &
exec python3 -m http.server "$PORT" --directory "$ROOT"
