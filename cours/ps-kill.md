---
id: ps-kill
title: ps / kill
group: Système et AlmaLinux
summary: ps observe les processus ; kill envoie un signal à un PID.
mission: 27
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

Essaie la mission 27 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.
