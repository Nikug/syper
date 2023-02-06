import { Component, createSignal, onCleanup, onMount } from 'solid-js'
import quotesJson from './assets/quotes.json'
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
    <div class="text-center mt-16">
      <p class="font-bold text-lg">{quote().text}</p>
      <p class="font-bold text-lg">{attempt().allText}</p>
      <p class="font-bold text-lg">{attempt().finalText}</p>
    </div>
  )
}

export default App
