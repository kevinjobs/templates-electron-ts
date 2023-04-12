#!/usr/bin/env zx
import './_loadEnv.mjs';
import { startView, startMain } from './_start.mjs';
import { buildAll } from './_build.mjs';
import { packageAll } from './_pack.mjs';

const args = process.argv.slice(3);

const projectPath = process.env.PROJECT_PATH;
const distPath = process.env.DIST_PATH;
const outPath = process.env.OUT_PATH;

switch(args[0]) {
  case 'start':
    startView();
    startMain();
    break;
  case 'build':
    await fs.remove(distPath);
    await buildAll();
    break;
  case 'package':
    await fs.remove(outPath);
    await buildAll();
    await packageAll();
    await fs.remove(distPath);
    break;
}