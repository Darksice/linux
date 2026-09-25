---
id: tail
title: tail
group: Texte et flux
summary: Affiche les dernières lignes d’un fichier ou suit ses ajouts.
---

## Comprendre

`tail` sélectionne la fin d’un fichier ou d’un flux. La commande affiche les dix dernières lignes par défaut et laisse le fichier source inchangé.

Elle permet de consulter les informations les plus récentes d’un journal ou de conserver une partie située à la fin d’un résultat.

## Commandes et options

### Afficher les dix dernières lignes

```bash
tail journaux/rotation
```

Sans option, `tail` affiche les dix dernières lignes dans leur ordre d’origine.

### Choisir le nombre de lignes

```bash
tail -n 1 journaux/rotation
tail -n 4 journaux/rotation
```

`tail -n 1` isole la dernière ligne. `tail -n 4` affiche les quatre dernières lignes.

### Lire un flux

```bash
head -n 8 flux/chronologie | tail -n 1
```

`tail` reçoit ici les huit lignes sélectionnées par `head`. Il garde la dernière de ce groupe et isole donc la ligne 8 du fichier d’origine.

### Suivre les nouvelles lignes

```bash
tail -f journal.log
```

L’option `-f` laisse la commande active et affiche les nouvelles lignes ajoutées au fichier. Utilise `Ctrl-C` pour arrêter le suivi et revenir à l’invite.

## Exemple commenté

```bash
$ tail -n 4 journaux/rotation
ligne 9  contrôle
ligne 10 sauvegarde
ligne 11 FLAG{EXEMPLE}
ligne 12 arrêt
```

La commande affiche les quatre dernières lignes. La première ligne visible est donc la neuvième si le fichier en contient douze.

## Points de vigilance

`tail -n 4` affiche un groupe de quatre lignes. Il ne sélectionne pas la quatrième ligne du fichier.

`tail -f` reste actif jusqu’à son interruption. `Ctrl-C` arrête la commande sans supprimer le fichier suivi.

Comme avec `head`, une redirection vers le fichier source avec `>` détruirait son contenu avant la lecture.
