#!/usr/bin/env bash
if grep -q '^MODE=production$' "$1"; then
  echo OK
  exit 0
else
  echo KO
  exit 1
fi
