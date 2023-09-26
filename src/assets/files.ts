import { QuotesJson, WordsJson } from '../types'

export const quotes = {
  quotes: {
    name: 'Quotes',
    import: async () => await import('./quotes/monkeytype-quotes.json'),
  },
} as const
export type Quotes = keyof typeof quotes

export const dictionaries = {
  'english-200': {
    name: 'English 200',
    import: async () => await import('./dictionaries/english-200.json'),
  },
  'english-1k': {
    name: 'English 1K',
    import: async () => await import('./dictionaries/english-1k.json'),
  },
  'finnish-1k': {
    name: 'Finnish 1K',
    import: async () => await import('./dictionaries/finnish-1k.json'),
  },
} as const

export type Dictionaries = keyof typeof dictionaries
export type DictionaryValue = { name: string; value: () => Promise<WordsJson> }

export const getDictionary = async (key: Dictionaries): Promise<WordsJson> => {
  let file = dictionaries[key]
  if (!file) {
    file = dictionaries['english-200']
  }

  return await file.import()
}

export const getQuotes = async (key: Quotes): Promise<QuotesJson> => {
  let file = quotes[key]
  if (!file) {
    file = quotes.quotes
  }

  return await file.import()
}

export const getDictionaryName = (key: Dictionaries) => dictionaries[key].name
export const getQuotesName = (key: Quotes) => quotes[key].name
