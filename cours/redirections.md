---
id: redirections
title: >  >>  2>
group: Texte et flux
summary: Envoie la sortie normale ou les erreurs vers un fichier.
mission: 30
---

## Comprendre

Envoie la sortie normale ou les erreurs vers un fichier.

## Commandes et options

La forme de base est `commande > fichier  |  commande >> fichier  |  commande 2> erreurs`.

## Exemple commenté

```bash
grep ERREUR journal.log > erreurs.txt
```

La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.

## Points de vigilance

> remplace le contenu, >> ajoute à la fin, 2> capture les erreurs.

## Pour s’entraîner

Essaie la mission 30 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.
