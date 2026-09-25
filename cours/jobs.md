---
id: jobs
title: Ctrl-Z / bg / fg
group: Système et administration
summary: Suspend puis déplace un job entre premier plan et arrière-plan.
---

## Comprendre

Suspend puis déplace un job entre premier plan et arrière-plan.

## Commandes et options

La forme de base est `Ctrl-Z  puis  bg  ou  fg`.

## Exemple commenté

```bash
sleep 300  # puis Ctrl-Z, bg, fg
```

La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.

## Points de vigilance

`Ctrl-Z` suspend le job et `Ctrl-C` l’interrompt. Un job en arrière-plan peut continuer à travailler.
