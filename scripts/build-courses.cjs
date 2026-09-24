// Compile les fiches Markdown en un fichier JS utilisable aussi en file://.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const folder = path.join(root, 'cours');
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

function inline(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function markdown(value) {
  const lines = value.replace(/\r\n/g, '\n').trim().split('\n');
  const html = [];
  let paragraph = [];
  let list = [];
  let code = [];
  let inCode = false;
  const flushParagraph = () => {if (paragraph.length) html.push(`<p>${inline(paragraph.join(' '))}</p>`); paragraph = [];};
  const flushList = () => {if (list.length) html.push(`<ul>${list.map(item => `<li>${inline(item)}</li>`).join('')}</ul>`); list = [];};
  for (const line of lines) {
    if (/^```/.test(line)) {
      flushParagraph(); flushList();
      if (inCode) {html.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`); code = [];}
      inCode = !inCode;
    } else if (inCode) code.push(line);
    else if (/^###? /.test(line)) {flushParagraph(); flushList(); const level = line.startsWith('### ') ? 3 : 2; html.push(`<h${level}>${inline(line.slice(level + 1))}</h${level}>`);}
    else if (/^- /.test(line)) {flushParagraph(); list.push(line.slice(2));}
    else if (!line.trim()) {flushParagraph(); flushList();}
    else {flushList(); paragraph.push(line.trim());}
  }
  flushParagraph(); flushList();
  if (inCode) throw new Error('Bloc de code Markdown non fermé.');
  return html.join('\n');
}

function parse(file) {
  const raw = fs.readFileSync(path.join(folder, file), 'utf8').replace(/\r\n/g, '\n');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n\s*([\s\S]+)$/);
  if (!match) throw new Error(`${file} : en-tête Markdown manquant.`);
  const meta = Object.fromEntries(match[1].split('\n').map(line => {
    const separator = line.indexOf(':');
    if (separator < 0) throw new Error(`${file} : ligne d’en-tête invalide : ${line}`);
    return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
  }));
  for (const key of ['id','title','group','summary']) if (!meta[key]) throw new Error(`${file} : ${key} manquant.`);
  if (`${meta.id}.md` !== file) throw new Error(`${file} : le nom doit correspondre à l’id.`);
  for (const heading of ['Comprendre','Commandes et options','Exemple commenté','Points de vigilance','Pour s’entraîner']) {
    if (!match[2].includes(`## ${heading}`)) throw new Error(`${file} : section « ${heading} » manquante.`);
  }
  return {id:meta.id,label:meta.title,group:meta.group,summary:meta.summary,html:markdown(match[2])};
}

const files = fs.readdirSync(folder).filter(file => file.endsWith('.md') && !file.startsWith('_')).sort();
const lessons = files.map(parse);
if (new Set(lessons.map(lesson => lesson.id)).size !== lessons.length) throw new Error('Identifiants de cours répétés.');
const output = `// Généré par node scripts/build-courses.cjs — modifier les fichiers dans cours/.\nconst courseLessons = ${JSON.stringify(lessons, null, 2)};\n`;
fs.writeFileSync(path.join(root, 'cours-data.js'), output.replace(/\n/g, os.EOL), 'utf8');
console.log(`${lessons.length} fiches compilées dans cours-data.js.`);
