// Généré par node scripts/build-courses.cjs — modifier les fichiers dans cours/.
const courseLessons = [
  {
    "id": "awk",
    "label": "awk",
    "group": "Texte et flux",
    "summary": "Sélectionne et traite des colonnes ligne par ligne.",
    "html": "<h2>Comprendre</h2>\n<p>Sélectionne et traite des colonnes ligne par ligne.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>awk &#39;condition {action}&#39; fichier</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>awk &#39;$4==&quot;ERREUR&quot; {print $3}&#39; incidents.log</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p><code>$1</code> est la première colonne. L’option <code>-F,</code> définit la virgule comme séparateur.</p>"
  },
  {
    "id": "cat",
    "label": "cat",
    "group": "Texte et flux",
    "summary": "Affiche le contenu des fichiers sur la sortie standard.",
    "html": "<h2>Comprendre</h2>\n<p>Affiche le contenu des fichiers sur la sortie standard.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>cat fichier [autre-fichier]</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>cat donnees/notes/consignes.txt</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Pour un très long fichier, <code>less</code> est plus confortable.</p>"
  },
  {
    "id": "cd",
    "label": "cd",
    "group": "Navigation",
    "summary": "Change le dossier courant et navigue avec des chemins relatifs ou absolus.",
    "html": "<h2>Comprendre</h2>\n<p><code>cd</code>, abréviation de <strong>change directory</strong>, permet de changer le dossier courant du terminal. Ce dossier sert de point de départ à tous les chemins relatifs utilisés ensuite par <code>ls</code>, <code>cat</code>, <code>cp</code> ou d’autres commandes.</p>\n<p>La commande <code>pwd</code> affiche le chemin absolu du dossier courant. Ce chemin commence à la racine <code>/</code>. Lorsqu’un changement réussit, <code>cd</code> n’affiche généralement rien. Utilise <code>pwd</code> pour confirmer ta nouvelle position.</p>\n<h2>Commandes et options</h2>\n<p>La forme générale est <code>cd chemin</code>. Le chemin peut désigner un dossier situé sous le dossier courant, un dossier parent, le dossier personnel ou un emplacement absolu.</p>\n<h3>Revenir dans son dossier personnel</h3>\n<pre><code>cd &quot;$HOME&quot;\ncd\ncd ~</code></pre>\n<p>La variable d’environnement <code>$HOME</code> contient le chemin absolu de ton dossier personnel. Sa valeur ressemble généralement à <code>/home/alice</code>.</p>\n<ul><li><code>cd &quot;$HOME&quot;</code> utilise directement la valeur de la variable <code>HOME</code>.</li><li><code>cd</code> sans argument utilise lui aussi le dossier indiqué par <code>HOME</code>.</li><li><code>cd ~</code> fonctionne de la même façon dans Bash. Le shell remplace <code>~</code> par le chemin du dossier personnel avant d’exécuter <code>cd</code>.</li></ul>\n<p><code>~</code> est rapide à saisir. <code>$HOME</code> est particulièrement utile dans les scripts ou pour construire un chemin comme <code>cd &quot;$HOME/rep1&quot;</code>. Les guillemets protègent la valeur de la variable si le chemin contient des espaces.</p>\n<h3>Descendre dans un ou plusieurs dossiers</h3>\n<pre><code>cd rep1\ncd rep1/rep2</code></pre>\n<p><code>cd rep1</code> entre dans le dossier <code>rep1</code> situé dans le dossier courant. <code>cd rep1/rep2</code> traverse deux niveaux en une commande. <code>rep1</code> doit exister dans le dossier courant et <code>rep2</code> doit se trouver dans <code>rep1</code>.</p>\n<p>Ces deux chemins sont <strong>relatifs</strong>. Leur destination dépend du dossier de départ. Si tu changes de position, le même chemin peut mener ailleurs ou ne plus exister.</p>\n<h3>Remonter dans l’arborescence</h3>\n<pre><code>cd ..\ncd ../..\ncd ../../rep1</code></pre>\n<p><code>..</code> représente le dossier parent. <code>cd ..</code> remonte donc d’un niveau et <code>cd ../..</code> remonte de deux niveaux. Les éléments peuvent être combinés. <code>cd ../../rep1</code> remonte deux fois, puis entre dans <code>rep1</code> depuis ce nouvel emplacement.</p>\n<h3>Revenir au dossier précédent</h3>\n<pre><code>cd &quot;$OLDPWD&quot;\ncd -</code></pre>\n<p>La variable d’environnement <code>$OLDPWD</code> mémorise le dossier occupé avant le dernier changement. <code>cd &quot;$OLDPWD&quot;</code> utilise cette valeur pour rejoindre ce dossier. <code>cd -</code> est une forme plus courte qui fait le même déplacement et affiche le chemin rejoint.</p>\n<h3>Utiliser un chemin absolu</h3>\n<pre><code>cd /etc\ncd /\ncd &quot;$HOME/rep1/rep2&quot;</code></pre>\n<p>Un chemin commençant par <code>/</code> est <strong>absolu</strong>. Il part toujours de la racine du système, quelle que soit ta position actuelle. <code>cd /etc</code> rejoint le dossier système <code>/etc</code>. <code>cd /</code> rejoint directement la racine. Après développement de <code>$HOME</code>, le troisième exemple devient lui aussi un chemin absolu.</p>\n<h3>Rester sur place ou gérer les espaces</h3>\n<pre><code>cd .\ncd &quot;Mes documents&quot;\ncd Mes\\ documents</code></pre>\n<p><code>.</code> représente le dossier courant. <code>cd .</code> ne change donc pas de position. Pour un nom contenant des espaces, entoure le chemin de guillemets ou protège chaque espace avec <code>\\</code>. Sans cela, le shell interprète les mots comme plusieurs arguments.</p>\n<h2>Exemple commenté</h2>\n<p>Imagine que le dossier personnel est <code>/home/alice</code> et que <code>rep1</code> contient lui-même <code>rep2</code>.</p>\n<pre><code>$ pwd\n/home/alice\n$ cd rep1\n$ pwd\n/home/alice/rep1\n$ cd rep2\n$ pwd\n/home/alice/rep1/rep2\n$ cd ../..\n$ pwd\n/home/alice\n$ cd rep1/rep2\n$ pwd\n/home/alice/rep1/rep2\n$ cd ~\n$ pwd\n/home/alice</code></pre>\n<p>Le premier <code>cd rep1</code> mène dans <code>/home/alice/rep1</code>. Comme la position a changé, <code>cd rep2</code> peut ensuite atteindre <code>/home/alice/rep1/rep2</code>. Depuis cet emplacement, <code>cd ../..</code> remonte deux niveaux et revient dans <code>/home/alice</code>. <code>cd rep1/rep2</code> montre qu’il est également possible de refaire tout le trajet avec un seul chemin relatif. Enfin, <code>cd ~</code> revient au dossier personnel, indépendamment du point de départ.</p>\n<h2>Points de vigilance</h2>\n<ul><li>Linux distingue les majuscules et les minuscules. <code>Documents</code> et <code>documents</code> sont deux dossiers différents.</li><li><code>cd</code> suivi d’un nom incorrect produit le message <code>No such file or directory</code>.</li><li>Il faut avoir le droit de traverser le dossier. Sans le droit d’exécution <code>x</code>, le shell répond <code>Permission denied</code>.</li><li><code>~</code> est développé seulement lorsqu’il apparaît au début d’un mot et qu’il n’est pas protégé par des guillemets. Utilise <code>cd ~</code>, pas <code>cd &quot;~&quot;</code>. <code>cd &quot;$HOME&quot;</code> fonctionne car les variables sont développées entre guillemets doubles.</li><li>Un chemin commençant par <code>/</code> est absolu. Les autres chemins vus ici sont relatifs au dossier courant, sauf <code>~</code>, <code>$HOME</code> et <code>$OLDPWD</code> que le shell développe avant d’exécuter <code>cd</code>.</li><li>Dans un script destiné à plusieurs utilisateurs, évite un chemin écrit en dur comme <code>/home/alice</code>. Utilise <code>~</code> ou <code>$HOME</code> afin d’employer le dossier personnel du compte qui exécute le script.</li></ul>"
  },
  {
    "id": "chmod",
    "label": "chmod",
    "group": "Fichiers et droits",
    "summary": "Règle les droits de lecture, d’écriture et d’exécution.",
    "html": "<h2>Comprendre</h2>\n<p><code>chmod</code> modifie les droits d’accès d’un fichier ou d’un dossier. Ces droits sont organisés en <strong>trois triplets</strong> pour le propriétaire (<code>u</code>), le groupe (<code>g</code>) et les autres utilisateurs (<code>o</code>). Dans chaque triplet, <code>r</code> signifie lecture, <code>w</code> écriture et <code>x</code> exécution.</p>\n<p>Le premier caractère de <code>ls -l</code> décrit le type (<code>-</code> pour fichier, <code>d</code> pour dossier). Les neuf caractères suivants représentent les trois triplets. Dans <code>-rwxr-x---</code>, le propriétaire possède <code>rwx</code>, le groupe possède <code>r-x</code> et les autres n’ont aucun droit.</p>\n<h2>Commandes et options</h2>\n<ul><li>La forme symbolique ajoute ou retire un droit précis. <code>chmod u+x fichier</code> ajoute <code>x</code> au propriétaire. <code>chmod g-w fichier</code> retire <code>w</code> au groupe. <code>chmod o= fichier</code> enlève tous les droits aux autres.</li><li>Avec la forme numérique, chaque triplet devient un chiffre obtenu en additionnant <code>r = 4</code> (<code>2²</code>), <code>w = 2</code> (<code>2¹</code>) et <code>x = 1</code> (<code>2⁰</code>). Une absence de droit vaut <code>0</code>.</li><li>Le chiffre <code>7</code> donne <code>rwx</code>, <code>6</code> donne <code>rw-</code> et <code>5</code> donne <code>r-x</code>.</li><li><code>chmod 600 fichier</code> donne <code>rw-------</code>. <code>chmod 755 script.sh</code> donne <code>rwxr-xr-x</code>. <code>chmod 700 dossier</code> donne <code>rwx------</code>.</li></ul>\n<h2>Exemple commenté</h2>\n<pre><code>mkdir travail/prive\ncp donnees/config/app.conf travail/prive/app.conf\nchmod 700 travail/prive\nchmod 600 travail/prive/app.conf\nls -ld travail/prive\nls -l travail/prive/app.conf</code></pre>\n<p>Le dossier reçoit <code>7</code> pour son propriétaire. Il peut le lister, y créer des entrées et le traverser. Le fichier reçoit <code>6</code>. Son propriétaire peut le lire et le modifier, mais pas l’exécuter. Dans les deux cas, le groupe et les autres n’ont aucun droit.</p>\n<h2>Points de vigilance</h2>\n<p>Sur un <strong>dossier</strong>, <code>x</code> permet surtout de le traverser et d’accéder à une entrée dont on connaît le nom. <code>r</code> permet de lister ses noms. <code>w</code> permet d’y créer ou supprimer des entrées, généralement avec <code>x</code>. Sur un <strong>fichier</strong>, <code>x</code> autorise son exécution. <code>chmod</code> ne change pas le propriétaire. Ce rôle revient à <code>chown</code>. Évite <code>chmod -R 777</code> car il ouvre largement tout un arbre, y compris les fichiers qui n’ont pas besoin d’être exécutables.</p>"
  },
  {
    "id": "chown",
    "label": "chown",
    "group": "Fichiers et droits",
    "summary": "Change le propriétaire et, éventuellement, le groupe.",
    "html": "<h2>Comprendre</h2>\n<p>Change le propriétaire et, éventuellement, le groupe.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>chown utilisateur:groupe fichier</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>chown alice:admins rapport.txt</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Changer de propriétaire demande généralement des droits administrateur. L’exemple est une syntaxe, pas une commande à lancer dans l’atelier.</p>"
  },
  {
    "id": "cp",
    "label": "cp",
    "group": "Fichiers et droits",
    "summary": "Copie un fichier sans retirer la source.",
    "html": "<h2>Comprendre</h2>\n<p>Copie un fichier sans retirer la source.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>cp source destination</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>cp donnees/notes/depart.txt travail/depart.txt</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Si la destination existe, elle peut être remplacée.</p>"
  },
  {
    "id": "du-df",
    "label": "du / df",
    "group": "Système et administration",
    "summary": "du mesure les fichiers et df affiche l’espace disponible sur les systèmes de fichiers.",
    "html": "<h2>Comprendre</h2>\n<p><code>du</code> mesure les fichiers et <code>df</code> affiche l’espace disponible sur les systèmes de fichiers.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>du -sh dossier  |  df -h</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>du -sh donnees</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Utilise <code>df</code> pour diagnostiquer un disque plein et <code>du</code> pour localiser un gros dossier.</p>"
  },
  {
    "id": "find",
    "label": "find",
    "group": "Fichiers et droits",
    "summary": "Cherche des fichiers dans une arborescence.",
    "html": "<h2>Comprendre</h2>\n<p>Cherche des fichiers dans une arborescence.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>find depart -type f -name &quot;motif&quot;</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>find donnees -type f -name &quot;*.log&quot;</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Mets le motif entre guillemets pour le laisser à <code>find</code>.</p>"
  },
  {
    "id": "grep",
    "label": "grep",
    "group": "Texte et flux",
    "summary": "Affiche les lignes d’un fichier qui correspondent à un motif.",
    "html": "<h2>Comprendre</h2>\n<p>Affiche les lignes d’un fichier qui correspondent à un motif.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>grep &quot;motif&quot; fichier</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>grep &quot;ERREUR&quot; donnees/logs/serveur.log</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p><code>-n</code> ajoute les numéros de ligne. <code>-E</code> active les expressions régulières étendues.</p>"
  },
  {
    "id": "ip-ss",
    "label": "ip / ss",
    "group": "Système et administration",
    "summary": "ip inspecte les interfaces et les routes tandis que ss montre les sockets.",
    "html": "<h2>Comprendre</h2>\n<p><code>ip</code> inspecte les interfaces et les routes tandis que <code>ss</code> montre les sockets.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>ip -br address  |  ss -lnt</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>ss -lnt</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Un service actif peut ne pas écouter sur le port ou l’interface attendus.</p>"
  },
  {
    "id": "jobs",
    "label": "Ctrl-Z / bg / fg",
    "group": "Système et administration",
    "summary": "Suspend puis déplace un job entre premier plan et arrière-plan.",
    "html": "<h2>Comprendre</h2>\n<p>Suspend puis déplace un job entre premier plan et arrière-plan.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>Ctrl-Z  puis  bg  ou  fg</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>sleep 300  # puis Ctrl-Z, bg, fg</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p><code>Ctrl-Z</code> suspend le job et <code>Ctrl-C</code> l’interrompt. Un job en arrière-plan peut continuer à travailler.</p>"
  },
  {
    "id": "journalctl",
    "label": "journalctl",
    "group": "Système et administration",
    "summary": "Consulte le journal des services gérés par systemd.",
    "html": "<h2>Comprendre</h2>\n<p>Consulte le journal des services gérés par systemd.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>journalctl -u unite -n 20 --no-pager</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>journalctl -u sshd -n 20 --no-pager</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Les droits du compte peuvent limiter les entrées visibles.</p>"
  },
  {
    "id": "less",
    "label": "less",
    "group": "Texte et flux",
    "summary": "Parcourt un fichier page par page sans le modifier.",
    "html": "<h2>Comprendre</h2>\n<p>Parcourt un fichier page par page sans le modifier.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>less fichier</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>less donnees/logs/incidents.log</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Utilise les flèches et <code>q</code> pour quitter.</p>"
  },
  {
    "id": "ln",
    "label": "ln -s",
    "group": "Fichiers et droits",
    "summary": "Crée un lien symbolique vers un autre chemin.",
    "html": "<h2>Comprendre</h2>\n<p>Crée un lien symbolique vers un autre chemin.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>ln -s cible lien</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>ln -s ../donnees/notes/consignes.txt travail/consignes-lien.txt</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Le chemin cible relatif est calculé depuis le dossier du lien.</p>"
  },
  {
    "id": "ls",
    "label": "ls",
    "group": "Navigation",
    "summary": "Liste le contenu d’un dossier et affiche les entrées cachées ou leurs détails.",
    "html": "<h2>Comprendre</h2>\n<p><code>ls</code> affiche les entrées contenues dans un dossier. Une entrée peut être un fichier, un dossier ou un lien. Sans chemin, la commande examine le dossier courant.</p>\n<p>Contrairement à <code>cd</code>, <code>ls</code> ne change jamais le dossier courant. Tu peux examiner un autre emplacement avec <code>ls chemin</code> puis lancer <code>pwd</code>. Le chemin affiché par <code>pwd</code> reste identique.</p>\n<p>Par défaut, les noms commençant par un point comme <code>.secret</code> sont masqués. Ils existent bien sur le système. Le point placé au début du nom est une convention utilisée par Linux pour identifier les entrées cachées.</p>\n<h2>Commandes et options</h2>\n<h3>Lister le dossier courant</h3>\n<pre><code>ls</code></pre>\n<p><code>ls</code> affiche les entrées visibles du dossier courant. La commande montre leurs noms sans entrer dans les sous-dossiers et sans modifier les fichiers.</p>\n<p>Si le terminal n’affiche rien, le dossier ne contient aucune entrée visible. Il peut cependant contenir des entrées cachées.</p>\n<h3>Lister un autre dossier</h3>\n<pre><code>ls rep1\nls rep1/rep2</code></pre>\n<p><code>ls rep1</code> affiche les entrées visibles de <code>rep1</code> sans quitter le dossier courant. Le second exemple suit le chemin relatif <code>rep1/rep2</code> et affiche le contenu visible de <code>rep2</code>.</p>\n<p>Le chemin peut aussi être absolu. <code>ls /etc</code> examine toujours le dossier <code>/etc</code>, quelle que soit la position actuelle.</p>\n<h3>Afficher les détails</h3>\n<pre><code>ls -l\nls -l rep1</code></pre>\n<p>L’option <code>-l</code> utilise un format long. Chaque entrée occupe une ligne qui présente les informations suivantes.</p>\n<ul><li>Le type de l’entrée et ses droits apparaissent au début de la ligne. Le premier caractère vaut notamment <code>d</code> pour un dossier et <code>-</code> pour un fichier ordinaire.</li><li>Le nombre de liens est affiché après les droits.</li><li>Le propriétaire et le groupe sont indiqués dans les colonnes suivantes.</li><li>La taille est affichée en octets.</li><li>La date de dernière modification précède le nom.</li></ul>\n<p>La ligne <code>total</code> placée au début du résultat représente l’espace occupé par les entrées listées. Elle ne donne pas leur nombre.</p>\n<h3>Afficher les entrées cachées</h3>\n<pre><code>ls -a\nls -a rep1</code></pre>\n<p>L’option <code>-a</code> affiche toutes les entrées, y compris celles dont le nom commence par un point. Le résultat contient aussi <code>.</code> pour le dossier examiné et <code>..</code> pour son dossier parent.</p>\n<h3>Combiner les détails et les entrées cachées</h3>\n<pre><code>ls -la\nls -la rep1</code></pre>\n<p>Les options courtes peuvent être regroupées. <code>ls -la</code> combine donc le format long de <code>-l</code> avec l’affichage complet de <code>-a</code>. La forme <code>ls -al</code> produit le même résultat.</p>\n<h2>Exemple commenté</h2>\n<p>Imagine que tu te trouves dans <code>/home/alice/atelier</code>. Ce dossier contient <code>notes.txt</code> et le dossier <code>rep1</code>. Dans <code>rep1</code>, le fichier <code>.secret</code> est caché.</p>\n<pre><code>$ pwd\n/home/alice/atelier\n$ ls\nnotes.txt  rep1\n$ ls rep1\nconfig.txt\n$ ls -a rep1\n.  ..  .secret  config.txt\n$ ls -l rep1\ntotal 4\n-rw-r--r-- 1 alice alice 128 24 sept. 10:30 config.txt\n$ ls -la rep1\ntotal 8\ndrwxr-xr-x 2 alice alice 4096 24 sept. 10:30 .\ndrwxr-xr-x 3 alice alice 4096 24 sept. 10:20 ..\n-rw------- 1 alice alice   42 24 sept. 10:25 .secret\n-rw-r--r-- 1 alice alice  128 24 sept. 10:30 config.txt</code></pre>\n<p>La première commande <code>ls</code> affiche les deux entrées visibles du dossier courant. <code>ls rep1</code> examine ensuite un autre dossier sans utiliser <code>cd</code>. Le fichier <code>.secret</code> devient visible uniquement avec <code>-a</code>.</p>\n<p><code>ls -l rep1</code> ajoute les détails mais ne montre toujours pas <code>.secret</code>. Il faut combiner les deux options avec <code>ls -la rep1</code> pour obtenir les détails de toutes les entrées.</p>\n<h2>Points de vigilance</h2>\n<p><code>ls -l rep1</code> affiche le contenu détaillé de <code>rep1</code>, pas les informations du dossier <code>rep1</code> lui-même. La commande <code>ls -ld rep1</code> permet d’examiner le dossier sans lister son contenu.</p>\n<p>Un dossier peut sembler vide avec <code>ls</code> tout en contenant des entrées cachées. Utilise <code>ls -a</code> pour le vérifier.</p>\n<p>Linux distingue les majuscules et les minuscules. <code>ls Documents</code> et <code>ls documents</code> peuvent donc viser deux dossiers différents.</p>\n<p>Un chemin contenant des espaces doit être protégé. Utilise par exemple <code>ls &quot;Mes documents&quot;</code> ou <code>ls Mes\\ documents</code>.</p>"
  },
  {
    "id": "man",
    "label": "man",
    "group": "Navigation",
    "summary": "Ouvre le manuel détaillé d’une commande.",
    "html": "<h2>Comprendre</h2>\n<p>Ouvre le manuel détaillé d’une commande.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>man commande</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>man ls</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Dans le manuel, <code>/</code> cherche un mot, <code>n</code> passe au résultat suivant et <code>q</code> quitte.</p>"
  },
  {
    "id": "mkdir",
    "label": "mkdir",
    "group": "Fichiers et droits",
    "summary": "Crée un dossier.",
    "html": "<h2>Comprendre</h2>\n<p>Crée un dossier.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>mkdir dossier</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>mkdir travail/rapports</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Le parent doit exister, sauf si tu utilises <code>mkdir -p</code>.</p>"
  },
  {
    "id": "mv",
    "label": "mv",
    "group": "Fichiers et droits",
    "summary": "Déplace ou renomme un fichier ou dossier.",
    "html": "<h2>Comprendre</h2>\n<p>Déplace ou renomme un fichier ou dossier.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>mv source destination</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>mv travail/bilan.txt travail/synthese.txt</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Contrôle le dossier cible. Un déplacement peut être silencieux.</p>"
  },
  {
    "id": "pipe",
    "label": "| (tuyau)",
    "group": "Texte et flux",
    "summary": "Transmet la sortie d’une commande à l’entrée d’une autre.",
    "html": "<h2>Comprendre</h2>\n<p>Transmet la sortie d’une commande à l’entrée d’une autre.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>commande1 | commande2</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>grep ERREUR journal.log | wc -l</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Construis le pipeline étape par étape pour voir les données intermédiaires.</p>"
  },
  {
    "id": "ps-kill",
    "label": "ps / kill",
    "group": "Système et administration",
    "summary": "ps observe les processus et kill envoie un signal à un PID.",
    "html": "<h2>Comprendre</h2>\n<p><code>ps</code> observe les processus et <code>kill</code> envoie un signal à un PID.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>ps -p PID  |  kill PID</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>ps -p 1234 -o pid,comm</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Vérifie le PID et la commande avant de terminer un processus.</p>"
  },
  {
    "id": "pwd",
    "label": "pwd",
    "group": "Navigation",
    "summary": "Affiche le chemin complet du dossier courant.",
    "html": "<h2>Comprendre</h2>\n<p>Affiche le chemin complet du dossier courant.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>pwd</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>pwd</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Avant une commande qui écrit ou supprime, vérifie où tu te trouves.</p>"
  },
  {
    "id": "redirections",
    "label": ">  >>  2>",
    "group": "Texte et flux",
    "summary": "Envoie la sortie normale ou les erreurs vers un fichier.",
    "html": "<h2>Comprendre</h2>\n<p>Envoie la sortie normale ou les erreurs vers un fichier.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>commande &gt; fichier  |  commande &gt;&gt; fichier  |  commande 2&gt; erreurs</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>grep ERREUR journal.log &gt; erreurs.txt</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p><code>&gt;</code> remplace le contenu, <code>&gt;&gt;</code> ajoute à la fin et <code>2&gt;</code> capture les erreurs.</p>"
  },
  {
    "id": "rm",
    "label": "rm",
    "group": "Fichiers et droits",
    "summary": "Supprime le fichier indiqué.",
    "html": "<h2>Comprendre</h2>\n<p>Supprime le fichier indiqué.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>rm fichier</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>rm travail/brouillon.tmp</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Il n’y a pas de corbeille habituelle. Prévisualise les jokers avec <code>echo</code> ou <code>ls</code>.</p>"
  },
  {
    "id": "rpm-dnf",
    "label": "rpm / dnf",
    "group": "Système et administration",
    "summary": "Sur les distributions basées sur RPM, rpm interroge les paquets installés et dnf gère les dépôts.",
    "html": "<h2>Comprendre</h2>\n<p>Sur les distributions basées sur RPM, rpm interroge les paquets installés et dnf gère les dépôts.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>rpm -q paquet  |  dnf repolist --enabled</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>rpm -q bash</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Ces commandes d’inspection ne demandent pas de modifier les paquets.</p>"
  },
  {
    "id": "sed",
    "label": "sed",
    "group": "Texte et flux",
    "summary": "Transforme un flux de texte, notamment par substitution.",
    "html": "<h2>Comprendre</h2>\n<p>Transforme un flux de texte, notamment par substitution.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>sed &quot;s/ancien/nouveau/&quot; fichier</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>sed &quot;s/^MODE=debug$/MODE=production/&quot; app.conf</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Sans <code>-i</code>, le fichier source reste inchangé. Redirige la sortie vers une copie.</p>"
  },
  {
    "id": "selinux",
    "label": "getenforce",
    "group": "Système et administration",
    "summary": "Affiche le mode courant de SELinux.",
    "html": "<h2>Comprendre</h2>\n<p>Affiche le mode courant de SELinux.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>getenforce</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>getenforce</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p><code>Enforcing</code> applique les règles. <code>Permissive</code> journalise sans bloquer. <code>Disabled</code> désactive SELinux.</p>"
  },
  {
    "id": "systemctl",
    "label": "systemctl",
    "group": "Système et administration",
    "summary": "Observe l’état des services et unités systemd.",
    "html": "<h2>Comprendre</h2>\n<p>Observe l’état des services et unités systemd.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>systemctl status unite</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>systemctl status sshd</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p><code>status</code> consulte le service tandis que <code>restart</code> le redémarre. Regarde les journaux avant toute action.</p>"
  },
  {
    "id": "tar",
    "label": "tar",
    "group": "Système et administration",
    "summary": "Crée, liste ou extrait une archive.",
    "html": "<h2>Comprendre</h2>\n<p>Crée, liste ou extrait une archive.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>tar -czf archive.tar.gz dossier</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>tar -tzf sauvegarde.tar.gz</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante. Adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p><code>-c</code> crée une archive, <code>-t</code> la liste et <code>-x</code> l’extrait. Vérifie son contenu avant une restauration.</p>"
  }
];
