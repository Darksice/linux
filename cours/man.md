---
id: man
title: man
group: Navigation
summary: Consulte le manuel local d’une commande et recherche une information précise.
---

## Comprendre

`man`, abréviation de **manual**, ouvre la documentation installée sur la machine Linux. Il permet de comprendre une commande sans quitter le terminal et sans effectuer de recherche sur le Web.

Une page de manuel décrit généralement le rôle de la commande, sa syntaxe, ses options, ses fichiers associés et parfois des exemples. Consulter une page ne lance pas la commande présentée et ne modifie aucun fichier.

Les pages sont affichées dans un lecteur qui permet de se déplacer, de rechercher un mot et de quitter la documentation.

## Commandes et options

### Ouvrir la page d’une commande

```bash
man ls
man pwd
```

La forme générale est `man commande`. `man ls` ouvre la documentation de `ls` et `man pwd` celle de `pwd`.

Les rubriques `NAME`, `SYNOPSIS`, `DESCRIPTION` et `OPTIONS` sont particulièrement utiles. `SYNOPSIS` montre la manière correcte d’écrire la commande. Les éléments placés entre crochets sont généralement facultatifs.

### Se déplacer dans une page

Utilise les flèches ou les touches `Page précédente` et `Page suivante` pour parcourir le texte. La barre d’espace avance également d’un écran.

Ces touches sont utilisées pendant que la page est ouverte. Il ne faut pas les saisir après l’invite `$`.

### Rechercher dans la page

Une fois le manuel ouvert, saisis `/` suivi du mot recherché puis appuie sur Entrée. Par exemple, `/hidden` cherche le mot `hidden` dans la page de `ls`.

La touche `n` rejoint le résultat suivant. La touche `N` avec une majuscule revient au résultat précédent.

### Quitter le manuel

Appuie sur `q` pour fermer la page et revenir à l’invite de commande.

### Chercher une page par sujet

```bash
man -k dossier
apropos dossier
```

`man -k mot` recherche ce mot dans les noms et les descriptions courtes des pages. `apropos mot` effectue la même recherche. Ces commandes sont utiles lorsque tu connais le sujet, mais pas encore le nom de la commande.

### Choisir une section précise

```bash
man 1 passwd
man 5 passwd
```

Le manuel est réparti en sections. La section `1` documente les commandes utilisables dans le terminal. La section `5` documente les formats de fichiers. Un même nom peut exister dans plusieurs sections. Ici, `man 1 passwd` décrit la commande tandis que `man 5 passwd` décrit le fichier `/etc/passwd`.

### Utiliser une aide plus courte

```bash
ls --help
help cd
```

De nombreuses commandes acceptent `--help` pour afficher un résumé rapide. Certaines commandes intégrées au shell, comme `cd`, sont plutôt documentées avec `help cd`. Ces solutions sont utiles si aucune page de manuel n’est installée.

## Exemple commenté

```bash
$ man ls
LS(1)                     Commandes de l’utilisateur                    LS(1)
NAME
       ls - list directory contents
SYNOPSIS
       ls [OPTION]... [FILE]...
```

L’en-tête indique le nom `ls` et la section `1`. La rubrique `NAME` résume le rôle de la commande. `SYNOPSIS` montre que `ls` accepte des options et un ou plusieurs chemins. Les crochets indiquent que ces éléments sont facultatifs.

Depuis cette page, saisis `/all` pour rechercher le mot `all`, utilise `n` pour parcourir les résultats puis appuie sur `q` pour revenir au terminal.

## Points de vigilance

`/mot`, `n` et `q` sont des actions du lecteur de manuel. Elles ne fonctionnent ainsi que lorsque la page est ouverte.

Le texte et les exemples peuvent être en anglais selon les pages installées sur la machine.

Une page peut manquer si la documentation correspondante n’est pas installée. Essaie alors `commande --help` ou `help commande` pour une commande intégrée au shell.

Le manuel décrit toutes les possibilités d’une commande, y compris des options avancées ou risquées. Lis leur description avant de les utiliser.
