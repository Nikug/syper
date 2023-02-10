import { produce } from 'solid-js/store'
import { attempt, quote, resetAttempt, setAttempt } from './App'
import { Attempt, AttemptStates } from './types'
import { mapToString } from './util'

const preventDefaultCharacters: string[] = ["'", 'Tab', ' ', '?', '/']

const handleKeyboard = (event: KeyboardEvent) => {
  if (preventDefaultCharacters.includes(event.key)) {
    event.preventDefault()
  }

  if (event.key === 'Tab') {
    resetAttempt()
    return
  }

  handleCharacter(event)
}

export const SetupKeyboard = () => {
  window.addEventListener('keydown', handleKeyboard)
}

export const CleanupKeyboard = () => {
  window.removeEventListener('keydown', handleKeyboard)
}

const handleCharacter = (event: KeyboardEvent) => {
  if (attempt.state === AttemptStates.completed) return

  setAttempt(
    produce((attempt) => {
      // Handle backspace
      if (event.key === 'Backspace' && attempt.finalText.length > 0) {
        attempt.finalText = attempt.finalText.substring(0, attempt.finalText.length - 1)
        return attempt
      }

      // Don't handle other special characters
      if (event.key.length > 1) return

      // Handle start
      if (attempt.finalText.length === 0) {
        attempt.state = AttemptStates.started
        attempt.measurements.startTime = performance.now()
      }

      // Handle end
      if (attempt.finalText.length >= quote().length - 1) {
        attempt.state = AttemptStates.completed
        attempt.measurements.endTime = performance.now()
      }

      // Handle word
      attempt = handleWordMeasurement(attempt)

      attempt.finalText = attempt.finalText + event.key
      attempt.allText = attempt.allText + event.key

      return attempt
    })
  )
}

const handleWordMeasurement = (attempt: Attempt): Attempt => {
  const currentIndex = attempt.finalText.length
  const currentWord = quote().words.find((word) => word.has(currentIndex))
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
      startTime: performance.now(),
      endTime: null,
    })
  }

  // Is the last character
  if (!currentWord.has(currentIndex + 1)) {
    attempt.measurements.words = attempt.measurements.words.map((word) =>
      word.endIndex === currentIndex ? { ...word, endTime: performance.now() } : word
    )
  }

  return attempt
}
