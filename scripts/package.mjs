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

// 查看 out 文件夹是否存在
try {
  const stats = await fs.stat(outPath);
  if (!stats.isDirectory()) {
    await $`mkdir ${outPath}`;
  }
} catch(err) {
  await $`mkdir ${outPath}`;
}
// 拷贝原版 electron
await $`cp -r ${electronPath} ${packagePath}`;
// 拷贝前端代码
await $`cp -r ${distPath} ${resourcesPath}`;
// 将 dist 重命名为 app
await $`mv ${appDistPath} ${appAsarPath}`;
// 拷贝 package.json
await $`cp package.json ${appAsarPath}`;
// 删除 dist 文件夹
await $`rimraf ${distPath}`;
