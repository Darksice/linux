---
id: chown
title: chown
group: Fichiers et droits
summary: Change le propriétaire et, éventuellement, le groupe.
---

## Comprendre

Change le propriétaire et, éventuellement, le groupe.

## Commandes et options

La forme de base est `chown utilisateur:groupe fichier`.

## Exemple commenté

```bash
chown alice:admins rapport.txt
```

La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.

## Points de vigilance

Changer de propriétaire demande généralement des droits administrateur. L’exemple est une syntaxe, pas une commande à lancer dans l’atelier.

## Pour s’entraîner

Sur ta VM, compare le propriétaire et le groupe affichés par `ls -l` et `stat` sur un fichier de test. Lis `man chown`, puis écris la commande qui changerait ces deux valeurs sans l’exécuter : cet exercice ne demande pas de droits administrateur.
