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

export interface DatabaseUserOptionsInput extends UserOptions {
  userId: string
}

export interface DatabaseUserOptions extends DatabaseUserOptionsInput {
  id: number
  date: Date
}
