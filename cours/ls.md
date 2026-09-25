---
id: ls
title: ls
group: Navigation
summary: Liste le contenu d’un dossier et affiche les entrées cachées ou leurs détails.
---

## Comprendre

`ls` affiche les entrées contenues dans un dossier. Une entrée peut être un fichier, un dossier ou un lien. Sans chemin, la commande examine le dossier courant.

Contrairement à `cd`, `ls` ne change jamais le dossier courant. Tu peux examiner un autre emplacement avec `ls chemin` puis lancer `pwd`. Le chemin affiché par `pwd` reste identique.

Par défaut, les noms commençant par un point comme `.secret` sont masqués. Ils existent bien sur le système. Le point placé au début du nom est une convention utilisée par Linux pour identifier les entrées cachées.

## Commandes et options

### Lister le dossier courant

```bash
ls
```

`ls` affiche les entrées visibles du dossier courant. La commande montre leurs noms sans entrer dans les sous-dossiers et sans modifier les fichiers.

Si le terminal n’affiche rien, le dossier ne contient aucune entrée visible. Il peut cependant contenir des entrées cachées.

### Lister un autre dossier

```bash
ls rep1
ls rep1/rep2
```

`ls rep1` affiche les entrées visibles de `rep1` sans quitter le dossier courant. Le second exemple suit le chemin relatif `rep1/rep2` et affiche le contenu visible de `rep2`.

Le chemin peut aussi être absolu. `ls /etc` examine toujours le dossier `/etc`, quelle que soit la position actuelle.

### Afficher les détails

```bash
ls -l
ls -l rep1
```

L’option `-l` utilise un format long. Chaque entrée occupe une ligne qui présente les informations suivantes.

- Le type de l’entrée et ses droits apparaissent au début de la ligne. Le premier caractère vaut notamment `d` pour un dossier et `-` pour un fichier ordinaire.
- Le nombre de liens physiques vers l’inode est affiché après les droits. Un inode contient les métadonnées qui identifient l’entrée sur le système de fichiers.
- Le propriétaire et le groupe sont indiqués dans les colonnes suivantes.
- La taille est affichée en octets.
- La date de dernière modification précède le nom.

La ligne `total` placée au début du résultat représente l’espace réellement alloué aux entrées listées. Sur un système GNU/Linux courant, cette valeur est généralement exprimée en blocs de 1 Kio. Elle ne donne ni le nombre d’entrées ni la simple somme des tailles affichées.

### Afficher les entrées cachées

```bash
ls -a
ls -a rep1
```

L’option `-a` affiche toutes les entrées, y compris celles dont le nom commence par un point. Le résultat contient aussi `.` pour le dossier courant et `..` pour son dossier parent. Avec `ls -a rep1`, `.` désigne `rep1`, même si le dossier courant du terminal ne change pas.

### Combiner les détails et les entrées cachées

```bash
ls -la
ls -la rep1
```

Les options courtes peuvent être regroupées. `ls -la` combine donc le format long de `-l` avec l’affichage complet de `-a`. La forme `ls -al` produit le même résultat.

## Exemple commenté

Imagine que tu te trouves dans `/home/alice/atelier`. Ce dossier contient `notes.txt` et le dossier `rep1`. `rep1` contient le fichier visible `config.txt` et le fichier caché `.secret`.

```bash
$ pwd
/home/alice/atelier
$ ls
notes.txt  rep1
$ ls rep1
config.txt
$ ls -a rep1
.  ..  .secret  config.txt
$ ls -l rep1
total 4
-rw-r--r-- 1 alice alice 128 24 sept. 10:30 config.txt
$ ls -la rep1
total 16
drwxr-xr-x 2 alice alice 4096 24 sept. 10:30 .
drwxr-xr-x 3 alice alice 4096 24 sept. 10:20 ..
-rw------- 1 alice alice   42 24 sept. 10:25 .secret
-rw-r--r-- 1 alice alice  128 24 sept. 10:30 config.txt
```

La première commande `ls` affiche les deux entrées visibles du dossier courant. `ls rep1` examine ensuite un autre dossier sans utiliser `cd`. Le fichier `.secret` devient visible uniquement avec `-a`.

`ls -l rep1` ajoute les détails mais ne montre toujours pas `.secret`. Il faut combiner les deux options avec `ls -la rep1` pour obtenir les détails de toutes les entrées.

## Points de vigilance

`ls -l rep1` affiche le contenu détaillé de `rep1`, pas les informations du dossier `rep1` lui-même. La commande `ls -ld rep1` permet d’examiner le dossier sans lister son contenu.

Un dossier peut sembler vide avec `ls` tout en contenant des entrées cachées. Utilise `ls -a` pour le vérifier.

Linux distingue les majuscules et les minuscules. `ls Documents` et `ls documents` visent donc deux dossiers différents.

Un chemin contenant des espaces doit être protégé. Utilise par exemple `ls "Mes documents"` ou `ls Mes\ documents`.
