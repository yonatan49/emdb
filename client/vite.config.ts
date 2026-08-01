import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "/emdb/",
  plugins: [
    react(),
    tailwindcss(),
  ],
})
