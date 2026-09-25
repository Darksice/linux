---
id: uniq
title: uniq
group: Texte et flux
summary: Regroupe, détecte ou compte les lignes identiques qui se suivent.
---

## Comprendre

`uniq` compare chaque ligne à la ligne précédente. Sans option, il remplace chaque groupe de lignes identiques consécutives par une seule ligne.

La commande ne trie pas les données. Des doublons séparés par d’autres lignes ne sont pas reconnus comme un même groupe. C’est pourquoi `sort` est souvent utilisé avant `uniq`.

## Commandes et options

### Retirer les répétitions voisines

```bash
uniq doublons/brut
```

Seules les répétitions consécutives sont regroupées. Les lignes identiques éloignées restent présentes.

### Afficher uniquement les doublons

```bash
uniq -d doublons/brut
```

L’option `-d` affiche une fois chaque ligne qui se répète immédiatement.

### Compter les occurrences

```bash
uniq -c doublons/brut
```

L’option `-c` place le nombre d’occurrences devant chaque groupe de lignes voisines.

### Traiter des doublons éloignés

```bash
sort doublons/brut | uniq
sort doublons/brut | uniq -d
```

`sort` rapproche d’abord toutes les lignes identiques. `uniq` peut ensuite les regrouper ou afficher uniquement celles qui sont répétées.

### Classer les fréquences

```bash
sort doublons/frequences | uniq -c | sort -nr
```

Le premier tri regroupe les valeurs. `uniq -c` les compte. Le dernier tri classe les comptes du plus grand au plus petit.

## Exemple commenté

```bash
$ cat doublons/brut
FLAG{ALPHA}
FLAG{ALPHA}
FLAG{BETA}
FLAG{ALPHA}
$ uniq -d doublons/brut
FLAG{ALPHA}
$ sort doublons/brut | uniq -c
      3 FLAG{ALPHA}
      1 FLAG{BETA}
```

Sans tri, seul le premier groupe d’`ALPHA` est détecté comme doublon voisin. Après le tri, les trois occurrences se retrouvent ensemble et sont correctement comptées.

## Points de vigilance

`uniq` ne cherche pas dans tout le fichier. Il compare uniquement des lignes voisines.

Place `sort` avant `uniq`, pas après, si tu dois rapprocher des doublons éloignés.

Les espaces et la casse font partie de la ligne. `FLAG{ALPHA}`, `flag{alpha}` et une ligne terminée par un espace sont différents tant qu’ils ne sont pas normalisés.
