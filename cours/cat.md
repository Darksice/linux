---
id: cat
title: cat
group: Texte et flux
summary: Affiche et concatène le contenu de fichiers sur la sortie standard.
---

## Comprendre

`cat`, abréviation de **concatenate**, lit un ou plusieurs fichiers puis écrit leur contenu sur la sortie standard. Dans un terminal, cette sortie apparaît directement à l’écran.

La commande ne modifie pas les fichiers qu’elle lit. Elle est adaptée aux fichiers texte courts. Pour un document long, `less` offre une navigation plus confortable.

## Commandes et options

### Afficher un fichier

```bash
cat accueil/briefing
```

`cat fichier` affiche tout le contenu du fichier, de la première à la dernière ligne. Si le chemin est incorrect, le shell signale que le fichier n’existe pas.

### Afficher plusieurs fichiers

```bash
cat partie1 partie2
```

Les fichiers sont lus dans l’ordre indiqué. Le contenu de `partie2` est affiché juste après celui de `partie1`. Les fichiers sources restent séparés et inchangés.

### Numéroter les lignes

```bash
cat -n accueil/briefing
```

L’option `-n` ajoute un numéro devant chaque ligne affichée. Elle permet de repérer rapidement une position dans un petit fichier.

### Envoyer le contenu dans un pipe

```bash
cat flux/chronologie | head -n 1
```

Le pipe `|` transmet la sortie de `cat` à la commande suivante. Ici, `head` conserve uniquement la première ligne du contenu reçu.

### Concaténer dans un nouveau fichier

```bash
cat partie1 partie2 > complet
cat annexe >> complet
```

`>` enregistre la concaténation dans `complet` et remplace son ancien contenu. `>>` ajoute le contenu d’`annexe` à la fin sans effacer ce qui existe déjà.

## Exemple commenté

Imagine que `accueil/briefing` contient trois lignes.

```bash
$ cat accueil/briefing
Bienvenue dans le Module 02
Lis chaque question avec attention
FLAG{EXEMPLE}
$ cat -n accueil/briefing
     1  Bienvenue dans le Module 02
     2  Lis chaque question avec attention
     3  FLAG{EXEMPLE}
```

La première commande affiche le texte tel qu’il est enregistré. La seconde conserve le même contenu et ajoute seulement des numéros dans la sortie du terminal.

## Points de vigilance

`cat` affiche tout le fichier sans pause. Utilise `less` si le contenu risque de remplir plusieurs écrans.

La commande `cat fichier` ne modifie pas le fichier. Le danger vient surtout des redirections. `cat source > source` vide le fichier avant que `cat` puisse le lire.

Un fichier binaire peut produire des caractères illisibles dans le terminal. Utilise d’abord `file` lorsque la nature du fichier est inconnue.
