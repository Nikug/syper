import { startTransition } from 'solid-js'
import { fromResultsToWriting, showingResults } from '../AnimationManager'
import { getDictionary, getQuotes } from '../assets/files'
import { TimedTestWords } from '../constants'
import {
  attempt,
  newAttempt,
  setAttempt,
  setTypingTest,
  typingTest,
  userOptions,
} from '../StateManager'
import {
  QuotesJson,
  Word,
  WordsJson,
  Quote,
  AttemptStates,
  Attempt,
  WordMeasurement,
} from '../types'
import { getRandomFromArray, replaceBadCharacters } from '../util'
import { isTimeMode } from './optionsHelpers'
import { startTimer, stopTimer } from './timedTestHelpers'

const getText = async (): Promise<Quote> => {
  if (userOptions.textMode === 'quote') {
    const quotes: QuotesJson = await getQuotes(userOptions.quotes)
    return getRandomFromArray(quotes.quotes)
  } else if (userOptions.textMode === 'words') {
    const words: WordsJson = await getDictionary(userOptions.dictionary)
    const text = generateText(userOptions.wordCount, words)
    return {
      id: 0,
      source: words.name,
      text: text,
      length: text.length,
    }
  } else if (userOptions.textMode === 'time') {
    const words: WordsJson = await getDictionary(userOptions.dictionary)

    // Generate enough words that it fills the three shown lines
    const text = generateText(TimedTestWords, words)
    return {
      id: 0,
      source: words.name,
      text: text,
      length: text.length,
    }
  }

  return {
    id: 0,
    source: '',
    text: '',
    length: 0,
  }
}

const generateText = (length: number, words: WordsJson) => {
  const text: string[] = []
  for (let i = 0, limit = length; i < limit; i++) {
    text.push(getRandomFromArray(words.words))
  }

  return text.join(' ')
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

export const nextAttempt = async () => {
  if (showingResults()) {
    await startTransition(fromResultsToWriting)
  }
  stopTimer()
  setAttempt(newAttempt())
  setTypingTest(await initializeText())
}

export const restartAttempt = async () => {
  if (showingResults()) {
    await startTransition(fromResultsToWriting)
  }
  stopTimer()
  setAttempt(newAttempt())
}

export const handleTestStart = (attempt: Attempt, start: number) => {
  if (isTimeMode()) {
    startTimer()
    attempt.testDuration = userOptions.timeDuration
    attempt.remainingDuration = userOptions.timeDuration
  }

  attempt.state = AttemptStates.started
  attempt.measurements.startTime = start
  return attempt
}

export const handleTestEnd = (attempt: Attempt, end: number) => {
  attempt.state = AttemptStates.completed
  attempt.measurements.endTime = end
  return attempt
}

export const testStarted = () => attempt.state === AttemptStates.started

export const parseWordMeasurements = (attempt: Attempt): WordMeasurement[] => {
  const text = typingTest().text
  const entries = attempt.measurements.timestamps.entries()
  const words: WordMeasurement[] = []
  let word: WordMeasurement | null = null

  for (const [key, value] of entries) {
    if (text[key] == null) {
      continue
    }

    if (word == null) {
      word = {
        startTime: value,
        endTime: value,
        startIndex: key,
        endIndex: key,
        word: text[key],
      }
      continue
    }

    word.word += text[key]
    word.endTime = value
    word.endIndex = key
    if (text[key] === ' ') {
      words.push(word)
      word = null
    }
  }

  if (word != null) {
    words.push(word)
  }

  return words
}
