import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import eslintPlugin from 'vite-plugin-eslint'
import unoCssPlugin from 'unocss/vite'

export default defineConfig({
  plugins: [
    solidPlugin(),
    unoCssPlugin(),
    { ...eslintPlugin(), apply: 'build' },
    {
      ...eslintPlugin({
        failOnWarning: false,
        failOnError: false,
        cache: true,
      }),
      apply: 'serve',
      enforce: 'post',
    },
  ],
  base: './',
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})
