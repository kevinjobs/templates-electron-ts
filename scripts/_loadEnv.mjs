#!/usr/bin/env zx
import path from 'path';

const projectPath = path.resolve(__dirname, '..');
const distPath = path.join(projectPath, 'dist');
const viewsDistPath = path.join(distPath, 'views');
const outPath = path.join(projectPath, 'out');

process.env.PROJECT_PATH = projectPath;
process.env.DIST_PATH = distPath;
process.env.VIEWS_DIST_PATH = viewsDistPath;
process.env.OUT_PATH = outPath;
process.env.PORT = 12345;

process.env.EE_VIEW_SETTING_DIST_PATH = path.join(distPath, 'view-setting');
process.env.EE_VIEW_SETTING_PORT = 12346;
