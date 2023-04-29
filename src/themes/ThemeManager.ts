import { persistUserOptions, setUserOptions } from '../OptionsManager'
import { ThemeKey, themes, ThemeVariables } from './themes'

export const setTheme = async (theme: ThemeKey) => {
  if (!isValidTheme(theme)) {
    theme = 'catppuccin-mocha'
  }

  setUserOptions('theme', theme)
  setCssVariables(themes[theme])
  await persistUserOptions()
}

const setCssVariables = (theme: ThemeVariables) => {
  const root = document.documentElement
  Object.entries(theme.variables).map(([key, value]) =>
    root.style.setProperty(`--theme-${key}`, value.rgb().array().join())
  )
}

const isValidTheme = (theme: string): boolean => {
  return Object.keys(themes).includes(theme)
}
