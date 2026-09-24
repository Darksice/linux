const lessons = courseLessons;
const ctfModules = [module01, module02, module03];
const ctfArchiveUrl = mod => `https://raw.githubusercontent.com/Darksice/linux/main/${mod.archive}`;

const stateKey = 'linux-pour-de-vrai-v1';
let saved;
try { saved = JSON.parse(localStorage.getItem(stateKey) || '{}'); } catch { saved = {}; }
const state = {ctfDone: saved.ctfDone && typeof saved.ctfDone === 'object' ? saved.ctfDone : {}, sidebarHidden: saved.sidebarHidden === true};
const ctfActive = {};
const ctfHints = {};
let ctfFeedback = '';
let ctfResetPending = false;

function persist(){try{localStorage.setItem(stateKey,JSON.stringify(state));}catch{}}
function ctfCompleted(mod){return Array.isArray(state.ctfDone[mod.id]) ? state.ctfDone[mod.id] : []}
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
function terminal(lines){return `<div class="terminal"><div class="terminal-bar"><span class="terminal-dot"></span><span class="terminal-dot"></span><span class="terminal-dot"></span><span class="terminal-title">terminal · VM Linux</span></div><pre>${lines}</pre></div>`}
function renderNav(){
  document.getElementById('module-nav').innerHTML=ctfModules.map(mod=>`<button class="module-nav-item ${getRoute()==='module-'+mod.id?'active':''}" data-route="module-${mod.id}" aria-current="${getRoute()==='module-'+mod.id?'page':'false'}"><span class="module-nav-id">${escapeHtml(mod.id)}</span><span class="module-nav-text">${escapeHtml(mod.title)}</span><span class="module-nav-count">${ctfCompleted(mod).length}/${mod.challenges.length}</span></button>`).join('');
}

function renderHome(){
  return `<section class="hero"><div><p class="eyebrow">UN PARCOURS POUR APPRENDRE EN FAISANT</p><h1>Le terminal,<br><em>ça s’apprend.</em></h1><p class="lead">Explore les modules CTF dans ta VM AlmaLinux : une archive par thème, des flags à découvrir et des pièges qui apprennent à lire précisément.</p></div><div class="hero-card"><h2>Prêt à ouvrir le terminal ?</h2><p>Apprends à te repérer, lire les fichiers puis traiter leurs données dans ta VM AlmaLinux.</p><button class="primary" data-route="module-01">Entrer dans le Module 01 →</button></div></section>
  <section class="ctf-howto"><div><p class="eyebrow">COMMENT ÇA MARCHE ?</p><h2>Une archive, des défis, des flags.</h2></div><ol><li>Télécharge l’archive du module et explore-la dans ta VM Linux.</li><li>Pour chaque défi, utilise les <strong>commandes indiquées en haut à droite</strong> de la question : elles désignent les outils à pratiquer.</li><li>Repère le flag demandé, saisis-le sur le site et ouvre un indice si tu bloques. Ta progression reste dans ce navigateur.</li></ol></section>
  ${ctfModules.map(mod=>`<section class="ctf-home-card"><div><p class="eyebrow">MODULE CTF · ${escapeHtml(mod.id)}</p><h2>${escapeHtml(mod.id)} · ${escapeHtml(mod.title)}</h2><p>${escapeHtml(mod.description)}</p><div class="ctf-home-meta"><span>${ctfCompleted(mod).length} / ${mod.challenges.length} flags trouvés</span><span>Archive dédiée · indices progressifs</span></div></div><button class="secondary" data-route="module-${escapeHtml(mod.id)}">${ctfCompleted(mod).length?'Reprendre le module':'Commencer le module'} →</button></section>`).join('')}
  <section class="course-promo"><div><p class="eyebrow">BESOIN D’UNE EXPLICATION ?</p><h2>${lessons.length} fiches de cours express</h2><p>Des commandes, leurs options et des exemples commentés, à consulter pendant les modules ou plus tard au travail.</p></div><button class="secondary" data-view="cours">Parcourir les fiches →</button></section>`;
}

function renderCtfModule(mod){
  const done=ctfCompleted(mod);
  const current=ctfCurrent(mod);
  const index=mod.challenges.findIndex(c=>c.id===current.id);
  const key=`${mod.id}-${current.id}`;
  const hintsShown=ctfHints[key] || 0;
  const solved=done.includes(current.id);
  const percent=Math.round(done.length/mod.challenges.length*100);
  return `<div class="breadcrumbs"><button data-route="accueil">Accueil</button><span>›</span><span>Module ${mod.id}</span></div>
  <p class="eyebrow">MODULE ${escapeHtml(mod.id)} · EXPLORATION CTF</p><h1 class="page-title">${escapeHtml(mod.title)}</h1><p class="page-intro">${escapeHtml(mod.description)} ${escapeHtml(mod.intro)}</p>
  <section class="ctf-setup"><div><div class="ctf-setup-top"><span>TON TERRAIN DE JEU</span><span>${done.length} / ${mod.challenges.length} flags</span></div><div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div><p>Sur ta machine Linux, télécharge l’archive de ce module depuis GitHub. Extrais-la puis ouvre <code>${escapeHtml(mod.folder)}</code>. Lis bien chaque question avant de répondre.</p><a class="secondary download-link" href="${ctfArchiveUrl(mod)}">Télécharger l’archive du Module ${escapeHtml(mod.id)} ↓</a></div>${terminal(`<span class="prompt">$</span> tar -xzf ${escapeHtml(mod.archive)}\n<span class="prompt">$</span> cd ${escapeHtml(mod.folder)}`)}</section>
  <div class="ctf-reset"><button class="ghost" data-action="ctf-reset-request">↻ Recommencer le module</button>${ctfResetPending?`<div class="ctf-reset-confirm" role="group" aria-label="Confirmer la remise à zéro"><p>Effacer les flags validés et les indices affichés du Module ${escapeHtml(mod.id)} ? L’archive dans ta VM ne sera pas modifiée.</p><button class="secondary" data-action="ctf-reset-confirm">Oui, recommencer</button><button class="ghost" data-action="ctf-reset-cancel">Annuler</button></div>`:''}</div>
  ${done.length===mod.challenges.length?'<div class="ctf-complete" role="status">✓ Module terminé ! Tu peux rejouer chaque défi et expliquer comment tu as écarté les leurres.</div>':''}
  <div class="ctf-layout"><nav class="ctf-map" aria-label="Défis du module"><div class="ctf-map-title">LES DÉFIS <span>${done.length}/${mod.challenges.length}</span></div>${mod.challenges.map((challenge,i)=>`<button class="ctf-map-item ${i===index?'active':''} ${done.includes(challenge.id)?'done':''}" data-ctf-step="${i}" aria-current="${i===index?'step':'false'}"><span class="ctf-map-number">${String(i+1).padStart(2,'0')}</span><span>${escapeHtml(challenge.title)}</span><span class="ctf-map-check">${done.includes(challenge.id)?'✓':'→'}</span></button>`).join('')}</nav>
  <section class="panel ctf-challenge"><div class="ctf-challenge-meta"><span>DÉFI ${String(index+1).padStart(2,'0')} / ${mod.challenges.length}</span><span>${escapeHtml(current.command)}</span></div><h2>${escapeHtml(current.title)}</h2><p class="ctf-story">${escapeHtml(current.story)}</p><div class="ctf-question"><span>TA MISSION</span><p>${escapeHtml(current.question)}</p></div>
  ${solved?`<div class="ctf-solved"><strong>✓ Flag trouvé</strong><p>${escapeHtml(current.success)}</p></div>`:`<form id="ctf-form" class="ctf-form"><label for="ctf-flag">Flag découvert dans la VM</label><div><input id="ctf-flag" name="flag" placeholder="FLAG{...}" autocomplete="off" autocapitalize="off" spellcheck="false" required><button class="primary" type="submit">Valider le flag →</button></div><p class="feedback ${ctfFeedback?'error':''}" role="status">${escapeHtml(ctfFeedback)}</p></form>`}
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
  <section class="panel"><h2>AlmaLinux</h2><dl><dt>rpm -q</dt><dd>Interroge les paquets installés.</dd><dt>dnf repolist</dt><dd>Affiche les dépôts configurés.</dd><dt>systemctl</dt><dd>Observe les unités et services.</dd><dt>journalctl</dt><dd>Consulte le journal système.</dd><dt>ip / ss</dt><dd>Inspecte interfaces et sockets.</dd><dt>getenforce</dt><dd>Affiche le mode SELinux.</dd></dl></section></div>
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
  return `<div class="breadcrumbs"><button data-route="accueil">Accueil</button><span>›</span><button data-view="cours">Cours express</button><span>›</span><span>${escapeHtml(l.label)}</span></div><p class="eyebrow">FICHE DE COURS · ${escapeHtml(l.group).toUpperCase()}</p><h1 class="page-title">${escapeHtml(l.label)}</h1><p class="page-intro">${escapeHtml(l.summary)} Les chemins des exemples sont illustratifs : adapte-les aux archives disponibles.</p><article class="panel lesson-article">${l.html}</article><div class="next-row"><button class="ghost" data-view="cours">← Toutes les fiches</button></div>`;
}

function renderQuiz(){return `<div class="breadcrumbs"><button data-route="accueil">Accueil</button><span>›</span><span>Révisions</span></div><p class="eyebrow">À VENIR</p><h1 class="page-title">Révisions</h1><div class="empty-state"><h2>Cette section sera restructurée plus tard.</h2><p>Les anciennes cartes liées aux 42 missions ont été retirées. Tu peux continuer à pratiquer avec les modules CTF et leurs indices.</p><button class="secondary" data-route="accueil">Voir les modules →</button></div>`}

function render(){
  const route=getRoute();renderNav();applySidebarState();
  const view=document.getElementById('view');
  if(route==='accueil')view.innerHTML=renderHome();
  else if(route.startsWith('module-')){const mod=ctfModules.find(m=>route==='module-'+m.id);view.innerHTML=mod?renderCtfModule(mod):renderHome()}
  else if(route==='guide')view.innerHTML=renderGuide();
  else if(route==='cours')view.innerHTML=renderCourse();
  else if(route.startsWith('fiche-'))view.innerHTML=renderLesson(route.slice(6));
  else if(route==='revision')view.innerHTML=renderQuiz();
  else view.innerHTML=renderHome();
  document.title=`${route==='accueil'?'Parcours Linux':route.startsWith('module-')?ctfModules.find(m=>route==='module-'+m.id)?.title||'Module CTF':route==='guide'?'Guide de survie':route==='cours'?'Cours express':route.startsWith('fiche-')?lessons.find(l=>route==='fiche-'+l.id)?.label||'Cours express':route==='revision'?'Révisions':'Parcours Linux'} — Linux, pour de vrai`;
}

document.addEventListener('click',e=>{
  const nav=e.target.closest('[data-route],[data-view]');if(nav){const dest=nav.dataset.route||nav.dataset.view;ctfFeedback='';ctfResetPending=false;routeTo(dest);window.scrollTo({top:0,behavior:'smooth'});return}
  const ctfStep=e.target.closest('[data-ctf-step]');if(ctfStep){const mod=ctfModules.find(m=>getRoute()==='module-'+m.id);if(mod)ctfActive[mod.id]=Number(ctfStep.dataset.ctfStep);ctfFeedback='';ctfResetPending=false;render();return}
  const action=e.target.closest('[data-action]');if(action){const mod=ctfModules.find(m=>getRoute()==='module-'+m.id);if(action.dataset.action==='toggle-sidebar'){state.sidebarHidden=!state.sidebarHidden;persist();applySidebarState()}if(action.dataset.action==='setup'){document.getElementById('installation')?.scrollIntoView({behavior:'smooth'})}if(action.dataset.action==='ctf-hint'&&mod){const challenge=ctfCurrent(mod);const key=`${mod.id}-${challenge.id}`;ctfHints[key]=Math.min((ctfHints[key]||0)+1,challenge.hints.length);render()}if(action.dataset.action==='ctf-reset-request'&&mod){ctfResetPending=true;render()}if(action.dataset.action==='ctf-reset-cancel'){ctfResetPending=false;render()}if(action.dataset.action==='ctf-reset-confirm'&&mod&&ctfResetPending){resetCtfModule(mod);render()}return}
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
});
document.addEventListener('input',e=>{if(e.target.id==='course-search'){document.getElementById('course-list').innerHTML=renderCourseList(e.target.value)}});
window.addEventListener('hashchange',()=>{ctfFeedback='';ctfResetPending=false;render();window.scrollTo(0,0)});
render();
