---
id: tar
title: tar
group: Système et administration
summary: Crée, liste ou extrait une archive.
---

## Comprendre

Crée, liste ou extrait une archive.

## Commandes et options

La forme de base est `tar -czf archive.tar.gz dossier`.

## Exemple commenté

```bash
tar -tzf sauvegarde.tar.gz
```

La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.

## Points de vigilance

`-c` crée une archive, `-t` la liste et `-x` l’extrait. Vérifie son contenu avant une restauration.
