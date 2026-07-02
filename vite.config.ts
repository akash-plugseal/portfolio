import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
  ssr: {
    noExternal: ['@supabase/supabase-js']
  }
})
