// QCM et organisation du premier bloc pédagogique.
const learningBlocks = [
  {
    id: '01',
    title: 'Les bases du terminal',
    description: 'Se repérer, lire des fichiers et transformer des données avec les commandes essentielles du terminal.',
    sequences: [
      {moduleId: '01', commandIds: ['man', 'pwd', 'cd', 'ls']},
      {moduleId: '02', commandIds: ['cat', 'less', 'head', 'tail', 'file', 'diff', 'pipe']},
      {moduleId: '03', commandIds: ['cut', 'sort', 'uniq', 'wc', 'tr', 'pipe', 'cat']}
    ]
  }
];

const commandQuizzes = [
  {
    id: 'cd', label: 'cd', summary: 'Changer de répertoire et interpréter les chemins.', moduleIds: ['01'],
    questions: [
      {
        prompt: 'Tu te trouves dans /home/alice/rep1 et le dossier rep2 existe. Quelles affirmations sont exactes ?',
        options: [
          {text: 'cd .. rejoint /home/alice.', correct: true, explanation: '.. représente le dossier parent de /home/alice/rep1.'},
          {text: 'cd . reste dans /home/alice/rep1.', correct: true, explanation: '. représente le dossier courant.'},
          {text: 'cd rep2 rejoint /home/alice/rep1/rep2.', correct: true, explanation: 'rep2 est interprété depuis le dossier courant.'},
          {text: 'pwd rejoint /home/alice.', correct: false, explanation: 'pwd affiche le chemin absolu sans changer de dossier.'}
        ]
      },
      {
        prompt: 'Quelles affirmations sur les chemins utilisés avec cd sont exactes ?',
        options: [
          {text: '/etc est un chemin absolu.', correct: true, explanation: 'Le premier / indique que le chemin part de la racine.'},
          {text: '../rep2 est un chemin relatif.', correct: true, explanation: 'Il est calculé depuis le dossier courant en passant par son parent.'},
          {text: 'La destination de rep1/rep2 dépend du dossier courant.', correct: true, explanation: 'Ce chemin ne commence pas par / et reste donc relatif.'},
          {text: 'Tous les chemins valides commencent par /.', correct: false, explanation: 'Les chemins relatifs ne commencent pas par /.'}
        ]
      },
      {
        prompt: 'Quelles affirmations sur le dossier personnel et le dossier précédent sont exactes ?',
        options: [
          {text: 'cd sans argument rejoint le dossier indiqué par $HOME.', correct: true, explanation: 'Sans chemin, cd utilise le dossier personnel.'},
          {text: 'cd "$HOME" rejoint le dossier personnel.', correct: true, explanation: '$HOME contient son chemin absolu.'},
          {text: 'cd - utilise $OLDPWD et affiche le chemin rejoint.', correct: true, explanation: '$OLDPWD mémorise le dossier occupé avant le dernier changement.'},
          {text: 'cd "~" rejoint le dossier personnel.', correct: false, explanation: 'Entre guillemets, ~ reste un nom littéral et n’est pas développé par le shell.'}
        ]
      },
      {
        prompt: 'Un dossier nommé Mes documents existe dans le dossier courant. Quelles commandes permettent de le rejoindre ?',
        options: [
          {text: 'cd "Mes documents"', correct: true, explanation: 'Les guillemets conservent le nom complet comme un seul argument.'},
          {text: 'cd Mes\\ documents', correct: true, explanation: 'La barre oblique inverse protège l’espace.'},
          {text: 'cd Mes documents', correct: false, explanation: 'Sans protection, le shell transmet deux arguments séparés à cd.'},
          {text: 'cd "Mes Documents"', correct: false, explanation: 'Les guillemets gèrent correctement l’espace, mais Linux distingue documents de Documents.'}
        ]
      }
    ]
  },
  {
    id: 'ls', label: 'ls', summary: 'Lister les entrées et comprendre les informations affichées.', moduleIds: ['01'],
    questions: [
      {
        prompt: 'Quelles options de ls donnent davantage d’informations que ls seul ?',
        options: [
          {text: '-a', correct: true, explanation: 'Elle inclut les entrées cachées.'},
          {text: '-l', correct: true, explanation: 'Elle affiche le format détaillé, notamment les droits.'},
          {text: '-la', correct: true, explanation: 'Elle combine le format détaillé et l’affichage des entrées cachées.'},
          {text: '-q pour quitter', correct: false, explanation: 'q sert notamment à quitter less ou man, pas ls.'}
        ]
      },
      {
        prompt: 'Que peut-on déduire de la sortie de ls -l ?',
        options: [
          {text: 'Le premier caractère indique le type de l’entrée.', correct: true, explanation: 'd indique par exemple un répertoire.'},
          {text: 'Le nombre placé après les droits indique les liens physiques vers l’inode.', correct: true, explanation: 'Ce champ correspond au nombre de liens physiques associés à l’inode.'},
          {text: 'Le propriétaire et le groupe sont affichés.', correct: true, explanation: 'Ils apparaissent dans les colonnes du format long.'},
          {text: 'La ligne total indique le nombre d’entrées.', correct: false, explanation: 'Elle représente l’espace alloué, généralement en blocs de 1 Kio.'}
        ]
      },
      {
        prompt: 'Le dossier rep1 contient config.txt et le fichier caché .secret. Quelles commandes affichent .secret ?',
        options: [
          {text: 'ls -a rep1', correct: true, explanation: '-a inclut les entrées dont le nom commence par un point.'},
          {text: 'ls -la rep1', correct: true, explanation: '-la affiche toutes les entrées avec leurs détails.'},
          {text: 'ls rep1', correct: false, explanation: 'Sans -a, les entrées cachées restent masquées.'},
          {text: 'ls -l rep1', correct: false, explanation: '-l ajoute des détails sans afficher les entrées cachées.'}
        ]
      },
      {
        prompt: 'Quelles affirmations décrivent correctement le comportement de ls ?',
        options: [
          {text: 'ls rep1 affiche le contenu visible de rep1 sans changer le dossier courant.', correct: true, explanation: 'ls examine le chemin indiqué mais ne déplace pas le terminal.'},
          {text: 'ls -l rep1 détaille le contenu visible de rep1.', correct: true, explanation: 'Sans -d, ls appliqué à un dossier liste son contenu.'},
          {text: 'ls -ld rep1 affiche les informations du dossier rep1 lui-même.', correct: true, explanation: '-d demande de décrire le dossier au lieu de parcourir son contenu.'},
          {text: 'Une sortie vide de ls prouve que le dossier ne contient aucune entrée.', correct: false, explanation: 'Le dossier peut encore contenir des entrées cachées visibles avec -a.'}
        ]
      }
    ]
  },
  {
    id: 'pwd', label: 'pwd', summary: 'Identifier précisément le répertoire courant.', moduleIds: ['01'],
    questions: [
      {
        prompt: 'Dans quelles situations pwd est-il utile ?',
        options: [
          {text: 'Vérifier où une commande va agir.', correct: true, explanation: 'Le répertoire courant influence les chemins relatifs.'},
          {text: 'Copier le chemin absolu du répertoire courant.', correct: true, explanation: 'pwd affiche ce chemin.'},
          {text: 'Se repérer après plusieurs cd.', correct: true, explanation: 'Il confirme l’emplacement atteint.'},
          {text: 'Afficher le contenu d’un fichier.', correct: false, explanation: 'Cette tâche revient plutôt à cat ou less.'}
        ]
      },
      {
        prompt: 'Quelles affirmations décrivent correctement pwd ?',
        options: [
          {text: 'Sa sortie commence normalement par /.', correct: true, explanation: 'Le chemin affiché est absolu.'},
          {text: 'Il ne change pas le répertoire courant.', correct: true, explanation: 'Il se contente de l’afficher.'},
          {text: 'Il peut aider à construire un chemin absolu.', correct: true, explanation: 'Sa sortie fournit le point de départ complet.'},
          {text: 'Il liste les fichiers cachés.', correct: false, explanation: 'C’est le rôle de ls -a.'}
        ]
      }
    ]
  },
  {
    id: 'man', label: 'man', summary: 'Trouver la documentation d’une commande dans le terminal.', moduleIds: ['01'],
    questions: [
      {
        prompt: 'Quelles actions sont généralement disponibles dans une page man ?',
        options: [
          {text: 'Appuyer sur q pour quitter.', correct: true, explanation: 'Le pager se ferme avec q.'},
          {text: 'Utiliser /mot pour rechercher.', correct: true, explanation: 'La recherche parcourt la page du manuel.'},
          {text: 'Utiliser n pour aller au résultat suivant.', correct: true, explanation: 'n poursuit la recherche courante.'},
          {text: 'Modifier directement la commande documentée.', correct: false, explanation: 'man consulte une documentation, il ne modifie pas la commande.'}
        ]
      },
      {
        prompt: 'Quelles commandes peuvent aider à comprendre ls sans chercher sur le Web ?',
        options: [
          {text: 'man ls', correct: true, explanation: 'Elle ouvre la page de manuel de ls.'},
          {text: 'ls --help', correct: true, explanation: 'Elle affiche une aide plus courte.'},
          {text: 'apropos list', correct: true, explanation: 'Elle peut rechercher des pages de manuel liées à un terme.'},
          {text: 'pwd ls', correct: false, explanation: 'pwd ne prend pas ls comme commande à documenter.'}
        ]
      }
    ]
  },
  {
    id: 'cat', label: 'cat', summary: 'Afficher ou concaténer rapidement du contenu texte.', moduleIds: ['02', '03'],
    questions: [
      {
        prompt: 'Quels usages correspondent à cat ?',
        options: [
          {text: 'Afficher un petit fichier texte.', correct: true, explanation: 'cat écrit son contenu sur la sortie standard.'},
          {text: 'Concaténer plusieurs fichiers dans la sortie.', correct: true, explanation: 'Les fichiers sont lus dans l’ordre indiqué.'},
          {text: 'Envoyer un contenu dans un pipe.', correct: true, explanation: 'La sortie standard peut alimenter une autre commande.'},
          {text: 'Parcourir confortablement un fichier de milliers de lignes.', correct: false, explanation: 'less est plus adapté à une lecture interactive.'}
        ]
      },
      {
        prompt: 'Quelles précautions sont justes avec cat et les redirections ?',
        options: [
          {text: '> remplace le contenu de la destination.', correct: true, explanation: 'Une destination existante est tronquée.'},
          {text: '>> ajoute à la fin de la destination.', correct: true, explanation: 'Le contenu existant est conservé.'},
          {text: 'cat fichier ne modifie pas le fichier.', correct: true, explanation: 'Sans redirection, cat ne fait que le lire.'},
          {text: 'cat source > source est une copie sûre.', correct: false, explanation: 'Le shell vide la destination avant que cat ne puisse la lire.'}
        ]
      }
    ]
  },
  {
    id: 'less', label: 'less', summary: 'Parcourir un texte long sans le charger dans un éditeur.', moduleIds: ['02'],
    questions: [
      {
        prompt: 'Quelles actions sont possibles dans less ?',
        options: [
          {text: 'Naviguer avec les flèches ou Page suivante.', correct: true, explanation: 'less permet de parcourir le document.'},
          {text: 'Rechercher avec /mot.', correct: true, explanation: 'La recherche cible le texte affiché.'},
          {text: 'Quitter avec q.', correct: true, explanation: 'q ferme le pager.'},
          {text: 'Enregistrer automatiquement les modifications.', correct: false, explanation: 'less est avant tout un outil de consultation.'}
        ]
      },
      {
        prompt: 'Dans quels cas less est-il préférable à cat ?',
        options: [
          {text: 'Lire un fichier très long.', correct: true, explanation: 'La navigation évite de faire défiler tout le terminal.'},
          {text: 'Rechercher plusieurs occurrences dans un document.', correct: true, explanation: 'La recherche interactive est intégrée.'},
          {text: 'Examiner la sortie longue d’une commande avec cmd | less.', correct: true, explanation: 'less peut recevoir son entrée depuis un pipe.'},
          {text: 'Compter exactement les lignes.', correct: false, explanation: 'wc -l est conçu pour ce comptage.'}
        ]
      }
    ]
  },
  {
    id: 'head', label: 'head', summary: 'Sélectionner le début d’un flux ou d’un fichier.', moduleIds: ['02'],
    questions: [
      {
        prompt: 'Quelles commandes affichent une partie située au début de fichier.txt ?',
        options: [
          {text: 'head fichier.txt', correct: true, explanation: 'Par défaut, head affiche les dix premières lignes.'},
          {text: 'head -n 5 fichier.txt', correct: true, explanation: 'Elle affiche les cinq premières lignes.'},
          {text: 'cat fichier.txt | head -n 2', correct: true, explanation: 'head limite ici le flux aux deux premières lignes.'},
          {text: 'tail -n 5 fichier.txt', correct: false, explanation: 'tail cible la fin du fichier.'}
        ]
      },
      {
        prompt: 'Quelles affirmations sur head sont correctes ?',
        options: [
          {text: 'head peut lire un fichier ou l’entrée standard.', correct: true, explanation: 'Il fonctionne directement ou dans un pipeline.'},
          {text: '-n permet de choisir un nombre de lignes.', correct: true, explanation: 'Par exemple, -n 3 limite la sortie à trois lignes.'},
          {text: 'Sa sortie peut alimenter tail.', correct: true, explanation: 'head et tail peuvent être combinés pour viser une ligne.'},
          {text: 'head modifie le début du fichier.', correct: false, explanation: 'Il sélectionne une sortie sans modifier la source.'}
        ]
      }
    ]
  },
  {
    id: 'tail', label: 'tail', summary: 'Sélectionner la fin d’un flux ou suivre un journal.', moduleIds: ['02'],
    questions: [
      {
        prompt: 'Quels usages correspondent à tail ?',
        options: [
          {text: 'Afficher les dernières lignes d’un fichier.', correct: true, explanation: 'C’est son comportement principal.'},
          {text: 'Choisir le nombre de lignes avec -n.', correct: true, explanation: 'tail -n 20 affiche les vingt dernières lignes.'},
          {text: 'Suivre les nouvelles lignes avec -f.', correct: true, explanation: 'Cette option est utile pour observer un journal.'},
          {text: 'Afficher les permissions du fichier.', correct: false, explanation: 'ls -l affiche les permissions.'}
        ]
      },
      {
        prompt: 'Quelles combinaisons peuvent aider à isoler une ligne précise ?',
        options: [
          {text: 'head -n 11 fichier | tail -n 1', correct: true, explanation: 'Elle conserve les onze premières lignes puis la dernière de ce groupe.'},
          {text: 'tail -n 4 fichier | head -n 1', correct: true, explanation: 'Elle prend les quatre dernières lignes puis la première de ce groupe.'},
          {text: 'cat fichier | tail -n 1', correct: true, explanation: 'Elle affiche la dernière ligne du flux.'},
          {text: 'tail fichier > fichier', correct: false, explanation: 'Cette redirection tronquerait dangereusement le fichier source.'}
        ]
      }
    ]
  },
  {
    id: 'file', label: 'file', summary: 'Identifier le type probable d’un fichier par son contenu.', moduleIds: ['02'],
    questions: [
      {
        prompt: 'Quelles informations file peut-il généralement fournir ?',
        options: [
          {text: 'Distinguer un texte d’un binaire.', correct: true, explanation: 'file examine le contenu et sa signature.'},
          {text: 'Reconnaître certains formats comme HTML ou une image.', correct: true, explanation: 'Les signatures et caractéristiques connues sont détectées.'},
          {text: 'Signaler qu’un fichier semble être un script.', correct: true, explanation: 'Le shebang et le contenu peuvent être reconnus.'},
          {text: 'Garantir que le contenu est sans danger.', correct: false, explanation: 'Identifier un type ne constitue pas une analyse de sécurité.'}
        ]
      },
      {
        prompt: 'Quelles bonnes pratiques s’appliquent à un fichier sans extension ?',
        options: [
          {text: 'Utiliser file avant de choisir comment l’ouvrir.', correct: true, explanation: 'Le nom seul ne révèle pas nécessairement le format.'},
          {text: 'Vérifier son type avant de tenter de l’exécuter.', correct: true, explanation: 'Cela réduit les erreurs et les risques.'},
          {text: 'Compléter avec less ou cat si file indique du texte.', correct: true, explanation: 'On peut alors examiner son contenu.'},
          {text: 'Ajouter automatiquement .txt sans vérifier.', correct: false, explanation: 'Renommer ne change pas la nature réelle du fichier.'}
        ]
      }
    ]
  },
  {
    id: 'diff', label: 'diff', summary: 'Comparer deux versions ligne par ligne.', moduleIds: ['02'],
    questions: [
      {
        prompt: 'Quelles affirmations décrivent correctement diff ?',
        options: [
          {text: 'Il compare deux fichiers ligne par ligne.', correct: true, explanation: 'Il met en évidence leurs différences textuelles.'},
          {text: 'diff -u produit un format unifié.', correct: true, explanation: 'Ce format ajoute du contexte autour des changements.'},
          {text: 'Une sortie vide signifie généralement qu’aucune différence n’a été trouvée.', correct: true, explanation: 'Les fichiers comparés sont alors identiques selon diff.'},
          {text: 'Il fusionne automatiquement les deux fichiers.', correct: false, explanation: 'diff décrit les écarts mais ne réalise pas une fusion.'}
        ]
      },
      {
        prompt: 'Quelles lectures d’un diff unifié sont correctes ?',
        options: [
          {text: 'Une ligne commençant par - vient de l’ancienne version.', correct: true, explanation: 'Elle représente une suppression ou l’ancienne valeur.'},
          {text: 'Une ligne commençant par + vient de la nouvelle version.', correct: true, explanation: 'Elle représente un ajout ou la nouvelle valeur.'},
          {text: 'Les lignes de contexte aident à situer le changement.', correct: true, explanation: 'Elles entourent les zones modifiées.'},
          {text: 'Tous les signes + présents dans le contenu sont forcément des ajouts.', correct: false, explanation: 'Il faut distinguer le marqueur de colonne du contenu réel.'}
        ]
      }
    ]
  },
  {
    id: 'pipe', label: '|', summary: 'Relier la sortie d’une commande à l’entrée d’une autre.', moduleIds: ['02', '03'],
    questions: [
      {
        prompt: 'Quelles affirmations sur le pipe | sont correctes ?',
        options: [
          {text: 'Il transmet la sortie standard de gauche à l’entrée standard de droite.', correct: true, explanation: 'C’est le principe d’un pipeline.'},
          {text: 'Il permet de composer plusieurs traitements simples.', correct: true, explanation: 'Chaque commande accomplit une étape.'},
          {text: 'Il évite souvent de créer des fichiers temporaires.', correct: true, explanation: 'Les données circulent directement entre les processus.'},
          {text: 'Il modifie toujours le fichier lu par la première commande.', correct: false, explanation: 'Le pipe transporte une sortie ; il ne modifie pas automatiquement la source.'}
        ]
      },
      {
        prompt: 'Quels exemples forment des pipelines cohérents ?',
        options: [
          {text: 'cat journal | head -n 5', correct: true, explanation: 'head reçoit le contenu produit par cat.'},
          {text: 'sort noms | uniq', correct: true, explanation: 'Le tri rapproche les doublons avant uniq.'},
          {text: 'cut -d: -f2 fichier | sort', correct: true, explanation: 'La colonne extraite est ensuite triée.'},
          {text: 'cd dossier | pwd pour changer le shell courant', correct: false, explanation: 'cd s’exécute dans un processus du pipeline et ne change pas le shell appelant.'}
        ]
      }
    ]
  },
  {
    id: 'cut', label: 'cut', summary: 'Extraire des champs ou des caractères.', moduleIds: ['03'],
    questions: [
      {
        prompt: 'Quelles options servent à extraire des champs avec cut ?',
        options: [
          {text: '-d choisit le séparateur.', correct: true, explanation: 'Par exemple, -d: utilise les deux-points.'},
          {text: '-f choisit un ou plusieurs champs.', correct: true, explanation: 'Par exemple, -f2 extrait le deuxième champ.'},
          {text: '-c peut sélectionner des positions de caractères.', correct: true, explanation: 'Cette sélection ne dépend pas d’un séparateur.'},
          {text: '-n effectue un tri numérique.', correct: false, explanation: '-n appartient notamment à sort ; cut ne trie pas.'}
        ]
      },
      {
        prompt: 'Quelles limites faut-il connaître avec cut ?',
        options: [
          {text: 'Le séparateur doit correspondre au contenu réel.', correct: true, explanation: 'Sinon les champs ne seront pas découpés comme prévu.'},
          {text: 'Des espaces irréguliers peuvent produire des champs vides.', correct: true, explanation: 'Une normalisation préalable peut être nécessaire.'},
          {text: 'cut ne trie pas les valeurs extraites.', correct: true, explanation: 'Il faut passer sa sortie à sort si nécessaire.'},
          {text: 'cut modifie le fichier source après extraction.', correct: false, explanation: 'Il écrit le résultat sur la sortie standard.'}
        ]
      }
    ]
  },
  {
    id: 'sort', label: 'sort', summary: 'Ordonner des lignes avec la bonne clé de comparaison.', moduleIds: ['03'],
    questions: [
      {
        prompt: 'Quelles options changent utilement la manière de trier ?',
        options: [
          {text: '-n effectue une comparaison numérique.', correct: true, explanation: 'Elle évite par exemple de placer 12 avant 9.'},
          {text: '-r inverse l’ordre.', correct: true, explanation: 'Le résultat est présenté dans l’ordre opposé.'},
          {text: '-k permet de choisir une clé.', correct: true, explanation: 'Le tri peut cibler un champ précis.'},
          {text: '-l affiche les permissions.', correct: false, explanation: '-l est notamment une option de ls, pas de sort.'}
        ]
      },
      {
        prompt: 'Quelles affirmations sur sort sont correctes ?',
        options: [
          {text: 'Sans option, 12 peut être placé avant 9.', correct: true, explanation: 'Le tri par défaut compare du texte.'},
          {text: 'sort peut préparer les données pour uniq.', correct: true, explanation: 'Il rapproche les lignes identiques.'},
          {text: 'sort -t: -k2,2n peut trier numériquement le deuxième champ séparé par :.', correct: true, explanation: '-t définit le séparateur et -k la clé.'},
          {text: 'sort réécrit toujours le fichier source.', correct: false, explanation: 'Par défaut, le résultat est envoyé sur la sortie standard.'}
        ]
      }
    ]
  },
  {
    id: 'uniq', label: 'uniq', summary: 'Détecter et compter les répétitions voisines.', moduleIds: ['03'],
    questions: [
      {
        prompt: 'Quelles affirmations sur uniq sont exactes ?',
        options: [
          {text: 'Il compare des lignes voisines.', correct: true, explanation: 'Des doublons éloignés ne sont pas rapprochés automatiquement.'},
          {text: '-d affiche les lignes répétées.', correct: true, explanation: 'Cette option cible les doublons.'},
          {text: '-c préfixe les lignes par leur nombre d’occurrences.', correct: true, explanation: 'Elle permet de produire des fréquences.'},
          {text: 'Il trie automatiquement son entrée.', correct: false, explanation: 'Il faut souvent utiliser sort avant uniq.'}
        ]
      },
      {
        prompt: 'Quels pipelines traitent correctement des doublons éloignés ?',
        options: [
          {text: 'sort fichier | uniq', correct: true, explanation: 'Le tri rend les valeurs identiques voisines.'},
          {text: 'sort fichier | uniq -d', correct: true, explanation: 'Le pipeline affiche alors les valeurs répétées.'},
          {text: 'sort fichier | uniq -c | sort -nr', correct: true, explanation: 'Il produit un classement décroissant des fréquences.'},
          {text: 'uniq fichier | sort garantit la détection initiale de tous les doublons.', correct: false, explanation: 'Le tri arrive trop tard pour la première exécution de uniq.'}
        ]
      }
    ]
  },
  {
    id: 'wc', label: 'wc', summary: 'Compter lignes, mots et octets.', moduleIds: ['03'],
    questions: [
      {
        prompt: 'Quelles associations entre options de wc et mesures sont correctes ?',
        options: [
          {text: '-l compte les lignes.', correct: true, explanation: 'Il compte les caractères de fin de ligne.'},
          {text: '-w compte les mots.', correct: true, explanation: 'Les mots sont séparés selon les règles de wc.'},
          {text: '-c compte les octets.', correct: true, explanation: 'Cette mesure peut différer du nombre de caractères.'},
          {text: '-n effectue un comptage numérique des colonnes.', correct: false, explanation: 'Cette option ne correspond pas à cet usage de wc.'}
        ]
      },
      {
        prompt: 'Quelles commandes peuvent produire un nombre utile à la fin d’un pipeline ?',
        options: [
          {text: 'sort noms | uniq | wc -l', correct: true, explanation: 'Elle compte les noms distincts.'},
          {text: 'cat texte | wc -w', correct: true, explanation: 'Elle compte les mots du flux.'},
          {text: 'cut -d: -f2 fichier | wc -l', correct: true, explanation: 'Elle compte les lignes de la colonne extraite.'},
          {text: 'wc -l fichier modifie le nombre de lignes du fichier.', correct: false, explanation: 'wc mesure sans modifier la source.'}
        ]
      }
    ]
  },
  {
    id: 'tr', label: 'tr', summary: 'Remplacer, supprimer ou compresser des caractères.', moduleIds: ['03'],
    questions: [
      {
        prompt: 'Quels usages correspondent à tr ?',
        options: [
          {text: 'Convertir des minuscules en majuscules.', correct: true, explanation: 'Les classes [:lower:] et [:upper:] conviennent à cet usage.'},
          {text: 'Remplacer un caractère par un autre.', correct: true, explanation: 'tr traduit les caractères du premier ensemble vers le second.'},
          {text: 'Compresser des répétitions avec -s.', correct: true, explanation: 'Cette option réduit une suite répétée à une occurrence.'},
          {text: 'Trier numériquement des lignes.', correct: false, explanation: 'Cette tâche revient à sort -n.'}
        ]
      },
      {
        prompt: 'Quelles normalisations peuvent améliorer un traitement ultérieur ?',
        options: [
          {text: "tr '[:lower:]' '[:upper:]' pour uniformiser la casse.", correct: true, explanation: 'Des variantes de casse deviennent comparables.'},
          {text: "tr -s ' ' pour réduire les suites d’espaces.", correct: true, explanation: 'Le découpage en champs devient plus prévisible.'},
          {text: "tr -d '\\r' pour retirer certains retours chariot.", correct: true, explanation: 'Cela peut normaliser des fichiers provenant de Windows.'},
          {text: 'tr ajoute automatiquement des colonnes manquantes.', correct: false, explanation: 'Il transforme des caractères, pas la structure logique des données.'}
        ]
      }
    ]
  }
];
