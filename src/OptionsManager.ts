import { createStore } from 'solid-js/store'
import { getUserOptions, saveUserOptions } from './api/userOptions'
import { isSignedIn } from './authentication/Authentication'
import { HistoryMode } from './components/HistoricalStatisticsContainer'
import { nextAttempt } from './StateManager'
import { startSyncing, stopSyncing } from './SyncingManager'
import { setTheme } from './themes/ThemeManager'
import { TextMode, UserOptions } from './types'

const UserOptionsStorageKey = 'userOptions'

const defaultUserOptions = (): UserOptions => ({
  theme: 'catppuccin-mocha',
  textMode: 'quote',
  wordCount: 50,
  timeDuration: 60,
  historyMode: 'tenDays',
})

export const getStoredUserOptions = async (): Promise<UserOptions> => {
  let options: Partial<UserOptions> | null = null
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

  const fullOptions = options ? { ...defaultUserOptions(), ...options } : defaultUserOptions()
  setTheme(fullOptions.theme)

  return fullOptions
}

export const [userOptions, setUserOptions] = createStore<UserOptions>(defaultUserOptions())

export const persistUserOptions = async () => {
  const jsonOptions = JSON.stringify(userOptions)
  localStorage.setItem(UserOptionsStorageKey, jsonOptions)

  if (isSignedIn()) {
    try {
      startSyncing()
      const success = await saveUserOptions(userOptions)
      return success
    } finally {
      stopSyncing()
    }
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

export const setTimeDuration = async (count: number) => {
  setUserOptions('timeDuration', count)
  await nextAttempt()
  await persistUserOptions()
}

export const setHistoryMode = async (historyMode: HistoryMode) => {
  setUserOptions('historyMode', historyMode)
  await persistUserOptions()
}
