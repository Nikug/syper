import Color from 'color'
import { Entries } from '../utilityTypes'

export type ThemeKey = keyof typeof themes

export interface ThemeVariables {
  name: string
  dark: boolean
  variables: () => ThemeVariable
}

type ThemeVariable = Record<string, Color>

export type Themes = Record<ThemeKey, ThemeVariables>

export const themes = {
  'syper-dark': {
    name: 'Syper dark',
    dark: true,
    variables: () => ({
      text: Color('#a1a1aa'),
      primary: Color('#a855f7'),
      secondary: Color('#a1a1aa'),
      highlight: Color('#ec4899'),
      accent: Color('#db2777'),
      danger: Color('#f43f5e'),
      surface1: Color('#52525b'),
      surface0: Color('#3f3f46'),
      base: Color('#27272a'),
    }),
  },
  'syper-light': {
    name: 'Syper light',
    dark: false,
    variables: () => ({
      text: Color('#52525b'),
      primary: Color('#9333ea'),
      secondary: Color('#a1a1aa'),
      highlight: Color('#ec4899'),
      accent: Color('#db2777'),
      danger: Color('#e11d48'),
      surface1: Color('#fafafa'),
      surface0: Color('#f4f4f5'),
      base: Color('#e4e4e7'),
    }),
  },
  'catppuccin-latte': {
    name: 'Catppuccin Latte',
    dark: false,
    variables: () => ({
      text: Color.rgb(76, 79, 105),
      primary: Color.rgb(136, 57, 239),
      secondary: Color.rgb(124, 127, 147),
      highlight: Color.rgb(230, 69, 83),
      accent: Color.rgb(30, 102, 245),
      danger: Color.rgb(210, 15, 57),
      surface1: Color.rgb(172, 176, 190),
      surface0: Color.rgb(204, 208, 218),
      base: Color.rgb(239, 241, 245),
    }),
  },
  'catppuccin-mocha': {
    name: 'Catppuccin Mocha',
    dark: true,
    variables: () => ({
      text: Color.rgb(205, 214, 244), // Text default color
      primary: Color.rgb(203, 166, 247), // Correct character
      secondary: Color.rgb(147, 153, 178), // Wpm chart secondary line, not selected button
      danger: Color.rgb(243, 139, 168), // Incorrect character
      highlight: Color.rgb(235, 160, 172), // Button highlight
      accent: Color.rgb(137, 180, 250), // Used only in progress meter gradient
      surface1: Color.rgb(88, 91, 112), // Hovered paper and wpm chart hover background
      surface0: Color.rgb(49, 50, 68), // Paper
      base: Color.rgb(30, 30, 46), // Background
    }),
  },
  tokyonight: {
    name: 'Tokyo night',
    dark: true,
    variables: () => ({
      text: Color('#9aa5ce'),
      primary: Color('#7aa2f7'),
      secondary: Color('#e0af68'),
      highlight: Color('#e0af68'),
      accent: Color('#565f89'),
      danger: Color('#f7768e'),
      surface1: Color('#1a1b26').lighten(0.6),
      surface0: Color('#1a1b26').lighten(0.3),
      base: Color('#1a1b26'),
    }),
  },
  'gruvbox-dark': {
    name: 'Gruvbox dark',
    dark: true,
    variables: () => ({
      text: Color('#ebdbb2'),
      primary: Color('#fabd2f'),
      secondary: Color('#83a598'),
      highlight: Color('#83a598'),
      accent: Color('#83a598'),
      danger: Color('#fb4934'),
      surface1: Color('#665c54'),
      surface0: Color('#3c3836'),
      base: Color('#282828'),
    }),
  },
  farout: {
    name: 'Farout',
    dark: true,
    variables: () => ({
      text: Color('#a4896f'),
      primary: Color('#f2a766'),
      secondary: Color('#8a4b53'),
      highlight: Color('#8a4b53'),
      accent: Color('#8a4b53'),
      danger: Color('#bf472c'),
      surface1: Color('#291916').lighten(0.4),
      surface0: Color('#291916'),
      base: Color('#1f1311').darken(0.2),
    }),
  },
  synthwave: {
    name: 'Synthwave',
    dark: true,
    variables: () => ({
      text: Color.rgb(45, 226, 230),
      primary: Color.rgb(255, 56, 100),
      secondary: Color.rgb(146, 0, 117),
      highlight: Color.rgb(249, 200, 14),
      accent: Color.rgb(246, 1, 157),
      danger: Color.rgb(255, 108, 17),
      surface1: Color.rgb(36, 23, 52).lighten(0.5),
      surface0: Color.rgb(36, 23, 52),
      base: Color.rgb(13, 2, 33),
    }),
  },
  cyberpunk: {
    name: 'Cyberpunk',
    dark: true,
    variables: () => ({
      text: Color('#fa4122').lighten(0.1),
      primary: Color('#02fad5'),
      secondary: Color('#fa4122'),
      highlight: Color('#02fad5').lighten(0.3),
      accent: Color('#02fad5').desaturate(0.3),
      danger: Color('#fbdc12'),
      surface1: Color('#5f043d'),
      surface0: Color('#5f043d').darken(0.4).desaturate(0.4),
      base: Color('#090f1f'),
    }),
  },
  blackAndWhite: {
    name: 'Black and white',
    dark: false,
    variables: () => ({
      text: Color('#000000'),
      primary: Color('#888888'),
      secondary: Color('#888888').lighten(0.2),
      highlight: Color('#888888').darken(0.2),
      accent: Color('#888888'),
      danger: Color('#888888').darken(0.3),
      surface1: Color.rgb('#888888').lighten(0.7),
      surface0: Color.rgb('#888888').lighten(0.6),
      base: Color('#ffffff'),
    }),
  },
  solarizedLight: {
    name: 'Solarized light',
    dark: false,
    variables: () => ({
      text: Color('#586e75'),
      primary: Color('#268bd2'),
      secondary: Color('#2aa198'),
      highlight: Color('#6c71c4'),
      accent: Color('#6c71c4'),
      danger: Color('#cb4b16'),
      surface1: Color.rgb('#eee8d5').darken(0.1),
      surface0: Color.rgb('#eee8d5'),
      base: Color('#fdf6e3'),
    }),
  },
  solarizedDark: {
    name: 'Solarized dark',
    dark: true,
    variables: () => ({
      text: Color('#586e75'),
      primary: Color('#268bd2'),
      secondary: Color('#2aa198'),
      highlight: Color('#6c71c4'),
      accent: Color('#6c71c4'),
      danger: Color('#cb4b16'),
      surface1: Color.rgb('#073642').darken(0.1),
      surface0: Color.rgb('#073642'),
      base: Color('#002b36'),
    }),
  },
  ocean: {
    name: 'Ocean',
    dark: true,
    variables: () => ({
      text: Color('#0ea5e9'),
      primary: Color('#38bdf8'),
      secondary: Color.rgb(147, 153, 178),
      danger: Color('#eab308'),
      highlight: Color('#eab308'),
      accent: Color('#7dd3fc'),
      surface1: Color('#075985').darken(0.1),
      surface0: Color('#0c4a6e').darken(0.1),
      base: Color('#082f49'),
    }),
  },
  deepOcean: {
    name: 'Deep ocean',
    dark: true,
    variables: () => ({
      text: Color('#146ead'),
      primary: Color('#2196f3'),
      secondary: Color.rgb(147, 153, 178),
      danger: Color('#ca8a04'),
      highlight: Color('#eab308'),
      accent: Color('#0284c7'),
      surface1: Color.hsl(232, 24, 20),
      surface0: Color.hsl(232, 24, 14),
      base: Color.hsl(234, 36, 10),
    }),
  },
}

export const getThemeList = () => {
  const entries = Object.entries(themes) as Entries<typeof themes>
  const mapped = entries.map(([key, value]) => ({ key, value }))
  return mapped.sort((a, b) => (a.value.name > b.value.name ? 1 : -1))
}
