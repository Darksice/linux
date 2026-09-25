const lessons = courseLessons;
const ctfModules = [module01, module02, module03];
const quizzes = commandQuizzes;
const blocks = learningBlocks;
const ctfArchiveUrl = mod => `https://raw.githubusercontent.com/Darksice/linux/main/${mod.archive}`;

const stateKey = 'linux-pour-de-vrai-v1';
let saved;
try { saved = JSON.parse(localStorage.getItem(stateKey) || '{}'); } catch { saved = {}; }
const state = {
  ctfDone: saved.ctfDone && typeof saved.ctfDone === 'object' ? saved.ctfDone : {},
  quizDone: saved.quizDone && typeof saved.quizDone === 'object' ? saved.quizDone : {},
  sidebarHidden: saved.sidebarHidden === true,
  blockOpen: saved.blockOpen === true
};
const ctfActive = {};
const ctfHints = {};
const quizActive = {};
const quizFeedback = {};
let ctfFeedback = '';
let ctfResetPending = false;

function persist(){try{localStorage.setItem(stateKey,JSON.stringify(state));}catch{}}
function ctfCompleted(mod){return Array.isArray(state.ctfDone[mod.id]) ? state.ctfDone[mod.id] : []}
function quizCompleted(quiz){return Array.isArray(state.quizDone[quiz.id]) ? state.quizDone[quiz.id] : []}
function quizCurrent(quiz){
  if(quizActive[quiz.id]===undefined)quizActive[quiz.id]=Math.max(0,quiz.questions.findIndex((_,index)=>!quizCompleted(quiz).includes(index)));
  return quiz.questions[quizActive[quiz.id]] || quiz.questions[0];
}
function quizTotalDone(){return quizzes.reduce((total,quiz)=>total+quizCompleted(quiz).length,0)}
function quizTotalQuestions(){return quizzes.reduce((total,quiz)=>total+quiz.questions.length,0)}
function validateQuizAnswers(question,selected){
  const answers=[...selected].map(Number).sort((a,b)=>a-b);
  const expected=question.options.map((option,index)=>option.correct?index:-1).filter(index=>index>=0);
  return answers.length===expected.length&&answers.every((value,index)=>value===expected[index]);
}
function lessonForCommand(id){return lessons.find(lesson=>lesson.id===id)}
function modulesForCommand(id){return ctfModules.filter(mod=>quizzes.find(quiz=>quiz.id===id)?.moduleIds.includes(mod.id))}
function lessonIsInBlock(id){return blocks.some(block=>block.sequences.some(sequence=>sequence.commandIds.includes(id)))}
function renderLessonContent(lesson){
  if(!lessonIsInBlock(lesson.id))return lesson.html;
  return lesson.html.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g,(_,code)=>{
    const lines=code.split('\n');
    const showsOutput=lines.some(line=>line.startsWith('$ '));
    const content=lines.map(line=>{
      if(!line)return '';
      if(!showsOutput)return `<span class="prompt">$</span> ${line}`;
      if(line.startsWith('$ '))return `<span class="prompt">$</span> ${line.slice(2)}`;
      return `<span class="terminal-output">${line}</span>`;
    }).join('\n');
    return terminal(content);
  });
}
function commandLinks(id){
  const lesson=lessonForCommand(id);
  const quiz=quizzes.find(item=>item.id===id);
  if(!quiz)return '';
  return `<div class="learning-command"><div><code>${escapeHtml(quiz.label)}</code><span>${escapeHtml(quiz.summary)}</span></div><div class="learning-command-actions">${lesson?`<button class="ghost" data-route="fiche-${escapeHtml(lesson.id)}">Cours</button>`:'<span class="content-pending">Cours à venir</span>'}<button class="secondary" data-route="qcm-${escapeHtml(quiz.id)}">QCM ${quizCompleted(quiz).length}/${quiz.questions.length}</button></div></div>`;
}
function validateCtfFlag(mod, challenge, input){
  const value=input.trim().toUpperCase();
  if(value!==challenge.flag.toUpperCase())return {valid:false,message:value===challenge.decoy?.toUpperCase()?challenge.decoyFeedback:'Mauvais flag. Vérifie la question, si besoin regarde l\'indice !'};
  if(!Array.isArray(state.ctfDone[mod.id]))state.ctfDone[mod.id]=[];
  if(!state.ctfDone[mod.id].includes(challenge.id))state.ctfDone[mod.id].push(challenge.id);
  persist();
  return {valid:true,message:challenge.success};
}
function resetCtfModule(mod){
  delete state.ctfDone[mod.id];
  for(const key of Object.keys(ctfHints))if(key.startsWith(`${mod.id}-`))delete ctfHints[key];
  ctfActive[mod.id]=0;
  ctfFeedback='';
  ctfResetPending=false;
  persist();
}
function applySidebarState(){
  document.body.classList.toggle('sidebar-hidden',state.sidebarHidden);
  const button=document.getElementById('sidebar-toggle');
  button.setAttribute('aria-expanded',String(!state.sidebarHidden));
  button.setAttribute('aria-label',state.sidebarHidden?'Afficher le menu':'Masquer le menu');
}
function ctfCurrent(mod){
  if(ctfActive[mod.id] === undefined) ctfActive[mod.id] = Math.max(0, mod.challenges.findIndex(c => !ctfCompleted(mod).includes(c.id)));
  return mod.challenges[ctfActive[mod.id]] || mod.challenges[0];
}
function getRoute(){const h=decodeURIComponent(location.hash.slice(1));return h || 'accueil'}
function routeTo(route){location.hash = route; if(getRoute()===route) render()}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function terminal(lines){return `<div class="terminal"><div class="terminal-bar"><span class="terminal-dot"></span><span class="terminal-dot"></span><span class="terminal-dot"></span><span class="terminal-title">terminal · machine Linux</span></div><pre>${lines}</pre></div>`}
function renderNav(){
  const route=getRoute();
  document.getElementById('module-nav').innerHTML=`<div class="block-nav-row ${route==='bloc-01'?'active':''}"><button class="block-nav-main" data-route="bloc-01" aria-current="${route==='bloc-01'?'page':'false'}"><span class="module-nav-id">01</span><span class="module-nav-text">Les bases</span></button><button class="block-nav-toggle" data-action="toggle-block" aria-expanded="${state.blockOpen}" aria-controls="block-01-modules" aria-label="${state.blockOpen?'Replier':'Déplier'} les modules du Bloc 01"><span aria-hidden="true">⌄</span></button></div><div id="block-01-modules" class="module-nav-children ${state.blockOpen?'open':''}" ${state.blockOpen?'':'hidden'}>${ctfModules.map(mod=>`<button class="module-nav-item ${route==='module-'+mod.id?'active':''}" data-route="module-${mod.id}" aria-current="${route==='module-'+mod.id?'page':'false'}"><span class="module-nav-id">${escapeHtml(mod.id)}</span><span class="module-nav-text">${escapeHtml(mod.title)}</span><span class="module-nav-count">${ctfCompleted(mod).length}/${mod.challenges.length}</span></button>`).join('')}</div>`;
}

function renderHome(){
  const block=blocks[0];
  return `<section class="hero"><div><p class="eyebrow">COMPRENDRE · VÉRIFIER · PRATIQUER</p><h1>Le terminal,<br><em>ça s’apprend.</em></h1><p class="lead">Avance dans un parcours guidé qui relie les fiches de cours, les QCM et les modules pratiques sur ta machine Linux.</p></div><div class="hero-card"><h2>Commencer par les bases</h2><p>Le premier bloc te guide de la navigation dans le terminal jusqu’au traitement de données.</p><button class="primary" data-route="bloc-01">Découvrir le Bloc 01 →</button></div></section>
  <section class="learning-overview"><div><p class="eyebrow">BLOC 01</p><h2>${escapeHtml(block.title)}</h2><p>${escapeHtml(block.description)}</p></div><div class="learning-overview-stats"><span><strong>${ctfModules.length}</strong> modules</span><span><strong>${quizzes.length}</strong> QCM</span><span><strong>${quizTotalDone()}/${quizTotalQuestions()}</strong> questions réussies</span></div><button class="secondary" data-route="bloc-01">Voir le parcours →</button></section>
  <section class="ctf-howto"><div><p class="eyebrow">DEUX FAÇONS D’APPRENDRE</p><h2>Suis le parcours ou pioche ce qu’il te faut.</h2></div><ol><li>Le <strong>bloc guidé</strong> conseille un ordre entre cours, QCM et pratique.</li><li>Les catalogues <strong>Cours</strong> et <strong>QCM</strong> restent accessibles directement.</li><li>Ta progression dans les QCM et les modules reste enregistrée dans ce navigateur.</li></ol></section>
  <div class="library-shortcuts"><button class="library-card" data-view="cours"><span>COURS</span><strong>${lessons.length} fiches express</strong><small>Retrouver directement une commande →</small></button><button class="library-card" data-view="revision"><span>RÉVISIONS</span><strong>${quizTotalQuestions()} questions</strong><small>Choisir librement un QCM →</small></button></div>`;
}

function renderBlock(block){
  if(!block)return renderHome();
  const flagsDone=ctfModules.reduce((total,mod)=>total+ctfCompleted(mod).length,0);
  const flagsTotal=ctfModules.reduce((total,mod)=>total+mod.challenges.length,0);
  return `<div class="breadcrumbs"><button data-route="accueil">Accueil</button><span>›</span><span>Bloc ${escapeHtml(block.id)}</span></div><p class="eyebrow">PARCOURS GUIDÉ · BLOC ${escapeHtml(block.id)}</p><h1 class="page-title">${escapeHtml(block.title)}</h1><p class="page-intro">${escapeHtml(block.description)} L’ordre proposé est conseillé, mais aucune étape n’est verrouillée.</p>
  <div class="block-progress"><div><span>QCM réussis</span><strong>${quizTotalDone()} / ${quizTotalQuestions()}</strong></div><div><span>Flags trouvés</span><strong>${flagsDone} / ${flagsTotal}</strong></div></div>
  <div class="learning-path">${block.sequences.map((sequence,index)=>{const mod=ctfModules.find(item=>item.id===sequence.moduleId);return `<section class="learning-sequence"><div class="learning-sequence-head"><div><p class="eyebrow">ÉTAPE ${String(index+1).padStart(2,'0')}</p><h2>Préparer le Module ${escapeHtml(mod.id)}</h2><p>${escapeHtml(mod.description)}</p></div><span>${ctfCompleted(mod).length}/${mod.challenges.length} flags</span></div><div class="learning-command-list">${sequence.commandIds.map(commandLinks).join('')}</div><div class="learning-module-callout"><div><strong>Passer à la pratique</strong><span>${escapeHtml(mod.title)} · ${mod.challenges.length} défis CTF</span></div><button class="primary" data-route="module-${escapeHtml(mod.id)}">${ctfCompleted(mod).length?'Reprendre':'Commencer'} le Module ${escapeHtml(mod.id)} →</button></div></section>`}).join('')}</div>
  <section class="box-coming"><div><p class="eyebrow">APRÈS LE BLOC</p><h2>Box finale</h2><p>Une mise en situation plus libre réunira les compétences des trois modules. Sa conception commencera après leur validation complète.</p></div><button class="ghost" data-route="box-01">Voir la page d’attente →</button></section>`;
}

function renderCtfModule(mod){
  const done=ctfCompleted(mod);
  const current=ctfCurrent(mod);
  const index=mod.challenges.findIndex(c=>c.id===current.id);
  const key=`${mod.id}-${current.id}`;
  const hintsShown=ctfHints[key] || 0;
  const solved=done.includes(current.id);
  const percent=Math.round(done.length/mod.challenges.length*100);
  const sequence=blocks.flatMap(block=>block.sequences).find(item=>item.moduleId===mod.id);
  return `<div class="breadcrumbs"><button data-route="accueil">Accueil</button><span>›</span><button data-route="bloc-01">Bloc 01</button><span>›</span><span>Module ${mod.id}</span></div>
  <p class="eyebrow">MODULE ${escapeHtml(mod.id)} · EXPLORATION CTF</p><h1 class="page-title">${escapeHtml(mod.title)}</h1><p class="page-intro">${escapeHtml(mod.description)} ${escapeHtml(mod.intro)}</p>
  <details class="module-resources"><summary>Revoir les cours et QCM de ce module</summary><div class="learning-command-list">${sequence.commandIds.map(commandLinks).join('')}</div></details>
  <section class="ctf-setup"><div><div class="ctf-setup-top"><span>TON TERRAIN DE JEU</span><span>${done.length} / ${mod.challenges.length} flags</span></div><div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div><p>Sur ta machine Linux, télécharge l’archive de ce module depuis GitHub. Extrais-la puis ouvre <code>${escapeHtml(mod.folder)}</code>. Lis bien chaque question avant de répondre.</p><a class="secondary download-link" href="${ctfArchiveUrl(mod)}">Télécharger l’archive du Module ${escapeHtml(mod.id)} ↓</a></div>${terminal(`<span class="prompt">$</span> tar -xzf ${escapeHtml(mod.archive)}\n<span class="prompt">$</span> cd ${escapeHtml(mod.folder)}`)}</section>
  <div class="ctf-reset"><button class="ghost" data-action="ctf-reset-request">↻ Recommencer le module</button>${ctfResetPending?`<div class="ctf-reset-confirm" role="group" aria-label="Confirmer la remise à zéro"><p>Effacer les flags validés et les indices affichés du Module ${escapeHtml(mod.id)} ? L’archive sur ta machine Linux ne sera pas modifiée.</p><button class="secondary" data-action="ctf-reset-confirm">Oui, recommencer</button><button class="ghost" data-action="ctf-reset-cancel">Annuler</button></div>`:''}</div>
  ${done.length===mod.challenges.length?'<div class="ctf-complete" role="status">✓ Module terminé ! Tu peux rejouer chaque défi et expliquer comment tu as écarté les leurres.</div>':''}
  <div class="ctf-layout"><nav class="ctf-map" aria-label="Défis du module"><div class="ctf-map-title">LES DÉFIS <span>${done.length}/${mod.challenges.length}</span></div>${mod.challenges.map((challenge,i)=>`<button class="ctf-map-item ${i===index?'active':''} ${done.includes(challenge.id)?'done':''}" data-ctf-step="${i}" aria-current="${i===index?'step':'false'}"><span class="ctf-map-number">${String(i+1).padStart(2,'0')}</span><span>${escapeHtml(challenge.title)}</span><span class="ctf-map-check">${done.includes(challenge.id)?'✓':'→'}</span></button>`).join('')}</nav>
  <section class="panel ctf-challenge"><div class="ctf-challenge-meta"><span>DÉFI ${String(index+1).padStart(2,'0')} / ${mod.challenges.length}</span><span>${escapeHtml(current.command)}</span></div><h2>${escapeHtml(current.title)}</h2><p class="ctf-story">${escapeHtml(current.story)}</p><div class="ctf-question"><span>TA MISSION</span><p>${escapeHtml(current.question)}</p></div>
  ${solved?`<div class="ctf-solved"><strong>✓ Flag trouvé</strong><p>${escapeHtml(current.success)}</p></div>`:`<form id="ctf-form" class="ctf-form"><label for="ctf-flag">Flag découvert sur la machine Linux</label><div><input id="ctf-flag" name="flag" placeholder="FLAG{...}" autocomplete="off" autocapitalize="off" spellcheck="false" required><button class="primary" type="submit">Valider le flag →</button></div><p class="feedback ${ctfFeedback?'error':''}" role="status">${escapeHtml(ctfFeedback)}</p></form>`}
  <div class="ctf-hints"><button class="ghost" data-action="ctf-hint" ${hintsShown>=current.hints.length?'disabled':''}>${hintsShown>=current.hints.length?'Tous les indices affichés':'Voir un indice'}</button>${current.hints.slice(0,hintsShown).map((hint,i)=>`<div class="hint-box"><div class="hint-label">INDICE ${i+1}</div>${escapeHtml(hint)}</div>`).join('')}</div>
  <div class="next-row"><button class="ghost" data-ctf-step="${Math.max(0,index-1)}" ${index===0?'disabled':''}>← Défi précédent</button><button class="secondary" data-ctf-step="${Math.min(mod.challenges.length-1,index+1)}" ${index===mod.challenges.length-1?'disabled':''}>Défi suivant →</button></div></section></div>`;
}

function renderGuide(){return `<div class="breadcrumbs"><button data-route="accueil">Accueil</button><span>›</span><span>Guide de survie</span></div><p class="eyebrow">À GARDER SOUS LA MAIN</p><h1 class="page-title">Guide de survie</h1><p class="page-intro">Une antisèche pour t’aider pendant les modules et au travail. L’objectif est de savoir retrouver une commande et de vérifier son effet, pas de tout apprendre par cœur.</p>
  <div class="guide-grid"><section class="panel"><h2>Se déplacer</h2><dl><dt>pwd</dt><dd>Affiche le dossier courant.</dd><dt>ls</dt><dd>Affiche les fichiers et dossiers visibles.</dd><dt>cd dossier</dt><dd>Entre dans un dossier.</dd><dt>cd dossier/dossier2</dt><dd>Entre directement dans un sous-dossier.</dd><dt>cd ..</dt><dd>Revient dans le répertoire parent.</dd><dt>cd ~</dt><dd>Retourne dans le dossier personnel.</dd></dl></section>
  <section class="panel"><h2>Fichiers et dossiers</h2><dl><dt>mkdir d</dt><dd>Crée un dossier.</dd><dt>touch f</dt><dd>Crée un fichier vide.</dd><dt>cp a b</dt><dd>Copie a vers b.</dd><dt>mv a b</dt><dd>Déplace ou renomme a en b.</dd><dt>rm f</dt><dd>Supprime un fichier. Vérifie la cible avant.</dd></dl></section>
  <section class="panel"><h2>Texte et flux</h2><dl><dt>cat f</dt><dd>Affiche le contenu d’un fichier.</dd><dt>less f</dt><dd>Parcourt un fichier ; touche q pour quitter.</dd><dt>grep mot f</dt><dd>Affiche les lignes du fichier f contenant mot.</dd><dt>cmd &gt; f</dt><dd>Écrit la sortie dans f en remplaçant son contenu.</dd><dt>cmd &gt;&gt; f</dt><dd>Ajoute la sortie à la fin de f.</dd><dt>a | b</dt><dd>Envoie la sortie de a à l’entrée de b.</dd></dl></section>
  <section class="panel"><h2>Découper et compter</h2><dl><dt>cut</dt><dd>Extrait des colonnes.</dd><dt>sort</dt><dd>Trie les lignes.</dd><dt>uniq</dt><dd>Retire les lignes identiques voisines.</dd><dt>wc -l</dt><dd>Compte les lignes.</dd><dt>find</dt><dd>Recherche dans les dossiers.</dd></dl></section>
  <section class="panel"><h2>Système</h2><dl><dt>ls -la</dt><dd>Affiche aussi les noms commençant par « . », cachés par défaut.</dd><dt>ls -l</dt><dd>Montre les droits d’accès.</dd><dt>chmod u+x</dt><dd>Ajoute l’exécution au propriétaire.</dd><dt>tar -czf</dt><dd>Crée une archive compressée.</dd><dt>tar -tzf</dt><dd>Liste le contenu de l’archive.</dd><dt>tar -xzf</dt><dd>Extrait une archive gzip.</dd><dt>Ctrl-C</dt><dd>Interrompt un programme au premier plan.</dd><dt>Ctrl-Z</dt><dd>Suspend le programme au premier plan.</dd><dt>bg</dt><dd>Reprend un job suspendu en arrière-plan.</dd><dt>fg</dt><dd>Ramène un job au premier plan.</dd></dl></section>
  <section class="panel"><h2>Rechercher de l’aide</h2><dl><dt>man ls</dt><dd>Ouvre le manuel de ls ; q pour quitter.</dd><dt>commande --help</dt><dd>Affiche souvent une aide courte.</dd><dt>Tab</dt><dd>Complète un nom de fichier ou de commande.</dd><dt>↑ / ↓</dt><dd>Parcourt les commandes déjà saisies.</dd><dt>Ctrl-R</dt><dd>Recherche dans l’historique du shell.</dd></dl></section>
  <section class="panel"><h2>Stockage et intégrité</h2><dl><dt>du -sh d</dt><dd>Taille occupée par un dossier.</dd><dt>df -h</dt><dd>Place libre des systèmes de fichiers.</dd><dt>sha256sum</dt><dd>Calcule une empreinte de fichier.</dd><dt>stat</dt><dd>Affiche métadonnées et droits précis.</dd></dl></section>
  <section class="panel"><h2>Diagnostic</h2><dl><dt>tail -n 20</dt><dd>Dernières lignes d’un fichier.</dd><dt>grep -n -C 2</dt><dd>Résultats avec numéros et contexte.</dd><dt>sed</dt><dd>Transforme du texte.</dd><dt>awk</dt><dd>Traite colonnes et regroupements.</dd><dt>ps / kill</dt><dd>Observe un processus et lui envoie un signal.</dd></dl></section>
  <section class="panel"><h2>Administration système</h2><dl><dt>rpm -q</dt><dd>Interroge les paquets installés.</dd><dt>dnf repolist</dt><dd>Affiche les dépôts configurés.</dd><dt>systemctl</dt><dd>Observe les unités et services.</dd><dt>journalctl</dt><dd>Consulte le journal système.</dd><dt>ip / ss</dt><dd>Inspecte interfaces et sockets.</dd><dt>getenforce</dt><dd>Affiche le mode SELinux.</dd></dl></section></div>
  <div class="alert" style="margin-top:22px">Attention : <code>rm</code> et <code>></code> peuvent supprimer un résultat existant. Avant d’appuyer sur Entrée, vérifie le dossier courant, les chemins et les jokers.</div><p style="margin-top:20px"><button class="secondary" data-view="cours">Ouvrir les fiches de cours →</button></p>`}

function renderCourseList(query=''){
  const search=query.trim().toLocaleLowerCase('fr');
  const found=lessons.filter(l=>`${l.label} ${l.group} ${l.summary}`.toLocaleLowerCase('fr').includes(search));
  if(!found.length)return '<p class="course-empty">Aucune fiche trouvée. Essaie un nom de commande ou un sujet plus court.</p>';
  return [...new Set(found.map(l=>l.group))].map(group=>`<section class="course-group"><h2>${group}</h2><div class="course-grid">${found.filter(l=>l.group===group).map(l=>`<button class="course-card" data-route="fiche-${l.id}"><span class="course-command">${escapeHtml(l.label)}</span><span>${escapeHtml(l.summary)}</span><span class="course-arrow">Lire la fiche →</span></button>`).join('')}</div></section>`).join('');
}

function renderCourse(){return `<div class="breadcrumbs"><button data-route="accueil">Accueil</button><span>›</span><span>Cours express</span></div><p class="eyebrow">UNE COMMANDE À LA FOIS</p><h1 class="page-title">Cours express</h1><p class="page-intro">${lessons.length} fiches pour comprendre les commandes utiles, leurs options et leurs pièges. Les exemples sont illustratifs : adapte leurs chemins aux archives des modules ou à tes propres fichiers de test. Le manuel <code>man</code> reste la référence complète.</p><label class="course-search-label" for="course-search">Rechercher une commande ou un thème</label><input id="course-search" class="course-search" type="search" placeholder="Ex. chmod, journaux, dossiers…" autocomplete="off"><div id="course-list">${renderCourseList()}</div>`}

function renderLesson(id){
  const l=lessons.find(item=>item.id===id);
  if(!l)return renderCourse();
  const quiz=quizzes.find(item=>item.id===id);
  const related=modulesForCommand(id);
  return `<div class="breadcrumbs"><button data-route="accueil">Accueil</button><span>›</span><button data-view="cours">Cours express</button><span>›</span><span>${escapeHtml(l.label)}</span></div><p class="eyebrow">FICHE DE COURS · ${escapeHtml(l.group).toUpperCase()}</p><h1 class="page-title">${escapeHtml(l.label)}</h1><p class="page-intro">${escapeHtml(l.summary)}</p><article class="panel lesson-article">${renderLessonContent(l)}</article>${quiz?`<section class="lesson-next"><div><p class="eyebrow">ÉTAPE SUIVANTE</p><h2>Vérifier que tu as compris ${escapeHtml(l.label)}</h2><p>${quiz.questions.length} questions avec plusieurs réponses possibles et une explication après validation.</p></div><button class="primary" data-route="qcm-${escapeHtml(quiz.id)}">Faire le QCM →</button></section>`:''}${related.length?`<div class="lesson-practice"><span>Cette commande est mise en pratique dans :</span>${related.map(mod=>`<button class="ghost" data-route="module-${escapeHtml(mod.id)}">Module ${escapeHtml(mod.id)}</button>`).join('')}</div>`:''}<div class="next-row"><button class="ghost" data-view="cours">← Toutes les fiches</button></div>`;
}

function renderQuiz(){
  return `<div class="breadcrumbs"><button data-route="accueil">Accueil</button><span>›</span><span>QCM et révisions</span></div><p class="eyebrow">CATALOGUE LIBRE</p><h1 class="page-title">QCM et révisions</h1><p class="page-intro">Choisis directement une commande ou suis l’ordre conseillé du Bloc 01. Chaque question peut avoir plusieurs bonnes réponses.</p><div class="progress-summary"><div><small>PROGRESSION GLOBALE</small><strong>${quizTotalDone()} / ${quizTotalQuestions()} questions réussies</strong></div><button class="secondary" data-route="bloc-01">Voir le parcours guidé →</button></div><div class="quiz-catalog">${quizzes.map(quiz=>`<button class="quiz-catalog-card" data-route="qcm-${escapeHtml(quiz.id)}"><span class="quiz-catalog-command">${escapeHtml(quiz.label)}</span><span>${escapeHtml(quiz.summary)}</span><span class="quiz-catalog-meta">${quizCompleted(quiz).length}/${quiz.questions.length} réussies · Module${quiz.moduleIds.length>1?'s':''} ${quiz.moduleIds.join(', ')}</span></button>`).join('')}</div>`;
}

function renderCommandQuiz(id){
  const quiz=quizzes.find(item=>item.id===id);
  if(!quiz)return renderQuiz();
  const question=quizCurrent(quiz);
  const index=quiz.questions.indexOf(question);
  const completed=quizCompleted(quiz);
  const solved=completed.includes(index);
  const feedback=quizFeedback[quiz.id];
  const selected=feedback?.selected || [];
  return `<div class="breadcrumbs"><button data-route="accueil">Accueil</button><span>›</span><button data-view="revision">QCM</button><span>›</span><span>${escapeHtml(quiz.label)}</span></div><p class="eyebrow">QCM · UNE OU PLUSIEURS BONNES RÉPONSES</p><h1 class="page-title">Réviser <code>${escapeHtml(quiz.label)}</code></h1><p class="page-intro">${escapeHtml(quiz.summary)}</p>
  <div class="quiz-layout"><nav class="quiz-map" aria-label="Questions du QCM">${quiz.questions.map((_,questionIndex)=>`<button class="${questionIndex===index?'active':''} ${completed.includes(questionIndex)?'done':''}" data-quiz-step="${questionIndex}" aria-current="${questionIndex===index?'step':'false'}"><span>${String(questionIndex+1).padStart(2,'0')}</span><strong>Question ${questionIndex+1}</strong><i>${completed.includes(questionIndex)?'✓':'→'}</i></button>`).join('')}</nav>
  <section class="panel quiz-question"><div class="quiz-meta"><span>QUESTION ${index+1} / ${quiz.questions.length}</span><span>${completed.length} réussie${completed.length>1?'s':''}</span></div><h2>${escapeHtml(question.prompt)}</h2><p class="quiz-instruction">Coche toutes les réponses qui te semblent justes.</p><form id="quiz-form"><div class="quiz-options">${question.options.map((option,optionIndex)=>{const chosen=selected.includes(optionIndex);const resultClass=feedback?(option.correct?'correct':chosen?'incorrect':''):'';return `<label class="quiz-option ${chosen?'selected':''} ${resultClass}"><input type="checkbox" name="answer" value="${optionIndex}" ${chosen?'checked':''} ${solved?'disabled':''}><span>${escapeHtml(option.text)}</span></label>`}).join('')}</div>${solved?'<div class="quiz-success" role="status">✓ Question réussie.</div>':`<button class="primary" type="submit">Valider mes réponses →</button>`}</form>
  ${feedback?`<div class="quiz-explanations ${feedback.valid?'valid':'invalid'}" role="status"><strong>${feedback.valid?'Bonne réponse.':'Pas encore. Compare tes choix avec les explications :'}</strong>${question.options.map(option=>`<p><span>${option.correct?'✓':'×'}</span><b>${escapeHtml(option.text)}</b> — ${escapeHtml(option.explanation)}</p>`).join('')}</div>`:''}
  <div class="next-row"><button class="ghost" data-quiz-step="${Math.max(0,index-1)}" ${index===0?'disabled':''}>← Question précédente</button><button class="secondary" data-quiz-step="${Math.min(quiz.questions.length-1,index+1)}" ${index===quiz.questions.length-1?'disabled':''}>Question suivante →</button></div></section></div>
  <div class="quiz-footer-actions"><button class="ghost" data-action="quiz-reset">↻ Recommencer ce QCM</button>${lessonForCommand(quiz.id)?`<button class="ghost" data-route="fiche-${escapeHtml(quiz.id)}">Relire le cours</button>`:''}${quiz.moduleIds.map(moduleId=>`<button class="ghost" data-route="module-${escapeHtml(moduleId)}">Ouvrir le Module ${escapeHtml(moduleId)}</button>`).join('')}</div>`;
}

function renderBox(){return `<div class="breadcrumbs"><button data-route="accueil">Accueil</button><span>›</span><button data-route="bloc-01">Bloc 01</button><span>›</span><span>Box finale</span></div><p class="eyebrow">SYNTHÈSE DU BLOC 01</p><h1 class="page-title">Box finale</h1><div class="empty-state"><h2>Cette épreuve arrivera plus tard.</h2><p>Elle réunira les notions des Modules 01 à 03 dans une situation plus libre et moins guidée. Nous la concevrons après avoir validé les cours, les QCM et les trois modules du premier bloc.</p><button class="secondary" data-route="bloc-01">Retour au Bloc 01 →</button></div>`}

function render(){
  const route=getRoute();renderNav();applySidebarState();
  const view=document.getElementById('view');
  if(route==='accueil')view.innerHTML=renderHome();
  else if(route.startsWith('bloc-'))view.innerHTML=renderBlock(blocks.find(block=>route==='bloc-'+block.id));
  else if(route.startsWith('module-')){const mod=ctfModules.find(m=>route==='module-'+m.id);view.innerHTML=mod?renderCtfModule(mod):renderHome()}
  else if(route==='guide')view.innerHTML=renderGuide();
  else if(route==='cours')view.innerHTML=renderCourse();
  else if(route.startsWith('fiche-'))view.innerHTML=renderLesson(route.slice(6));
  else if(route==='revision')view.innerHTML=renderQuiz();
  else if(route.startsWith('qcm-'))view.innerHTML=renderCommandQuiz(route.slice(4));
  else if(route==='box-01')view.innerHTML=renderBox();
  else view.innerHTML=renderHome();
  document.title=`${route==='accueil'?'Parcours Linux':route.startsWith('bloc-')?'Les bases du terminal':route.startsWith('module-')?ctfModules.find(m=>route==='module-'+m.id)?.title||'Module CTF':route==='guide'?'Guide de survie':route==='cours'?'Cours express':route.startsWith('fiche-')?lessons.find(l=>route==='fiche-'+l.id)?.label||'Cours express':route==='revision'?'QCM et révisions':route.startsWith('qcm-')?`QCM ${quizzes.find(q=>route==='qcm-'+q.id)?.label||''}`:route==='box-01'?'Box finale':'Parcours Linux'} — Linux, pour de vrai`;
}

document.addEventListener('click',e=>{
  const nav=e.target.closest('[data-route],[data-view]');if(nav){const dest=nav.dataset.route||nav.dataset.view;ctfFeedback='';ctfResetPending=false;routeTo(dest);window.scrollTo({top:0,behavior:'smooth'});return}
  const ctfStep=e.target.closest('[data-ctf-step]');if(ctfStep){const mod=ctfModules.find(m=>getRoute()==='module-'+m.id);if(mod)ctfActive[mod.id]=Number(ctfStep.dataset.ctfStep);ctfFeedback='';ctfResetPending=false;render();return}
  const quizStep=e.target.closest('[data-quiz-step]');if(quizStep){const quiz=quizzes.find(item=>getRoute()==='qcm-'+item.id);if(quiz){quizActive[quiz.id]=Number(quizStep.dataset.quizStep);delete quizFeedback[quiz.id];render()}return}
  const action=e.target.closest('[data-action]');if(action){const mod=ctfModules.find(m=>getRoute()==='module-'+m.id);const quiz=quizzes.find(item=>getRoute()==='qcm-'+item.id);if(action.dataset.action==='toggle-sidebar'){state.sidebarHidden=!state.sidebarHidden;persist();applySidebarState()}if(action.dataset.action==='toggle-block'){state.blockOpen=!state.blockOpen;persist();renderNav()}if(action.dataset.action==='setup'){document.getElementById('installation')?.scrollIntoView({behavior:'smooth'})}if(action.dataset.action==='ctf-hint'&&mod){const challenge=ctfCurrent(mod);const key=`${mod.id}-${challenge.id}`;ctfHints[key]=Math.min((ctfHints[key]||0)+1,challenge.hints.length);render()}if(action.dataset.action==='ctf-reset-request'&&mod){ctfResetPending=true;render()}if(action.dataset.action==='ctf-reset-cancel'){ctfResetPending=false;render()}if(action.dataset.action==='ctf-reset-confirm'&&mod&&ctfResetPending){resetCtfModule(mod);render()}if(action.dataset.action==='quiz-reset'&&quiz){delete state.quizDone[quiz.id];quizActive[quiz.id]=0;delete quizFeedback[quiz.id];persist();render()}return}
});

document.addEventListener('submit',e=>{
  if(e.target.id==='ctf-form'){
    e.preventDefault();
    const mod=ctfModules.find(m=>getRoute()==='module-'+m.id);
    if(!mod)return;
    const challenge=ctfCurrent(mod);
    const result=validateCtfFlag(mod,challenge,new FormData(e.target).get('flag').toString());
    if(result.valid){ctfFeedback='';render()}
    else{
      ctfFeedback=result.message;
      const target=e.target.querySelector('.feedback');target.textContent=ctfFeedback;target.className='feedback error';
    }
    return;
  }
  if(e.target.id==='quiz-form'){
    e.preventDefault();
    const quiz=quizzes.find(item=>getRoute()==='qcm-'+item.id);
    if(!quiz)return;
    const question=quizCurrent(quiz);
    const index=quiz.questions.indexOf(question);
    const selected=new FormData(e.target).getAll('answer').map(Number).sort((a,b)=>a-b);
    const valid=validateQuizAnswers(question,selected);
    quizFeedback[quiz.id]={valid,selected};
    if(valid){if(!Array.isArray(state.quizDone[quiz.id]))state.quizDone[quiz.id]=[];if(!state.quizDone[quiz.id].includes(index))state.quizDone[quiz.id].push(index);persist()}
    render();
    return;
  }
});
document.addEventListener('input',e=>{if(e.target.id==='course-search'){document.getElementById('course-list').innerHTML=renderCourseList(e.target.value)}});
window.addEventListener('hashchange',()=>{ctfFeedback='';ctfResetPending=false;render();window.scrollTo(0,0)});
render();
