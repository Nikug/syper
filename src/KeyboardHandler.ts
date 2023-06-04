import { startTransition } from 'solid-js'
import { produce } from 'solid-js/store'
import {
  attempt,
  typingTest,
  setAttempt,
} from './StateManager'
import { CharactersPerWord } from './constants'
import { Attempt, AttemptStates } from './types'
import { mapToString } from './util'
import { submitTestResult } from './logic/testResult'
import { userOptions } from './StateManager'
import { nextAttempt, restartAttempt } from './helpers/stateHelpers'
import { fromWritingToResults } from './AnimationManager'

const preventDefaultCharacters: string[] = ["'", 'Tab', ' ', '?', '/', 'Escape']

const handleKeyboard = (event: KeyboardEvent) => {
  if (preventDefaultCharacters.includes(event.key)) {
    event.preventDefault()
  }

  if (event.key === 'Tab') {
    nextAttempt()
    return
  }

  if (event.key === 'Escape') {
    restartAttempt()
    return
  }

  handleCharacter(event)
}

export const setupKeyboard = () => {
  window.addEventListener('keydown', handleKeyboard)
}

export const cleanupKeyboard = () => {
  window.removeEventListener('keydown', handleKeyboard)
}

const handleCharacter = (event: KeyboardEvent) => {
  if (attempt.state === AttemptStates.completed) return

  let isEnd = false
  setAttempt(
    produce((attempt) => {
      // Handle backspace
      if (event.key === 'Backspace' && attempt.finalText.length > 0) {
        if (event.ctrlKey) {
          const index = attempt.finalText.length - 1
          const word = typingTest().words.find((word) => word.has(index))
          if (!word) return attempt

          const wordStartIndex = word.entries().next().value[0]
          attempt.finalText = attempt.finalText.substring(0, wordStartIndex)
        } else {
          attempt.finalText = attempt.finalText.substring(0, attempt.finalText.length - 1)
        }
        return attempt
      }

      // Don't handle other special characters
      if (event.key.length > 1) return

      const performanceNow = performance.now()
      const isStart = attempt.finalText.length === 0
      isEnd = attempt.finalText.length === typingTest().length - 1

      // Handle start
      if (isStart) {
        attempt.state = AttemptStates.started
        attempt.measurements.startTime = performanceNow
      }

      // Handle end
      if (isEnd) {
        attempt.state = AttemptStates.completed
        attempt.measurements.endTime = performanceNow
      }

      // Handle word
      attempt = handleWordMeasurement(attempt, performanceNow)

      attempt.finalText = attempt.finalText + event.key
      attempt.allText = attempt.allText + event.key

      // Handle standardized timestamps
      if (attempt.finalText.length % CharactersPerWord === 0 || isEnd) {
        attempt.measurements.timestamps.set(attempt.finalText.length, performanceNow)
      }

      return attempt
    })
  )

  if (isEnd) {
    startTransition(fromWritingToResults)
    submitTestResult(attempt, userOptions.textMode, typingTest())
  }
}

const handleWordMeasurement = (attempt: Attempt, performanceNow: number): Attempt => {
  const currentIndex = attempt.finalText.length
  const currentWord = typingTest().words.find((word) => word.has(currentIndex))
  const currentMeasurement = attempt.measurements.words.find(
    (word) => word.startIndex <= currentIndex && word.endIndex >= currentIndex
  )
  if (!currentWord) return attempt

  // Is the first character
  if (!currentWord.has(currentIndex - 1) && !currentMeasurement) {
    attempt.measurements.words.push({
      startIndex: currentIndex,
      endIndex: currentIndex + currentWord.size - 1,
      word: mapToString(currentWord),
      startTime: performanceNow,
      endTime: null,
    })
  }

  // Is the last character
  if (!currentWord.has(currentIndex + 1)) {
    attempt.measurements.words = attempt.measurements.words.map((word) =>
      word.endIndex === currentIndex ? { ...word, endTime: performanceNow } : word
    )
  }

  return attempt
}
