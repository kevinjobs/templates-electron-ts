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

const electronUrl = 'https://registry.npmmirror.com/-/binary/electron/22.0.0/electron-v22.0.0-win32-x64.zip'

await $`pnpm build`;

await $`electron-forge package`;

// 删除 dist 文件夹
await $`rimraf ${distPath}`;
