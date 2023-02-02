import { Component, createSignal } from 'solid-js'
import quotesJson from './assets/quotes.json'
import { Quote, QuotesJson } from './types'
import { getRandomFromArray } from './util'

const quotes = quotesJson as QuotesJson

const App: Component = () => {
  const [quote, setQuote] = createSignal<Quote>(getRandomFromArray(quotes.quotes))
  return (
    <div class="text-center mt-16">
      <p class="font-bold text-lg">
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
    </div>
  )
}

export default App
