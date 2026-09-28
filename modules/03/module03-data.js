// Module CTF de traitement de données. Les flags sont publics, le raisonnement compte.
const module03 = {
  id: '03',
  title: 'Transformer et compter des données',
  description: 'Extrais, trie, compte et normalise des données, puis enregistre les résultats avec > et >>.',
  archive: 'module03-linux.tar.gz',
  folder: 'atelier-module-03',
  intro: 'Les fichiers contiennent plusieurs flags plausibles. La bonne réponse se déduit d’une sélection, d’un tri ou d’un comptage, car le premier flag aperçu n’est pas forcément le bon. Les derniers défis modifient des fichiers. Réextrais l’archive pour repartir de zéro.',
  commands: ['cut', 'sort', 'uniq', 'wc', 'tr', '>', '>>'],
  challenges: [
    {
      id: '01', title: 'Le bon champ', command: 'cat · cut',
      story: 'Une fiche tient sur une seule ligne. Les champs sont séparés par deux-points et deux d’entre eux ressemblent à un flag.',
      question: 'Dans colonnes/fiche, quel flag occupe le troisième champ ?',
      hints: ['cut peut extraire un champ délimité, -d choisit le séparateur et -f le numéro du champ.', 'Essaie cut -d: -f3 colonnes/fiche. cat colonnes/fiche permet d’observer la structure avant.'],
      decoy: 'FLAG{ROUCOOL}', decoyFeedback: 'Ce flag est dans le premier champ. Le défi demande le troisième.',
      success: 'cut -d: -f3 extrait le troisième champ d’une ligne séparée par des deux-points.',
      flag: 'FLAG{LOKHLASS}'
    },
    {
      id: '02', title: 'Une colonne, puis une ligne', command: 'cut · head · tail · |',
      story: 'Le tableau contient plusieurs enregistrements séparés par des points-virgules. Tu cherches la deuxième ligne de la colonne des flags.',
      question: 'Dans colonnes/equipe, quel flag figure dans le deuxième champ de la deuxième ligne ?',
      hints: ['Extrais d’abord le deuxième champ avec cut -d\';\' -f2 colonnes/equipe.', 'Envoie cette colonne à head -n 2, puis à tail -n 1.'],
      decoy: 'FLAG{ABRA}', decoyFeedback: 'Ce flag est dans la première ligne, pas dans la deuxième.',
      success: 'Les pipes permettent de sélectionner une colonne puis une ligne.',
      flag: 'FLAG{SIMIABRAZ}'
    },
    {
      id: '03', title: 'Le premier après le tri', command: 'sort',
      story: 'Le premier nom du fichier n’est pas nécessairement le premier dans l’ordre alphabétique.',
      question: 'Après un tri alphabétique de tri/noms, quel flag arrive en premier ?',
      hints: ['sort trie les lignes entières par ordre lexicographique.', 'Lance sort tri/noms et regarde sa première ligne.'],
      decoy: 'FLAG{ZOROARK}', decoyFeedback: 'C’est la première ligne du fichier brut, pas celle du résultat trié.',
      success: 'sort produit un nouvel ordre sur sa sortie sans modifier le fichier source.',
      flag: 'FLAG{AEROMITE}'
    },
    {
      id: '04', title: 'Neuf avant douze ?', command: 'sort · tail · |',
      story: 'Chaque ligne commence par un score. Un tri alphabétique place 9 après 12, mais ce n’est pas l’ordre numérique.',
      question: 'Dans tri/scores, quel flag appartient au score le plus élevé numériquement ?',
      hints: ['sort -n compare les nombres plutôt que leurs caractères.', 'sort -n tri/scores | tail -n 1 montre la ligne au score maximal.'],
      decoy: 'FLAG{MOTISMA}', decoyFeedback: 'Le score 9 paraît dernier en tri alphabétique, mais 12 est plus grand.',
      success: 'L’option -n évite de confondre tri lexical et tri numérique.',
      flag: 'FLAG{ELECTHOR}'
    },
    {
      id: '05', title: 'Trier sur la bonne colonne', command: 'sort · cut',
      story: 'Cette fois, le nombre est après le flag. Trier le début de la ligne donnerait un autre résultat.',
      question: 'Dans tri/charges, quel flag correspond à la plus petite charge numérique ?',
      hints: ['Les champs sont séparés par :. sort -t: -k2,2n trie numériquement le deuxième champ.', 'Regarde la première ligne de sort -t: -k2,2n tri/charges. Tu peux utiliser cut -d: -f1 pour n’afficher que le flag.'],
      decoy: 'FLAG{GIRATINA}', decoyFeedback: 'Ce flag arrive tôt si tu tries le texte du premier champ. Compare les charges.',
      success: 'sort peut cibler une clé précise au lieu de trier la ligne entière.',
      flag: 'FLAG{TARINOR}'
    },
    {
      id: '06', title: 'Doublons voisins', command: 'uniq',
      story: 'Deux flags sont répétés dans le fichier, mais un seul apparaît deux fois de suite.',
      question: 'Quel flag uniq -d doublons/brut affiche-t-il sans tri préalable ?',
      hints: ['uniq ne voit que les répétitions consécutives, -d ne montre que les lignes répétées.', 'Lance uniq -d doublons/brut. Le second doublon est séparé par d’autres lignes.'],
      decoy: 'FLAG{ELEKTEK}', decoyFeedback: 'Ce flag est répété, mais ses deux occurrences ne sont pas voisines.',
      success: 'uniq seul ne repère pas les doublons éloignés.',
      flag: 'FLAG{NIDOKING}'
    },
    {
      id: '07', title: 'Le doublon révélé', command: 'sort · uniq · |',
      story: 'En triant la même liste avant uniq, les occurrences éloignées deviennent voisines.',
      question: 'Quel nouveau flag apparaît parmi les doublons avec sort doublons/brut | uniq -d ?',
      hints: ['Le tri rapproche les lignes identiques.', 'Compare la sortie de uniq -d doublons/brut avec celle de sort doublons/brut | uniq -d.'],
      decoy: 'FLAG{NIDOKING}', decoyFeedback: 'Celui-ci était déjà détecté sans sort. Cherche le nouveau doublon.',
      success: 'sort | uniq révèle les répétitions même si elles étaient éloignées dans le fichier brut.',
      flag: 'FLAG{ELEKTEK}'
    },
    {
      id: '08', title: 'Le plus fréquent', command: 'sort · uniq · head · |',
      story: 'La liste contient plusieurs occurrences de chaque flag. Il faut compter avant de conclure.',
      question: 'Dans doublons/frequences, quel flag est le plus fréquent ?',
      hints: ['Commence par sort doublons/frequences | uniq -c.', 'Pour ordonner les comptes, ajoute sort -nr puis head -n 1.'],
      decoy: 'FLAG{CANINOS}', decoyFeedback: 'Ce flag est le premier du fichier, mais ce n’est pas le plus fréquent.',
      success: 'uniq -c compte chaque groupe de lignes identiques après le tri.',
      flag: 'FLAG{MACKOGNE}'
    },
    {
      id: '09', title: 'Douze lignes exactement', command: 'wc · cat',
      story: 'Trois fichiers de candidature ont un nombre de lignes différent. Chacun contient un flag plausible.',
      question: 'Dans comptage/candidats, quel flag se trouve dans le fichier de exactement 12 lignes ?',
      hints: ['wc -l donne le nombre de lignes de chaque fichier.', 'Compare les trois fichiers avec wc -l comptage/candidats/alpha comptage/candidats/beta comptage/candidats/gamma, puis lis avec cat celui de 12 lignes.'],
      decoy: 'FLAG{SABELETTE}', decoyFeedback: 'Ce fichier contient moins de 12 lignes.',
      success: 'wc -l compte les lignes, puis cat permet d’inspecter le fichier choisi.',
      flag: 'FLAG{ARCEUS}'
    },
    {
      id: '10', title: 'Compter les mots', command: 'wc · cat',
      story: 'Cette fois, la taille recherchée est un nombre de mots, pas de lignes.',
      question: 'Dans comptage/phrases, quel flag se trouve dans le fichier contenant exactement 7 mots ?',
      hints: ['wc -w compte les mots séparés par des espaces.', 'Compare les trois fichiers avec wc -w comptage/phrases/cible comptage/phrases/courte comptage/phrases/longue, puis lis le bon avec cat.'],
      decoy: 'FLAG{ROUCARNAGE}', decoyFeedback: 'Ce fichier n’a pas sept mots. Utilise wc -w plutôt que wc -l.',
      success: 'wc -w et wc -l mesurent deux choses différentes.',
      flag: 'FLAG{PHARAMP}'
    },
    {
      id: '11', title: 'Combien de personnes uniques ?', command: 'sort · uniq · wc · |',
      story: 'Des noms se répètent dans comptage/personnes. Le nombre de personnes distinctes pointe vers un flag dans une table de correspondance.',
      question: 'Compte les noms distincts, puis lis comptage/cle. Quel flag correspond au résultat ?',
      hints: ['Trie les noms avant uniq, puis compte les lignes restantes.', 'Lance sort comptage/personnes | uniq | wc -l, puis retrouve ce nombre dans comptage/cle.'],
      decoy: 'FLAG{LAGGRON}', decoyFeedback: 'Ce flag correspond à trois personnes. Vérifie tous les noms distincts.',
      success: 'sort | uniq | wc -l compte des valeurs distinctes sans modifier le fichier.',
      flag: 'FLAG{CELEBI}'
    },
    {
      id: '12', title: 'Espaces irréguliers', command: 'tr · cut · |',
      story: 'Les colonnes sont séparées par un nombre variable d’espaces. cut sur le fichier brut vise parfois un champ vide.',
      question: 'Dans normalisation/espaces, quel flag apparaît dans la troisième colonne après normalisation des espaces ?',
      hints: ['tr -s \' \' réduit les suites d’espaces à un seul espace.', 'cat normalisation/espaces | tr -s \' \' | cut -d\' \' -f3.'],
      decoy: 'FLAG{MYSTHERBE}', decoyFeedback: 'Ce flag occupe la première colonne, pas la troisième.',
      success: 'tr -s stabilise le séparateur avant une extraction avec cut.',
      flag: 'FLAG{EOKO}'
    },
    {
      id: '13', title: 'La casse masque les répétitions', command: 'tr · sort · uniq · |',
      story: 'Un même flag peut être écrit avec des minuscules ou des majuscules. Les compter tels quels divise artificiellement son total.',
      question: 'Dans normalisation/casse, quel flag est le plus fréquent si l’on ignore la casse ?',
      hints: ['tr \'[:lower:]\' \'[:upper:]\' normalise la casse du flux.', 'cat normalisation/casse | tr \'[:lower:]\' \'[:upper:]\' | sort | uniq -c | sort -nr | head -n 1.'],
      decoy: 'FLAG{RAIKOU}', decoyFeedback: 'Ce flag semble fréquent sans normalisation, mais un autre a davantage de variantes de casse.',
      success: 'Normaliser avant de compter évite de traiter des variantes comme des valeurs différentes.',
      flag: 'FLAG{SUICUNE}'
    },
    {
      id: '14', title: 'Quelle équipe domine ?', command: 'cut · sort · uniq · |',
      story: 'Chaque ligne du tableau associe une équipe à un flag. Une équipe apparaît plus souvent que les autres.',
      question: 'Dans pipeline/equipes, quel flag est le plus fréquent dans la deuxième colonne ?',
      hints: ['cut -d\';\' -f2 pipeline/equipes extrait les flags.', 'Chaîne cut, sort, uniq -c, sort -nr et head -n 1.'],
      decoy: 'FLAG{ENTEI}', decoyFeedback: 'Cette équipe est fréquente, mais elle n’a pas le plus grand compte.',
      success: 'Une chaîne de commandes peut transformer un tableau en classement vérifiable.',
      flag: 'FLAG{LUGIA}'
    },
    {
      id: '15', title: 'Synthèse d’incident', command: 'cat · cut · tr · sort · uniq · |',
      story: 'Le rapport final contient des flags de fréquence différente, avec des variations de casse. Combine les outils du module.',
      question: 'Dans pipeline/incidents, quel flag est le plus fréquent dans la deuxième colonne après normalisation de la casse ?',
      hints: ['Observe le fichier avec cat, extrais la deuxième colonne avec cut -d: -f2, puis normalise avec tr.', 'cut -d: -f2 pipeline/incidents | tr \'[:lower:]\' \'[:upper:]\' | sort | uniq -c | sort -nr | head -n 1.'],
      decoy: 'FLAG{DIALGA}', decoyFeedback: 'Ce flag est fréquent, mais un autre gagne après normalisation de la casse.',
      success: 'Tu as enchaîné extraction, normalisation, tri, comptage et classement.',
      flag: 'FLAG{KYOGRE}'
    },
    {
      id: '16', title: 'Remplacer un ancien résultat', command: 'sort · > · head',
      story: 'Un ancien résultat est déjà présent. Tu dois le remplacer par les lignes triées, pas ajouter les nouvelles lignes à la suite.',
      question: 'Dans redirections/remplacer, trie entree vers resultat avec >. Quel flag se trouve ensuite sur la première ligne de resultat ?',
      hints: ['sort écrit normalement dans le terminal. > enregistre cette sortie en remplaçant le contenu de resultat.', 'Lance sort redirections/remplacer/entree > redirections/remplacer/resultat, puis head -n 1 redirections/remplacer/resultat.'],
      decoy: 'FLAG{RAMOLOSS}', decoyFeedback: 'C’est l’ancien contenu de resultat, il faut le remplacer avec >.',
      success: '> crée ou remplace le fichier de destination sans changer le fichier lu par sort.',
      flag: 'FLAG{ABSOL}'
    },
    {
      id: '17', title: 'Ajouter sans effacer', command: 'cat · >>',
      story: 'Cette fois, la première ligne du résultat doit être conservée. Ajoute la suite à la fin du fichier sans le remplacer.',
      question: 'Dans redirections/ajouter, ajoute suite à resultat avec >>. Quel flag se trouve alors sur la deuxième ligne de resultat ?',
      hints: ['>> ajoute la sortie de cat à la fin du fichier existant.', 'Lance cat redirections/ajouter/suite >> redirections/ajouter/resultat, puis cat redirections/ajouter/resultat.'],
      decoy: 'FLAG{GRIKNOT}', decoyFeedback: 'C’est la première ligne, qui doit rester en place. La question demande la deuxième.',
      success: '>> conserve l’ancien contenu et ajoute la nouvelle sortie à la fin.',
      flag: 'FLAG{LUCARIO}'
    },
    {
      id: '18', title: 'Deux fragments, un flag', command: 'cat · tr · > · >>',
      story: 'Deux fragments forment un seul flag. L’ancien résultat est un leurre, et le retour à la ligne du premier fragment empêcherait leur assemblage.',
      question: 'Dans redirections/assembler, remplace resultat par debut sans son retour à la ligne, puis ajoute fin avec >>. Quel flag complet contient resultat ?',
      hints: ['tr -d peut retirer le retour à la ligne du premier fragment avant la redirection avec >.', 'Lance cat redirections/assembler/debut | tr -d \'\\n\' > redirections/assembler/resultat, puis cat redirections/assembler/fin >> redirections/assembler/resultat. Lis enfin resultat avec cat.'],
      decoy: 'FLAG{NOSTENFER}', decoyFeedback: 'C’est l’ancien résultat. > doit l’effacer avant l’ajout du second fragment.',
      success: '> repart d’un résultat propre, >> ajoute la suite, et tr évite une coupure au milieu du flag.',
      flag: 'FLAG{LATIAS}'
    }
  ]
};
