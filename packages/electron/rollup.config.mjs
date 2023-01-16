import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';

export default defineConfig([
  {
    input: 'src/index.ts',
    plugins: [
      typescript(),
    ],
    output: [
      {
        name: 'main',
        file: './dist/main.js',
        format: 'commonjs',
      },
    ]
  },
  {
    input: 'src/preload.ts',
    plugins: [typescript()],
    output: [
      {
        name: 'preload',
        file: './dist/preload.js',
        format: 'commonjs',
      },
    ]
  }
])