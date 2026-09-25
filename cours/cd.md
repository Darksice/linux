---
id: cd
title: cd
group: Navigation
summary: Change le dossier courant et navigue avec des chemins relatifs ou absolus.
---

## Comprendre

`cd`, abréviation de **change directory**, permet de changer le dossier courant du terminal. Ce dossier sert de point de départ à tous les chemins relatifs utilisés ensuite par `ls`, `cat`, `cp` ou d’autres commandes.

La commande `pwd` affiche le chemin absolu du dossier courant. Ce chemin commence à la racine `/`. Lorsqu’un changement réussit, `cd` n’affiche généralement rien. Utilise `pwd` pour confirmer ta nouvelle position.

## Commandes et options

La forme générale est `cd chemin`. Le chemin peut désigner un dossier situé sous le dossier courant, un dossier parent, le dossier personnel ou un emplacement absolu.

### Revenir dans son dossier personnel

```bash
cd "$HOME"
cd
cd ~
```

La variable d’environnement `$HOME` contient le chemin absolu de ton dossier personnel. Sa valeur ressemble généralement à `/home/alice`.

- `cd "$HOME"` utilise directement la valeur de la variable `HOME`.
- `cd` sans argument utilise lui aussi le dossier indiqué par `HOME`.
- `cd ~` fonctionne de la même façon dans Bash. Le shell remplace `~` par le chemin du dossier personnel avant d’exécuter `cd`.

`~` est rapide à saisir. `$HOME` est particulièrement utile dans les scripts ou pour construire un chemin comme `cd "$HOME/rep1"`. Les guillemets protègent la valeur de la variable si le chemin contient des espaces.

### Descendre dans un ou plusieurs dossiers

```bash
cd rep1
cd rep1/rep2
```

`cd rep1` entre dans le dossier `rep1` situé dans le dossier courant. `cd rep1/rep2` traverse deux niveaux en une commande. `rep1` doit exister dans le dossier courant et `rep2` doit se trouver dans `rep1`.

Ces deux chemins sont **relatifs**. Leur destination dépend du dossier de départ. Si tu changes de position, le même chemin peut mener ailleurs ou ne plus exister.

### Remonter dans l’arborescence

```bash
cd ..
cd ../..
cd ../../rep1
```

`..` représente le dossier parent. `cd ..` remonte donc d’un niveau et `cd ../..` remonte de deux niveaux. Les éléments peuvent être combinés. `cd ../../rep1` remonte deux fois, puis entre dans `rep1` depuis ce nouvel emplacement.

### Revenir au dossier précédent

```bash
cd "$OLDPWD"
cd -
```

La variable d’environnement `$OLDPWD` mémorise le dossier occupé avant le dernier changement. `cd "$OLDPWD"` utilise cette valeur pour rejoindre ce dossier. `cd -` est une forme plus courte qui fait le même déplacement et affiche le chemin rejoint.

### Utiliser un chemin absolu

```bash
cd /etc
cd /
cd "$HOME/rep1/rep2"
```

Un chemin commençant par `/` est **absolu**. Il part toujours de la racine du système, quelle que soit ta position actuelle. `cd /etc` rejoint le dossier système `/etc`. `cd /` rejoint directement la racine. Après développement de `$HOME`, le troisième exemple devient lui aussi un chemin absolu.

### Rester sur place ou gérer les espaces

```bash
cd .
cd "Mes documents"
cd Mes\ documents
```

`.` représente le dossier courant. `cd .` ne change donc pas de position. Pour un nom contenant des espaces, entoure le chemin de guillemets ou protège chaque espace avec `\`. Sans cela, le shell interprète les mots comme plusieurs arguments.

## Exemple commenté

Imagine que le dossier personnel est `/home/alice` et que `rep1` contient lui-même `rep2`.

```bash
$ pwd
/home/alice
$ cd rep1
$ pwd
/home/alice/rep1
$ cd rep2
$ pwd
/home/alice/rep1/rep2
$ cd ../..
$ pwd
/home/alice
$ cd rep1/rep2
$ pwd
/home/alice/rep1/rep2
$ cd ~
$ pwd
/home/alice
```

Le premier `cd rep1` mène dans `/home/alice/rep1`. Comme la position a changé, `cd rep2` peut ensuite atteindre `/home/alice/rep1/rep2`. Depuis cet emplacement, `cd ../..` remonte deux niveaux et revient dans `/home/alice`. `cd rep1/rep2` montre qu’il est également possible de refaire tout le trajet avec un seul chemin relatif. Enfin, `cd ~` revient au dossier personnel, indépendamment du point de départ.

## Points de vigilance

- Linux distingue les majuscules et les minuscules. `Documents` et `documents` sont deux dossiers différents.
- `cd` suivi d’un nom incorrect produit le message `No such file or directory`.
- Il faut avoir le droit de traverser le dossier. Sans le droit d’exécution `x`, le shell répond `Permission denied`.
- `~` est développé seulement lorsqu’il apparaît au début d’un mot et qu’il n’est pas protégé par des guillemets. Utilise `cd ~`, pas `cd "~"`. `cd "$HOME"` fonctionne car les variables sont développées entre guillemets doubles.
- Un chemin commençant par `/` est absolu. Les autres chemins vus ici sont relatifs au dossier courant, sauf `~`, `$HOME` et `$OLDPWD` que le shell développe avant d’exécuter `cd`.
- Dans un script destiné à plusieurs utilisateurs, évite un chemin écrit en dur comme `/home/alice`. Utilise `~` ou `$HOME` afin d’employer le dossier personnel du compte qui exécute le script.
