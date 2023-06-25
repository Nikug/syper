import { startTransition } from 'solid-js'
import { produce } from 'solid-js/store'
import { attempt, typingTest, setAttempt } from './StateManager'
import { Attempt, AttemptStates } from './types'
import { submitTestResult } from './logic/testResult'
import { userOptions } from './StateManager'
import {
  handleTestEnd,
  handleTestStart,
  nextAttempt,
  parseWordMeasurements,
  restartAttempt,
} from './helpers/stateHelpers'
import { fromWritingToResults } from './AnimationManager'
import { isTimeMode } from './helpers/optionsHelpers'

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
  const isTimedTest = isTimeMode()
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
      isEnd = !isTimedTest && attempt.finalText.length === typingTest().length - 1

      if (isStart) {
        attempt = handleTestStart(attempt, performanceNow)
      }

      if (isEnd) {
        attempt = handleTestEnd(attempt, performanceNow)
      }

      attempt = handleTimestamp(attempt, performanceNow, event.key)

      attempt.finalText = attempt.finalText + event.key
      attempt.allText = attempt.allText + event.key

      return attempt
    })
  )

  if (isEnd) {
    handlePostTest()
  }
}

const handlePostTest = () => {
  setAttempt(
    produce((attempt) => {
      attempt.measurements.words = parseWordMeasurements(attempt)
      return attempt
    })
  )
  startTransition(fromWritingToResults)
  submitTestResult(attempt, userOptions.textMode, typingTest())
}

const handleTimestamp = (attempt: Attempt, performanceNow: number, key: string): Attempt => {
  const currentIndex = attempt.finalText.length
  const isError = typingTest().text[currentIndex] !== key

  attempt.measurements.timestamps.set(currentIndex, performanceNow)
  if (isError) {
    const currentErrors = attempt.measurements.errors.get(currentIndex)
    if (currentErrors == null) {
      attempt.measurements.errors.set(currentIndex, 1)
    } else {
      attempt.measurements.errors.set(currentIndex, currentErrors + 1)
    }
  }

  return attempt
}
