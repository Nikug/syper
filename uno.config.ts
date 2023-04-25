import { defineConfig, presetUno } from 'unocss'
import presetWebFonts from '@unocss/preset-web-fonts'
import transformerDirectives from '@unocss/transformer-directives'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Open Sans:400,600,700',
        mono: 'Fragment Mono:400,600,700',
      },
    }),
    presetIcons(),
  ],
  transformers: [transformerDirectives()],
  rules: [
    [
      /^text-ctp-(\w*)(\/(.*))?$/,
      ([, rgb, , alpha]) => ({
        color: color(rgb, alpha),
      }),
    ],
    [
      /^bg-ctp-(\w*)(\/(.*))?$/,
      ([, rgb, , alpha]) => ({
        'background-color': color(rgb, alpha),
      }),
    ],
    [
      /^border-ctp-(\w*)(\/(.*))?$/,
      ([, rgb, , alpha]) => ({
        'border-color': color(rgb, alpha),
      }),
    ],
    [
      /^decoration-ctp-(\w*)(\/(.*))?$/,
      ([, rgb, , alpha]) => ({
        'text-decoration-color': color(rgb, alpha),
      }),
    ],
    [
      /^bg-gradient-to-(.)$/,
      ([, direction]) => ({
        'background-image': `linear-gradient(to ${
          direction === 'r' ? 'right' : 'left'
        }, var(--custom-gradient-stops))`,
      }),
    ],
    [
      /^from-transparent$/,
      () => ({
        '--custom-gradient-from': 'transparent',
        '--custom-gradient-to': 'rgb(0 0 0 / 0)',
        '--custom-gradient-stops': 'var(--custom-gradient-from), var(--custom-gradient-to)',
      }),
    ],
    [
      /^via-ctp-(\w*)(\/(.*))?$/,
      ([, rgb, , alpha]) => ({
        '--custom-gradient-to': color(rgb, alpha),
        '--custom-gradient-stops': `var(--custom-gradient-from), ${color(
          rgb,
          alpha
        )}, var(--custom-gradient-to)`,
      }),
    ],
    [
      /^to-ctp-(\w*)(\/(.*))?$/,
      ([, rgb, , alpha]) => ({
        '--custom-gradient-to': color(rgb, alpha),
      }),
    ],
  ],
})

const color = (rgb: string, alpha: string | undefined) =>
  `rgba(var(--ctp-${rgb}), ${alpha ? Number(alpha) / 100 : 1})`
