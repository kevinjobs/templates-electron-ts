#!/usr/bin/env zx
import { distPath, outPath } from './common.mjs';

await $`pnpm build`;
await $`rimraf ${outPath}`;
await $`electron-forge package`;

// 删除 dist 文件夹
await $`rimraf ${distPath}`;
