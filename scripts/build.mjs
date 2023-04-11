#!/usr/bin/env zx
import { distPath } from "./common.mjs";

await $`rimraf ${distPath}`;
await $`pnpm -F eipc build`;
await $`pnpm -F main build`;
await $`pnpm -F view-react build`;
await $`pnpm -F view-vue build`;
