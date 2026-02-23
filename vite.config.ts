import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import unoCssPlugin from 'unocss/vite'

export default defineConfig({
  plugins: [solidPlugin(), unoCssPlugin()],
  base: './',
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})
