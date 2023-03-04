import { userOptions } from '../OptionsManager'
import { QuotesJson, Word, WordsJson, Quote } from '../types'
import { getRandomFromArray, replaceBadCharacters } from '../util'

const getText = async (): Promise<Quote> => {
  if (userOptions.textMode === 'quote') {
    const quotes: QuotesJson = await import('../assets/monkeytype-quotes.json')
    return getRandomFromArray(quotes.quotes)
  } else {
    const words: WordsJson = await import('../assets/english-1k.json')
    const text: string[] = []
    for (let i = 0, limit = 50; i < limit; i++) {
      text.push(getRandomFromArray(words.words))
    }
    const finalText = text.join(' ')
    return {
      id: 0,
      source: 'English 1k',
      text: finalText,
      length: finalText.length,
    }
  }
}

const splitParagraph = (text: string): Word[] => {
  const words: Word[] = []
  let word: Word = new Map()
  for (let i = 0, limit = text.length; i < limit; i++) {
    word.set(i, text[i])
    if (text[i] === ' ') {
      words.push(word)
      word = new Map()
    }
  }

  words.push(word)
  return words
}

export const initializeText = async () => {
  const randomQuote = await getText()
  randomQuote.text = replaceBadCharacters(randomQuote.text)
  return { ...randomQuote, words: splitParagraph(randomQuote.text) }
}
