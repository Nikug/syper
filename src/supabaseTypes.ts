import { TextMode, UserOptions } from './types'

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

export interface DatabaseUserOptionsInput
  extends Omit<
    UserOptions,
    'historyTextModes' | 'historyDictionaries' | 'historyWordCounts' | 'historyDurations'
  > {
  userId: string
  historyTextModes: string
  historyDictionaries: string
  historyWordCounts: string
  historyDurations: string
}

export interface DatabaseUserOptions extends DatabaseUserOptionsInput {
  id: number
  date: Date
}

export interface DatabasePersonalBestInput {
  userId: string
  date: Date
  testId: string
  textMode: string
  source: string
  words?: number
  duration?: number
  wordsPerMinute: number
}

export interface DatabasePersonalBest extends DatabasePersonalBestInput {
  id: string
  date: Date
}
