import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { getUserOptions, saveUserOptions } from './api/userOptions'
import { isSignedIn } from './authentication/Authentication'
import { nextAttempt } from './StateManager'
import { CatppuccinFlavour, TextMode, UserOptions } from './types'

const UserOptionsStorageKey = 'userOptions'

const defaultUserOptions = (): UserOptions => ({
  theme: 'frappe',
  textMode: 'quote',
  wordCount: 50,
})

export const getStoredUserOptions = async (): Promise<UserOptions> => {
  let options: UserOptions | null = null
  if (isSignedIn()) {
    options = await getUserOptions()
  } else {
    const optionsString = localStorage.getItem(UserOptionsStorageKey)
    if (optionsString) {
      options = JSON.parse(optionsString)
    }
  }

  if (options) {
    const mergedOptions = { ...defaultUserOptions(), ...options }
    return mergedOptions
  }

  return defaultUserOptions()
}

export const [userOptions, setUserOptions] = createStore<UserOptions>(defaultUserOptions())
export const [syncing, setSyncing] = createSignal<boolean>(false)

export const persistUserOptions = async () => {
  if (isSignedIn()) {
    setSyncing(true)
    const success = await saveUserOptions(userOptions)
    setSyncing(false)
    return success
  } else {
    const jsonOptions = JSON.stringify(userOptions)
    localStorage.setItem(UserOptionsStorageKey, jsonOptions)
    return true
  }
}

export const setTheme = async (theme: CatppuccinFlavour) => {
  setUserOptions('theme', theme)
  await persistUserOptions()
}

export const setTextMode = async (textMode: TextMode) => {
  setUserOptions('textMode', textMode)
  await nextAttempt()
  await persistUserOptions()
}

export const setWordCount = async (count: number) => {
  setUserOptions('wordCount', count)
  await nextAttempt()
  await persistUserOptions()
}
