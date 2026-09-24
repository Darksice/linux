---
id: ip-ss
title: ip / ss
group: Système et administration
summary: ip inspecte interfaces et routes ; ss montre les sockets.
---

## Comprendre

ip inspecte interfaces et routes ; ss montre les sockets.

## Commandes et options

La forme de base est `ip -br address  |  ss -lnt`.

## Exemple commenté

```bash
ss -lnt
```

La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.

## Points de vigilance

Un service actif peut ne pas écouter sur le port ou l’interface attendus.

## Pour s’entraîner

Relis les exemples et explique à voix haute l’effet de chaque option. Les défis pratiques correspondants arriveront avec les prochains modules.
