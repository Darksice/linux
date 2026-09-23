#!/usr/bin/env bash
set -euo pipefail

racine="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
temporaire="$(mktemp -d)"
trap 'rm -rf "$temporaire"' EXIT
tar -xzf "$racine/module01-linux.tar.gz" -C "$temporaire"
cd "$temporaire/atelier-module-01"

test "$(pwd)" = "$temporaire/atelier-module-01"
ls accueil | grep -Fq 'FLAG{PIKACHU}'
! ls accueil | grep -Fq 'FLAG{EVOLI}'
ls -a accueil | grep -Fq '.FLAG{EVOLI}'
ls -l tri | grep -Eq '^d.*FLAG\{CARAPUCE\}'
ls -l tri | grep -Eq '^-.*FLAG\{PSYKOKWAK\}'

cd route/niveau1/niveau2
ls | grep -Fq 'FLAG{PORYGON}'
cd ..
ls -a | grep -Fq '.FLAG{LAPOREILLE}'

cd ../..
atelier_absolu="$(pwd)"
cd ~
cd "$atelier_absolu"
ls retour | grep -Fq 'FLAG{MIAOUSS}'
ls -la final | grep -Eq '^d.*\.FLAG\{PACHIRISU\}'
ls -la final | grep -Eq '^-.*\.FLAG\{DARDARGNAN\}'
printf 'Module 01 : les 7 défis et leurs leurres sont présents dans l’archive.\n'
