import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      assets: resolve(__dirname, '/src/assets'),
      features: resolve(__dirname, './src/features'),
      pages: resolve(__dirname, './src/pages'),
      common: resolve(__dirname, '/src/common'),
      widgets: resolve(__dirname, './src/widgets'),
      app: resolve(__dirname, './src/app')
    }
  }
})
