#!/usr/bin/env bash
set -euo pipefail
if [[ ! -d "$1" ]]; then
  echo 'Dossier source absent' >&2
  exit 2
fi
tar -czf "$2" -C "$(dirname "$1")" "$(basename "$1")"
