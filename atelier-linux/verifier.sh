#!/usr/bin/env bash
# Vérification en lecture seule des résultats des missions.
set -u
cd "$(dirname "$0")" || exit 1
racine=$(pwd -P)

echec() { printf 'À revoir : %s\n' "$1"; exit 1; }
reussi() { printf 'VALIDÉ %s — code : %s\n' "$1" "$2"; exit 0; }
existe() { [ -f "$1" ] || echec "le fichier $1 est introuvable."; }
identique() { existe "$1"; cmp -s "$1" "$2" || echec "le contenu de $1 ne correspond pas encore."; }

case "${1:-}" in
  01)
    existe reponses/01-position.txt
    [ "$(cat reponses/01-position.txt)" = "$racine/donnees" ] || echec "enregistrez le chemin complet du dossier donnees avec pwd."
    reussi 01 ORBITE-01 ;;
  02)
    identique reponses/02-copie.txt donnees/notes/depart.txt
    reussi 02 RACINE-02 ;;
  03)
    [ -d travail/rapports ] || echec "le dossier travail/rapports manque."
    if [ -f travail/rapports/bilan.txt ]; then
      [ ! -s travail/rapports/bilan.txt ] || echec "bilan.txt doit être vide."
    elif [ -f travail/rapports/synthese.txt ]; then
      [ ! -s travail/rapports/synthese.txt ] || echec "synthese.txt doit être vide."
    else
      echec "bilan.txt manque (ou synthese.txt, s'il a déjà été renommé à la mission 04)."
    fi
    reussi 03 DOSSIER-03 ;;
  04)
    identique travail/rapports/consignes.txt donnees/notes/consignes.txt
    existe travail/rapports/synthese.txt
    [ ! -e travail/rapports/bilan.txt ] || echec "bilan.txt existe encore : renommez-le."
    [ ! -s travail/rapports/synthese.txt ] || echec "synthese.txt doit rester vide."
    reussi 04 DEPLACER-04 ;;
  05)
    identique travail/rapports/secret.txt "donnees/Projet Alpha/.secret"
    identique travail/rapports/compte-rendu.txt "donnees/Projet Alpha/compte rendu.txt"
    reussi 05 ESPACES-05 ;;
  06)
    [ -d travail/factures ] || echec "créez travail/factures."
    for mois in 01 02 03; do identique "travail/factures/2026-$mois.txt" "donnees/factures/2026-$mois.txt"; done
    [ "$(find travail/factures -maxdepth 1 -type f | wc -l | tr -d '[:space:]')" = 3 ] || echec "le dossier cible doit contenir exactement les trois fichiers .txt de 2026."
    reussi 06 MOTIF-06 ;;
  07)
    existe reponses/07-message.txt
    printf 'Linux se pratique.\nLinux se retient.\n' | cmp -s - reponses/07-message.txt || echec "le fichier doit contenir les deux phrases, chacune sur sa ligne."
    reussi 07 FLUX-07 ;;
  08)
    existe reponses/08-erreurs.txt
    [ "$(tr -d '[:space:]' < reponses/08-erreurs.txt)" = 4 ] || echec "comptez uniquement les lignes ERREUR de serveur.log."
    reussi 08 TUYAU-08 ;;
  09)
    existe reponses/09-erreurs-21.txt
    grep '2026-09-21' donnees/logs/serveur.log | grep 'ERREUR' | cmp -s - reponses/09-erreurs-21.txt || echec "il faut les deux lignes ERREUR du 21 septembre, sans les autres."
    reussi 09 FILTRE-09 ;;
  10)
    existe reponses/10-noms.txt
    [ "$(tr -d '[:space:]' < reponses/10-noms.txt)" = 6 ] || echec "il y a six noms de famille distincts dans l'annuaire."
    reussi 10 COLONNES-10 ;;
  11)
    existe reponses/11-logs.txt
    find donnees -type f -name '*.log' | sort | cmp -s - reponses/11-logs.txt || echec "listez les deux chemins .log, dans l'ordre alphabétique."
    reussi 11 TROUVER-11 ;;
  12)
    identique travail/bonjour.sh donnees/bonjour.sh
    [ -x travail/bonjour.sh ] || echec "ajoutez le droit d'exécution au propriétaire de travail/bonjour.sh."
    [ "$(./travail/bonjour.sh)" = 'Bonjour depuis Linux' ] || echec "le script ne produit pas le résultat attendu."
    reussi 12 DROITS-12 ;;
  13)
    existe travail/rapports.tar.gz
    tar -tzf travail/rapports.tar.gz 2>/dev/null | grep -Eq '(^|/)rapports/consignes.txt$' || echec "l'archive doit contenir le dossier rapports et consignes.txt."
    tar -tzf travail/rapports.tar.gz 2>/dev/null | grep -Eq '(^|/)rapports/synthese.txt$' || echec "l'archive doit aussi contenir synthese.txt."
    reussi 13 ARCHIVE-13 ;;
  14)
    existe reponses/14-regex.txt
    grep -E '^B.*7$' donnees/annuaire.txt | cmp -s - reponses/14-regex.txt || echec "sélectionnez les lignes qui commencent par B et finissent par 7."
    reussi 14 REGEX-14 ;;
  15)
    [ ! -e travail/brouillon.tmp ] || echec "le fichier travail/brouillon.tmp existe encore."
    [ -d travail/rapports ] || echec "le dossier rapports ne doit pas être supprimé."
    [ -d travail/factures ] || echec "le dossier factures ne doit pas être supprimé."
    reussi 15 NETTOYER-15 ;;
  16)
    [ -L travail/consignes-lien.txt ] || echec "créez un lien symbolique dans travail."
    [ "$(readlink travail/consignes-lien.txt)" = '../donnees/notes/consignes.txt' ] || echec "le lien doit utiliser un chemin relatif depuis travail."
    identique travail/consignes-lien.txt donnees/notes/consignes.txt
    reussi 16 LIEN-16 ;;
  17)
    identique travail/prive/app.conf donnees/config/app.conf
    [ "$(stat -c %a travail/prive)" = 700 ] || echec "travail/prive doit avoir le mode 700."
    [ "$(stat -c %a travail/prive/app.conf)" = 600 ] || echec "app.conf doit avoir le mode 600."
    reussi 17 PRIVE-17 ;;
  18)
    existe reponses/18-ko.txt
    [ "$(tr -d '[:space:]' < reponses/18-ko.txt)" = "$(du -sk donnees | cut -f 1)" ] || echec "enregistrez la taille en Ko de donnees."
    reussi 18 DISQUE-18 ;;
  19)
    existe reponses/19-hash.txt
    sha256sum donnees/notes/consignes.txt | cmp -s - reponses/19-hash.txt || echec "l'empreinte ou le chemin du fichier ne correspond pas."
    sha256sum -c reponses/19-hash.txt >/dev/null 2>&1 || echec "sha256sum -c ne valide pas votre fichier de contrôle."
    reussi 19 EMPREINTE-19 ;;
  20)
    existe travail/sauvegarde-notes.tar.gz
    tar -tzf travail/sauvegarde-notes.tar.gz 2>/dev/null | grep -Eq '(^|/)notes/consignes.txt$' || echec "l'archive ne contient pas notes/consignes.txt."
    identique travail/restauration/notes/consignes.txt donnees/notes/consignes.txt
    identique travail/restauration/notes/depart.txt donnees/notes/depart.txt
    reussi 20 RESTAURER-20 ;;
  21)
    existe reponses/21-fin.txt
    tail -n 3 donnees/logs/incidents.log | cmp -s - reponses/21-fin.txt || echec "enregistrez les trois dernières lignes exactes."
    reussi 21 FIN-21 ;;
  22)
    existe reponses/22-contexte.txt
    grep -n -C 1 ERREUR donnees/logs/incidents.log | cmp -s - reponses/22-contexte.txt || echec "utilisez les numéros de ligne et une ligne de contexte."
    reussi 22 CONTEXTE-22 ;;
  23)
    existe travail/app.conf
    sed 's/^MODE=debug$/MODE=production/' donnees/config/app.conf | cmp -s - travail/app.conf || echec "seule la ligne MODE=debug doit changer."
    reussi 23 CONFIG-23 ;;
  24)
    existe reponses/24-services.txt
    printf 'db 1\nweb 3\nworker 1\n' | cmp -s - reponses/24-services.txt || echec "comptez les erreurs par service et triez par nom."
    reussi 24 SERVICES-24 ;;
  25)
    existe reponses/25-hotes.txt
    printf 'node02\nnode04\nnode07\n' | cmp -s - reponses/25-hotes.txt || echec "la liste des hôtes DOWN n'est pas correcte."
    reussi 25 HOTES-25 ;;
  26)
    existe reponses/26-shell.txt
    awk 'NF==2 && $1~/^[0-9]+$/ && $2=="bash" {ok=1} END {exit !ok}' reponses/26-shell.txt || echec "enregistrez un PID numérique et la commande bash."
    reussi 26 PROCESSUS-26 ;;
  27)
    existe travail/sleep.pid
    pid=$(tr -d '[:space:]' < travail/sleep.pid)
    [[ "$pid" =~ ^[0-9]+$ ]] || echec "sleep.pid doit contenir un PID numérique."
    etat=$(ps -p "$pid" -o stat= 2>/dev/null | tr -d '[:space:]')
    case "$etat" in ''|Z*) reussi 27 SIGNAL-27 ;; *) echec "le processus $pid tourne encore (état $etat)." ;; esac ;;
  28)
    existe reponses/28-env.txt
    printf 'formation\n' | cmp -s - reponses/28-env.txt || echec "la valeur attendue est formation."
    reussi 28 ENVIRONNEMENT-28 ;;
  29)
    existe reponses/29-bash.txt
    chemin=$(cat reponses/29-bash.txt)
    case "$chemin" in */bash) [ -x "$chemin" ] || echec "le chemin ne mène pas à un exécutable." ;; *) echec "enregistrez le chemin complet de bash." ;; esac
    reussi 29 CHEMIN-29 ;;
  30)
    existe reponses/30-stderr.txt
    [ -s reponses/30-stderr.txt ] || echec "le fichier de sortie d'erreur est vide."
    grep -q 'donnees/introuvable' reponses/30-stderr.txt || echec "capturez l'erreur provoquée par le chemin donnees/introuvable."
    reussi 30 ERREUR-30 ;;
  31)
    existe travail/compter-erreurs.sh
    for specification in 'serveur.log:4' 'incidents.log:5' 'archive.log:0'; do
      nom=${specification%%:*}; attendu=${specification##*:}
      obtenu=$(bash travail/compter-erreurs.sh "donnees/logs/$nom") || echec "le script échoue avec $nom."
      [ "$obtenu" = "$attendu" ] || echec "avec $nom, le script doit afficher $attendu."
    done
    reussi 31 SCRIPT-31 ;;
  32)
    existe travail/verifier-config.sh
    obtenu=$(bash travail/verifier-config.sh donnees/config/app-production.conf) || echec "la configuration production doit réussir."
    [ "$obtenu" = OK ] || echec "la configuration production doit afficher OK."
    if obtenu=$(bash travail/verifier-config.sh donnees/config/app.conf); then echec "la configuration debug doit échouer."; fi
    [ "$obtenu" = KO ] || echec "la configuration debug doit afficher KO."
    reussi 32 CONDITION-32 ;;
  33)
    existe travail/rapport-logs.sh
    obtenu=$(bash travail/rapport-logs.sh donnees/logs) || echec "le script de rapport a échoué."
    attendu=$(printf 'archive.log 0\nincidents.log 5\nserveur.log 4')
    [ "$obtenu" = "$attendu" ] || echec "le rapport doit donner les comptes des trois journaux dans l'ordre."
    reussi 33 BOUCLE-33 ;;
  34)
    existe travail/sauvegarder.sh
    existe travail/auto-notes.tar.gz
    tar -tzf travail/auto-notes.tar.gz 2>/dev/null | grep -Eq '(^|/)notes/consignes.txt$' || echec "l'archive automatique ne contient pas les notes."
    if bash travail/sauvegarder.sh donnees/dossier-absent /dev/null >/dev/null 2>&1; then echec "le script doit échouer si le dossier source est absent."; fi
    reussi 34 BACKUP-34 ;;
  35)
    existe reponses/35-incident.txt
    printf 'total=5\nservice=web\nderniere=2026-09-22 09:50 worker\n' | cmp -s - reponses/35-incident.txt || echec "le rapport doit contenir les trois faits demandés, chacun sur sa ligne."
    reussi 35 INCIDENT-35 ;;
  36)
    existe reponses/36-os.txt
    (. /etc/os-release; printf '%s %s\n' "$ID" "$VERSION_ID") | cmp -s - reponses/36-os.txt || echec "enregistrez ID et VERSION_ID de la VM."
    reussi 36 SYSTEME-36 ;;
  37)
    command -v rpm >/dev/null || echec "cette mission demande AlmaLinux et la commande rpm."
    existe reponses/37-paquet.txt
    rpm -q bash | cmp -s - reponses/37-paquet.txt || echec "enregistrez exactement la réponse de rpm -q bash."
    reussi 37 PAQUET-37 ;;
  38)
    existe reponses/38-unite.txt
    grep -E '^(After|User|ExecStart|Restart)=' donnees/services/web.service | cmp -s - reponses/38-unite.txt || echec "extrayez les quatre paramètres de l'unité dans l'ordre du fichier."
    reussi 38 UNITE-38 ;;
  39)
    existe reponses/39-journal.txt
    grep -q 'journals take up' reponses/39-journal.txt || echec "enregistrez la sortie de LANG=C journalctl --disk-usage."
    reussi 39 JOURNAL-39 ;;
  40)
    existe reponses/40-interfaces.txt
    grep -Eq '^lo[[:space:]]' reponses/40-interfaces.txt || echec "la liste des interfaces doit contenir lo."
    grep -q '127.0.0.1' reponses/40-interfaces.txt || echec "la boucle locale doit montrer 127.0.0.1."
    reussi 40 RESEAU-40 ;;
  41)
    existe reponses/41-ports.txt
    grep -q 'State' reponses/41-ports.txt || echec "la table doit contenir l'en-tête de ss."
    grep -q 'Local Address:Port' reponses/41-ports.txt || echec "la colonne des adresses locales manque."
    reussi 41 PORTS-41 ;;
  42)
    command -v getenforce >/dev/null || echec "cette mission demande AlmaLinux et la commande getenforce."
    existe reponses/42-selinux.txt
    getenforce | cmp -s - reponses/42-selinux.txt || echec "enregistrez le mode SELinux courant avec getenforce."
    reussi 42 SELINUX-42 ;;
  *)
    printf 'Usage : bash verifier.sh NUMERO (de 01 à 42)\n' >&2
    exit 2 ;;
esac
