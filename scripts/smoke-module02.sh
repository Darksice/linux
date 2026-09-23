#!/usr/bin/env bash
set -euo pipefail

racine="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
temporaire="$(mktemp -d)"
trap 'rm -rf "$temporaire"' EXIT
tar -xzf "$racine/module02-linux.tar.gz" -C "$temporaire"
cd "$temporaire/atelier-module-02"

cat accueil/briefing | grep -Fq 'FLAG{SALAMECHE}'
cat notes/en_vigueur | grep -Fq 'FLAG{NINJASK}'
cat notes/archive | grep -Fq 'FLAG{ONIX}'
test "$(wc -l < manuel/guide)" -eq 360
grep -Fq 'FLAG{ALTARIA}' manuel/guide
grep -Fq 'FLAG{LUXRAY}' manuel/guide
test "$(grep -Fn 'FLAG{ALTARIA}' manuel/guide | cut -d: -f1)" -eq 174
test "$(grep -Fn 'FLAG{LUXRAY}' manuel/guide | cut -d: -f1)" -eq 251

test "$(wc -l < journaux/rotation)" -eq 80
head -n 1 journaux/rotation | grep -Fq 'FLAG{TOGEPI}'
! head journaux/rotation | grep -Fq 'FLAG{MORPHEO}'
head -n 11 journaux/rotation | tail -n 1 | grep -Fq 'FLAG{MORPHEO}'
tail -n 1 journaux/rotation | grep -Fq 'FLAG{RONFLEX}'
tail -n 4 journaux/rotation | head -n 1 | grep -Fq 'FLAG{MARILL}'

file objets/element-a | grep -Fq 'UTF-8 text'
file objets/element-b | grep -Fq 'HTML document'
file objets/element-c | grep -Fq 'shell script'
cat objets/element-a | grep -Fq 'FLAG{PORYGONZ}'

grep -Fq 'FLAG{METAMORPH}' <(diff -u config/service-ancien config/service-actuel)
grep -Fq 'FLAG{GLOUPTI}' <(diff -u config/droits-avant config/droits-apres)
cat flux/chronologie | head -n 1 | grep -Fq 'FLAG{MEDITIK}'
head -n 8 flux/chronologie | tail -n 1 | grep -Fq 'FLAG{MILOBELLUS}'
grep -Fq 'FLAG{JIRACHI}' <(diff -u config/volume-ancien config/volume-actuel)

printf 'Module 02 : 14 défis, types et pipes vérifiés dans l’archive.\n'
