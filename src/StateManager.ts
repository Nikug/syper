import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Attempt, AttemptStates, TextMode, TypingTest, UserOptions } from './types'
import { DatabasePersonalBest } from './supabaseTypes'
import { Dictionaries } from './assets/files'

const defaultOptions: UserOptions = {
  theme: 'catppuccin-mocha',
  dictionary: 'english-200',
  quotes: 'quotes',
  textMode: 'words',
  wordCount: 25,
  timeDuration: 60 * 1000,
  historyMode: 'tenDays',
  showProgressBar: true,
  showProgressCounter: false,
  showCapsLockIndicator: true,
  showTextHighlight: true,
  useSmoothScrolling: true,
  historyPersonalBestMode: 'words',
  historyPersonalBestDictionary: 'english-200',
  historyTextModes: [] as TextMode[],
  historyDictionaries: [] as Dictionaries[],
  historyWordCounts: [] as number[],
  historyDurations: [] as number[],
} as const

export const defaultUserOptions = (): UserOptions => ({ ...defaultOptions })

export const newText = (): TypingTest => ({
  id: 0,
  text: '',
  source: '',
  length: 0,
  words: [],
})

export const newAttempt = (): Attempt => ({
  state: AttemptStates.notStarted,
  allText: '',
  finalText: '',
  testDuration: 0,
  remainingDuration: 0,
  measurements: {
    startTime: null,
    endTime: null,
    timestamps: new Map(),
    errors: new Map(),
    words: [],
  },
  personalBest: {
    isPersonalBest: false,
    hasApprovedCorrectness: false,
  },
})

export const [userOptions, setUserOptions] = createStore<UserOptions>(defaultUserOptions())
export const [typingTest, setTypingTest] = createSignal<TypingTest>(newText())
export const [attempt, setAttempt] = createStore<Attempt>(newAttempt())
export const [personalBests, setPersonalBests] = createStore<DatabasePersonalBest[]>([])
