import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '',
  server: {
    port: Number(process.env.EE_VIEW_SETTING_PORT) || 9527,
  },
  build: {
    outDir: process.env.EE_VIEW_SETTING_DIST_PATH || './dist/view-setting',
  }
})
