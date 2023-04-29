export type ThemeKey = keyof typeof themes

export interface ThemeVariables {
  name: string
  variables: ThemeVariable
}

type ThemeVariable = Record<string, string>

export type Themes = Record<ThemeKey, ThemeVariables>

export const themes = {
  'catppuccin-mocha': {
    name: 'Catppuccin Mocha',
    variables: {
      text: '205, 214, 244',
      primary: '203, 166, 247',
      danger: '243, 139, 168',
      highlight: '235, 160, 172',
      accent: '137, 180, 250',
      overlay2: '147, 153, 178',
      overlay1: '127, 132, 156',
      overlay0: '108, 112, 134',
      surface2: '88, 91, 112',
      surface1: '69, 71, 90',
      surface0: '49, 50, 68',
      base: '30, 30, 46',
    },
  },
  'catppuccin-latte': {
    name: 'Catppuccin Latte',
    variables: {
      text: '76, 79, 105',
      primary: '136, 57, 239',
      highlight: '230, 69, 83',
      accent: '30, 102, 245',
      danger: '210, 15, 57',
      overlay2: '124, 127, 147',
      overlay1: '140, 143, 161',
      overlay0: '156, 160, 176',
      surface2: '172, 176, 190',
      surface1: '188, 192, 204',
      surface0: '204, 208, 218',
      base: '239, 241, 245',
    },
  },
}
