#!/usr/bin/env zx
import './load-env.mjs';

await $`rimraf ${process.env.DIST_PATH}`;
await $`pnpm -F eipc build`;
await $`pnpm -F main build`;
await $`pnpm -F view-react build`;
await $`pnpm -F view-vue build`;
