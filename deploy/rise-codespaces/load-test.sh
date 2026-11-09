#!/usr/bin/env bash
# Spin up N workspaces as a facilitator to see what the VM does under load.
# Usage: ./load-test.sh 30      (then: ./load-test.sh 30 delete)
set -euo pipefail

N="${1:-10}"
ACTION="${2:-create}"
TEMPLATE="${TEMPLATE:-rise-hackathon}"

for i in $(seq 1 "$N"); do
  name="loadtest-$i"
  case "$ACTION" in
    create)
      coder create "$name" --template "$TEMPLATE" --yes >/dev/null &
      ;;
    delete)
      coder delete "$name" --yes >/dev/null &
      ;;
  esac
done
wait

if [ "$ACTION" = create ]; then
  echo "Created $N workspaces. Watch the host with:  docker stats --no-stream ; free -h"
  echo "A good sign: every workspace reaches 'Running' and the demo app healthcheck turns green."
fi
