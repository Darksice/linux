// Ne publie sur Vercel que les fichiers réellement nécessaires au site.
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
require('./build-courses.cjs');
const output = path.join(root, 'dist');
fs.mkdirSync(output, {recursive:true});
for (const name of ['index.html', 'styles.css', 'app.js', 'cours-data.js']) {
  fs.copyFileSync(path.join(root, name), path.join(output, name));
}
for (const id of ['01', '02']) {
  fs.mkdirSync(path.join(output, 'modules', id), {recursive:true});
  fs.copyFileSync(path.join(root, 'modules', id, `module${id}-data.js`), path.join(output, 'modules', id, `module${id}-data.js`));
}
console.log('Site statique prêt dans dist/ (archive hébergée sur GitHub).');
