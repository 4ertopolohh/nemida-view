import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'nemida-view'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? `/${repoName}/` : '/',
  plugins: [react()],
}))
