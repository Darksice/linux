---
id: wc
title: wc
group: Texte et flux
summary: Compte les lignes, les mots et les octets d’un fichier ou d’un flux.
---

## Comprendre

`wc`, abréviation de **word count**, mesure un fichier ou un flux. Sans option, la commande affiche le nombre de lignes, de mots et d’octets.

Elle ne modifie pas les données. Elle est souvent placée à la fin d’un pipeline pour compter le résultat des étapes précédentes.

## Commandes et options

### Compter les lignes

```bash
wc -l comptage/candidats/beta
```

L’option `-l` compte les retours à la ligne, donc le nombre de lignes du fichier.

### Compter les mots

```bash
wc -w comptage/phrases/cible
```

L’option `-w` compte les groupes de caractères séparés par des espaces ou d’autres séparateurs reconnus par `wc`.

### Compter les octets

```bash
wc -c comptage/phrases/cible
```

L’option `-c` compte les octets. Avec des caractères accentués, ce nombre peut être supérieur au nombre de caractères visibles.

### Comparer plusieurs fichiers

```bash
wc -l comptage/candidats/alpha comptage/candidats/beta
```

`wc` affiche une ligne par fichier puis une ligne `total` lorsque plusieurs fichiers sont mesurés.

## Exemple commenté

```bash
$ wc -l comptage/candidats/alpha comptage/candidats/beta
  8 comptage/candidats/alpha
 12 comptage/candidats/beta
 20 total
$ wc -w comptage/phrases/cible
7 comptage/phrases/cible
```

`beta` contient douze lignes. `cible` contient sept mots selon les règles de découpage de `wc`.

## Points de vigilance

Lorsqu’un fichier est fourni, son nom apparaît après le nombre. Dans un pipeline, seule la mesure est généralement affichée.

`wc -c` compte des octets, pas toujours des caractères. Cette différence apparaît notamment avec certains caractères Unicode.
