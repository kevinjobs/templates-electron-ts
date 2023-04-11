#!/usr/bin/env zx
import './load-env.mjs';

const distPath = process.env.DIST_PATH;

await fs.remove(distPath);
