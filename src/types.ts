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

export interface Attempt {
  finalText: string
  allText: string
}

export type CharacterMode = 'default' | 'correct' | 'incorrect'
