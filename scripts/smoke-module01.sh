#!/usr/bin/env bash
set -euo pipefail

racine="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
temporaire="$(mktemp -d)"
trap 'rm -rf "$temporaire"' EXIT
tar -xzf "$racine/module01-linux.tar.gz" -C "$temporaire"
cd "$temporaire/atelier-module-01"

test "$(pwd)" = "$temporaire/atelier-module-01"
ls accueil | grep -Fq 'FLAG{M01-01-COMMENCER}'
! ls accueil | grep -Fq 'FLAG{M01-02-DERRIERE-LE-POINT}'
ls -a accueil | grep -Fq '.FLAG{M01-02-DERRIERE-LE-POINT}'
ls -l tri | grep -Eq '^d.*FLAG\{M01-03-BON-DOSSIER\}'
ls -l tri | grep -Eq '^-.*FLAG\{M01-03-LEURRE-FICHIER\}'

cd route/niveau1/niveau2
ls | grep -Fq 'FLAG{M01-04-DEUX-NIVEAUX}'
cd ..
ls -a | grep -Fq '.FLAG{M01-05-REMONTEE}'

cd ../..
atelier_absolu="$(pwd)"
cd ~
cd "$atelier_absolu"
ls retour | grep -Fq 'FLAG{M01-06-ABSOLU}'
ls -la final | grep -Eq '^d.*\.FLAG\{M01-07-BON-DOSSIER\}'
ls -la final | grep -Eq '^-.*\.FLAG\{M01-07-LEURRE-CACHE-FICHIER\}'
printf 'Module 01 : les 7 défis et leurs leurres sont présents dans l’archive.\n'
