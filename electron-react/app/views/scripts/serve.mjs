#!/usr/bin/env zx
import path from 'path';
import { DIST } from '../../const/paths.mjs';

await $`pnpm run build`;

await $`serve ${path.join(DIST, 'views')}`;
