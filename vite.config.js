import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  optimizeDeps: {
    include: ['rsuite/locales/es_AR'],
    exclude: ['rsuite/cjs', 'rsuite/lib']
  }
})
