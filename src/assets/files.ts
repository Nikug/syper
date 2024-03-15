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
  'english-10k': {
    name: 'English 10K',
    import: async () => await import('./dictionaries/english-10k.json'),
  },
  'english-67k': {
    name: 'English 67K',
    import: async () => await import('./dictionaries/english-67k.json'),
  },
  'finnish-1k': {
    name: 'Finnish 1K',
    import: async () => await import('./dictionaries/finnish-1k.json'),
  },
  'finnish-100k': {
    name: 'Finnish 100K',
    import: async () => await import('./dictionaries/finnish-100k.json'),
  },
} as const

export type Dictionaries = keyof typeof dictionaries
export type DictionaryValue = { name: string; value: () => Promise<WordsJson> }

export const getDictionary = async (key: Dictionaries): Promise<WordsJson> => {
  let file = dictionaries[key]
  if (!file) {
    file = dictionaries['english-200']
  }

  const json = await file.import()
  return { id: key, name: json.name, words: json.words }
}

export const getQuotes = async (key: Quotes): Promise<QuotesJson> => {
  let file = quotes[key]
  if (!file) {
    file = quotes.quotes
  }

  const json = await file.import()
  return { id: key, language: json.language, quotes: json.quotes, groups: json.groups }
}

export const getDictionaryName = (key: Dictionaries | undefined) =>
  key ? dictionaries[key]?.name ?? '' : ''
export const getQuotesName = (key: Quotes) => quotes[key].name
