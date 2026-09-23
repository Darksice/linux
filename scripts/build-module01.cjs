// Reconstruit l’archive du module pilote depuis ses fichiers source.
const path = require('node:path');
const {spawnSync} = require('node:child_process');

const root = path.resolve(__dirname, '..');
const moduleFolder = path.join(root, 'modules', '01');
const output = path.join(root, 'module01-linux.tar.gz');
const result = spawnSync('tar', ['-czf', output, 'atelier-module-01'], {cwd:moduleFolder, stdio:'inherit'});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status || 1);
console.log(`Archive prête : ${output}`);
