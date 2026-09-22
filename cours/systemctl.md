---
id: systemctl
title: systemctl
group: Système et AlmaLinux
summary: Observe l’état des services et unités systemd.
mission: 38
---

## Comprendre

Observe l’état des services et unités systemd.

## Commandes et options

La forme de base est `systemctl status unite`.

## Exemple commenté

```bash
systemctl status sshd
```

La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.

## Points de vigilance

status consulte ; restart modifie le service. Regarde les journaux avant toute action.

## Pour s’entraîner

Essaie la mission 38 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.
