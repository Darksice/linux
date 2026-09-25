---
id: ip-ss
title: ip / ss
group: Système et administration
summary: ip inspecte les interfaces et les routes tandis que ss montre les sockets.
---

## Comprendre

`ip` inspecte les interfaces et les routes tandis que `ss` montre les sockets.

## Commandes et options

La forme de base est `ip -br address  |  ss -lnt`.

## Exemple commenté

```bash
ss -lnt
```

La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.

## Points de vigilance

Un service actif peut ne pas écouter sur le port ou l’interface attendus.
