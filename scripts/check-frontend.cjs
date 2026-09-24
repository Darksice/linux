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
vm.runInContext(fs.readFileSync(path.join(root,'modules','03','module03-data.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'app.js'),'utf8'),context);
assert.match(element('view').innerHTML,/module-01/);
assert.match(element('view').innerHTML,/module-02/);
assert.match(element('view').innerHTML,/module-03/);
assert.match(element('view').innerHTML,/commandes indiquées en haut à droite/);
assert.doesNotMatch(element('view').innerHTML,/atelier-linux\.tar\.gz|mission-01/);
assert.doesNotMatch(fs.readFileSync(path.join(root,'index.html'),'utf8'),/<footer\b/);
assert.match(fs.readFileSync(path.join(root,'index.html'),'utf8'),/modules\/01\/module01-data\.js/);
assert.match(fs.readFileSync(path.join(root,'index.html'),'utf8'),/modules\/02\/module02-data\.js/);
assert.match(fs.readFileSync(path.join(root,'index.html'),'utf8'),/modules\/03\/module03-data\.js/);
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
const guideLines=fs.readFileSync(path.join(ctfSource02,'manuel','guide'),'utf8').trimEnd().split(/\r?\n/);
const rotationLines=fs.readFileSync(path.join(ctfSource02,'journaux','rotation'),'utf8').trimEnd().split(/\r?\n/);
assert.equal(guideLines.length,360);
assert.equal(rotationLines.length,80);
assert.match(guideLines[173],/FLAG\{ALTARIA\}/);
assert.match(guideLines[250],/FLAG\{LUXRAY\}/);
assert.doesNotMatch(rotationLines.slice(0,10).join('\n'),/FLAG\{MORPHEO\}/);
assert.match(rotationLines[10],/FLAG\{MORPHEO\}/);
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
context.location.hash='#module-03';
vm.runInContext('render()',context);
assert.match(element('view').innerHTML,/15 flags/);
assert.match(element('view').innerHTML,/module03-linux\.tar\.gz/);
assert.match(element('module-nav').innerHTML,/Transformer et compter des données/);
assert.equal(vm.runInContext('module03.challenges.length',context),15);
const ctfSource03=path.join(root,'modules','03','atelier-module-03');
const files03=[];
function walk03(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const itemPath=path.join(dir,item.name);if(item.isDirectory())walk03(itemPath);else files03.push(fs.readFileSync(itemPath,'utf8').toUpperCase());}}
walk03(ctfSource03);
for(const challenge of vm.runInContext('module03.challenges',context)){
  assert.doesNotMatch(challenge.flag,/M03|\d/);
  assert.doesNotMatch(challenge.command,/[-~/]/);
  assert.ok(files03.some(file=>file.includes(challenge.flag)),`Flag absent du Module 03 : ${challenge.id}`);
  if(challenge.decoy)assert.ok(files03.some(file=>file.includes(challenge.decoy)),`Leurre absent du Module 03 : ${challenge.id}`);
}
assert.equal(vm.runInContext("validateCtfFlag(module03,module03.challenges[0],module03.challenges[0].decoy).valid",context),false);
vm.runInContext('for(const challenge of module03.challenges) validateCtfFlag(module03,challenge,challenge.flag)',context);
assert.equal(vm.runInContext('ctfCompleted(module03).length',context),15);
clickAction('ctf-reset-request');
clickAction('ctf-reset-confirm');
assert.equal(vm.runInContext('ctfCompleted(module03).length',context),0);
assert.equal(vm.runInContext('ctfCompleted(module01).length',context),1);
context.location.hash='#mission-01';
vm.runInContext('render()',context);
assert.match(element('view').innerHTML,/module-01/);
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
assert.match(element('view').innerHTML,/Cette section sera restructurée plus tard/);
assert.doesNotMatch(element('view').innerHTML,/data-answer|data-action="practice-quiz"/);
console.log('Interface : Modules 01 à 03 CTF, 28 fiches et message de révisions vérifiés.');
