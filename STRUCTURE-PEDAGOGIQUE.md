# Structure pédagogique envisagée

Ce document rassemble les orientations retenues pour la suite du site. Il décrit
la structure générale du parcours, sans figer encore le fonctionnement des boxes
finales.

Le premier prototype applique désormais cette structure aux Modules 01 à 03 :
un Bloc 01 guidé, un catalogue libre de QCM et une page d'attente pour la box
finale. Certaines commandes des Modules 02 et 03 n'ont pas encore leur fiche de
cours ; le parcours le signale sans empêcher l'accès au QCM ou au module.

## Deux façons d'accéder au contenu

Le site doit proposer deux accès complémentaires :

1. un **parcours guidé par blocs**, qui présente les contenus dans un ordre
   pédagogique conseillé ;
2. des **catalogues libres**, qui permettent de retrouver directement la fiche
   de cours ou le QCM d'une commande sans devoir parcourir un bloc.

Ainsi, un apprenant peut suivre le parcours depuis le début, tandis qu'un autre
peut simplement réviser une commande précise.

## Fiches de cours

La partie « Cours express » reste une bibliothèque contenant une fiche par
commande ou concept. Une fiche peut notamment présenter :

- le rôle de la commande ;
- sa syntaxe et ses options essentielles ;
- des exemples commentés ;
- les erreurs et pièges fréquents ;
- de petits exercices ou pistes d'entraînement.

À la fin d'une fiche, deux suites peuvent être proposées lorsque le contenu
correspondant existe :

- **Tester mes connaissances**, vers le QCM de la commande ;
- **Mettre en pratique**, vers le module qui utilise cette commande.

Le QCM constitue la suite immédiate du cours. Le lien vers le module donne de la
visibilité sur l'application pratique, sans obliger l'apprenant à quitter le
parcours qu'il suivait.

## QCM de révision

La partie « Révisions » doit contenir de vrais QCM, avec une ou plusieurs bonnes
réponses possibles, plutôt que seulement des QCU.

Chaque commande pourra avoir plusieurs questions, par exemple pour :

- identifier plusieurs syntaxes valides ;
- prévoir le résultat d'une commande ;
- choisir les options adaptées à une situation ;
- repérer des commandes incorrectes ou dangereuses ;
- diagnostiquer un message d'erreur ;
- construire ou comprendre un pipeline.

Après validation, les bonnes et mauvaises réponses devront être expliquées.
L'objectif est de consolider la compréhension, pas seulement d'afficher une
note.

Les QCM seront accessibles de plusieurs façons :

- depuis la fiche de cours associée ;
- depuis le parcours guidé d'un bloc ;
- depuis un catalogue global permettant de choisir directement une commande ;
- éventuellement, plus tard, sous forme de révision mélangée à l'échelle d'un
  module ou d'un bloc.

## Blocs et modules pratiques

Un bloc regroupe plusieurs étapes d'apprentissage autour d'un ensemble cohérent
de compétences. Le premier bloc pourrait être organisé ainsi :

```text
Bloc 1 — Les bases du terminal
├── Séquence du Module 01
│   ├── Cours et QCM : cd
│   ├── Cours et QCM : ls
│   ├── Cours et QCM : pwd
│   └── Module 01 — Se repérer dans le terminal
├── Séquence du Module 02
│   ├── Cours et QCM des commandes concernées
│   └── Module 02 — Lire et comparer les fichiers
├── Séquence du Module 03
│   ├── Cours et QCM des commandes concernées
│   └── Module 03 — Transformer et compter des données
└── Une ou plusieurs boxes finales
```

L'intégration des cours et QCM dans le bloc apporte une progression conseillée
et rend explicites les prérequis de chaque module. Elle ne doit cependant pas
dupliquer physiquement le contenu : le bloc référence les mêmes fiches et les
mêmes QCM que les catalogues globaux.

Le parcours guidé pourra indiquer les étapes déjà terminées, mais il ne devra pas
empêcher un utilisateur d'ouvrir directement un module, une fiche ou un QCM.

## Principe de navigation

La navigation doit donc séparer clairement :

- **Parcours** : progression recommandée par blocs, séquences et modules ;
- **Cours** : accès direct à toutes les fiches ;
- **Révisions** : accès direct à tous les QCM ;
- **Pratique** : accès aux modules et, plus tard, aux boxes.

Depuis un module, l'utilisateur doit pouvoir retrouver facilement les cours et
QCM des commandes utilisées, sans être obligé de revenir au début du bloc.

## Boxes finales — décision reportée

Le principe d'une ou plusieurs boxes de synthèse à la fin d'un bloc est retenu
comme piste. Elles devraient mélanger les compétences du bloc et guider moins
l'utilisateur que les modules classiques.

Le format précis, notamment l'utilisation éventuelle d'images Docker, sera
discuté plus tard. La priorité est d'abord de terminer et valider tous les
modules du premier bloc.

## Prochaine étape

Avant de concevoir les boxes, il faudra :

1. valider la liste et l'ordre des modules du premier bloc ;
2. associer à chaque module ses commandes et fiches de cours ;
3. créer et valider les QCM correspondants ;
4. vérifier la progression complète cours → QCM → module.
