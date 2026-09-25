---
id: redirections
title: >  >>  2>
group: Texte et flux
summary: Envoie la sortie normale ou les erreurs vers un fichier.
---

## Comprendre

Envoie la sortie normale ou les erreurs vers un fichier.

## Commandes et options

La forme de base est `commande > fichier  |  commande >> fichier  |  commande 2> erreurs`.

## Exemple commenté

```bash
grep ERREUR journal.log > erreurs.txt
```

La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.

## Points de vigilance

`>` remplace le contenu, `>>` ajoute à la fin et `2>` capture les erreurs.
