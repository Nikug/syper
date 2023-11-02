import { getUserOptions, saveUserOptions } from '../api/userOptions'
import { Dictionaries, Quotes } from '../assets/files'
import { isSignedIn } from '../authentication/Supabase'
import { HistoryMode } from '../components/HistoricalStatisticsContainer'
import { nextAttempt } from '../helpers/stateHelpers'
import { defaultUserOptions, setUserOptions, userOptions } from '../StateManager'
import { startSyncing, stopSyncing } from '../SyncingManager'
import { setTheme } from '../themes/ThemeManager'
import { TextMode, UserOptions } from '../types'

const UserOptionsStorageKey = 'userOptions'

const createValidOptions = (options: Partial<UserOptions> | null) => {
  const defaultOptions = defaultUserOptions()
  if (!options) return defaultOptions

  const keys = Object.keys(defaultOptions)
  /* eslint-disable @typescript-eslint/no-explicit-any */
  keys.forEach((key: any) => {
    // @ts-expect-error Any can be used to index object.
    defaultOptions[key] = Object.hasOwn(options, key) ? options[key] : defaultOptions[key]
  })
  /* eslint-enable*/

  return defaultOptions
}

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

  const fullOptions = createValidOptions(options)
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

export const setDictionary = async (dictionary: Dictionaries) => {
  setUserOptions('dictionary', dictionary)
  await nextAttempt()
  await persistUserOptions()
}

export const setQuotes = async (quotes: Quotes) => {
  setUserOptions('quotes', quotes)
  await nextAttempt()
  await persistUserOptions()
}

export const setShowProgressBar = async (show: boolean) => {
  setUserOptions('showProgressBar', show)
  await persistUserOptions()
}

export const setShowProgressCounter = async (show: boolean) => {
  setUserOptions('showProgressCounter', show)
  await persistUserOptions()
}

export const setShowCapsLockIndicator = async (show: boolean) => {
  setUserOptions('showCapsLockIndicator', show)
  await persistUserOptions()
}

export const isTimeMode = () => userOptions.textMode === 'time'
export const isQuoteMode = () => userOptions.textMode === 'quote'
export const isWordsMode = () => userOptions.textMode === 'words'
