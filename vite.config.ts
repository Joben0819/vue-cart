import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue-cart/',
  plugins: [vue()],
  build:{
    outDir: 'build'
  },
  server:{
    port: 3000,
    open: true
  },
})
