#!/usr/bin/env bash
# Test d'intégration : extrait l'archive puis réalise les missions sous Linux.
set -euo pipefail
projet=$(cd "$(dirname "$0")/.." && pwd -P)
temp=$(mktemp -d)
case "$temp" in /tmp/tmp.*) trap 'rm -rf -- "$temp"' EXIT ;; *) echo "Dossier temporaire inattendu" >&2; exit 1 ;; esac
tar -xzf "$projet/atelier-linux.tar.gz" -C "$temp"
cd "$temp/atelier-linux"

cd donnees
pwd > ../reponses/01-position.txt
cd ..
bash verifier.sh 01
cp donnees/notes/depart.txt reponses/02-copie.txt
bash verifier.sh 02
mkdir travail/rapports
touch travail/rapports/bilan.txt
bash verifier.sh 03
cp donnees/notes/consignes.txt travail/rapports/consignes.txt
mv travail/rapports/bilan.txt travail/rapports/synthese.txt
bash verifier.sh 04
cp "donnees/Projet Alpha/.secret" travail/rapports/secret.txt
cp "donnees/Projet Alpha/compte rendu.txt" travail/rapports/compte-rendu.txt
bash verifier.sh 05
mkdir travail/factures
cp donnees/factures/2026-*.txt travail/factures/
bash verifier.sh 06
echo 'Linux se pratique.' > reponses/07-message.txt
echo 'Linux se retient.' >> reponses/07-message.txt
bash verifier.sh 07
grep 'ERREUR' donnees/logs/serveur.log | wc -l > reponses/08-erreurs.txt
bash verifier.sh 08
grep '2026-09-21' donnees/logs/serveur.log | grep 'ERREUR' > reponses/09-erreurs-21.txt
bash verifier.sh 09
cut -d ' ' -f 1 donnees/annuaire.txt | sort | uniq | wc -l > reponses/10-noms.txt
bash verifier.sh 10
find donnees -type f -name '*.log' | sort > reponses/11-logs.txt
bash verifier.sh 11
cp donnees/bonjour.sh travail/bonjour.sh
chmod u+x travail/bonjour.sh
bash verifier.sh 12
tar -czf travail/rapports.tar.gz -C travail rapports
bash verifier.sh 13
grep -E '^B.*7$' donnees/annuaire.txt > reponses/14-regex.txt
bash verifier.sh 14
rm travail/brouillon.tmp
bash verifier.sh 15

ln -s ../donnees/notes/consignes.txt travail/consignes-lien.txt
bash verifier.sh 16
mkdir travail/prive
cp donnees/config/app.conf travail/prive/app.conf
chmod 700 travail/prive
chmod 600 travail/prive/app.conf
bash verifier.sh 17
du -sk donnees | cut -f 1 > reponses/18-ko.txt
bash verifier.sh 18
sha256sum donnees/notes/consignes.txt > reponses/19-hash.txt
bash verifier.sh 19
tar -czf travail/sauvegarde-notes.tar.gz -C donnees notes
mkdir travail/restauration
tar -xzf travail/sauvegarde-notes.tar.gz -C travail/restauration
bash verifier.sh 20
tail -n 3 donnees/logs/incidents.log > reponses/21-fin.txt
bash verifier.sh 21
grep -n -C 1 ERREUR donnees/logs/incidents.log > reponses/22-contexte.txt
bash verifier.sh 22
sed 's/^MODE=debug$/MODE=production/' donnees/config/app.conf > travail/app.conf
bash verifier.sh 23
awk '$4=="ERREUR" {n[$3]++} END {for (s in n) print s, n[s]}' donnees/logs/incidents.log | sort > reponses/24-services.txt
bash verifier.sh 24
awk -F, 'NR>1 && $3=="DOWN" {print $1}' donnees/inventaire.csv | sort > reponses/25-hotes.txt
bash verifier.sh 25
ps -p $$ -o pid=,comm= > reponses/26-shell.txt
bash verifier.sh 26
sleep 300 &
echo $! > travail/sleep.pid
kill "$(cat travail/sleep.pid)"
bash verifier.sh 27
export APP_ENV=formation
printenv APP_ENV > reponses/28-env.txt
bash verifier.sh 28
command -v bash > reponses/29-bash.txt
bash verifier.sh 29
ls donnees/introuvable 2> reponses/30-stderr.txt || true
bash verifier.sh 30
cp "$projet/scripts/fixtures/compter-erreurs.sh" travail/compter-erreurs.sh
bash verifier.sh 31
cp "$projet/scripts/fixtures/verifier-config.sh" travail/verifier-config.sh
bash verifier.sh 32
cp "$projet/scripts/fixtures/rapport-logs.sh" travail/rapport-logs.sh
bash verifier.sh 33
cp "$projet/scripts/fixtures/sauvegarder.sh" travail/sauvegarder.sh
bash travail/sauvegarder.sh donnees/notes travail/auto-notes.tar.gz
bash verifier.sh 34
printf 'total=%s\n' "$(grep -c ERREUR donnees/logs/incidents.log)" > reponses/35-incident.txt
printf 'service=%s\n' "$(awk '$4=="ERREUR" {n[$3]++} END {for (s in n) print n[s],s}' donnees/logs/incidents.log | sort -nr | head -n 1 | cut -d ' ' -f 2)" >> reponses/35-incident.txt
printf 'derniere=%s\n' "$(grep ERREUR donnees/logs/incidents.log | tail -n 1 | cut -d ' ' -f 1-3)" >> reponses/35-incident.txt
bash verifier.sh 35
(. /etc/os-release; printf '%s %s\n' "$ID" "$VERSION_ID") > reponses/36-os.txt
bash verifier.sh 36
mkdir "$temp/outils-simules"
if command -v rpm >/dev/null; then
  rpm -q bash > reponses/37-paquet.txt
  bash verifier.sh 37
else
  cp "$projet/scripts/fixtures/rpm" "$temp/outils-simules/rpm"
  chmod u+x "$temp/outils-simules/rpm"
  PATH="$temp/outils-simules:$PATH" rpm -q bash > reponses/37-paquet.txt
  PATH="$temp/outils-simules:$PATH" bash verifier.sh 37
  echo 'Mission 37 : logique testée avec une réponse RPM simulée (AlmaLinux requis pour le contrôle réel).'
fi
grep -E '^(After|User|ExecStart|Restart)=' donnees/services/web.service > reponses/38-unite.txt
bash verifier.sh 38
LANG=C journalctl --disk-usage > reponses/39-journal.txt
bash verifier.sh 39
ip -br address > reponses/40-interfaces.txt
bash verifier.sh 40
ss -lnt > reponses/41-ports.txt
bash verifier.sh 41
if command -v getenforce >/dev/null; then
  getenforce > reponses/42-selinux.txt
  bash verifier.sh 42
else
  cp "$projet/scripts/fixtures/getenforce" "$temp/outils-simules/getenforce"
  chmod u+x "$temp/outils-simules/getenforce"
  PATH="$temp/outils-simules:$PATH" getenforce > reponses/42-selinux.txt
  PATH="$temp/outils-simules:$PATH" bash verifier.sh 42
  echo 'Mission 42 : logique testée avec une réponse SELinux simulée (AlmaLinux requis pour le contrôle réel).'
fi
