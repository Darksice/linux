---
id: pipe
title: | (tuyau)
group: Texte et flux
summary: Transmet la sortie standard d’une commande à l’entrée standard d’une autre.
---

## Comprendre

Le caractère `|`, appelé **pipe** ou **tuyau**, relie deux commandes. La sortie standard de la commande placée à gauche devient l’entrée standard de celle placée à droite.

Chaque commande accomplit une étape simple. Leur enchaînement construit un traitement plus précis sans créer de fichier temporaire.

## Commandes et options

### Relier deux commandes

```bash
cat flux/chronologie | head -n 1
```

`cat` produit le contenu du fichier. Le pipe transmet ce contenu à `head`, qui conserve seulement la première ligne.

### Isoler une ligne précise

```bash
head -n 8 flux/chronologie | tail -n 1
```

La première commande garde les huit premières lignes. La seconde garde la dernière ligne reçue. Le résultat correspond à la ligne 8 du fichier.

### Enchaîner plusieurs traitements

```bash
cut -d: -f2 pipeline/incidents | tr '[:lower:]' '[:upper:]' | sort | uniq -c
```

Le flux passe de gauche à droite. `cut` extrait une colonne, `tr` normalise la casse, `sort` rapproche les valeurs identiques et `uniq -c` compte leurs occurrences.

### Parcourir une sortie longue

```bash
diff -u ancien actuel | less
```

La sortie de `diff` n’est pas affichée directement. Elle devient le document consulté dans `less`.

## Exemple commenté

Imagine que `flux/chronologie` contient douze lignes.

```bash
$ head -n 3 flux/chronologie
étape 1
étape 2
FLAG{EXEMPLE}
$ head -n 3 flux/chronologie | tail -n 1
FLAG{EXEMPLE}
```

La première commande montre trois lignes. Dans le pipeline, `tail -n 1` reçoit uniquement ces trois lignes et conserve la dernière. Le fichier source reste inchangé.

## Points de vigilance

Construis un pipeline progressivement. Vérifie d’abord la sortie de chaque commande avant d’ajouter l’étape suivante.

Le pipe transmet seulement la sortie standard. Les messages d’erreur utilisent normalement un autre flux et ne sont pas transmis automatiquement.

Certaines commandes comme `cd` doivent modifier le shell courant. Les placer dans un pipeline ne permet pas de conserver ce changement dans le terminal principal.
