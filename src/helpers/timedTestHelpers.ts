import { createSignal, startTransition } from 'solid-js'
import { produce } from 'solid-js/store'
import { fromWritingToResults } from '../AnimationManager'
import { getDictionary } from '../assets/files'
import { TimedTestCharacters, TimerUpdateFrequency } from '../constants'
import { submitTestResult } from '../logic/testResult'
import { attempt, setAttempt, setTypingTest, typingTest, userOptions } from '../StateManager'
import { Attempt, Word, WordsJson } from '../types'
import { getRandomFromArray } from '../util'
import { handleTestEnd, parseWordMeasurements } from './stateHelpers'
import { Timer } from './timer'

const [timer, setTimer] = createSignal<Timer | null>(null)

export const startTimer = () => {
  const newTimer = new Timer(updateAttempt, TimerUpdateFrequency)
  newTimer.start()
  setTimer(newTimer)
}

export const stopTimer = () => {
  timer()?.stop()
}

const updateAttempt = () => {
  let isEnd = false
  const performanceNow = performance.now()
  setAttempt(
    produce((attempt) => {
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

  const textLength = attempt.finalText.length
  const lastWordIndex = typingTest().words.findIndex((word) => word.has(textLength - 1))

  setTypingTest({
    ...typingTest(),
    text: typingTest().text.substring(0, textLength),
    length: textLength,
    words: typingTest().words.slice(0, lastWordIndex + 1),
  })

  setAttempt(
    produce((attempt) => {
      attempt.measurements.words = parseWordMeasurements(attempt)
    })
  )

  startTransition(fromWritingToResults)
  submitTestResult(attempt, userOptions.textMode, userOptions.typingMode, typingTest())
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
