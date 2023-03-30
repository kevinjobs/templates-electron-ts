import path from 'path';
import { fileURLToPath } from 'url';

// 在 es module 中没有 __dirname & __filename
const DIRNAME = path.dirname(fileURLToPath(import.meta.url));

export const PROJECT = path.resolve(DIRNAME, '../../');
export const DIST = path.join(PROJECT, 'dist');
export const APP = path.join(PROJECT, 'app');
export const MAIN = path.join(APP, 'main');
export const VIEWS = path.join(APP, 'views-react');
