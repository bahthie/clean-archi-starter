import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    alias: {
      '@src': '../src',
      '@test': './',
    },
    root: './test',


    bail: 1,
    hookTimeout: 1000000,
    testTimeout: 1000000
  },
  resolve: {
    alias: {
      '@src': './src',
      '@test': './test',
    },
  },
  plugins: [swc.vite()],

});