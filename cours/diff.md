---
id: diff
title: diff
group: Texte et flux
summary: Compare deux fichiers ligne par ligne et décrit leurs différences.
---

## Comprendre

`diff` compare deux fichiers texte ligne par ligne. La commande indique ce qui a été supprimé, ajouté ou remplacé pour passer du premier fichier au second.

L’ordre des arguments est important. Le premier représente l’ancienne version et le second la nouvelle version dans les exemples du cours. `diff` décrit les écarts sans modifier ni fusionner les fichiers.

## Commandes et options

### Comparer deux fichiers

```bash
diff config/service-ancien config/service-actuel
```

Sans option, `diff` utilise son format historique. Une sortie vide signifie que les fichiers sont identiques pour cette comparaison.

### Utiliser le format unifié

```bash
diff -u config/service-ancien config/service-actuel
```

L’option `-u` produit un résultat plus lisible avec du contexte autour des changements. Les lignes précédées de `-` appartiennent à l’ancienne version. Les lignes précédées de `+` appartiennent à la nouvelle version. Une ligne commençant par un espace sert de contexte.

### Parcourir une longue comparaison

```bash
diff -u config/volume-ancien config/volume-actuel | less
```

Le pipe envoie la comparaison à `less`. Tu peux alors rechercher une section avec `/mot` et quitter avec `q`.

## Exemple commenté

```bash
$ diff -u config/service-ancien config/service-actuel
--- config/service-ancien
+++ config/service-actuel
@@ -1,2 +1,3 @@
 port=8080
+FLAG{EXEMPLE}
 mode=actif
```

Les deux lignes d’en-tête nomment les fichiers comparés. La ligne `FLAG{EXEMPLE}` commence par `+`, elle existe donc dans `service-actuel` mais pas dans `service-ancien`.

## Points de vigilance

Inverse les deux arguments et les ajouts deviennent des suppressions. Garde toujours en tête l’ordre ancienne version puis nouvelle version.

Les lignes `---` et `+++` sont les en-têtes du format unifié. Elles ne représentent pas directement du contenu supprimé ou ajouté.

Un caractère `+` ou `-` présent plus loin dans le contenu n’est pas forcément un marqueur. Le marqueur de `diff` occupe la première colonne de la ligne.
