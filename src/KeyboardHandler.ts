import { getRandomQuote, setQuote } from './App'

const handleKeyboard = (event: KeyboardEvent) => {
  if (event.key === 'Tab') {
    event.preventDefault()
    setQuote(getRandomQuote())
  }
}

export const SetupKeyboard = () => {
  window.addEventListener('keydown', handleKeyboard)
}

export const CleanupKeyboard = () => {
  window.removeEventListener('keydown', handleKeyboard)
}
