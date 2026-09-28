---
id: cut
title: cut
group: Texte et flux
summary: Extrait des champs ou des positions de caractères dans chaque ligne.
---

## Comprendre

`cut` sélectionne une partie de chaque ligne reçue. La commande peut découper les lignes en champs séparés par un caractère ou conserver des positions précises.

Le résultat est écrit sur la sortie standard. Le fichier source reste inchangé et les lignes conservent leur ordre d’origine.

## Commandes et options

### Extraire un champ

```bash
cut -f2 fichier
```

Dans un fichier dont les champs sont séparés par des tabulations, l’option `-f2` conserve le deuxième champ de chaque ligne. La tabulation est le délimiteur utilisé par défaut par `cut`.

### Extraire un autre champ

```bash
cut -d: -f3 colonnes/fiche
cut -d';' -f2 colonnes/equipe
```

Pour un séparateur autre que la tabulation, utilise `-d` suivi du caractère voulu : `-d:` choisit `:` et `-d';'` choisit `;`. Les guillemets protègent ici le point-virgule pour que le shell ne l’interprète pas comme une séparation entre commandes. Certains autres caractères doivent aussi être protégés lorsqu’ils sont utilisés comme séparateurs.

### Extraire plusieurs champs

```bash
cut -d: -f1,3 colonnes/fiche
cut -d: -f2-4 colonnes/fiche
```

Une virgule sélectionne plusieurs champs distincts. Un tiret sélectionne une plage continue.

### Extraire des caractères

```bash
cut -c1-8 colonnes/fiche
```

L’option `-c` travaille avec les positions des caractères au lieu d’un délimiteur. Cet exemple conserve les huit premiers caractères de chaque ligne.

## Exemple commenté

Imagine que `colonnes/fiche` contient trois champs séparés par `:`.

```bash
$ cat colonnes/fiche
alice:admin:FLAG{ALPHA}
bob:users:FLAG{BETA}
$ cut -d: -f3 colonnes/fiche
FLAG{ALPHA}
FLAG{BETA}
```

`-d:` découpe chaque ligne aux deux-points. `-f3` conserve uniquement le troisième champ.

## Points de vigilance

Le délimiteur de `cut` est un caractère précis. Une virgule, un deux-points et un point-virgule ne produisent pas le même découpage.

Une ligne sans le délimiteur demandé est affichée entière par défaut. Des séparateurs consécutifs créent au contraire des champs vides : dans `a::b`, le deuxième champ est vide si `:` est le délimiteur.

`cut` n’effectue ni tri ni comptage : il sélectionne seulement des morceaux de chaque ligne.
