import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Attempt, AttemptStates, TypingTest, UserOptions } from './types'

export const defaultUserOptions = (): UserOptions => ({
  theme: 'catppuccin-mocha',
  dictionary: 'english-200',
  quotes: 'quotes',
  textMode: 'quote',
  wordCount: 50,
  timeDuration: 60 * 1000,
  historyMode: 'tenDays',
})

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
    words: [],
    timestamps: new Map(),
  },
})

export const [userOptions, setUserOptions] = createStore<UserOptions>(defaultUserOptions())
export const [typingTest, setTypingTest] = createSignal<TypingTest>(newText())
export const [attempt, setAttempt] = createStore<Attempt>(newAttempt())
