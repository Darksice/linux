---
id: rpm-dnf
title: rpm / dnf
group: Système et AlmaLinux
summary: Sur AlmaLinux, rpm interroge les paquets installés et dnf gère les dépôts.
mission: 37
---

## Comprendre

Sur AlmaLinux, rpm interroge les paquets installés et dnf gère les dépôts.

## Commandes et options

La forme de base est `rpm -q paquet  |  dnf repolist --enabled`.

## Exemple commenté

```bash
rpm -q bash
```

La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.

## Points de vigilance

Ces commandes d’inspection ne demandent pas de modifier les paquets.

## Pour s’entraîner

Essaie la mission 37 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.
