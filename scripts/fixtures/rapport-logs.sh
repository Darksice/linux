#!/usr/bin/env bash
for fichier in "$1"/*.log; do
  nombre=$(grep -c ERREUR "$fichier")
  printf '%s %s\n' "$(basename "$fichier")" "$nombre"
done
