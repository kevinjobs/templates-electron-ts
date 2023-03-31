#!/usr/bin/env zx
import { dirname as _dirname, resolve, join } from 'path';
import fs from 'fs/promises';

const dirname = _dirname(__dirname);
const projectPath = resolve(dirname);
const outPath = join(projectPath, 'out');
const binPath = join(projectPath, 'bin');
const distPath = join(projectPath, 'dist');

const electronPath = path.join(binPath, 'electron');
const packagePath = path.join(outPath, 'electron_x64');
const resourcesPath = path.join(packagePath, 'resources');
const appDistPath = path.join(resourcesPath, "dist");
const appAsarPath = path.join(resourcesPath, "app");

await $`pnpm build`;

try {
  const stats = await fs.stat(outPath);
  if (!stats.isDirectory()) {
    await $`mkdir ${outPath}`;
  }
} catch(err) {
  await $`mkdir ${outPath}`;
}

await $`cp -r ${electronPath} ${packagePath}`;

await $`cp -r ${distPath} ${resourcesPath}`;

await $`mv ${appDistPath} ${appAsarPath}`;

await $`cp package.json ${appAsarPath}`;

await $`rimraf ${distPath}`;
