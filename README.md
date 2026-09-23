# Linux, pour de vrai

Un parcours autonome pour des débutants en Linux. Les exercices et les données
de cette version sont originaux. Les dernières missions ciblent AlmaLinux.

Les **Modules 01 et 02** proposent un format CTF : des flags à découvrir
dans une archive dédiée par module, sans script de validation. Le premier porte
sur la navigation et les noms de fichiers ; le second sur la lecture et la
comparaison de leur contenu. Les 42 missions du parcours précédent restent
accessibles pendant la construction des autres modules.

## Utilisation

Ouvrir `index.html` dans un navigateur ou utiliser le site Vercel. Aucun compte
n'est nécessaire.

### Module 01 · nouveau format CTF

Télécharger `module01-linux.tar.gz` depuis la page du module, déposer l’archive
dans la VM, puis lancer :

```bash
tar -xzf module01-linux.tar.gz
cd atelier-module-01
```

Les sept réponses sont des flags présents dans les noms des entrées. Le module
sauvegarde les défis réussis dans le navigateur ; il reste possible de revoir
chaque défi et ses indices. Le bouton « Recommencer le module » efface, après
confirmation, ses flags validés et ses indices affichés dans ce navigateur ;
il ne modifie pas l’archive sur la VM. Il ne faut ni lire le contenu des fichiers
ni lancer un script de vérification.

### Module 02 · lire et comparer

Télécharger `module02-linux.tar.gz` depuis la page du module, puis dans la VM :

```bash
tar -xzf module02-linux.tar.gz
cd atelier-module-02
```

Les quatorze défis utilisent `cat`, `less`, `head`, `tail`, `file`, `diff` et
introduisent le pipe `|`. Les flags se trouvent dans le contenu des fichiers.
Les versions obsolètes et les lignes voisines sont des leurres ; il faut suivre
précisément la question. `ls`, `cd` et `pwd` restent utiles pour explorer
l’archive. Le bouton « Recommencer » efface la progression de ce seul module
dans le navigateur, sans modifier les fichiers de la VM.

### Parcours de 42 missions · format précédent

1. Télécharger `atelier-linux.tar.gz` depuis la page d'accueil (le lien mène
   au fichier hébergé sur GitHub), puis déposer l'archive dans la VM Linux.
2. Dans le dossier de téléchargement de la VM :

   ```bash
   tar -xzf atelier-linux.tar.gz
   cd atelier-linux
   ```

3. Réaliser les missions dans l'ordre. Après chacune, lancer
   `bash verifier.sh 01` en remplaçant le numéro. Reporter le code affiché
   après « VALIDÉ » dans le site.

Les missions travaillent dans `atelier-linux` ou consultent l'état de la VM.
Elles ne demandent pas de droits administrateur. Le vérificateur contrôle les
fichiers produits ; pour les missions 31 à 34, il exécute aussi les scripts
écrits par l'apprenant sur les données de test. Pour repartir de zéro, extraire
une nouvelle copie de l'archive.

## Contenu pédagogique

- 42 missions pratiques de 4 à 18 minutes, réparties en neuf étapes ;
- indices progressifs et solution masquée jusqu'à la demande de l'apprenant ;
- vérification sur la VM, avec un retour sur le problème rencontré ;
- 24 cartes de rappel qui reviennent après 1, 3, 7 puis 14 jours en cas de
  bonne réponse, avec entraînement libre sur toutes les cartes ou uniquement
  celles dont la dernière réponse était erronée ;
- 28 fiches de cours en Markdown, consultables et recherchables ;
- guide de survie consultable à tout moment.

La progression va des commandes de base aux droits, liens symboliques,
empreintes, sauvegardes restaurées, journaux, processus, variables
d'environnement et scripts Bash. Les missions 36 à 42 explorent AlmaLinux :
distribution, RPM/DNF, unités systemd, journal, réseau et SELinux. Elles
utilisent des commandes de consultation et ne demandent pas `sudo`. Il est
préférable de répartir le parcours sur plusieurs séances pour profiter des
révisions différées.

Le site enregistre la progression dans le navigateur via `localStorage`. Les
résultats ne sont pas envoyés à un serveur. Pour conserver sa progression,
l'apprenant doit utiliser le même navigateur et ne pas effacer ses données de
site. L'archive de la VM et la progression du site sont indépendantes.

## Maintien et vérification

Les missions et cartes sont définies dans `app.js`. Chaque fiche de cours est
un fichier dans `cours/` ; `cours/_MODELE.md` montre la structure à suivre.
Après modification ou ajout d'une fiche, régénérer `cours-data.js` avec :

```bash
node scripts/build-courses.cjs
```

Ce fichier généré permet au site de rester utilisable en ouvrant directement
`index.html`, sans serveur local. Les données de la VM et l'unique vérificateur
`verifier.sh` se trouvent dans `atelier-linux/`. Après une modification de ce
dossier, reconstruire l'archive depuis la racine du projet :

```bash
tar -czf atelier-linux.tar.gz atelier-linux
```

Le site publié sur Vercel est construit par `node scripts/build-site.cjs` :
les sources des modules sont dans `modules/01/` et `modules/02/`, tandis que `dist/` est une sortie
générée et ignorée par Git, à ne pas éditer directement. Seuls les fichiers
HTML/CSS/JS requis sont copiés dans `dist/`. Les archives
restent dans le dépôt GitHub et les liens du site pointent vers la branche
`main`. Après une modification des données, reconstruire et pousser l’archive
correspondante pour que les téléchargements soient à jour :

```bash
node scripts/build-module01.cjs
node scripts/build-module02.cjs
```

Les tests `scripts/smoke-module01.sh` et `scripts/smoke-module02.sh` extraient
les archives CTF et vérifient les flags avec les commandes du cours. Le test d'intégration
`scripts/smoke-test.sh` extrait l'archive historique dans un dossier
temporaire Linux, réalise les missions dans l'ordre et vérifie chaque résultat.
Le lancer sous Linux avec `bash scripts/smoke-test.sh`. Sur une distribution
sans RPM ou SELinux, les deux branches spécifiques sont vérifiées avec des
réponses simulées ; elles restent à essayer sur la VM AlmaLinux des alternants.
`node scripts/check-frontend.cjs` vérifie la construction des pages et la
correspondance des codes de validation.

Pour les commandes propres à AlmaLinux, consulter également le
[guide d'installation et d'administration AlmaLinux](https://wiki.almalinux.org/documentation/after-installation-guide.html)
et la [documentation officielle des dépôts](https://wiki.almalinux.org/repos/AlmaLinux).
# linux
