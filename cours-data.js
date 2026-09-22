// Généré par node scripts/build-courses.cjs — modifier les fichiers dans cours/.
const courseLessons = [
  {
    "id": "awk",
    "label": "awk",
    "group": "Texte et flux",
    "summary": "Sélectionne et traite des colonnes ligne par ligne.",
    "mission": "24",
    "html": "<h2>Comprendre</h2>\n<p>Sélectionne et traite des colonnes ligne par ligne.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>awk &#39;condition {action}&#39; fichier</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>awk &#39;$4==&quot;ERREUR&quot; {print $3}&#39; incidents.log</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>$1 est la première colonne ; -F, définit la virgule comme séparateur.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 24 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "cat",
    "label": "cat",
    "group": "Texte et flux",
    "summary": "Affiche le contenu des fichiers sur la sortie standard.",
    "mission": "07",
    "html": "<h2>Comprendre</h2>\n<p>Affiche le contenu des fichiers sur la sortie standard.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>cat fichier [autre-fichier]</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>cat donnees/notes/consignes.txt</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Pour un très long fichier, less est plus confortable.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 07 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "cd",
    "label": "cd",
    "group": "Navigation",
    "summary": "Change le dossier courant.",
    "mission": "01",
    "html": "<h2>Comprendre</h2>\n<p>Change le dossier courant.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>cd chemin</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>cd donnees/notes</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>.. désigne le parent ; ~ désigne ton dossier personnel.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 01 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "chmod",
    "label": "chmod",
    "group": "Fichiers et droits",
    "summary": "Règle les droits de lecture, d’écriture et d’exécution.",
    "mission": "17",
    "html": "<h2>Comprendre</h2>\n<p><code>chmod</code> modifie les droits d’accès d’un fichier ou d’un dossier. Ces droits sont organisés en <strong>trois triplets</strong> : propriétaire (<code>u</code>), groupe (<code>g</code>) et autres utilisateurs (<code>o</code>). Dans chaque triplet, <code>r</code> signifie lecture, <code>w</code> écriture et <code>x</code> exécution.</p>\n<p>Le premier caractère de <code>ls -l</code> décrit le type (<code>-</code> pour fichier, <code>d</code> pour dossier). Les neuf caractères suivants représentent les trois triplets. Par exemple, <code>-rwxr-x---</code> signifie : propriétaire <code>rwx</code>, groupe <code>r-x</code>, autres <code>---</code>.</p>\n<h2>Commandes et options</h2>\n<ul><li>Forme symbolique : <code>chmod u+x fichier</code> ajoute <code>x</code> au propriétaire ; <code>chmod g-w fichier</code> retire <code>w</code> au groupe ; <code>chmod o= fichier</code> enlève tous les droits aux autres.</li><li>Forme numérique : chaque triplet devient un chiffre en additionnant <code>r = 4</code> (<code>2²</code>), <code>w = 2</code> (<code>2¹</code>) et <code>x = 1</code> (<code>2⁰</code>). Une absence de droit vaut <code>0</code>.</li><li><code>7 = 4 + 2 + 1</code> donne <code>rwx</code> ; <code>6 = 4 + 2</code> donne <code>rw-</code> ; <code>5 = 4 + 1</code> donne <code>r-x</code>.</li><li><code>chmod 600 fichier</code> donne <code>rw-------</code> ; <code>chmod 755 script.sh</code> donne <code>rwxr-xr-x</code> ; <code>chmod 700 dossier</code> donne <code>rwx------</code>.</li></ul>\n<h2>Exemple commenté</h2>\n<pre><code>mkdir travail/prive\ncp donnees/config/app.conf travail/prive/app.conf\nchmod 700 travail/prive\nchmod 600 travail/prive/app.conf\nls -ld travail/prive\nls -l travail/prive/app.conf</code></pre>\n<p>Le dossier reçoit <code>7</code> pour son propriétaire : il peut le lister, y créer des entrées et le traverser. Le fichier reçoit <code>6</code> : son propriétaire peut le lire et le modifier, mais pas l’exécuter. Dans les deux cas, groupe et autres n’ont aucun droit.</p>\n<h2>Points de vigilance</h2>\n<p>Sur un <strong>dossier</strong>, <code>x</code> signifie surtout pouvoir le traverser et accéder à une entrée dont on connaît le nom ; <code>r</code> permet de lister ses noms ; <code>w</code> permet d’y créer ou supprimer des entrées, généralement avec <code>x</code>. Sur un <strong>fichier</strong>, <code>x</code> autorise son exécution. <code>chmod</code> ne change pas le propriétaire : c’est le rôle de <code>chown</code>. Évite <code>chmod -R 777</code> : il ouvre largement tout un arbre, y compris les fichiers qui n’ont pas besoin d’être exécutables.</p>\n<h2>Pour s’entraîner</h2>\n<p>Avant la mission 17, prédis les droits de <code>600</code>, <code>700</code> et <code>750</code> en écrivant les trois triplets. Lance ensuite les commandes de l’exemple dans l’atelier et vérifie ta prédiction avec <code>ls -ld</code> et <code>ls -l</code>.</p>"
  },
  {
    "id": "chown",
    "label": "chown",
    "group": "Fichiers et droits",
    "summary": "Change le propriétaire et, éventuellement, le groupe.",
    "mission": "",
    "html": "<h2>Comprendre</h2>\n<p>Change le propriétaire et, éventuellement, le groupe.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>chown utilisateur:groupe fichier</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>chown alice:admins rapport.txt</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Changer de propriétaire demande généralement des droits administrateur. L’exemple est une syntaxe, pas une commande à lancer dans l’atelier.</p>\n<h2>Pour s’entraîner</h2>\n<p>Sur ta VM, compare le propriétaire et le groupe affichés par <code>ls -l</code> et <code>stat</code> sur un fichier de test. Lis <code>man chown</code>, puis écris la commande qui changerait ces deux valeurs sans l’exécuter : l’atelier ne demande pas de droits administrateur.</p>"
  },
  {
    "id": "cp",
    "label": "cp",
    "group": "Fichiers et droits",
    "summary": "Copie un fichier sans retirer la source.",
    "mission": "02",
    "html": "<h2>Comprendre</h2>\n<p>Copie un fichier sans retirer la source.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>cp source destination</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>cp donnees/notes/depart.txt travail/depart.txt</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Si la destination existe, elle peut être remplacée.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 02 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "du-df",
    "label": "du / df",
    "group": "Système et AlmaLinux",
    "summary": "du mesure les fichiers ; df affiche l’espace disponible sur les systèmes de fichiers.",
    "mission": "18",
    "html": "<h2>Comprendre</h2>\n<p>du mesure les fichiers ; df affiche l’espace disponible sur les systèmes de fichiers.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>du -sh dossier  |  df -h</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>du -sh donnees</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Un disque plein se diagnostique avec df ; un gros dossier se localise avec du.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 18 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "find",
    "label": "find",
    "group": "Fichiers et droits",
    "summary": "Cherche des fichiers dans une arborescence.",
    "mission": "11",
    "html": "<h2>Comprendre</h2>\n<p>Cherche des fichiers dans une arborescence.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>find depart -type f -name &quot;motif&quot;</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>find donnees -type f -name &quot;*.log&quot;</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Mets le motif entre guillemets pour le laisser à find.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 11 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "grep",
    "label": "grep",
    "group": "Texte et flux",
    "summary": "Affiche les lignes d’un fichier qui correspondent à un motif.",
    "mission": "08",
    "html": "<h2>Comprendre</h2>\n<p>Affiche les lignes d’un fichier qui correspondent à un motif.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>grep &quot;motif&quot; fichier</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>grep &quot;ERREUR&quot; donnees/logs/serveur.log</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>-n ajoute les numéros de ligne ; -E active les expressions régulières étendues.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 08 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "ip-ss",
    "label": "ip / ss",
    "group": "Système et AlmaLinux",
    "summary": "ip inspecte interfaces et routes ; ss montre les sockets.",
    "mission": "41",
    "html": "<h2>Comprendre</h2>\n<p>ip inspecte interfaces et routes ; ss montre les sockets.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>ip -br address  |  ss -lnt</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>ss -lnt</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Un service actif peut ne pas écouter sur le port ou l’interface attendus.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 41 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "jobs",
    "label": "Ctrl-Z / bg / fg",
    "group": "Système et AlmaLinux",
    "summary": "Suspend puis déplace un job entre premier plan et arrière-plan.",
    "mission": "27",
    "html": "<h2>Comprendre</h2>\n<p>Suspend puis déplace un job entre premier plan et arrière-plan.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>Ctrl-Z  puis  bg  ou  fg</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>sleep 300  # puis Ctrl-Z, bg, fg</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Ctrl-Z suspend ; Ctrl-C interrompt. Un job en arrière-plan peut continuer à travailler.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 27 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "journalctl",
    "label": "journalctl",
    "group": "Système et AlmaLinux",
    "summary": "Consulte le journal des services gérés par systemd.",
    "mission": "39",
    "html": "<h2>Comprendre</h2>\n<p>Consulte le journal des services gérés par systemd.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>journalctl -u unite -n 20 --no-pager</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>journalctl -u sshd -n 20 --no-pager</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Les droits du compte peuvent limiter les entrées visibles.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 39 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "less",
    "label": "less",
    "group": "Texte et flux",
    "summary": "Parcourt un fichier page par page sans le modifier.",
    "mission": "21",
    "html": "<h2>Comprendre</h2>\n<p>Parcourt un fichier page par page sans le modifier.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>less fichier</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>less donnees/logs/incidents.log</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Utilise les flèches et q pour quitter.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 21 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "ln",
    "label": "ln -s",
    "group": "Fichiers et droits",
    "summary": "Crée un lien symbolique vers un autre chemin.",
    "mission": "16",
    "html": "<h2>Comprendre</h2>\n<p>Crée un lien symbolique vers un autre chemin.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>ln -s cible lien</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>ln -s ../donnees/notes/consignes.txt travail/consignes-lien.txt</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Le chemin cible relatif est calculé depuis le dossier du lien.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 16 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "ls",
    "label": "ls",
    "group": "Navigation",
    "summary": "Liste les entrées d’un dossier et permet d’examiner leurs détails.",
    "mission": "02",
    "html": "<h2>Comprendre</h2>\n<p><code>ls</code> affiche les noms des fichiers et des dossiers. Sans argument, il regarde le dossier courant. Avec un chemin, il regarde ce dossier sans changer ta position : <code>pwd</code> reste identique.</p>\n<p>Les noms commençant par un point, comme <code>.secret</code>, sont cachés dans l’affichage ordinaire. Ils existent toujours : le point est simplement une convention de nommage.</p>\n<h2>Commandes et options</h2>\n<ul><li><code>ls</code> : montre les entrées visibles du dossier courant.</li><li><code>ls dossier</code> : montre les entrées visibles d’un autre dossier.</li><li><code>ls -a</code> : inclut les noms cachés, ainsi que <code>.</code> (dossier courant) et <code>..</code> (parent).</li><li><code>ls -l</code> : affiche une ligne détaillée par entrée : type, droits, propriétaire, groupe, taille, date et nom.</li><li><code>ls -la</code> : combine les détails et les noms cachés.</li><li><code>ls -lh</code> : rend les tailles plus lisibles, par exemple en K ou M.</li></ul>\n<h2>Exemple commenté</h2>\n<pre><code>pwd\nls\nls &quot;donnees/Projet Alpha&quot;\nls -a &quot;donnees/Projet Alpha&quot;\nls -l donnees/notes\nls -la &quot;donnees/Projet Alpha&quot;</code></pre>\n<p>La deuxième commande affiche le contenu visible du dossier courant. Les deux commandes sur <code>Projet Alpha</code> permettent de comparer l’affichage normal et celui avec <code>-a</code> : <code>.secret</code> apparaît seulement dans le second. <code>-l</code> ajoute des détails sans montrer automatiquement les fichiers cachés ; <code>-la</code> fait les deux.</p>\n<h2>Points de vigilance</h2>\n<p><code>ls -l</code> appliqué à un dossier affiche normalement son <strong>contenu</strong>, pas la ligne du dossier lui-même. Pour examiner les droits du dossier, utilise <code>ls -ld dossier</code>. Mets entre guillemets un chemin qui contient des espaces.</p>\n<h2>Pour s’entraîner</h2>\n<p>Dans la VM, compare <code>ls donnees/notes</code>, <code>ls -a &quot;donnees/Projet Alpha&quot;</code> et <code>ls -la &quot;donnees/Projet Alpha&quot;</code>. Quelles informations supplémentaires apparaissent à chaque fois ? Essaie ensuite les missions 02 et 05.</p>"
  },
  {
    "id": "man",
    "label": "man",
    "group": "Navigation",
    "summary": "Ouvre le manuel détaillé d’une commande.",
    "mission": "01",
    "html": "<h2>Comprendre</h2>\n<p>Ouvre le manuel détaillé d’une commande.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>man commande</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>man ls</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Dans le manuel : / cherche un mot, n passe au résultat suivant, q quitte.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 01 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "mkdir",
    "label": "mkdir",
    "group": "Fichiers et droits",
    "summary": "Crée un dossier.",
    "mission": "03",
    "html": "<h2>Comprendre</h2>\n<p>Crée un dossier.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>mkdir dossier</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>mkdir travail/rapports</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Le parent doit exister, sauf si tu utilises mkdir -p.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 03 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "mv",
    "label": "mv",
    "group": "Fichiers et droits",
    "summary": "Déplace ou renomme un fichier ou dossier.",
    "mission": "04",
    "html": "<h2>Comprendre</h2>\n<p>Déplace ou renomme un fichier ou dossier.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>mv source destination</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>mv travail/bilan.txt travail/synthese.txt</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Contrôle le dossier cible : un déplacement peut être silencieux.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 04 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "pipe",
    "label": "| (tuyau)",
    "group": "Texte et flux",
    "summary": "Transmet la sortie d’une commande à l’entrée d’une autre.",
    "mission": "08",
    "html": "<h2>Comprendre</h2>\n<p>Transmet la sortie d’une commande à l’entrée d’une autre.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>commande1 | commande2</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>grep ERREUR journal.log | wc -l</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Construis le pipeline étape par étape pour voir les données intermédiaires.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 08 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "ps-kill",
    "label": "ps / kill",
    "group": "Système et AlmaLinux",
    "summary": "ps observe les processus ; kill envoie un signal à un PID.",
    "mission": "27",
    "html": "<h2>Comprendre</h2>\n<p>ps observe les processus ; kill envoie un signal à un PID.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>ps -p PID  |  kill PID</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>ps -p 1234 -o pid,comm</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Vérifie le PID et la commande avant de terminer un processus.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 27 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "pwd",
    "label": "pwd",
    "group": "Navigation",
    "summary": "Affiche le chemin complet du dossier courant.",
    "mission": "01",
    "html": "<h2>Comprendre</h2>\n<p>Affiche le chemin complet du dossier courant.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>pwd</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>pwd</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Avant une commande qui écrit ou supprime, vérifie où tu te trouves.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 01 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "redirections",
    "label": ">  >>  2>",
    "group": "Texte et flux",
    "summary": "Envoie la sortie normale ou les erreurs vers un fichier.",
    "mission": "30",
    "html": "<h2>Comprendre</h2>\n<p>Envoie la sortie normale ou les erreurs vers un fichier.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>commande &gt; fichier  |  commande &gt;&gt; fichier  |  commande 2&gt; erreurs</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>grep ERREUR journal.log &gt; erreurs.txt</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>&gt; remplace le contenu, &gt;&gt; ajoute à la fin, 2&gt; capture les erreurs.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 30 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "rm",
    "label": "rm",
    "group": "Fichiers et droits",
    "summary": "Supprime le fichier indiqué.",
    "mission": "15",
    "html": "<h2>Comprendre</h2>\n<p>Supprime le fichier indiqué.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>rm fichier</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>rm travail/brouillon.tmp</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Pas de corbeille habituelle : prévisualise les jokers avec echo ou ls.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 15 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "rpm-dnf",
    "label": "rpm / dnf",
    "group": "Système et AlmaLinux",
    "summary": "Sur AlmaLinux, rpm interroge les paquets installés et dnf gère les dépôts.",
    "mission": "37",
    "html": "<h2>Comprendre</h2>\n<p>Sur AlmaLinux, rpm interroge les paquets installés et dnf gère les dépôts.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>rpm -q paquet  |  dnf repolist --enabled</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>rpm -q bash</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Ces commandes d’inspection ne demandent pas de modifier les paquets.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 37 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "sed",
    "label": "sed",
    "group": "Texte et flux",
    "summary": "Transforme un flux de texte, notamment par substitution.",
    "mission": "23",
    "html": "<h2>Comprendre</h2>\n<p>Transforme un flux de texte, notamment par substitution.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>sed &quot;s/ancien/nouveau/&quot; fichier</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>sed &quot;s/^MODE=debug$/MODE=production/&quot; app.conf</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Sans -i, le fichier source reste inchangé ; redirige la sortie vers une copie.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 23 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "selinux",
    "label": "getenforce",
    "group": "Système et AlmaLinux",
    "summary": "Affiche le mode courant de SELinux.",
    "mission": "42",
    "html": "<h2>Comprendre</h2>\n<p>Affiche le mode courant de SELinux.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>getenforce</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>getenforce</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>Enforcing applique les règles ; Permissive journalise sans bloquer ; Disabled désactive SELinux.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 42 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "systemctl",
    "label": "systemctl",
    "group": "Système et AlmaLinux",
    "summary": "Observe l’état des services et unités systemd.",
    "mission": "38",
    "html": "<h2>Comprendre</h2>\n<p>Observe l’état des services et unités systemd.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>systemctl status unite</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>systemctl status sshd</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>status consulte ; restart modifie le service. Regarde les journaux avant toute action.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 38 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  },
  {
    "id": "tar",
    "label": "tar",
    "group": "Système et AlmaLinux",
    "summary": "Crée, liste ou extrait une archive.",
    "mission": "20",
    "html": "<h2>Comprendre</h2>\n<p>Crée, liste ou extrait une archive.</p>\n<h2>Commandes et options</h2>\n<p>La forme de base est <code>tar -czf archive.tar.gz dossier</code>.</p>\n<h2>Exemple commenté</h2>\n<pre><code>tar -tzf sauvegarde.tar.gz</code></pre>\n<p>La commande ci-dessus illustre une utilisation courante ; adapte les chemins à ton dossier de travail.</p>\n<h2>Points de vigilance</h2>\n<p>-c crée, -t liste, -x extrait ; vérifie le contenu avant restauration.</p>\n<h2>Pour s’entraîner</h2>\n<p>Essaie la mission 20 dans la VM, puis reviens expliquer à voix haute ce que fait chaque option.</p>"
  }
];
