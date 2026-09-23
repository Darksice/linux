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
grep -Fq 'FLAG{ALTARIA}' manuel/guide
grep -Fq 'FLAG{LUXRAY}' manuel/guide

head -n 1 journaux/rotation | grep -Fq 'FLAG{TOGEPI}'
head -n 6 journaux/rotation | tail -n 1 | grep -Fq 'FLAG{MORPHEO}'
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
