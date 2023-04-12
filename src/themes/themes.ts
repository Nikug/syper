export type ThemeKey = keyof typeof themes

export interface ThemeVariables {
  name: string
  variables: ThemeVariable
}

type ThemeVariable = Record<string, string>

export type Themes = Record<ThemeKey, ThemeVariables>

export const themes = {
  'ctp-mocha': {
    name: 'Catppuccin Mocha',
    variables: {
      '--ctp-rosewater': '245, 224, 220',
      '--ctp-flamingo': '242, 205, 205',
      '--ctp-pink': '245, 194, 231',
      '--ctp-mauve': '203, 166, 247',
      '--ctp-red': '243, 139, 168',
      '--ctp-maroon': '235, 160, 172',
      '--ctp-peach': '250, 179, 135',
      '--ctp-yellow': '249, 226, 175',
      '--ctp-green': '166, 227, 161',
      '--ctp-teal': '148, 226, 213',
      '--ctp-sky': '137, 220, 235',
      '--ctp-sapphire': '116, 199, 236',
      '--ctp-blue': '137, 180, 250',
      '--ctp-lavender': '180, 190, 254',
      '--ctp-text': '205, 214, 244',
      '--ctp-subtext1': '186, 194, 222',
      '--ctp-subtext0': '166, 173, 200',
      '--ctp-overlay2': '147, 153, 178',
      '--ctp-overlay1': '127, 132, 156',
      '--ctp-overlay0': '108, 112, 134',
      '--ctp-surface2': '88, 91, 112',
      '--ctp-surface1': '69, 71, 90',
      '--ctp-surface0': '49, 50, 68',
      '--ctp-crust': '17, 17, 27',
      '--ctp-mantle': '24, 24, 37',
      '--ctp-base': '30, 30, 46',
    },
  },
  'ctp-latte': {
    name: 'Catppuccin Latte',
    variables: {
      '--ctp-rosewater': '220, 138, 120',
      '--ctp-flamingo': '221, 120, 120',
      '--ctp-pink': '234, 118, 203',
      '--ctp-mauve': '136, 57, 239',
      '--ctp-red': '210, 15, 57',
      '--ctp-maroon': '230, 69, 83',
      '--ctp-peach': '254, 100, 11',
      '--ctp-yellow': '223, 142, 29',
      '--ctp-green': '64, 160, 43',
      '--ctp-teal': '23, 146, 153',
      '--ctp-sky': '4, 165, 229',
      '--ctp-sapphire': '32, 159, 181',
      '--ctp-blue': '30, 102, 245',
      '--ctp-lavender': '114, 135, 253',
      '--ctp-text': '76, 79, 105',
      '--ctp-subtext1': '92, 95, 119',
      '--ctp-subtext0': '108, 111, 133',
      '--ctp-overlay2': '124, 127, 147',
      '--ctp-overlay1': '140, 143, 161',
      '--ctp-overlay0': '156, 160, 176',
      '--ctp-surface2': '172, 176, 190',
      '--ctp-surface1': '188, 192, 204',
      '--ctp-surface0': '204, 208, 218',
      '--ctp-crust': '220, 224, 232',
      '--ctp-mantle': '230, 233, 239',
      '--ctp-base': '239, 241, 245',
    },
  },
}
