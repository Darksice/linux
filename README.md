# Linux, pour de vrai

Un parcours autonome pour des débutants en Linux sur une VM AlmaLinux.

Les **Modules 01 à 03** proposent un format CTF : des flags à découvrir
dans une archive dédiée par module, sans script de validation. Le premier porte
sur la navigation et les noms de fichiers ; le second sur la lecture et la
comparaison de leur contenu ; le troisième sur le traitement de données et les
pipes. Chaque module dispose de sa propre archive et de sa progression.

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

### Module 03 · traiter les données

Télécharger `module03-linux.tar.gz` depuis la page du module, puis dans la VM :

```bash
tar -xzf module03-linux.tar.gz
cd atelier-module-03
```

Les quinze défis utilisent `cut`, `sort`, `uniq`, `wc`, `tr` et `|`, en réutilisant
notamment `cat`, `head` et `tail`. Les fichiers proposent plusieurs flags : la
bonne réponse résulte d’une extraction, d’un tri, d’une normalisation ou d’un
comptage. Les pièges portent notamment sur le tri numérique et sur le fait que
`uniq` seul ne rapproche pas les doublons éloignés.

## Contenu pédagogique

- 36 défis CTF répartis en trois modules, avec des leurres pédagogiques ;
- indices progressifs et validation des flags dans le navigateur ;
- 28 fiches de cours en Markdown, consultables et recherchables ;
- guide de survie consultable à tout moment ;
- section « Révisions » en attente de restructuration.

Les fiches couvrent aussi des sujets d'administration qui feront l'objet de
futurs modules. Leurs chemins d'exemple sont illustratifs et peuvent différer
des archives CTF actuelles.

Le site enregistre la progression dans le navigateur via `localStorage`. Les
résultats ne sont pas envoyés à un serveur. Pour conserver sa progression,
l'apprenant doit utiliser le même navigateur et ne pas effacer ses données de
site. L'archive de la VM et la progression du site sont indépendantes.

## Maintien et vérification

Les défis des modules sont définis dans `modules/`. Chaque fiche de cours est
un fichier dans `cours/` ; `cours/_MODELE.md` montre la structure à suivre.
Après modification ou ajout d'une fiche, régénérer `cours-data.js` avec :

```bash
node scripts/build-courses.cjs
```

Ce fichier généré permet au site de rester utilisable en ouvrant directement
`index.html`, sans serveur local.

Le site publié sur Vercel est construit par `node scripts/build-site.cjs` :
les sources des modules sont dans `modules/01/`, `modules/02/` et `modules/03/`, tandis que `dist/` est une sortie
générée et ignorée par Git, à ne pas éditer directement. Seuls les fichiers
HTML/CSS/JS requis sont copiés dans `dist/`. Les archives
restent dans le dépôt GitHub et les liens du site pointent vers la branche
`main`. Après une modification des données, reconstruire et pousser l’archive
correspondante pour que les téléchargements soient à jour :

```bash
node scripts/build-module01.cjs
node scripts/build-module02.cjs
node scripts/build-module03.cjs
```

Les tests `scripts/smoke-module01.sh`, `scripts/smoke-module02.sh` et
`scripts/smoke-module03.sh` extraient les archives CTF et vérifient les flags
avec les commandes du cours. `node scripts/check-frontend.cjs` vérifie la
construction des pages et les données des modules.

Pour les commandes propres à AlmaLinux, consulter également le
[guide d'installation et d'administration AlmaLinux](https://wiki.almalinux.org/documentation/after-installation-guide.html)
et la [documentation officielle des dépôts](https://wiki.almalinux.org/repos/AlmaLinux).
