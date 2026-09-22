---
id: ip-ss
title: ip / ss
group: Système et AlmaLinux
summary: ip inspecte interfaces et routes ; ss montre les sockets.
mission: 41
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

Essaie la mission 41 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.
