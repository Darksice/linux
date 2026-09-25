---
id: file
title: file
group: Texte et flux
summary: Identifie le type probable d’un fichier à partir de son contenu.
---

## Comprendre

`file` examine le contenu d’un fichier et cherche des signatures connues. Il peut reconnaître du texte, une image, une archive, un exécutable, une page HTML ou un script même si le nom ne possède aucune extension.

La commande fournit une description probable. Elle ne modifie pas le fichier et ne garantit pas que son contenu est sûr.

## Commandes et options

### Identifier un fichier

```bash
file objets/document
```

Le résultat contient le nom du fichier puis une description de son type.

### Examiner plusieurs fichiers

```bash
file objets/*
```

Le joker `*` est développé par le shell. `file` examine chaque entrée visible correspondante et affiche une ligne de résultat par fichier.

### Afficher seulement la description

```bash
file -b objets/document
```

L’option `-b` retire le nom du fichier au début de la sortie. Seule la description reste affichée.

### Examiner ensuite un fichier texte

```bash
file objets/document
cat objets/document
```

Après avoir confirmé que le fichier contient du texte, `cat` ou `less` permet de le lire.

## Exemple commenté

```bash
$ file objets/*
objets/page:      HTML document, Unicode text, UTF-8 text
objets/script:    Bourne-Again shell script, ASCII text executable
objets/document:  Unicode text, UTF-8 text
```

Le nom et l’extension ne sont pas nécessaires pour distinguer les trois contenus. `document` est le fichier texte qui n’est décrit ni comme une page HTML ni comme un script.

## Points de vigilance

`file` identifie un format probable. Il ne réalise pas une analyse antivirus et ne prouve pas qu’un fichier peut être exécuté sans danger.

Une extension peut être trompeuse. Renommer un fichier en `.txt` ne transforme pas son contenu.

Le joker `*` n’inclut pas les noms cachés. Il peut aussi désigner des dossiers, que `file` décrira comme tels.
