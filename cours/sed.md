---
id: sed
title: sed
group: Texte et flux
summary: Transforme un flux de texte, notamment par substitution.
mission: 23
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

Essaie la mission 23 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.
