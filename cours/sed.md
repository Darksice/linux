---
id: sed
title: sed
group: Texte et flux
summary: Transforme un flux de texte, notamment par substitution.
---

## Comprendre

Transforme un flux de texte, notamment par substitution.

## Commandes et options

La forme de base est `sed "s/ancien/nouveau/" fichier`.

## Exemple commenté

```bash
sed "s/^MODE=debug$/MODE=production/" app.conf
```

La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.

## Points de vigilance

Sans -i, le fichier source reste inchangé ; redirige la sortie vers une copie.

## Pour s’entraîner

Relis les exemples et explique à voix haute l’effet de chaque option. Les défis pratiques correspondants arriveront avec les prochains modules.
