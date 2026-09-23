// Premier module CTF. Les réponses sont publiques : la découverte compte plus que le secret.
const module01 = {
  id: '01',
  title: 'Se repérer dans le terminal',
  description: 'Explore une petite arborescence avec pwd, cd, ls et man. Sept flags, aucun script de validation.',
  commands: ['pwd', 'ls', 'ls -a', 'ls -l', 'cd', 'cd ..', 'cd ~', 'man ls'],
  challenges: [
    {
      id: '01', title: 'Le point de départ', command: 'pwd · ls',
      story: 'Tu viens d’entrer dans l’atelier. Avant de bouger, repère le chemin complet du dossier courant avec pwd.',
      question: 'Dans le dossier accueil, quel flag porte le fichier visible qui marque le départ ?',
      hints: ['Depuis atelier-module-01, ls affiche les noms visibles. Tu peux préciser le dossier à observer.', 'Essaie ls accueil. Le flag est dans le nom du fichier, pas dans son contenu.'],
      success: 'pwd indique où tu es ; ls accueil inspecte un autre dossier sans changer ta position.',
      flag: 'FLAG{M01-01-COMMENCER}'
    },
    {
      id: '02', title: 'Ce que ls ne montre pas', command: 'ls -a',
      story: 'Un nom bien visible ressemble à la réponse. La consigne parle pourtant d’un fichier caché.',
      question: 'Dans accueil, quel flag porte le fichier caché ?',
      hints: ['Sous Linux, un nom commençant par un point est caché par défaut.', 'Compare ls accueil et ls -a accueil. Le point initial ne fait pas partie du flag à saisir.'],
      decoy: 'FLAG{M01-02-LEURRE-VISIBLE}',
      decoyFeedback: 'Ce flag est visible avec ls. La question demande celui du fichier caché : essaie ls -a.',
      success: 'ls seul masque les noms qui commencent par un point. -a les révèle : le flag visible était un leurre.',
      flag: 'FLAG{M01-02-DERRIERE-LE-POINT}'
    },
    {
      id: '03', title: 'Fichier ou répertoire ?', command: 'ls -l',
      story: 'Deux noms du dossier tri ressemblent à des flags. Un seul appartient à un répertoire.',
      question: 'Quel flag porte le répertoire, et non le fichier, dans tri ?',
      hints: ['Un affichage simple des noms ne suffit pas à distinguer leur type.', 'Lance ls -l tri. Le premier caractère de chaque ligne vaut d pour un répertoire et - pour un fichier.'],
      decoy: 'FLAG{M01-03-LEURRE-FICHIER}',
      decoyFeedback: 'C’est le flag du fichier. Cherche la ligne qui commence par d dans ls -l tri.',
      success: 'Avec ls -l, le premier caractère révèle le type. Ici, le flag du fichier est le leurre.',
      flag: 'FLAG{M01-03-BON-DOSSIER}'
    },
    {
      id: '04', title: 'Deux niveaux d’un coup', command: 'cd chemin/chemin',
      story: 'Une première piste t’attend dans route/niveau1, mais la bonne destination est un niveau plus bas.',
      question: 'Depuis la racine de l’atelier, rejoins route/niveau1/niveau2 en une commande cd. Quel flag visible s’y trouve ?',
      hints: ['Un chemin relatif part du dossier courant. Le caractère / sépare les dossiers traversés.', 'Essaie cd route/niveau1/niveau2, puis pwd et ls.'],
      decoy: 'FLAG{M01-04-LEURRE-PREMIER}',
      decoyFeedback: 'Tu es encore dans niveau1. Descends dans niveau2 et vérifie avec pwd.',
      success: 'cd peut traverser plusieurs dossiers à la fois. pwd confirme que tu es bien dans niveau2.',
      flag: 'FLAG{M01-04-DEUX-NIVEAUX}'
    },
    {
      id: '05', title: 'Remonter au bon endroit', command: 'cd .. · ls -a',
      story: 'Un fichier caché en bas sert de leurre. Celui que tu cherches se trouve dans le parent de niveau2.',
      question: 'Depuis route/niveau1/niveau2, remonte au dossier parent. Quel flag porte son fichier caché ?',
      hints: ['cd .. revient au dossier parent. Vérifie le nouveau chemin avec pwd.', 'Une fois dans niveau1, lance ls -a. Ne prends pas le flag caché de niveau2.'],
      decoy: 'FLAG{M01-05-LEURRE-EN-BAS}',
      decoyFeedback: 'Ce fichier est caché dans niveau2, pas dans son parent. Remonte avec cd .. (deux points).',
      success: 'Le chemin .. désigne le parent du dossier courant ; ls -a révèle ensuite son fichier caché.',
      flag: 'FLAG{M01-05-REMONTEE}'
    },
    {
      id: '06', title: 'Perdu ? Retour par l’absolu', command: 'pwd · cd ~ · cd /…',
      story: 'Reviens d’abord à la racine de l’atelier, puis quitte-le volontairement pour ton dossier personnel. Tu dois savoir y revenir sans deviner où il a été extrait.',
      question: 'Depuis la racine de l’atelier, note son chemin avec pwd, fais cd ~, puis reviens grâce au chemin absolu noté. Quel flag visible se trouve dans retour ?',
      hints: ['Un chemin absolu commence par /. Note la sortie de pwd quand tu es à la racine de l’atelier.', 'Après cd ~, pwd affiche ton dossier personnel. Utilise cd suivi du chemin absolu noté, puis ls retour.'],
      success: 'cd ~ mène au dossier personnel ; un chemin commençant par / permet de revenir indépendamment du dossier courant.',
      flag: 'FLAG{M01-06-ABSOLU}'
    },
    {
      id: '07', title: 'La bonne combinaison', command: 'man ls · ls -la',
      story: 'Le dossier final contient un flag visible, un fichier caché et un répertoire caché. Un seul correspond exactement à la demande. Si man ls manque sur la VM, utilise ls --help et signale-le au formateur.',
      question: 'Consulte man ls pour retrouver les options nécessaires, puis identifie le flag du répertoire caché dans final.',
      hints: ['Il faut afficher les noms cachés et leur type en même temps. Les options courtes de ls peuvent se combiner.', 'Essaie ls -la final. Cherche une ligne dont le nom commence par un point et dont le premier caractère est d. Quitte man avec q.'],
      decoy: 'FLAG{M01-07-LEURRE-CACHE-FICHIER}',
      decoyFeedback: 'Il est caché, mais c’est un fichier. Avec ls -la, cherche la ligne qui commence par d.',
      success: 'Tu as combiné -a et -l, puis distingué le répertoire caché du fichier caché. C’est le réflexe du module : lire précisément et vérifier.',
      flag: 'FLAG{M01-07-BON-DOSSIER}'
    }
  ]
};
