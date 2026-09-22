---
id: ls
title: ls
group: Navigation
summary: Liste les entrées d’un dossier et permet d’examiner leurs détails.
mission: 02
---

## Comprendre

`ls` affiche les noms des fichiers et des dossiers. Sans argument, il regarde le dossier courant. Avec un chemin, il regarde ce dossier sans changer ta position : `pwd` reste identique.

Les noms commençant par un point, comme `.secret`, sont cachés dans l’affichage ordinaire. Ils existent toujours : le point est simplement une convention de nommage.

## Commandes et options

- `ls` : montre les entrées visibles du dossier courant.
- `ls dossier` : montre les entrées visibles d’un autre dossier.
- `ls -a` : inclut les noms cachés, ainsi que `.` (dossier courant) et `..` (parent).
- `ls -l` : affiche une ligne détaillée par entrée : type, droits, propriétaire, groupe, taille, date et nom.
- `ls -la` : combine les détails et les noms cachés.
- `ls -lh` : rend les tailles plus lisibles, par exemple en K ou M.

## Exemple commenté

```bash
pwd
ls
ls "donnees/Projet Alpha"
ls -a "donnees/Projet Alpha"
ls -l donnees/notes
ls -la "donnees/Projet Alpha"
```

La deuxième commande affiche le contenu visible du dossier courant. Les deux commandes sur `Projet Alpha` permettent de comparer l’affichage normal et celui avec `-a` : `.secret` apparaît seulement dans le second. `-l` ajoute des détails sans montrer automatiquement les fichiers cachés ; `-la` fait les deux.

## Points de vigilance

`ls -l` appliqué à un dossier affiche normalement son **contenu**, pas la ligne du dossier lui-même. Pour examiner les droits du dossier, utilise `ls -ld dossier`. Mets entre guillemets un chemin qui contient des espaces.

## Pour s’entraîner

Dans la VM, compare `ls donnees/notes`, `ls -a "donnees/Projet Alpha"` et `ls -la "donnees/Projet Alpha"`. Quelles informations supplémentaires apparaissent à chaque fois ? Essaie ensuite les missions 02 et 05.
