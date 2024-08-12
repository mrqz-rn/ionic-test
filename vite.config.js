import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/main/',  // PRODUCTION
  // base: '/', // DEVELOPMENT
  build: {
    outDir: 'dist', // Make sure this is where you expect your assets to be
    assetsDir: 'assets',
  },
  optimizeDeps: {
    exclude: [
      'node_modules/.vite/deps/chunk-46CPRG3S.js',
    ],
  },
  plugins: [
    vue(),
    legacy()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
