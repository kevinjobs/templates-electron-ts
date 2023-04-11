import path from 'path';

const dirname = path.dirname(__dirname);
const projectPath = path.resolve(dirname);
const distPath = path.join(projectPath, 'dist');
const outPath = path.join(projectPath, 'out');

export {
  projectPath,
  distPath,
  outPath,
}
