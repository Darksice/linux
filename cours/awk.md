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

La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.

## Points de vigilance

$1 est la première colonne ; -F, définit la virgule comme séparateur.

## Pour s’entraîner

Relis les exemples et explique à voix haute l’effet de chaque option. Les défis pratiques correspondants arriveront avec les prochains modules.
