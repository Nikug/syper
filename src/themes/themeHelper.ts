import { ThemeKey, themes, ThemeVariables } from './themes'

export const getColor = (themeKey: ThemeKey, colorKey: string, alpha = 1) => {
  const theme: ThemeVariables = themes[themeKey]
  const color = theme.variables[colorKey]
  return color.alpha(alpha).hexa()
}
