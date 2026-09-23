#!/usr/bin/env bash
set -euo pipefail

racine="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
temporaire="$(mktemp -d)"
trap 'rm -rf "$temporaire"' EXIT
tar -xzf "$racine/module03-linux.tar.gz" -C "$temporaire"
cd "$temporaire/atelier-module-03"

test "$(cut -d: -f3 colonnes/fiche)" = 'FLAG{LOKHLASS}'
test "$(cut -d';' -f2 colonnes/equipe | head -n 2 | tail -n 1)" = 'FLAG{SIMIABRAZ}'
test "$(sort tri/noms | head -n 1)" = 'FLAG{AEROMITE}'
test "$(sort -n tri/scores | tail -n 1)" = '12 FLAG{ELECTHOR}'
test "$(sort tri/scores | tail -n 1)" = '9 FLAG{MOTISMA}'
test "$(sort -t: -k2,2n tri/charges | head -n 1 | cut -d: -f1)" = 'FLAG{TARINOR}'

test "$(uniq -d doublons/brut)" = 'FLAG{NIDOKING}'
test "$(sort doublons/brut | uniq -d | head -n 1)" = 'FLAG{ELEKTEK}'
test "$(sort doublons/frequences | uniq -c | sort -nr | head -n 1 | tr -s ' ' | cut -d' ' -f3)" = 'FLAG{MACKOGNE}'

test "$(wc -l < comptage/candidats/beta)" -eq 12
test "$(wc -l < comptage/candidats/alpha)" -eq 8
test "$(wc -l < comptage/candidats/gamma)" -eq 15
grep -Fq 'FLAG{ARCEUS}' comptage/candidats/beta
test "$(wc -w < comptage/phrases/cible)" -eq 7
test "$(wc -w < comptage/phrases/courte)" -eq 5
test "$(wc -w < comptage/phrases/longue)" -eq 9
test "$(sort comptage/personnes | uniq | wc -l)" -eq 4
grep -Fq '4 FLAG{CELEBI}' comptage/cle

test "$(cat normalisation/espaces | tr -s ' ' | cut -d' ' -f3)" = 'FLAG{EOKO}'
test "$(cat normalisation/casse | tr '[:lower:]' '[:upper:]' | sort | uniq -c | sort -nr | head -n 1 | tr -s ' ' | cut -d' ' -f3)" = 'FLAG{SUICUNE}'
test "$(cut -d';' -f2 pipeline/equipes | sort | uniq -c | sort -nr | head -n 1 | tr -s ' ' | cut -d' ' -f3)" = 'FLAG{LUGIA}'
test "$(cat pipeline/incidents | cut -d: -f2 | tr '[:lower:]' '[:upper:]' | sort | uniq -c | sort -nr | head -n 1 | tr -s ' ' | cut -d' ' -f3)" = 'FLAG{KYOGRE}'

printf 'Module 03 : 15 défis et leurs pièges de tri, doublons et comptage vérifiés.\n'
