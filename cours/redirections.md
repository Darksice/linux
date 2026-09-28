---
id: redirections
title: > et >>
group: Texte et flux
summary: Enregistre la sortie d’une commande dans un fichier, en remplaçant ou en ajoutant son contenu.
---

## Comprendre

Une commande comme `sort` ou `cat` affiche normalement son résultat dans le terminal. Une **redirection** permet d’envoyer cette sortie dans un fichier à la place.

Avec `>`, le fichier de destination est créé s’il n’existe pas, et son ancien contenu est remplacé s’il existe. Avec `>>`, le résultat est ajouté à la fin, et le fichier est aussi créé s’il n’existe pas.

## Commandes et options

### Enregistrer un résultat avec `>`

```bash
sort noms > resultat
```

Le shell prépare `resultat`, puis y écrit la sortie de `sort noms`. Le fichier `noms` n’est pas modifié. La sortie normale ne s’affiche plus dans le terminal, tu peux utiliser `cat resultat` pour la consulter.

### Ajouter un résultat avec `>>`

```bash
cat suite >> resultat
```

Le contenu de `suite` est ajouté à la fin de `resultat`, sans effacer ce qui s’y trouvait déjà. Répéter cette commande ajoute une deuxième fois le même contenu.

### Enregistrer un pipeline

```bash
sort noms | uniq > resultat
```

Le pipe relie `sort` à `uniq`. La redirection finale enregistre le résultat de **tout le pipeline** dans `resultat`.

## Exemple commenté

Imagine que `debut` contient la ligne `alpha` et `fin` la ligne `beta`.

```bash
$ cat debut > resultat
$ cat fin >> resultat
$ cat resultat
alpha
beta
```

La première commande crée ou remplace `resultat` avec `alpha`. La deuxième y ajoute `beta`. La dernière permet de vérifier le contenu obtenu. Les fichiers `debut` et `fin` restent inchangés.

## Points de vigilance

`>` efface immédiatement l’ancien contenu de la destination, même si la commande qui suit échoue. Vérifie donc le chemin avant de valider. `cat fichier > fichier` vide le fichier source : ne redirige pas une commande vers le même fichier qu’elle lit.

`>>` n’efface pas l’ancien contenu. Si tu relances la commande, tu ajoutes à nouveau les mêmes lignes.

La redirection ne crée pas les dossiers manquants : le dossier parent de la destination doit déjà exister. Ici, on traite uniquement la sortie normale. La redirection des erreurs sera abordée plus tard.
