---
id: ps-kill
title: ps / kill
group: Système et administration
summary: ps observe les processus ; kill envoie un signal à un PID.
---

## Comprendre

ps observe les processus ; kill envoie un signal à un PID.

## Commandes et options

La forme de base est `ps -p PID  |  kill PID`.

## Exemple commenté

```bash
ps -p 1234 -o pid,comm
```

La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.

## Points de vigilance

Vérifie le PID et la commande avant de terminer un processus.

## Pour s’entraîner

Relis les exemples et explique à voix haute l’effet de chaque option. Les défis pratiques correspondants arriveront avec les prochains modules.
