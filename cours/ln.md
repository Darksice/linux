---
id: ln
title: ln -s
group: Fichiers et droits
summary: Crée un lien symbolique vers un autre chemin.
---

## Comprendre

Crée un lien symbolique vers un autre chemin.

## Commandes et options

La forme de base est `ln -s cible lien`.

## Exemple commenté

```bash
ln -s ../donnees/notes/consignes.txt travail/consignes-lien.txt
```

La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.

## Points de vigilance

Le chemin cible relatif est calculé depuis le dossier du lien.
