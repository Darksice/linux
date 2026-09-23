// Premier module CTF. Les réponses sont publiques : la découverte compte plus que le secret.
const module01 = {
  id: '01',
  title: 'Se repérer dans le terminal',
  description: 'Explore une petite arborescence avec pwd, cd, ls et man.',
  commands: ['pwd', 'ls', 'ls -a', 'ls -l', 'cd', 'cd ..', 'cd ~', 'man ls'],
  challenges: [
    {
      id: '01', title: 'Le point de départ', command: 'pwd · ls',
      story: 'Tu viens d’entrer dans le premier module. Avant de bouger, repère le chemin complet du répertoire courant avec pwd.',
      question: 'Dans le répertoire accueil, quel flag porte le fichier visible ?',
      hints: ['ls affiche les noms visibles. Tu peux préciser le répertoire à observer.', 'Utilise ls accueil. Le flag est dans le nom du fichier, pas dans son contenu.'],
      success: 'pwd indique où tu es, ls accueil inspecte le répertoire sans changer ta position.',
      flag: 'FLAG{PIKACHU}'
    },
    {
      id: '02', title: 'Ce que ls ne montre pas', command: 'ls',
      story: 'Un nom bien visible ressemble à la réponse. La consigne parle pourtant d’un fichier caché.',
      question: 'Dans ce même répertoire accueil, quel flag porte le fichier caché ?',
      hints: ['Sous Linux, un nom commençant par un point est caché par défaut.', 'Compare ls accueil et ls -a accueil. Le point initial ne fait pas partie du flag à saisir.'],
      decoy: 'FLAG{PIKACHU}',
      decoyFeedback: 'Ce flag est visible avec ls. La question demande celui du fichier caché : essaie ls -a.',
      success: 'ls seul masque les noms qui commencent par un point. -a les révèle.',
      flag: 'FLAG{EVOLI}'
    },
    {
      id: '03', title: 'Fichier ou répertoire ?', command: 'ls',
      story: 'Deux noms du répertoire tri ressemblent à des flags. Un seul appartient à un répertoire.',
      question: 'Quel flag porte le répertoire, et non le fichier, dans tri ?',
      hints: ['Un affichage simple des noms ne suffit pas à distinguer leur type.', 'Lance ls -l tri. Le premier caractère de chaque ligne vaut d pour un répertoire et - pour un fichier.'],
      decoy: 'FLAG{PSYKOKWAK}',
      decoyFeedback: 'C’est le flag du fichier. Cherche la ligne qui commence par d dans ls -l tri.',
      success: 'Avec ls -l, le premier caractère révèle le type.',
      flag: 'FLAG{CARAPUCE}'
    },
    {
      id: '04', title: 'Deux niveaux d’un coup', command: 'cd · pwd · ls',
      story: 'Une première piste t’attend dans route/niveau1, mais la bonne destination est un niveau plus bas.',
      question: 'Depuis la racine de l’atelier, rejoins route/niveau1/niveau2 en une commande cd. Quel flag visible s’y trouve ?',
      hints: ['Un chemin relatif part du répertoire courant. Le caractère / sépare les répertoires traversés.', 'Essaie cd route/niveau1/niveau2, puis pwd (pour vérifier) et ls.'],
      decoy: 'FLAG{RATTATA}',
      decoyFeedback: 'Tu es encore dans niveau1. Descends dans niveau2 et vérifie avec pwd.',
      success: 'cd peut traverser plusieurs répertoires à la fois. pwd confirme que tu es bien dans niveau2.',
      flag: 'FLAG{PORYGON}'
    },
    {
      id: '05', title: 'Remonter au bon endroit', command: 'cd · pwd · ls',
      story: 'Un fichier caché en bas sert de leurre. Celui que tu cherches se trouve dans le parent de niveau2.',
      question: 'Depuis route/niveau1/niveau2, remonte au répertoire parent. Quel flag porte son fichier caché ?',
      hints: ['cd .. revient au répertoire parent. Vérifie le nouveau chemin avec pwd.', 'Une fois dans niveau1, lance ls -a.'],
      decoy: 'FLAG{LIMAGMA}',
      decoyFeedback: 'Ce fichier est caché dans niveau2, pas dans son parent. Remonte avec cd .. (deux points).',
      success: 'Le chemin .. désigne le parent du répertoire courant, ls -a révèle ensuite son fichier caché.',
      flag: 'FLAG{LAPOREILLE}'
    },
    {
      id: '06', title: 'Perdu ? Retour par l’absolu', command: 'pwd · cd · ls',
      story: 'Reviens d’abord à la racine de l’atelier, puis quitte-le volontairement pour ton répertoire personnel. Tu dois savoir y revenir sans deviner où il a été extrait.',
      question: 'Depuis la racine de l’atelier, note son chemin avec pwd, fais cd ~, puis reviens grâce au chemin absolu noté. Quel flag visible se trouve dans retour ?',
      hints: ['Un chemin absolu commence par /. Note la sortie de pwd quand tu es à la racine de l’atelier.', 'Après cd ~, pwd affiche ton répertoire personnel. Utilise cd suivi du chemin absolu noté précédemment.'],
      success: 'cd ~ mène au répertoire personnel, un chemin commençant par / permet de revenir indépendamment du répertoire courant.',
      flag: 'FLAG{MIAOUSS}'
    },
    {
      id: '07', title: 'La bonne combinaison', command: 'man · ls',
      story: 'Le répertoire final contient un fichier visible, un fichier caché et un répertoire caché. Un seul correspond exactement à la demande. Si man ls manque sur la VM, utilise ls --help et signale-le au formateur.',
      question: 'Retrouve la bonne combinaison d\'options nécessaires pour identifier le flag du répertoire caché dans final. Consulte man ls en cas de problème.',
      hints: ['Il faut afficher les noms cachés et leur type en même temps. Les options courtes de ls peuvent se combiner.', 'ls -la final. Cherche une ligne dont le nom commence par un point et dont le premier caractère est d.'],
      decoy: 'FLAG{DARDARGNAN}',
      decoyFeedback: 'Il est caché, mais c’est un fichier. Avec ls -la, cherche la ligne qui commence par d.',
      success: 'Tu as combiné -a et -l, puis distingué le répertoire caché du fichier caché.',
      flag: 'FLAG{PACHIRISU}'
    }
  ]
};
