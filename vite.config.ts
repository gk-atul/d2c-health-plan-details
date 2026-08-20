import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  // svgr must come before react() — @acko/icons imports .svg files as React components
  plugins: [svgr(), tailwindcss(), react()],
})
