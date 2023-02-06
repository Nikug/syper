import { attempt, getRandomQuote, setAttempt, setQuote } from './App'

const handleKeyboard = (event: KeyboardEvent) => {
  if (event.key === 'Tab') {
    event.preventDefault()
    setQuote(getRandomQuote())
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
  if (event.key === 'Backspace') {
    setAttempt({
      ...attempt(),
      finalText: attempt().finalText.substring(0, attempt().finalText.length - 1),
    })
  }

  if (event.key.length > 1) return
  setAttempt({
    finalText: attempt().finalText + event.key,
    allText: attempt().allText + event.key,
  })
}
