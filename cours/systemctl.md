---
id: systemctl
title: systemctl
group: Système et administration
summary: Observe l’état des services et unités systemd.
---

## Comprendre

Observe l’état des services et unités systemd.

## Commandes et options

La forme de base est `systemctl status unite`.

## Exemple commenté

```bash
systemctl status sshd
```

La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.

## Points de vigilance

`status` consulte le service tandis que `restart` le redémarre. Regarde les journaux avant toute action.
