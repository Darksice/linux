---
id: grep
title: grep
group: Texte et flux
summary: Affiche les lignes d’un fichier qui correspondent à un motif.
---

## Comprendre

Affiche les lignes d’un fichier qui correspondent à un motif.

## Commandes et options

La forme de base est `grep "motif" fichier`.

## Exemple commenté

```bash
grep "ERREUR" donnees/logs/serveur.log
```

La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.

## Points de vigilance

`-n` ajoute les numéros de ligne. `-E` active les expressions régulières étendues.
