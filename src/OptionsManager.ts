import { createStore } from 'solid-js/store'
import { CatppuccinFlavour, TextMode, UserOptions } from './types'

const UserOptionsStorageKey = 'userOptions'

const defaultUserOptions = (): UserOptions => ({
  theme: 'frappe',
  textMode: 'quote',
})

const getInitialUserOptions = (): UserOptions => {
  const options = localStorage.getItem(UserOptionsStorageKey)
  if (options) {
    const parsedOptions: UserOptions = JSON.parse(options)
    const mergedOptions = { ...defaultUserOptions(), ...parsedOptions }
    return mergedOptions
  }

  return defaultUserOptions()
}

export const [userOptions, setUserOptions] = createStore<UserOptions>(getInitialUserOptions())

export const persistUserOptions = () => {
  const jsonOptions = JSON.stringify(userOptions)
  localStorage.setItem(UserOptionsStorageKey, jsonOptions)
}

export const setTheme = (theme: CatppuccinFlavour) => setUserOptions('theme', theme)
export const setTextMode = (textMode: TextMode) => setUserOptions('textMode', textMode)
