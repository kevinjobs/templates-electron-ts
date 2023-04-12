#!/usr/bin/env zx
const viewsDistPath = process.env.VIEWS_DIST_PATH || './dist';

await $`pnpm run build`;

await $`serve ${viewsDistPath}`;
