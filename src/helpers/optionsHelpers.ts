import { getUserOptions, saveUserOptions } from '../api/userOptions'
import { isSignedIn } from '../authentication/Authentication'
import { HistoryMode } from '../components/HistoricalStatisticsContainer'
import { nextAttempt } from '../helpers/stateHelpers'
import { defaultUserOptions, setUserOptions, userOptions } from '../StateManager'
import { startSyncing, stopSyncing } from '../SyncingManager'
import { setTheme } from '../themes/ThemeManager'
import { TextMode, UserOptions } from '../types'

const UserOptionsStorageKey = 'userOptions'

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

export const isTimeMode = () => userOptions.textMode === 'time'
export const isQuoteMode = () => userOptions.textMode === 'quote'
export const isWordsMode = () => userOptions.textMode === 'words'
