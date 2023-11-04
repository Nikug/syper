import Color from 'color'
import { createMemo } from 'solid-js'
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
      secondary: Color.rgb(147, 153, 178), // Wpm chart secondary line
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
      primary: Color('#fbdc12'),
      secondary: Color('#02fad5'),
      highlight: Color('#02fad5'),
      accent: Color('#fa4122'),
      danger: Color('#fc5157'),
      surface1: Color('#5f043d').darken(0.2),
      surface0: Color('#5f043d').darken(0.5),
      base: Color('#090f1f'),
    }),
  },
  blackAndWhite: {
    name: 'Black and white',
    dark: false,
    variables: () => ({
      text: Color('#000000'),
      primary: Color('#ffffff').darken(0.9),
      secondary: Color('#ffffff').darken(0.5),
      highlight: Color('#ffffff').darken(0.8),
      accent: Color('#ffffff').darken(0.8),
      danger: Color('#ffffff').darken(0.8),
      surface1: Color.rgb('#ffffff').darken(0.2),
      surface0: Color.rgb('#ffffff').darken(0.1),
      base: Color('#ffffff'),
    }),
  },
}

export const getThemeList = createMemo(() => {
  const entries = Object.entries(themes) as Entries<typeof themes>
  const mapped = entries.map(([key, value]) => ({ key, value }))
  return mapped.sort((a, b) => (a.value.name > b.value.name ? 1 : -1))
})
