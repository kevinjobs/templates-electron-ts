#!/usr/bin/env zx
import path from 'path';
import { DIST } from '../../const/paths.mjs';

const config = path.resolve(__dirname, '../config/webpack.config.js');
// 删除旧的文件
await $`rimraf ${path.join(DIST, 'views')} `;
// 生成前端
await $`cross-env NODE_ENV=production webpack -c ${config}`;