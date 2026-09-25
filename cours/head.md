---
id: head
title: head
group: Texte et flux
summary: Affiche les premières lignes d’un fichier ou d’un flux.
---

## Comprendre

`head` sélectionne le début d’un fichier ou d’un flux. La commande affiche dix lignes par défaut et écrit le résultat sur la sortie standard.

Elle ne modifie pas la source. Elle permet d’inspecter rapidement la structure d’un fichier ou de conserver un nombre précis de premières lignes dans un pipeline.

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

### Lire un flux

```bash
cat flux/chronologie | head -n 3
```

Sans nom de fichier, `head` peut lire l’entrée standard. Dans cet exemple, il conserve les trois premières lignes produites par `cat`.

### Isoler une ligne avec tail

```bash
head -n 8 flux/chronologie | tail -n 1
```

`head` garde les huit premières lignes. `tail -n 1` conserve ensuite la dernière de ce groupe, ce qui isole la ligne 8.

## Exemple commenté

```bash
$ head -n 3 journaux/rotation
ligne 1  démarrage
ligne 2  vérification
ligne 3  service prêt
```

La sortie contient exactement les trois premières lignes. Les lignes suivantes restent dans le fichier mais ne sont pas affichées.

## Points de vigilance

`head` sélectionne le début du flux qu’il reçoit. Placé après une autre commande, il ne connaît pas le fichier d’origine.

`head -n 11` affiche les onze premières lignes. Il n’affiche pas uniquement la ligne 11. Ajoute `tail -n 1` pour isoler cette ligne.

Évite de rediriger le résultat vers le fichier source avec `>`. Le shell viderait le fichier avant sa lecture.
