import { ThemeKey } from './themes/themes'

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
}

export interface Measurements {
  startTime: number | null
  endTime: number | null
  words: WordMeasurement[]
  timestamps: WordsPerMinuteTimestamp
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
export type WordsPerMinuteTimestamp = Map<number, number>

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

export type TextMode = 'quote' | 'words'

export interface UserOptions {
  textMode: TextMode
  theme: ThemeKey
  wordCount: number
}

export interface DatabaseTestResultInput {
  userId: string
  textMode: TextMode
  quoteId?: string
  source: string
  characters: number
  words: number
  duration: number
  wordsPerMinute: number
  accuracy: number
  correctness: number
}

export interface DatabaseTestResult extends DatabaseTestResultInput {
  id: string
  date: string
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
