import { Component, createSignal, onCleanup, onMount } from 'solid-js'
import quotesJson from './assets/quotes.json'
import { CleanupKeyboard, SetupKeyboard } from './KeyboardHandler'
import { Quote, QuotesJson } from './types'
import { getRandomFromArray } from './util'

const quotes = quotesJson as QuotesJson
export const getRandomQuote = () => getRandomFromArray(quotes.quotes)
export const [quote, setQuote] = createSignal<Quote>(getRandomQuote())

const App: Component = () => {
  onMount(() => SetupKeyboard())
  onCleanup(() => CleanupKeyboard())
  return (
    <div class="text-center mt-16">
      <p class="font-bold text-lg">{quote().text}</p>
    </div>
  )
}

export default App
