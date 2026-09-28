---
id: head
title: head
group: Texte et flux
summary: Affiche les premières lignes d’un fichier ou d’un flux.
---

## Comprendre

`head` sélectionne le début d’un fichier ou d’un flux. La commande affiche dix lignes par défaut et écrit le résultat sur la sortie standard.

Elle ne modifie pas la source. Elle permet d’inspecter rapidement la structure d’un fichier ou de conserver un nombre précis de premières lignes.

## Commandes et options

### Afficher les dix premières lignes

```bash
head journaux/rotation
```

Sans option, `head` affiche les dix premières lignes. Si le fichier en contient moins, toutes ses lignes sont affichées.

### Choisir le nombre de lignes

```bash
head -n 1 journaux/rotation
head -n 11 journaux/rotation
```

L’option `-n` fixe le nombre de lignes conservées. `-n 1` isole la première ligne. `-n 11` affiche les onze premières lignes dans leur ordre d’origine.

## Exemple commenté

```bash
$ head -n 3 journaux/rotation
ligne 1  démarrage
ligne 2  vérification
ligne 3  service prêt
```

La sortie contient exactement les trois premières lignes. Les lignes suivantes restent dans le fichier mais ne sont pas affichées.

## Points de vigilance

`head -n 11` affiche les onze premières lignes. Il n’affiche pas uniquement la ligne 11.
