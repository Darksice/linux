---
id: sort
title: sort
group: Texte et flux
summary: Trie des lignes entières ou selon une clé textuelle ou numérique.
---

## Comprendre

`sort` reçoit des lignes et les affiche dans un nouvel ordre. Par défaut, la comparaison est textuelle et dépend des règles de langue configurées sur la machine.

La commande n’écrit pas dans le fichier source. Elle produit un résultat trié sur la sortie standard et prépare souvent les données pour `uniq`.

## Commandes et options

### Trier des lignes

```bash
sort tri/noms
```

Sans option, `sort` compare le texte des lignes. Les nombres sont alors traités comme des suites de caractères.

### Trier numériquement

```bash
sort -n tri/scores
```

L’option `-n` compare les valeurs comme des nombres. Elle évite de considérer `12` comme inférieur à `9` à cause de son premier caractère.

### Inverser l’ordre

```bash
sort -r tri/noms
sort -nr tri/scores
```

`-r` inverse le résultat. Les options peuvent être regroupées. `-nr` produit donc un tri numérique décroissant.

### Trier selon un champ

```bash
sort -t: -k2,2n tri/charges
```

`-t:` choisit `:` comme séparateur de champs. `-k2,2` limite la clé au deuxième champ. Le suffixe `n` demande une comparaison numérique de cette clé.

### Préparer les données pour uniq

```bash
sort doublons/brut | uniq -d
```

Le tri rapproche les lignes identiques. `uniq -d` peut alors détecter tous les doublons du flux.

## Exemple commenté

```bash
$ cat tri/scores
9 FLAG{NEUF}
12 FLAG{DOUZE}
3 FLAG{TROIS}
$ sort tri/scores
12 FLAG{DOUZE}
3 FLAG{TROIS}
9 FLAG{NEUF}
$ sort -n tri/scores
3 FLAG{TROIS}
9 FLAG{NEUF}
12 FLAG{DOUZE}
```

Le premier tri compare du texte et place `12` avant `9`. L’option `-n` rétablit l’ordre numérique attendu.

## Points de vigilance

Un tri textuel et un tri numérique peuvent produire des résultats très différents. Vérifie toujours la nature de la clé.

`-k2` peut continuer la comparaison jusqu’à la fin de la ligne. Utilise `-k2,2` pour limiter précisément la clé au deuxième champ.

`sort` ne modifie pas le fichier par défaut. Une redirection est nécessaire pour enregistrer le résultat dans un autre fichier.
