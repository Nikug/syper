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

export type QuoteWithWords = Quote & {
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
}

export interface Statistics {
  wordsPerMinute: number
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
