import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Attempt, AttemptStates, TypingTest, UserOptions } from './types'

export const newAttempt = (options: UserOptions): Attempt => ({
  state: AttemptStates.notStarted,
  allText: '',
  finalText: '',
  testDuration: options.textMode === 'time' ? options.timeDuration : 0,
  remainingDuration: options.textMode === 'time' ? options.timeDuration : 0,
  measurements: {
    startTime: null,
    endTime: null,
    words: [],
    timestamps: new Map(),
  },
})

export const newText = (): TypingTest => ({
  id: 0,
  text: '',
  source: '',
  length: 0,
  words: [],
})

export const defaultUserOptions = (): UserOptions => ({
  theme: 'catppuccin-mocha',
  textMode: 'quote',
  wordCount: 50,
  timeDuration: 60,
  historyMode: 'tenDays',
})

export const [userOptions, setUserOptions] = createStore<UserOptions>(defaultUserOptions())
export const [typingTest, setTypingTest] = createSignal<TypingTest>(newText())
export const [attempt, setAttempt] = createStore<Attempt>(newAttempt(userOptions))
