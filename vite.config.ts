import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import unoCssPlugin from 'unocss/vite'

export default defineConfig({
  plugins: [unoCssPlugin(), solidPlugin()],
  base: './',
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})
