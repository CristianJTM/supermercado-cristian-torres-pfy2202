import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages publica el proyecto en https://<usuario>.github.io/<repositorio>/
const REPO_NAME = 'supermercado-cristian-torres-pfy2202'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? `/${REPO_NAME}/` : '/',
  plugins: [react()],
}))
