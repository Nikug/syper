import { startTransition } from 'solid-js'
import { fromResultsToWriting, showingResults } from '../AnimationManager'
import { TimedTestWords } from '../constants'
import { attempt, newAttempt, setAttempt, setTypingTest, userOptions } from '../StateManager'
import { QuotesJson, Word, WordsJson, Quote, AttemptStates, Attempt } from '../types'
import { getRandomFromArray, replaceBadCharacters } from '../util'
import { isTimeMode } from './optionsHelpers'
import { startTimer, stopTimer } from './timedTestHelpers'

const getText = async (): Promise<Quote> => {
  if (userOptions.textMode === 'quote') {
    const quotes: QuotesJson = await import('../assets/monkeytype-quotes.json')
    return getRandomFromArray(quotes.quotes)
  } else if (userOptions.textMode === 'words') {
    const words: WordsJson = await import('../assets/english-1k.json')
    const text = generateText(userOptions.wordCount, words)
    return {
      id: 0,
      source: 'English 1k',
      text: text,
      length: text.length,
    }
  } else if (userOptions.textMode === 'time') {
    const words: WordsJson = await import('../assets/english-1k.json')

    // Generate enough words that it fills the three shown lines
    const text = generateText(TimedTestWords, words)
    return {
      id: 0,
      source: 'English 1k',
      text: text,
      length: text.length,
    }
  }

  return {
    id: 0,
    source: 'English 1k',
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
  attempt.measurements.timestamps.set(attempt.finalText.length, end)
  return attempt
}

export const testStarted = () => attempt.state === AttemptStates.started
