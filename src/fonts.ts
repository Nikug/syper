export const fonts = {
  Inconsolata: 'Inconsolata',
  'Roboto Mono': 'Roboto+Mono',
  'Source Code Pro': 'Source+Code+Pro',
  'Space Mono': 'Space+Mono',
  'Ubuntu Mono': 'Ubuntu+Mono',
  'Courier Prime': 'Courier+Prime',
  'Noto Sans Mono': 'Noto+Sans+Mono',
  'JetBrains Mono': 'JetBrains+Mono',
  'Share Tech Mono': 'Share+Tech+Mono',
  'Fira Mono': 'Fira+Mono',
  'Fragment Mono': 'Fragment+Mono',
  'Syne Mono': 'Syne+Mono',
  'DM Mono': 'DM+Mono',
  'Nova Mono': 'Nova+Mono',
  VT323: 'VT323',
  Sono: 'Sono',
}

export type Fonts = keyof typeof fonts

export const getFontList = (): Fonts[] => Object.keys(fonts).sort() as Fonts[]
