import { defineConfig, presetUno } from 'unocss'
import presetWebFonts from '@unocss/preset-web-fonts'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Open Sans',
        mono: 'Fragment Mono',
      },
    }),
  ],
  transformers: [transformerDirectives()],
  rules: [
    [
      /^text-ctp-(\w*)(\/(.*))?$/,
      (match) => ({
        color: `rgba(var(--ctp-${match[1]}), ${match[3] ? Number(match[3]) / 100 : 1})`,
      }),
    ],
    [
      /^bg-ctp-(\w*)(\/(.*))?$/,
      (match) => ({
        'background-color': `rgba(var(--ctp-${match[1]}), ${
          match[3] ? Number(match[3]) / 100 : 1
        })`,
      }),
    ],
  ],
})
