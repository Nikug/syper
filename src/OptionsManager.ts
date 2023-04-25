import { createStore } from 'solid-js/store'
import { getUserOptions, saveUserOptions } from './api/userOptions'
import { isSignedIn } from './authentication/Authentication'
import { nextAttempt } from './StateManager'
import { startSyncing, stopSyncing } from './SyncingManager'
import { setTheme } from './themes/ThemeManager'
import { TextMode, UserOptions } from './types'

const UserOptionsStorageKey = 'userOptions'

const defaultUserOptions = (): UserOptions => ({
  theme: 'ctp-latte',
  textMode: 'quote',
  wordCount: 50,
})

export const getStoredUserOptions = async (): Promise<UserOptions> => {
  let options: UserOptions | null = null
  if (isSignedIn()) {
    try {
      options = await getUserOptions()
    } catch (e) {
      console.error(e)
    }
  }

  if (options === null) {
    const optionsString = localStorage.getItem(UserOptionsStorageKey)
    if (optionsString) {
      options = JSON.parse(optionsString)
    }
  }

  if (options) {
    options = { ...defaultUserOptions(), ...options }
  } else {
    options = defaultUserOptions()
  }

  setTheme(options.theme)

  return options
}

export const [userOptions, setUserOptions] = createStore<UserOptions>(defaultUserOptions())

export const persistUserOptions = async () => {
  if (isSignedIn()) {
    try {
      startSyncing()
      const success = await saveUserOptions(userOptions)
      return success
    } finally {
      stopSyncing()
    }
  } else {
    const jsonOptions = JSON.stringify(userOptions)
    localStorage.setItem(UserOptionsStorageKey, jsonOptions)
    return true
  }
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
