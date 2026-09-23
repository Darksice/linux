// Module CTF de lecture : les flags sont dans le contenu des fichiers.
const module02 = {
  id: '02',
  title: 'Lire et comparer les fichiers',
  description: 'Lis des documents et des journaux, identifie leur type, compare des versions et découvre le pipe.',
  archive: 'module02-linux.tar.gz',
  folder: 'atelier-module-02',
  intro: 'Cette fois, les flags sont dans le contenu des fichiers. Lis précisément la consigne, certaines versions et certaines lignes sont des leurres.',
  commands: ['cat', 'less', 'head', 'tail', 'file', 'diff', '|'],
  challenges: [
    {
      id: '01', title: 'Ouvrir le briefing', command: 'cat',
      story: 'Tu connais le chemin du premier document. Il faut maintenant lire son contenu, pas seulement son nom.',
      question: 'Quel flag est écrit dans accueil/briefing ?',
      hints: ['cat affiche le contenu d’un fichier dans le terminal.', 'Depuis la racine de l’atelier, lance cat accueil/briefing.'],
      success: 'cat lit le contenu du fichier sans le modifier.',
      flag: 'FLAG{SALAMECHE}'
    },
    {
      id: '02', title: 'La version en vigueur', command: 'cat',
      story: 'Deux notes portent presque le même nom. L’une est archivée, seule la note en vigueur répond à la demande.',
      question: 'Dans notes, quel flag contient le fichier actif, et non la version archivée ?',
      hints: ['Observe d’abord les noms avec ls notes, puis lis les deux fichiers.', 'Le fichier notes/en_vigueur est celui demandé.'],
      decoy: 'FLAG{ONIX}',
      decoyFeedback: 'Ce flag vient de la note archivée. La question demande la version en vigueur.',
      success: 'Le bon fichier est déterminé par la consigne, pas par le premier flag rencontré.',
      flag: 'FLAG{NINJASK}'
    },
    {
      id: '03', title: 'Un long document', command: 'less',
      story: 'Le guide est suffisamment long pour rendre la lecture avec cat peu confortable. Une ancienne procédure y côtoie la procédure active.',
      question: 'Dans manuel/guide, quel flag appartient à la section PROCÉDURE ACTIVE ?',
      hints: ['less permet de parcourir le document sans remplir tout le terminal, q permet de quitter.', 'Dans less, tape /PROCÉDURE ACTIVE puis Entrée pour rejoindre cette section.'],
      decoy: 'FLAG{GRAVALANCH}',
      decoyFeedback: 'Ce flag est dans la procédure archivée, pas dans la section active.',
      success: 'less permet de naviguer et de rechercher dans un document long.',
      flag: 'FLAG{ALTARIA}'
    },
    {
      id: '04', title: 'L’annexe oubliée', command: 'less',
      story: 'Le même guide contient une annexe de contrôle après la procédure active, au milieu d’un long document.',
      question: 'Quel flag figure dans l’ANNEXE DE CONTRÔLE de manuel/guide ?',
      hints: ['Dans less, / cherche vers l’avant et ? cherche vers l’arrière. G mène à la fin du document.', 'Depuis le début, cherche /ANNEXE DE CONTRÔLE ; depuis la fin, cherche ?ANNEXE DE CONTRÔLE. Quitte avec q.'],
      decoy: 'FLAG{ALTARIA}',
      decoyFeedback: 'Tu as trouvé la procédure active, mais la question vise l’annexe de contrôle.',
      success: 'La recherche avant ou arrière dans less permet de rejoindre une section au milieu d’un long fichier.',
      flag: 'FLAG{LUXRAY}'
    },
    {
      id: '05', title: 'Le début du journal', command: 'head',
      story: 'Le journal de rotation mélange son état initial, ses événements intermédiaires et son état final.',
      question: 'Quel flag figure sur la toute première ligne de journaux/rotation ?',
      hints: ['head montre le début d’un fichier.', 'head -n 1 journaux/rotation ne montre que sa première ligne.'],
      decoy: 'FLAG{RONFLEX}',
      decoyFeedback: 'Ce flag se trouve à la fin du journal, pas au début.',
      success: 'head -n 1 isole la première ligne sans ouvrir tout le journal.',
      flag: 'FLAG{TOGEPI}'
    },
    {
      id: '06', title: 'Onzième ligne', command: 'head',
      story: 'L’onzième événement du même journal correspond au premier contrôle intermédiaire. Par défaut, head ne montre que les dix premières lignes.',
      question: 'Quel flag apparaît exactement sur la ligne 11 de journaux/rotation ?',
      hints: ['head accepte un nombre de lignes avec -n.', 'Affiche les onze premières lignes avec head -n 11 journaux/rotation, lis la dernière de ces onze lignes.'],
      decoy: 'FLAG{TOGEPI}',
      decoyFeedback: 'Ce flag est sur la première ligne, pas sur la onzième.',
      success: 'head -n 11 révèle la ligne absente de l’affichage par défaut.',
      flag: 'FLAG{MORPHEO}'
    },
    {
      id: '07', title: 'Dernier état', command: 'tail',
      story: 'Le dernier événement remplace l’état initial. Le flag du début n’est plus la réponse.',
      question: 'Quel flag figure sur la dernière ligne de journaux/rotation ?',
      hints: ['tail affiche la fin du fichier.', 'tail -n 1 journaux/rotation isole la dernière ligne.'],
      decoy: 'FLAG{TOGEPI}',
      decoyFeedback: 'Tu as pris le premier événement, cherche le dernier.',
      success: 'tail permet de voir rapidement les événements les plus récents.',
      flag: 'FLAG{RONFLEX}'
    },
    {
      id: '08', title: 'Le début de la fin', command: 'tail',
      story: 'L’événement recherché ouvre les quatre dernières lignes du journal, avant le dernier état.',
      question: 'Quel flag apparaît sur la première des quatre dernières lignes de journaux/rotation ?',
      hints: ['Demande exactement quatre lignes à tail.', 'tail -n 4 journaux/rotation, la réponse est sur la première ligne affichée.'],
      decoy: 'FLAG{RONFLEX}',
      decoyFeedback: 'C’est la dernière des quatre lignes affichées, pas la première.',
      success: 'Avec tail -n 4, tu conserves le contexte des événements récents.',
      flag: 'FLAG{MARILL}'
    },
    {
      id: '09', title: 'Sans extension', command: 'file · cat',
      story: 'Trois objets n’ont pas d’extension. Leur nom ne suffit pas à savoir lesquels sont un document, une page HTML ou un script.',
      question: 'Dans objets, quel flag contient le document texte qui n’est ni une page HTML ni un script ?',
      hints: ['file détecte le type d’après le contenu plutôt que l’extension.', 'Essaie file objets/*, puis lis avec cat le fichier décrit comme du texte sans mention HTML ou shell script.'],
      decoy: 'FLAG{MAGIKARP}',
      decoyFeedback: 'Ce flag est dans la page HTML, pas dans le document texte demandé.',
      success: 'Une extension absente ou trompeuse ne dit pas tout : file inspecte le contenu.',
      flag: 'FLAG{PORYGONZ}'
    },
    {
      id: '10', title: 'Une ligne ajoutée', command: 'diff',
      story: 'La configuration actuelle a remplacé une ancienne valeur. Les deux versions contiennent un flag.',
      question: 'Entre config/service-ancien et config/service-actuel, quel flag a été ajouté dans la version actuelle ?',
      hints: ['diff compare deux fichiers ligne par ligne, l’ordre des arguments compte.', 'diff -u config/service-ancien config/service-actuel : une ligne précédée de + vient de la version actuelle.'],
      decoy: 'FLAG{DRACO}',
      decoyFeedback: 'Ce flag est sur la ligne retirée de l’ancienne version.',
      success: 'Dans diff -u ancien actuel, - signale une ligne retirée et + une ligne ajoutée.',
      flag: 'FLAG{METAMORPH}'
    },
    {
      id: '11', title: 'Ce qui a disparu', command: 'diff',
      story: 'Cette fois, l’audit veut identifier ce qui a été retiré lors du changement de droits.',
      question: 'Entre config/droits-avant et config/droits-apres, quel flag a été supprimé ?',
      hints: ['Garde l’ordre avant puis après dans la commande diff.', 'Avec diff -u config/droits-avant config/droits-apres, regarde la ligne commençant par -.'],
      decoy: 'FLAG{MEW}',
      decoyFeedback: 'Ce flag a été ajouté. La question demande celui qui a disparu.',
      success: 'Comparer les deux sens du changement évite de confondre ajout et retrait.',
      flag: 'FLAG{GLOUPTI}'
    },
    {
      id: '12', title: 'La sortie devient une entrée', command: 'cat · head · |',
      story: 'Le pipe relie la sortie d’une commande à l’entrée de la suivante. Commence par une combinaison simple.',
      question: 'Avec cat flux/chronologie | head -n 1, quel flag obtiens-tu ?',
      hints: ['Le caractère | transmet la sortie de cat à head.', 'Cette combinaison montre le principe du pipe. head -n 1 flux/chronologie serait aussi possible sans cat.'],
      success: 'Le pipe transmet un flux de texte, ici, cat est pédagogique mais facultatif.',
      flag: 'FLAG{MEDITIK}'
    },
    {
      id: '13', title: 'Une ligne au milieu', command: 'head · tail · |',
      story: 'Isole d’abord les huit premières lignes, puis ne conserve que la dernière de cette sélection.',
      question: 'Quel flag est sur la ligne 8 de flux/chronologie ? Utilise head et tail reliés par un pipe.',
      hints: ['head -n 8 garde les huit premières lignes.', 'head -n 8 flux/chronologie | tail -n 1 affiche uniquement la huitième.'],
      decoy: 'FLAG{ARTIKODIN}',
      decoyFeedback: 'Ce flag est sur la ligne 7, juste avant la ligne demandée.',
      success: 'Un pipe permet de filtrer progressivement un flux, de gauche à droite.',
      flag: 'FLAG{MILOBELLUS}'
    },
    {
      id: '14', title: 'Comparer puis parcourir', command: 'diff · less · |',
      story: 'Une dernière comparaison produit plusieurs changements. Parcours-la sans perdre le contexte.',
      question: 'Avec diff -u config/volume-ancien config/volume-actuel | less, quel flag a été ajouté dans le bloc authentification ?',
      hints: ['Le pipe envoie la sortie de diff dans less. Cherche authentification dans less avec /authentification.', 'Une ligne commençant par + appartient à volume-actuel. Quitte less avec q.'],
      decoy: 'FLAG{MACHOC}',
      decoyFeedback: 'Ce flag appartient à la ligne retirée de l’ancien bloc authentification.',
      success: 'diff repère les changements, less aide à parcourir une sortie longue.',
      flag: 'FLAG{JIRACHI}'
    }
  ]
};
