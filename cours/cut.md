---
id: cut
title: cut
group: Texte et flux
summary: Extrait des champs ou des positions de caractères dans chaque ligne.
---

## Comprendre

`cut` sélectionne une partie de chaque ligne reçue. La commande peut découper les lignes en champs séparés par un caractère ou conserver des positions précises.

Le résultat est écrit sur la sortie standard. Le fichier source reste inchangé et les lignes conservent leur ordre d’origine.

## Commandes et options

### Choisir le séparateur

```bash
cut -d: -f2 colonnes/fiche
```

L’option `-d` définit le délimiteur qui sépare les champs. Ici, `-d:` utilise le caractère `:`. L’option `-f2` conserve le deuxième champ de chaque ligne.

### Extraire un autre champ

```bash
cut -d: -f3 colonnes/fiche
cut -d';' -f2 colonnes/equipe
```

Le séparateur doit correspondre au fichier. Les guillemets protègent le point-virgule afin que le shell ne l’interprète pas comme une séparation entre commandes.

### Extraire plusieurs champs

```bash
cut -d: -f1,3 colonnes/fiche
cut -d: -f2-4 colonnes/fiche
```

Une virgule sélectionne plusieurs champs distincts. Un tiret sélectionne une plage continue.

### Extraire des caractères

```bash
cut -c1-8 colonnes/fiche
```

L’option `-c` travaille avec les positions des caractères au lieu d’un délimiteur. Cet exemple conserve les huit premiers caractères de chaque ligne.

### Lire un flux

```bash
cat normalisation/espaces | tr -s ' ' | cut -d' ' -f3
```

`cut` reçoit ici un texte dont les espaces ont été normalisés par `tr`. Il extrait ensuite le troisième champ.

## Exemple commenté

Imagine que `colonnes/fiche` contient trois champs séparés par `:`.

```bash
$ cat colonnes/fiche
alice:admin:FLAG{ALPHA}
bob:users:FLAG{BETA}
$ cut -d: -f3 colonnes/fiche
FLAG{ALPHA}
FLAG{BETA}
```

`-d:` découpe chaque ligne aux deux-points. `-f3` conserve uniquement le troisième champ.

## Points de vigilance

Le délimiteur de `cut` est un caractère précis. Une virgule, un deux-points et un point-virgule ne produisent pas le même découpage.

Des séparateurs consécutifs créent des champs vides. Normalise d’abord les espaces irréguliers avec `tr -s ' '` si nécessaire.

`cut` n’effectue ni tri ni comptage. Transmets sa sortie à `sort`, `uniq` ou `wc` pour poursuivre le traitement.
