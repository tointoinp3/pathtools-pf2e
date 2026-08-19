import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

/** Só o deploy do GitHub Pages usa subpasta; o resto (dev, .exe) fica na raiz. */
const pagesBase =
  process.env.GITHUB_PAGES === 'true' ? '/pathtools-pf2e/' : '/'

export default defineConfig({
  base: pagesBase,
  server: {
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'spa-github-pages-fallback',
      closeBundle() {
        const index = path.resolve(rootDir, 'dist/index.html')
        const fallback = path.resolve(rootDir, 'dist/404.html')
        if (fs.existsSync(index)) fs.copyFileSync(index, fallback)
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
    },
  },
})
