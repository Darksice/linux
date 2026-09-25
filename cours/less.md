---
id: less
title: less
group: Texte et flux
summary: Parcourt et recherche un texte long sans modifier le fichier.
---

## Comprendre

`less` ouvre un fichier dans un lecteur interactif appelé **pager**. Le texte est affiché écran par écran au lieu de défiler entièrement dans le terminal.

La commande permet de se déplacer et de rechercher une expression sans modifier le fichier. Elle convient aux longs documents, aux journaux et aux sorties volumineuses d’autres commandes.

## Commandes et options

### Ouvrir un fichier

```bash
less manuel/guide
```

Le fichier s’ouvre dans le lecteur. L’invite de commande réapparaît seulement après avoir quitté `less`.

### Se déplacer

Les flèches parcourent le texte ligne par ligne. La barre d’espace ou `Page suivante` avance d’un écran. `Page précédente` remonte d’un écran.

La touche `g` rejoint le début du document. La touche `G` avec une majuscule rejoint sa fin.

### Rechercher vers l’avant

Saisis `/` suivi du texte recherché puis appuie sur Entrée. `/PROCÉDURE ACTIVE` rejoint la prochaine occurrence de cette expression.

La touche `n` passe au résultat suivant. La touche `N` revient au résultat précédent.

### Rechercher vers l’arrière

Saisis `?` suivi du texte recherché pour chercher vers le début du document. Cette méthode est pratique après avoir rejoint la fin avec `G`.

### Quitter

Appuie sur `q` pour fermer le lecteur et revenir au terminal.

### Lire la sortie d’une commande

```bash
diff -u ancien actuel | less
```

`less` peut recevoir un flux depuis un pipe. Ici, la comparaison produite par `diff` devient consultable écran par écran.

## Exemple commenté

```bash
$ less manuel/guide
PROCÉDURE ARCHIVÉE
Ne plus appliquer cette procédure.

PROCÉDURE ACTIVE
FLAG{EXEMPLE}
```

Après l’ouverture, saisis `/PROCÉDURE ACTIVE` pour rejoindre directement la bonne section. Utilise `n` si le texte apparaît plusieurs fois puis `q` pour quitter.

## Points de vigilance

Les touches `/`, `?`, `n`, `G` et `q` sont utilisées dans le lecteur. Elles ne doivent pas être saisies après l’invite `$`.

`less` sert à consulter. Il n’enregistre pas de modification dans le fichier.

Une recherche tient compte du texte exact. Vérifie la casse et les accents si aucun résultat n’apparaît.
