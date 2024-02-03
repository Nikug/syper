import { Dictionaries, Quotes } from './assets/files'
import { HistoryMode } from './components/HistoricalStatisticsContainer'
import { ThemeKey } from './themes/themes'
import { Fonts } from './fonts'

export interface WordsJson {
  name: string
  words: string[]
}

export interface QuotesJson {
  language: string
  groups: number[][]
  quotes: Quote[]
}

export interface Quote {
  text: string
  source: string
  length: number
  id: number
}

export type TypingTest = Quote & {
  words: Word[]
}

export interface Attempt {
  finalText: string
  allText: string
  state: AttemptState
  measurements: Measurements
  testDuration: number
  remainingDuration: number
  personalBest: AttemptPersonalBest
}

export interface AttemptPersonalBest {
  isPersonalBest: boolean
  hasApprovedCorrectness: boolean
  previousPersonalBest?: number
}

export interface Measurements {
  startTime: number | null
  endTime: number | null
  timestamps: Map<number, number>
  errors: Map<number, number>
  words: WordMeasurement[]
}

export interface WordMeasurement {
  startIndex: number
  endIndex: number
  word: string
  startTime: number | null
  endTime: number | null
}

export const AttemptStates = {
  notStarted: 0,
  started: 1,
  completed: 2,
} as const

export type AttemptStateKey = keyof typeof AttemptStates
export type AttemptState = (typeof AttemptStates)[AttemptStateKey]

export type CharacterMode = 'default' | 'correct' | 'incorrect'

export type Word = Map<number, string>

export const AnimationStates = {
  hidden: 0,
  shown: 1,
} as const
export type AnimationStateKey = keyof typeof AnimationStates
export type AnimationState = (typeof AnimationStates)[AnimationStateKey]
export type View = 'writing' | 'results'
export interface Animation {
  writingState: AnimationState
  resultsState: AnimationState
  view: View
}

export type TextMode = 'quote' | 'words' | 'time'

export interface UserOptions {
  textMode: TextMode
  dictionary: Dictionaries
  quotes: Quotes
  theme: ThemeKey
  wordCount: number
  timeDuration: number
  historyMode: HistoryMode
  showProgressBar: boolean
  showProgressCounter: boolean
  showCapsLockIndicator: boolean
  showTextHighlight: boolean
  useSmoothScrolling: boolean
  historyPersonalBestMode: TextMode
  historyPersonalBestDictionary: Dictionaries
  historyTextModes: TextMode[]
  historyDictionaries: Dictionaries[]
  historyWordCounts: number[]
  historyDurations: number[]
  font: Fonts
}

export interface TestResultSum {
  tests: number
  characters: number
  words: number
  duration: number
  wordsPerMinute: number
  accuracy: number
  correctness: number
}

export interface PersonalBestCategory {
  textMode: string
  words?: number | null
  duration?: number | null
  source: string
}
