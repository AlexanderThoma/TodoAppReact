import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // configure vite to use React as build target framework
  plugins: [react()],
  // set frontend url
  server: {
    port: 3000
  },
  resolve: {
    // use alias @ for src -> imports can look like '@/types'
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url))
    }
  },
  root: ".",
  // always put npm build result in ./build folder
  build: {
    outDir: "./build"
  }
})
