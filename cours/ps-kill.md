---
id: ps-kill
title: ps / kill
group: Système et administration
summary: ps observe les processus et kill envoie un signal à un PID.
---

## Comprendre

`ps` observe les processus et `kill` envoie un signal à un PID.

## Commandes et options

Utilise `ps -p PID` pour observer un processus et `kill PID` pour lui envoyer un signal.

## Exemple commenté

```bash
ps -p 1234 -o pid,comm
```

La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.

## Points de vigilance

Vérifie le PID et la commande avant de terminer un processus.
