#!/usr/bin/env bash
# Local-only smoke test for macOS + Colima. Generated Compose/template changes
# live under TMPDIR; the committed compose file and Terraform template are not edited.
set -Eeuo pipefail
# Keep login and all subsequent CLI commands on the same token store. This is
# useful for repeatable local runs and avoids macOS keychain prompt differences.
export CODER_USE_KEYRING=false

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TMP_BASE="${TMPDIR:-/tmp}/rise-codespaces-local-${UID:-$(id -u)}"
OVERRIDE="$TMP_BASE/compose.override.yml"
FORWARD_PID_FILE="$TMP_BASE/port-forward.pid"
FORWARD_LOG="$TMP_BASE/port-forward.log"
URL="http://localhost:7080"
WORKSPACE="rise-local-smoke"
MODE="${1:-setup}"

die() { printf 'ERROR: %s\n' "$*" >&2; exit 1; }

if ! command -v docker >/dev/null 2>&1; then
  die "Docker CLI not found. Install Docker Desktop or Colima first."
fi
if ! docker info >/dev/null 2>&1; then
  cat >&2 <<'EOF'
Docker is not reachable. On macOS, start Colima in a regular Terminal first:
  colima start
Then rerun this script. This runner cannot start the VM from a restricted shell.
EOF
  exit 1
fi
if [[ "$MODE" == "cleanup" ]]; then
  [[ -f "$ROOT/.env" && -f "$OVERRIDE" ]] || die "No local test setup was found."
  if [[ -f "$FORWARD_PID_FILE" ]]; then
    kill "$(cat "$FORWARD_PID_FILE")" 2>/dev/null || true
    rm -f "$FORWARD_PID_FILE"
  fi
  if command -v coder >/dev/null 2>&1 && coder --url "$URL" whoami >/dev/null 2>&1; then
    coder delete "$WORKSPACE" --yes >/dev/null 2>&1 || true
    for i in $(seq 1 5); do coder delete "loadtest-$i" --yes >/dev/null 2>&1 || true; done
  fi
  docker compose --env-file "$ROOT/.env" -f "$ROOT/docker-compose.yml" -f "$OVERRIDE" down -v
  exit 0
fi
[[ "$MODE" == "setup" ]] || die "Usage: $0 [setup|cleanup]"
if ! command -v coder >/dev/null 2>&1; then
  cat >&2 <<'EOF'
Coder CLI is not installed. Install it using Coder's official macOS command:
  curl -fsSL https://coder.com/install.sh | sh
Then rerun this script.
EOF
  exit 1
fi

if command -v getent >/dev/null 2>&1; then
  DOCKER_GID="$(getent group docker | awk -F: '$1 == "docker" {print $3; exit}')"
fi
if [[ -z "${DOCKER_GID:-}" ]] && command -v colima >/dev/null 2>&1; then
  DOCKER_GID="$(colima ssh -- getent group docker 2>/dev/null | awk -F: '$1 == "docker" {print $3; exit}')"
fi
[[ -n "${DOCKER_GID:-}" ]] || die "Could not read the docker group ID. On Colima, check: colima ssh -- getent group docker"

mkdir -p "$TMP_BASE"
chmod 700 "$TMP_BASE"

# Create the ignored environment file on first run. Keep existing credentials.
if [[ ! -f "$ROOT/.env" ]]; then
  cp "$ROOT/.env.example" "$ROOT/.env"
  chmod 600 "$ROOT/.env"
fi
POSTGRES_PASSWORD="$(sed -n 's/^POSTGRES_PASSWORD=//p' "$ROOT/.env" | head -1)"
if [[ -z "$POSTGRES_PASSWORD" || "$POSTGRES_PASSWORD" == "change-me-long-random" ]]; then
  POSTGRES_PASSWORD="$(openssl rand -hex 32)"
fi
ADMIN_PASSWORD="$(sed -n 's/^CODER_TEST_ADMIN_PASSWORD=//p' "$ROOT/.env" | head -1)"
if [[ -z "$ADMIN_PASSWORD" ]]; then
  ADMIN_PASSWORD="$(openssl rand -hex 24)"
fi
python3 - "$ROOT/.env" "$POSTGRES_PASSWORD" "$DOCKER_GID" "$ADMIN_PASSWORD" <<'PY'
from pathlib import Path
import sys

path = Path(sys.argv[1])
values = {
    "CODER_DOMAIN": "localhost:7080",
    "POSTGRES_PASSWORD": sys.argv[2],
    "DOCKER_GROUP_ID": sys.argv[3],
    "CODER_TEST_ADMIN_PASSWORD": sys.argv[4],
}
lines = path.read_text().splitlines()
seen = set()
out = []
for line in lines:
    key = line.split("=", 1)[0] if "=" in line and not line.lstrip().startswith("#") else None
    if key in values:
        out.append(f"{key}={values[key]}")
        seen.add(key)
    else:
        out.append(line)
for key, value in values.items():
    if key not in seen:
        out.append(f"{key}={value}")
path.write_text("\n".join(out) + "\n")
path.chmod(0o600)
PY

# Test-only override: loopback-only host port; no Caddy and no wildcard URL.
cat > "$OVERRIDE" <<'YAML'
services:
  coder:
    ports:
      - "127.0.0.1:7080:7080"
    environment:
      CODER_ACCESS_URL: "http://localhost:7080"
      CODER_WILDCARD_ACCESS_URL: null
YAML

compose() {
  docker compose --env-file "$ROOT/.env" -f "$ROOT/docker-compose.yml" -f "$OVERRIDE" "$@"
}

cd "$ROOT"
compose up -d database coder

for _ in $(seq 1 60); do
  if curl -fsS "$URL/api/v2/buildinfo" >/dev/null 2>&1; then break; fi
  sleep 2
done
curl -fsS "$URL/api/v2/buildinfo" >/dev/null || {
  compose logs --no-color coder database
  die "Coder did not become ready at $URL"
}

printf '\nCreating/logging in the local admin user...\n'
if coder --url "$URL" whoami >/dev/null 2>&1; then
  printf 'Using the existing local Coder login.\n'
elif ! coder login "$URL" \
  --first-user-username local-admin \
  --first-user-email local-admin@example.com \
  --first-user-full-name "Local Test Admin" \
  --first-user-password "$ADMIN_PASSWORD" \
  --first-user-trial=false; then
  die "Coder login failed. If this database already has a user, run: coder login $URL"
fi

# Push a temporary template copy without the Vite path app. Vite is opened via
# a direct localhost port forward when this test has no wildcard access URL.
TEMPLATE_COPY="$TMP_BASE/template"
mkdir -p "$TEMPLATE_COPY"
cp "$ROOT/template/main.tf" "$TEMPLATE_COPY/main.tf"
python3 - "$TEMPLATE_COPY/main.tf" <<'PY'
from pathlib import Path
import sys

path = Path(sys.argv[1])
text = path.read_text()
import re
# Vite's absolute dev URLs cannot work through Coder's no-wildcard path app.
# The test instead uses coder port-forward and opens Vite directly on localhost.
text, count = re.subn(r'resource "coder_app" "vite" \{.*?\n\}\n', "", text, count=1, flags=re.S)
if count != 1:
    raise SystemExit("Could not remove the path-routed Vite app from the test template")
path.write_text(text)
PY
coder templates push rise-hackathon -d "$TEMPLATE_COPY" --yes

# A previous failed smoke build can leave this disposable workspace behind.
if coder show "$WORKSPACE" >/dev/null 2>&1; then
  coder delete "$WORKSPACE" --yes
fi
START_NS="$(python3 -c 'import time; print(time.time_ns())')"
if ! coder create "$WORKSPACE" --template rise-hackathon --yes --use-parameter-defaults; then
  printf '\nLatest workspace build log (wrapped and shortened):\n' >&2
  coder logs "$WORKSPACE" 2>&1 | fold -sw 180 | tail -n 80 >&2 || true
  die "Workspace creation failed. The build log is shown above."
fi
END_NS="$(python3 -c 'import time; print(time.time_ns())')"
python3 - "$START_NS" "$END_NS" <<'PY'
import sys
print(f"Create-to-Running time: {(int(sys.argv[2]) - int(sys.argv[1])) / 1_000_000_000:.1f} seconds")
PY

printf '\nChecking workspace tests and Vite response...\n'
coder ssh "$WORKSPACE" -- npm test
INDEX_FILE="$TMP_BASE/index.html"
VITE_READY=0
for _ in $(seq 1 60); do
  if coder ssh "$WORKSPACE" -- curl -fsS localhost:5173 >"$INDEX_FILE" 2>/dev/null; then
    VITE_READY=1
    break
  fi
  sleep 2
done
if [[ "$VITE_READY" != 1 ]]; then
  printf '\nVite did not become ready. Workspace Vite log:\n' >&2
  coder ssh "$WORKSPACE" -- sh -lc 'cat /tmp/vite.log 2>/dev/null || true' >&2 || true
  die "Vite did not respond on port 5173 within 120 seconds."
fi
INDEX_PAGE="$(head -c 4096 "$INDEX_FILE")"
[[ "$INDEX_PAGE" == *"RISE"* ]] || die "Vite responded, but the returned page did not look like the kit index."
printf '%s\n' "$INDEX_PAGE" | head

# Vite's dev server uses root-absolute asset URLs, which do not work through
# Coder's path-based app route. Forward both services to loopback on the host.
if [[ -f "$FORWARD_PID_FILE" ]] && kill -0 "$(cat "$FORWARD_PID_FILE")" 2>/dev/null; then
  kill "$(cat "$FORWARD_PID_FILE")" 2>/dev/null || true
fi
nohup coder port-forward "$WORKSPACE" \
  --tcp 127.0.0.1:18080:13337 \
  --tcp 127.0.0.1:18081:5173 >"$FORWARD_LOG" 2>&1 </dev/null &
echo "$!" > "$FORWARD_PID_FILE"
FORWARD_READY=0
for _ in $(seq 1 30); do
  if curl -fsS http://127.0.0.1:18081/ -o "$TMP_BASE/forwarded-index.html" 2>/dev/null; then
    FORWARD_READY=1
    break
  fi
  sleep 1
done
if [[ "$FORWARD_READY" != 1 ]]; then
  cat "$FORWARD_LOG" >&2 || true
  die "Coder port forwarding did not expose Vite on 127.0.0.1:18081."
fi

cat <<EOF

Local Coder is ready at $URL
Admin username: local-admin
Admin password is in: $ROOT/.env (CODER_TEST_ADMIN_PASSWORD)
Workspace: $WORKSPACE

Open the Vite demo in your browser: http://localhost:18081
Open code-server in your browser: http://localhost:18080
The runner forwards both ports automatically; use '$0 cleanup' to stop forwarding
and remove the smoke/load-test workspaces, database, and Compose volumes.

Control-plane and workspace containers are left running for inspection.
EOF
