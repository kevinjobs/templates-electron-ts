import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';

export default defineConfig([
  {
    input: 'src/index.ts',
    external: ['react', 'react-dom'],
    plugins: [
      typescript(),
    ],
    output: [
      {
        name: 'smede-hooks',
        file: './dist/index.js',
        format: 'umd',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        }
      },
      {
        name: 'smede-hooks',
        file: './es/index.js',
        format: 'es',
      },
      {
        name: 'smede-hooks',
        file: './cjs/index.cjs',
        format: 'cjs',
      }
    ]
  }
])