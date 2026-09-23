// Reconstruit l'archive du Module 03 depuis les fichiers source.
const path = require('node:path');
const {spawnSync} = require('node:child_process');

const root = path.resolve(__dirname, '..');
const moduleFolder = path.join(root, 'modules', '03');
const output = path.join(root, 'module03-linux.tar.gz');
const result = spawnSync('tar', ['-czf', output, 'atelier-module-03'], {cwd:moduleFolder, stdio:'inherit'});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status || 1);
console.log(`Archive prête : ${output}`);
