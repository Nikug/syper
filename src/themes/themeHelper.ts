import { ThemeKey, themes, ThemeVariables } from './themes'

export const getColor = (themeKey: ThemeKey, colorKey: string) => {
  const theme: ThemeVariables = themes[themeKey]
  const colors = theme.variables[colorKey].split(', ')
  return `#${colors.map((color) => Number(color).toString(16)).join('')}`
}
