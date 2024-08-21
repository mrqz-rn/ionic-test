import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: [
      'node_modules/.vite/deps/chunk-46CPRG3S.js',
      '@vue/devtools-api',
      // '/node_modules/.vite/deps/capacitor-datetime-setting.js?v=d8e92181',
      // 'node_modules/.vite/deps/@ionic_storage.js?v=5ef27adf',
      // '/node_modules/.vite/deps/@capacitor_camera.js?v=b4d2e6ae'
      // Add any other problematic dependencies here
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
