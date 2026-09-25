---
id: tr
title: tr
group: Texte et flux
summary: Remplace, supprime ou compresse des caractères dans un flux.
---

## Comprendre

`tr`, abréviation de **translate**, transforme des caractères reçus sur l’entrée standard. La commande travaille caractère par caractère et écrit le résultat sur la sortie standard.

Contrairement à de nombreuses commandes, `tr` ne reçoit généralement pas de nom de fichier. Le contenu lui est transmis avec un pipe ou une redirection d’entrée.

## Commandes et options

### Remplacer des caractères

```bash
cat fichier | tr 'a-z' 'A-Z'
```

Chaque caractère du premier ensemble est remplacé par le caractère correspondant du second ensemble.

### Normaliser la casse

```bash
cat normalisation/casse | tr '[:lower:]' '[:upper:]'
```

Les classes `[:lower:]` et `[:upper:]` représentent les minuscules et les majuscules. Les guillemets empêchent le shell d’interpréter les crochets.

### Compresser des répétitions

```bash
cat normalisation/espaces | tr -s ' '
```

L’option `-s` réduit chaque suite d’espaces consécutifs à un seul espace. Les colonnes deviennent plus régulières pour un traitement avec `cut`.

### Supprimer des caractères

```bash
tr -d '\r' < fichier
```

L’option `-d` supprime les caractères indiqués. `\r` représente un retour chariot que l’on peut rencontrer dans des fichiers créés sous Windows.

### Construire un pipeline de normalisation

```bash
cut -d: -f2 pipeline/incidents | tr '[:lower:]' '[:upper:]' | sort | uniq -c
```

`cut` extrait une colonne. `tr` uniformise sa casse avant le tri et le comptage. Des valeurs qui différaient seulement par les majuscules deviennent alors identiques.

## Exemple commenté

```bash
$ cat normalisation/casse
Flag{alpha}
FLAG{ALPHA}
flag{beta}
$ cat normalisation/casse | tr '[:lower:]' '[:upper:]'
FLAG{ALPHA}
FLAG{ALPHA}
FLAG{BETA}
```

Après la normalisation, les deux premières lignes sont identiques. Un passage dans `sort | uniq -c` peut maintenant les compter ensemble.

## Points de vigilance

`tr` transforme des caractères, pas des mots entiers ni des colonnes logiques.

La commande lit normalement l’entrée standard. `tr 'a-z' 'A-Z' fichier` ne fonctionne pas comme `cat fichier` ou `sort fichier`.

Protège les ensembles avec des guillemets. Le shell pourrait autrement interpréter certains crochets ou caractères spéciaux.
