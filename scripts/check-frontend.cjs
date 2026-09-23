// Contrôle sans navigateur : les vues principales doivent se construire sans erreur.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
const elements = new Map();
const listeners = {};
function element(id) {
  if (!elements.has(id)) elements.set(id, {innerHTML:'',textContent:'',style:{},setAttribute(name,value){this[name]=value}});
  return elements.get(id);
}
const context = vm.createContext({
  document: {getElementById:element,addEventListener(type,handler){listeners[type]=handler},body:{classList:{toggle(){}}}},
  window: {addEventListener(){},scrollTo(){}},
  location: {hash:''},
  localStorage: {getItem(){return null},setItem(){}},
  console,
  Date,
  String,
  Math
});
vm.runInContext(fs.readFileSync(path.join(root,'cours-data.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'modules','01','module01-data.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'modules','02','module02-data.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'app.js'),'utf8'),context);
assert.match(element('view').innerHTML,/42 missions/);
assert.match(element('view').innerHTML,/module-01/);
assert.match(element('view').innerHTML,/module-02/);
assert.match(element('view').innerHTML,/https:\/\/raw\.githubusercontent\.com\/Darksice\/linux\/main\/atelier-linux\.tar\.gz/);
assert.doesNotMatch(fs.readFileSync(path.join(root,'index.html'),'utf8'),/<footer\b/);
assert.match(fs.readFileSync(path.join(root,'index.html'),'utf8'),/modules\/01\/module01-data\.js/);
assert.match(fs.readFileSync(path.join(root,'index.html'),'utf8'),/modules\/02\/module02-data\.js/);
context.location.hash='#module-01';
vm.runInContext('render()',context);
assert.match(element('view').innerHTML,/Sept flags|sept flags|7 flags/);
assert.match(element('view').innerHTML,/module01-linux\.tar\.gz/);
assert.match(element('module-nav').innerHTML,/Se repérer dans le terminal/);
assert.match(element('view').innerHTML,/Recommencer le module/);
assert.equal(vm.runInContext('module01.challenges.length',context),7);
assert.equal(vm.runInContext('ctfCompleted(module01).length',context),0);
const ctfSource=path.join(root,'modules','01','atelier-module-01');
assert.ok(fs.statSync(path.join(ctfSource,'accueil','FLAG{PIKACHU}')).isFile());
assert.ok(fs.statSync(path.join(ctfSource,'accueil','.FLAG{EVOLI}')).isFile());
assert.deepEqual(fs.readdirSync(path.join(ctfSource,'accueil')).sort(),['.FLAG{EVOLI}','FLAG{PIKACHU}']);
assert.ok(fs.statSync(path.join(ctfSource,'tri','FLAG{PSYKOKWAK}')).isFile());
assert.ok(fs.statSync(path.join(ctfSource,'tri','FLAG{CARAPUCE}')).isDirectory());
assert.ok(fs.statSync(path.join(ctfSource,'final','.FLAG{DARDARGNAN}')).isFile());
assert.ok(fs.statSync(path.join(ctfSource,'final','.FLAG{PACHIRISU}')).isDirectory());
assert.ok(fs.statSync(path.join(ctfSource,'final','FLAG{MAGIKARP}')).isFile());
for(const challenge of vm.runInContext('module01.challenges',context)){
  assert.doesNotMatch(challenge.flag,/M01|\d/);
  assert.doesNotMatch(challenge.command,/[-~/]/);
  const found=[];
  function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){if(item.name.includes(challenge.flag))found.push(item);if(item.isDirectory())walk(path.join(dir,item.name));}}
  walk(ctfSource);
  assert.equal(found.length,1,`Flag absent ou répété : ${challenge.id}`);
}
assert.equal(vm.runInContext("validateCtfFlag(module01,module01.challenges[1],module01.challenges[1].decoy).valid",context),false);
assert.equal(vm.runInContext('ctfCompleted(module01).length',context),0);
vm.runInContext('for(const challenge of module01.challenges) validateCtfFlag(module01,challenge,challenge.flag)',context);
assert.equal(vm.runInContext('ctfCompleted(module01).length',context),7);
vm.runInContext("ctfActive['01']=6; render()",context);
assert.match(element('view').innerHTML,/Module terminé/);
function clickAction(action){listeners.click({target:{closest(selector){return selector==='[data-action]'?{dataset:{action}}:null}}});}
clickAction('ctf-reset-request');
assert.match(element('view').innerHTML,/Oui, recommencer/);
clickAction('ctf-reset-confirm');
assert.equal(vm.runInContext('ctfCompleted(module01).length',context),0);
assert.equal(vm.runInContext("ctfActive['01']",context),0);
clickAction('toggle-sidebar');
assert.equal(element('sidebar-toggle')['aria-expanded'],'false');
clickAction('toggle-sidebar');
assert.equal(element('sidebar-toggle')['aria-expanded'],'true');
context.location.hash='#module-02';
vm.runInContext('render()',context);
assert.match(element('view').innerHTML,/14 flags/);
assert.match(element('view').innerHTML,/module02-linux\.tar\.gz/);
assert.match(element('view').innerHTML,/atelier-module-02/);
assert.match(element('module-nav').innerHTML,/Lire et comparer les fichiers/);
assert.equal(vm.runInContext('module02.challenges.length',context),14);
const ctfSource02=path.join(root,'modules','02','atelier-module-02');
vm.runInContext('validateCtfFlag(module01,module01.challenges[0],module01.challenges[0].flag)',context);
for(const challenge of vm.runInContext('module02.challenges',context)){
  assert.doesNotMatch(challenge.flag,/M02|\d/);
  assert.doesNotMatch(challenge.command,/[-~/]/);
  const found=[];
  function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const itemPath=path.join(dir,item.name);if(item.isDirectory())walk(itemPath);else if(fs.readFileSync(itemPath,'utf8').includes(challenge.flag))found.push(itemPath);}}
  walk(ctfSource02);
  assert.equal(found.length,1,`Flag absent ou répété dans le Module 02 : ${challenge.id}`);
  if(challenge.decoy){
    const decoys=[];
    function findDecoy(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const itemPath=path.join(dir,item.name);if(item.isDirectory())findDecoy(itemPath);else if(fs.readFileSync(itemPath,'utf8').includes(challenge.decoy))decoys.push(itemPath);}}
    findDecoy(ctfSource02);
    assert.equal(decoys.length,1,`Leurre absent ou répété dans le Module 02 : ${challenge.id}`);
  }
}
assert.equal(vm.runInContext("validateCtfFlag(module02,module02.challenges[1],module02.challenges[1].decoy).valid",context),false);
vm.runInContext('for(const challenge of module02.challenges) validateCtfFlag(module02,challenge,challenge.flag)',context);
assert.equal(vm.runInContext('ctfCompleted(module02).length',context),14);
clickAction('ctf-reset-request');
clickAction('ctf-reset-confirm');
assert.equal(vm.runInContext('ctfCompleted(module02).length',context),0);
assert.equal(vm.runInContext('ctfCompleted(module01).length',context),1);
const missionIds=vm.runInContext('missions.map(m => m.id)',context);
assert.equal(missionIds.length,42);
assert.equal(new Set(missionIds).size,42);
const verifier=fs.readFileSync(path.join(root,'atelier-linux','verifier.sh'),'utf8');
for(const id of missionIds){
  context.location.hash='#mission-'+id;
  vm.runInContext('render()',context);
  assert.match(element('view').innerHTML,new RegExp(`bash verifier\\.sh ${id}`));
  const token=vm.runInContext(`missions.find(m => m.id === '${id}').token`,context);
  assert.ok(verifier.includes(token),`Code absent du vérificateur : ${id}`);
}
context.location.hash='#guide';
vm.runInContext('render()',context);
assert.match(element('view').innerHTML,/Guide de survie/);
assert.match(element('view').innerHTML,/Ctrl-Z/);
assert.match(element('view').innerHTML,/cd dossier\/dossier2/);
context.location.hash='#cours';
vm.runInContext('render()',context);
assert.match(element('view').innerHTML,/Cours express/);
assert.match(vm.runInContext("renderCourseList('chmod')",context),/fiche-chmod/);
assert.equal(vm.runInContext('lessons.length',context),28);
context.location.hash='#fiche-ls';
vm.runInContext('render()',context);
assert.match(element('view').innerHTML,/ls -la/);
assert.match(element('view').innerHTML,/fichiers cachés/);
context.location.hash='#fiche-chmod';
vm.runInContext('render()',context);
assert.match(element('view').innerHTML,/trois triplets/);
assert.match(element('view').innerHTML,/2²/);
assert.doesNotMatch(element('view').innerHTML,/À retenir/);
context.location.hash='#fiche-chown';
vm.runInContext('render()',context);
assert.match(element('view').innerHTML,/chown utilisateur:groupe fichier/);
context.location.hash='#revision';
vm.runInContext('render()',context);
assert.match(element('view').innerHTML,/cartes arrivent après les missions/);
vm.runInContext("state.done.push('01'); startQuiz('due'); answerQuiz(1); quizIndex++; quizAnswer=null; answerQuiz(1); quizIndex++; render()",context);
assert.equal(vm.runInContext('dueCards().length',context),0);
vm.runInContext("startQuiz('practice')",context);
assert.equal(vm.runInContext('quizSession.length',context),2);
const scheduleBefore=vm.runInContext('JSON.stringify(Object.values(state.cards).map(({level,due})=>({level,due})))',context);
vm.runInContext('answerQuiz(0)',context);
assert.equal(vm.runInContext('JSON.stringify(Object.values(state.cards).map(({level,due})=>({level,due})))',context),scheduleBefore);
assert.equal(vm.runInContext('missedCards().length',context),1);
vm.runInContext("startQuiz('missed'); answerQuiz(1)",context);
assert.equal(vm.runInContext('missedCards().length',context),0);
vm.runInContext("state.done.push('04'); startQuiz('practice'); quizIndex=quizSession.findIndex(card=>card.id==='q3')",context);
const dueBefore=vm.runInContext('dueCards().length',context);
vm.runInContext('answerQuiz(0)',context);
assert.equal(vm.runInContext('dueCards().length',context),dueBefore);
console.log('Interface : Modules 01 et 02 CTF, 42 missions, 28 fiches et révisions vérifiés.');
