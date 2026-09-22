---
id: find
title: find
group: Fichiers et droits
summary: Cherche des fichiers dans une arborescence.
mission: 11
---

## Comprendre

Cherche des fichiers dans une arborescence.

## Commandes et options

La forme de base est `find depart -type f -name "motif"`.

## Exemple commenté

```bash
find donnees -type f -name "*.log"
```

La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.

## Points de vigilance

Mets le motif entre guillemets pour le laisser à find.

## Pour s’entraîner

Essaie la mission 11 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.
