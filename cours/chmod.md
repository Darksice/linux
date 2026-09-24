---
id: chmod
title: chmod
group: Fichiers et droits
summary: Règle les droits de lecture, d’écriture et d’exécution.
---

## Comprendre

`chmod` modifie les droits d’accès d’un fichier ou d’un dossier. Ces droits sont organisés en **trois triplets** : propriétaire (`u`), groupe (`g`) et autres utilisateurs (`o`). Dans chaque triplet, `r` signifie lecture, `w` écriture et `x` exécution.

Le premier caractère de `ls -l` décrit le type (`-` pour fichier, `d` pour dossier). Les neuf caractères suivants représentent les trois triplets. Par exemple, `-rwxr-x---` signifie : propriétaire `rwx`, groupe `r-x`, autres `---`.

## Commandes et options

- Forme symbolique : `chmod u+x fichier` ajoute `x` au propriétaire ; `chmod g-w fichier` retire `w` au groupe ; `chmod o= fichier` enlève tous les droits aux autres.
- Forme numérique : chaque triplet devient un chiffre en additionnant `r = 4` (`2²`), `w = 2` (`2¹`) et `x = 1` (`2⁰`). Une absence de droit vaut `0`.
- `7 = 4 + 2 + 1` donne `rwx` ; `6 = 4 + 2` donne `rw-` ; `5 = 4 + 1` donne `r-x`.
- `chmod 600 fichier` donne `rw-------` ; `chmod 755 script.sh` donne `rwxr-xr-x` ; `chmod 700 dossier` donne `rwx------`.

## Exemple commenté

```bash
mkdir travail/prive
cp donnees/config/app.conf travail/prive/app.conf
chmod 700 travail/prive
chmod 600 travail/prive/app.conf
ls -ld travail/prive
ls -l travail/prive/app.conf
```

Le dossier reçoit `7` pour son propriétaire : il peut le lister, y créer des entrées et le traverser. Le fichier reçoit `6` : son propriétaire peut le lire et le modifier, mais pas l’exécuter. Dans les deux cas, groupe et autres n’ont aucun droit.

## Points de vigilance

Sur un **dossier**, `x` signifie surtout pouvoir le traverser et accéder à une entrée dont on connaît le nom ; `r` permet de lister ses noms ; `w` permet d’y créer ou supprimer des entrées, généralement avec `x`. Sur un **fichier**, `x` autorise son exécution. `chmod` ne change pas le propriétaire : c’est le rôle de `chown`. Évite `chmod -R 777` : il ouvre largement tout un arbre, y compris les fichiers qui n’ont pas besoin d’être exécutables.

## Pour s’entraîner

Sur un répertoire de test créé sur ta machine Linux, prédis les droits de `600`, `700` et `750` en écrivant les trois triplets. Vérifie ensuite ta prédiction avec `ls -ld` et `ls -l`.
