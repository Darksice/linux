---
id: rpm-dnf
title: rpm / dnf
group: Système et administration
summary: Sur les distributions basées sur RPM, rpm interroge les paquets installés et dnf gère les dépôts.
---

## Comprendre

Sur les distributions basées sur RPM, rpm interroge les paquets installés et dnf gère les dépôts.

## Commandes et options

Utilise `rpm -q paquet` pour interroger un paquet installé et `dnf repolist --enabled` pour voir les dépôts actifs.

## Exemple commenté

```bash
rpm -q bash
```

La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.

## Points de vigilance

Ces commandes d’inspection ne demandent pas de modifier les paquets.
