import Color from 'color'

export type ThemeKey = keyof typeof themes

export interface ThemeVariables {
  name: string
  variables: ThemeVariable
}

type ThemeVariable = Record<string, Color>

export type Themes = Record<ThemeKey, ThemeVariables>

export const themes = {
  'catppuccin-mocha': {
    name: 'Catppuccin Mocha',
    variables: {
      text: Color.rgb(205, 214, 244),
      primary: Color.rgb(203, 166, 247),
      danger: Color.rgb(243, 139, 168),
      highlight: Color.rgb(235, 160, 172),
      accent: Color.rgb(137, 180, 250),
      overlay2: Color.rgb(147, 153, 178),
      overlay1: Color.rgb(127, 132, 156),
      overlay0: Color.rgb(108, 112, 134),
      surface2: Color.rgb(88, 91, 112),
      surface1: Color.rgb(69, 71, 90),
      surface0: Color.rgb(49, 50, 68),
      base: Color.rgb(30, 30, 46),
    },
  },
  'catppuccin-latte': {
    name: 'Catppuccin Latte',
    variables: {
      text: Color.rgb(76, 79, 105),
      primary: Color.rgb(136, 57, 239),
      highlight: Color.rgb(230, 69, 83),
      accent: Color.rgb(30, 102, 245),
      danger: Color.rgb(210, 15, 57),
      overlay2: Color.rgb(124, 127, 147),
      overlay1: Color.rgb(140, 143, 161),
      overlay0: Color.rgb(156, 160, 176),
      surface2: Color.rgb(172, 176, 190),
      surface1: Color.rgb(188, 192, 204),
      surface0: Color.rgb(204, 208, 218),
      base: Color.rgb(239, 241, 245),
    },
  },
}
