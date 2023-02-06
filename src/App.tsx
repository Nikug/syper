import { Component, createSignal, onCleanup, onMount } from 'solid-js'
import quotesJson from './assets/quotes.json'
import { TextContainer } from './components/TextContainer'
import { CleanupKeyboard, SetupKeyboard } from './KeyboardHandler'
import { Attempt, Quote, QuotesJson } from './types'
import { getRandomFromArray } from './util'

const quotes = quotesJson as QuotesJson
export const getRandomQuote = () => getRandomFromArray(quotes.quotes)
export const newAttempt = (): Attempt => ({ allText: '', finalText: '' })
export const [quote, setQuote] = createSignal<Quote>(getRandomQuote())
export const [attempt, setAttempt] = createSignal<Attempt>(newAttempt())

const App: Component = () => {
  onMount(() => SetupKeyboard())
  onCleanup(() => CleanupKeyboard())
  return (
    <div>
      <TextContainer attempt={attempt()} quote={quote()} />
    </div>
  )
}

export default App
