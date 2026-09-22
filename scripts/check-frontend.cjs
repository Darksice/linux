// Contrôle sans navigateur : les vues principales doivent se construire sans erreur.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
const elements = new Map();
function element(id) {
  if (!elements.has(id)) elements.set(id, {innerHTML:'',textContent:'',style:{}});
  return elements.get(id);
}
const context = vm.createContext({
  document: {getElementById:element,addEventListener(){}},
  window: {addEventListener(){},scrollTo(){}},
  location: {hash:''},
  localStorage: {getItem(){return null},setItem(){}},
  console,
  Date,
  String,
  Math
});
vm.runInContext(fs.readFileSync(path.join(root,'cours-data.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'app.js'),'utf8'),context);
assert.match(element('view').innerHTML,/42 missions/);
assert.match(element('view').innerHTML,/https:\/\/raw\.githubusercontent\.com\/Darksice\/linux\/main\/atelier-linux\.tar\.gz/);
assert.doesNotMatch(fs.readFileSync(path.join(root,'index.html'),'utf8'),/<footer\b/);
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
console.log('Interface : 42 missions, 28 fiches, guide et deux modes d’entraînement vérifiés.');
