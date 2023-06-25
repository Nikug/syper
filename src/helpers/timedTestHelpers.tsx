import { createSignal, startTransition } from 'solid-js'
import { produce } from 'solid-js/store'
import { fromWritingToResults } from '../AnimationManager'
import { getDictionary } from '../assets/files'
import { TimedTestCharacters } from '../constants'
import { submitTestResult } from '../logic/testResult'
import { attempt, setAttempt, setTypingTest, typingTest, userOptions } from '../StateManager'
import { Attempt, Word, WordsJson } from '../types'
import { getRandomFromArray } from '../util'
import { handleTestEnd, parseWordMeasurements } from './stateHelpers'

const [timer, setTimer] = createSignal<NodeJS.Timer | null>(null)

export const startTimer = () => {
  clearInterval(timer() ?? undefined)
  const interval = setInterval(updateAttempt, 1000)
  setTimer(interval)
}

export const stopTimer = () => {
  clearInterval(timer() ?? undefined)
}

const updateAttempt = () => {
  let isEnd = false
  setAttempt(
    produce((attempt) => {
      const performanceNow = performance.now()
      attempt.remainingDuration =
        (attempt.measurements.startTime ?? 0) + attempt.testDuration - performanceNow

      if (attempt.remainingDuration <= 0) {
        isEnd = true
        attempt = handleTestEnd(attempt, performanceNow)
      }
    })
  )

  if (isEnd) {
    endAttempt(attempt)
    return
  }

  extendText()
}

const endAttempt = (attempt: Attempt) => {
  stopTimer()

  setTypingTest({
    ...typingTest(),
    text: typingTest().text.substring(0, attempt.finalText.length),
    length: attempt.finalText.length,
  })

  setAttempt(
    produce((attempt) => {
      attempt.measurements.words = parseWordMeasurements(attempt)
    })
  )

  startTransition(fromWritingToResults)
  submitTestResult(attempt, userOptions.textMode, typingTest())
}

const extendText = async () => {
  let currentLength = typingTest().length
  let remainingTextLength = currentLength - attempt.finalText.length
  if (remainingTextLength >= TimedTestCharacters) {
    return
  }

  const testWords = typingTest().words
  let testText = typingTest().text
  const words: WordsJson = await getDictionary(userOptions.dictionary)

  while (remainingTextLength < TimedTestCharacters) {
    const newWord = getRandomFromArray(words.words)

    const word: Word = new Map()
    for (let i = 0, limit = newWord.length; i < limit; i++) {
      word.set(currentLength + i + 1, newWord[i])
    }

    const lastWord = testWords.at(-1)
    lastWord?.set(currentLength, ' ')
    testWords[testWords.length - 1] = new Map(lastWord)
    testWords.push(word)

    testText += ` ${newWord}`
    currentLength = testText.length
    remainingTextLength = currentLength - attempt.finalText.length
  }

  setTypingTest({ ...typingTest(), words: testWords, text: testText, length: testText.length })
}
