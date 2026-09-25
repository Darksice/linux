---
id: awk
title: awk
group: Texte et flux
summary: Sélectionne et traite des colonnes ligne par ligne.
---

## Comprendre

Sélectionne et traite des colonnes ligne par ligne.

## Commandes et options

La forme de base est `awk 'condition {action}' fichier`.

## Exemple commenté

```bash
awk '$4=="ERREUR" {print $3}' incidents.log
```

La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.

## Points de vigilance

`$1` est la première colonne. L’option `-F,` définit la virgule comme séparateur.
