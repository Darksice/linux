---
id: journalctl
title: journalctl
group: Système et administration
summary: Consulte le journal des services gérés par systemd.
---

## Comprendre

Consulte le journal des services gérés par systemd.

## Commandes et options

La forme de base est `journalctl -u unite -n 20 --no-pager`.

## Exemple commenté

```bash
journalctl -u sshd -n 20 --no-pager
```

La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.

## Points de vigilance

Les droits du compte peuvent limiter les entrées visibles.

## Pour s’entraîner

Relis les exemples et explique à voix haute l’effet de chaque option. Les défis pratiques correspondants arriveront avec les prochains modules.
