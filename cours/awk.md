---
id: awk
title: awk
group: Texte et flux
summary: Sélectionne et traite des colonnes ligne par ligne.
mission: 24
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

Essaie la mission 24 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.
