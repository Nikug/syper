import { produce } from 'solid-js/store'
import { attempt, quote, resetAttempt, setAttempt } from './App'
import { AttemptStates } from './types'

const preventDefaultCharacters: string[] = ["'", 'Tab', ' ']

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

      attempt.finalText = attempt.finalText + event.key
      attempt.allText = attempt.allText + event.key

      return attempt
    })
  )
}
