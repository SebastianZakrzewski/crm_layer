#!/usr/bin/env bash
set -euo pipefail

# Runs GitHub CLI inside the running crm-layer container (Compose service name: crm-layer).
# Requires: compose stack up (`docker compose up -d`) and GH_TOKEN or `gh auth login` inside the container.
#
# Usage:
#   ./scripts/gh-in-container.sh pr list
#   ./scripts/gh-in-container.sh workflow run ci.yml --ref main

SERVICE="${SERVICE_NAME:-crm-layer}"
exec docker compose exec "$SERVICE" gh "$@"
