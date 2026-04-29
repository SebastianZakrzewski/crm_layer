#!/usr/bin/env pwsh
# Runs GitHub CLI inside the crm-layer container (Windows / PowerShell).

$service = if ($env:SERVICE_NAME) { $env:SERVICE_NAME } else { 'crm-layer' }
docker compose exec $service gh @Args
