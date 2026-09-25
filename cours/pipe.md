---
id: pipe
title: | (tuyau)
group: Texte et flux
summary: Transmet la sortie d’une commande à l’entrée d’une autre.
---

## Comprendre

Transmet la sortie d’une commande à l’entrée d’une autre.

## Commandes et options

La forme de base est `commande1 | commande2`.

## Exemple commenté

```bash
grep ERREUR journal.log | wc -l
```

La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.

## Points de vigilance

Construis le pipeline étape par étape pour voir les données intermédiaires.
