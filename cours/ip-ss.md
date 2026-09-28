---
id: ip-ss
title: ip / ss
group: Système et administration
summary: ip inspecte les interfaces et les routes tandis que ss montre les sockets.
---

## Comprendre

`ip` inspecte les interfaces et les routes tandis que `ss` montre les sockets.

## Commandes et options

Utilise `ip -br address` pour les adresses et `ss -lnt` pour les sockets en écoute.

## Exemple commenté

```bash
ss -lnt
```

La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.

## Points de vigilance

Un service actif peut ne pas écouter sur le port ou l’interface attendus.
