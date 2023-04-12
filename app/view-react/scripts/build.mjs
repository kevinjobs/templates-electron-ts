#!/usr/bin/env zx
const config = path.resolve(__dirname, '../config/webpack.config.js');
const viewsDistPath = process.env.VIEWS_DIST_PATH || '';

// 删除旧的文件
await fs.remove(viewsDistPath); 
// 生成前端
await $`cross-env NODE_ENV=production webpack -c ${config}`;