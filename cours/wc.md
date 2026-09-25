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
wc -l comptage/candidats/liste
```

L’option `-l` compte les caractères de fin de ligne. Le résultat correspond habituellement au nombre de lignes du fichier.

### Compter les mots

```bash
wc -w comptage/phrases/texte
```

L’option `-w` compte les groupes de caractères séparés par des espaces ou d’autres séparateurs reconnus par `wc`.

### Compter les octets

```bash
wc -c comptage/phrases/texte
```

L’option `-c` compte les octets. Avec des caractères accentués, ce nombre peut être supérieur au nombre de caractères visibles.

### Comparer plusieurs fichiers

```bash
wc -l comptage/candidats/*
```

`wc` affiche une ligne par fichier puis une ligne `total` lorsque plusieurs fichiers sont mesurés.

### Compter le résultat d’un pipeline

```bash
sort comptage/personnes | uniq | wc -l
```

`sort` rapproche les noms identiques, `uniq` n’en garde qu’un par groupe et `wc -l` compte les noms distincts restants.

## Exemple commenté

```bash
$ wc -l comptage/candidats/*
  8 comptage/candidats/equipe-a
 12 comptage/candidats/equipe-b
 20 total
$ wc -w comptage/phrases/message
7 comptage/phrases/message
```

`equipe-b` contient douze fins de ligne. `message` contient sept mots selon les règles de découpage de `wc`.

## Points de vigilance

`wc -l` compte les fins de ligne. Si la dernière ligne ne se termine pas par un retour à la ligne, le résultat peut sembler inférieur au nombre de lignes visibles.

Lorsqu’un fichier est fourni, son nom apparaît après le nombre. Dans un pipeline, seule la mesure est généralement affichée.

`wc -c` compte des octets, pas toujours des caractères. Cette différence apparaît notamment avec certains caractères Unicode.
