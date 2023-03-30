import path from 'path';
import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { DIST } from '../const/paths.mjs';

export default defineConfig([
  {
    input: 'src/index.ts',
    external: ['electron'],
    plugins: [
      typescript(),
      nodeResolve(),
      commonjs(),
    ],
    output: [
      {
        name: 'main',
        file: path.join(DIST, 'main.js'),
        format: 'commonjs',
      },
    ]
  },
  {
    input: 'src/preload.ts',
    external: ['electron'],
    plugins: [
      typescript(),
      commonjs(),
    ],
    output: [
      {
        name: 'preload',
        file: path.join(DIST, 'preload.js'),
        format: 'commonjs',
      },
    ]
  }
])