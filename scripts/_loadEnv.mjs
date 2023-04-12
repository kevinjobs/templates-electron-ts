#!/usr/bin/env zx
import path from 'path';

const projectPath = path.resolve(__dirname, '..');
const distPath = path.join(projectPath, 'dist');
const outPath = path.join(projectPath, 'out');

process.env.PROJECT_PATH = projectPath;
process.env.DIST_PATH = distPath;
process.env.OUT_PATH = outPath;
