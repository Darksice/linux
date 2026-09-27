---
id: pwd
title: pwd
group: Navigation
summary: Affiche le chemin absolu du dossier courant et confirme la position du terminal.
---

## Comprendre

`pwd`, abréviation de **print working directory**, affiche le chemin absolu du dossier courant. Ce chemin commence toujours par la racine `/` et décrit chaque dossier traversé pour atteindre la position du terminal.

Connaître cette position permet de comprendre comment les chemins relatifs seront interprétés. `pwd` est particulièrement utile avant une commande qui copie, déplace, modifie ou supprime des fichiers.

La commande affiche une information. Elle ne change pas de dossier et ne modifie aucun fichier.

## Commandes et options

### Afficher le chemin courant

```bash
pwd
```

`pwd` affiche un seul chemin absolu. Par exemple, `/home/alice/atelier` indique que le terminal se trouve dans `atelier`, lui-même placé dans le dossier personnel d’`alice` sous `/home`.

Le shell conserve aussi le chemin courant dans la variable `$PWD`. Cette variable est mise à jour après chaque changement de dossier réussi et peut être utilisée dans un script.

### Afficher le chemin logique

```bash
pwd -L
```

`pwd -L` affiche le chemin logique. Il conserve les liens symboliques présents dans le chemin utilisé pour atteindre le dossier. C’est généralement le comportement appliqué par défaut.

### Afficher le chemin physique

```bash
pwd -P
```

`pwd -P` affiche le chemin physique réel. Les liens symboliques sont remplacés par les dossiers vers lesquels ils pointent.

Pour débuter, `pwd` sans option suffit dans la plupart des situations. La différence entre `-L` et `-P` devient utile lorsqu’un parcours contient des liens symboliques. Leur création et leur fonctionnement seront expliqués dans la fiche consacrée à `ln`.

### Lire l’invite du terminal

Dans le shell, à gauche de l’endroit où tu saisis une commande, plusieurs informations sont généralement affichées. Cet ensemble s’appelle l’**invite de commande**. Son apparence varie selon la machine et sa configuration.

Dans l’invite `alice@machine:~/atelier$` :

- `alice` est le nom de l’utilisatrice connectée ;
- `machine` est le nom de l’ordinateur ;
- `~/atelier` représente le dossier courant, ici le dossier `atelier` placé dans le dossier personnel d’Alice ;
- `$` marque la fin de l’invite pour un compte utilisateur ordinaire.

La commande s’écrit **après** cette invite. Dans `alice@machine:~/atelier$ pwd`, seule la partie `pwd` a été saisie par l’utilisatrice. Il ne faut donc pas recopier `alice@machine:~/atelier$` lorsque le cours présente une commande.

Le symbole `#` peut remplacer `$` lorsqu’un shell possède les droits du superutilisateur `root`. Il signale un contexte plus puissant dans lequel une erreur peut avoir davantage de conséquences.

## Exemple commenté

```bash
$ pwd
/home/alice/atelier
```

Le premier `/` représente la racine du système. `home` contient les dossiers personnels, `alice` est le dossier personnel de l’utilisatrice et `atelier` est le dossier courant.

L’invite du terminal peut afficher seulement `~/atelier` pour représenter le dossier courant. `pwd` fournit la forme absolue complète `/home/alice/atelier`.

Avec un lien symbolique nommé `raccourci` qui pointe vers `/srv/projet`, les deux options peuvent produire des résultats différents.

```bash
$ pwd -L
/home/alice/raccourci
$ pwd -P
/srv/projet
```

## Points de vigilance

L’invite du terminal n’affiche pas toujours le chemin complet. Utilise `pwd` plutôt que de te fier uniquement à cette invite.

`pwd` n’accepte pas un nom de dossier à examiner. `pwd rep1` ne demande pas le chemin absolu de `rep1`. La commande décrit uniquement le dossier courant.

Le caractère `~` peut représenter le dossier personnel dans une commande, mais `pwd` affiche son véritable chemin absolu comme `/home/alice`.

Avant une commande qui écrit, déplace ou supprime des données, vérifie ta position avec `pwd`.
