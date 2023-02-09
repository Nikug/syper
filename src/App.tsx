import { Component, createSignal, onCleanup, onMount, Show } from 'solid-js'
import { createStore } from 'solid-js/store'
import quotesJson from './assets/quotes.json'
import { ProgressBar } from './components/ProgressBar'
import { QuoteInformation } from './components/QuoteInformation'
import { StatisticsContainer } from './components/StatisticsContainer'
import { TextContainer } from './components/TextContainer'
import { CleanupKeyboard, SetupKeyboard } from './KeyboardHandler'
import { Attempt, AttemptStates, Quote, QuotesJson } from './types'
import { getRandomFromArray } from './util'

const quotes = quotesJson as QuotesJson
export const getRandomQuote = () => getRandomFromArray(quotes.quotes)
export const newAttempt = (): Attempt => ({
  state: AttemptStates.notStarted,
  allText: '',
  finalText: '',
  measurements: {
    startTime: null,
    endTime: null,
  },
})

export const resetAttempt = () => {
  setAttempt(newAttempt())
  setQuote(getRandomQuote())
}

export const [quote, setQuote] = createSignal<Quote>(getRandomQuote())
export const [attempt, setAttempt] = createStore<Attempt>(newAttempt())

const App: Component = () => {
  onMount(() => SetupKeyboard())
  onCleanup(() => CleanupKeyboard())
  return (
    <div class="w-screen bg-ctp-base text-ctp-text">
      <div class="grid grid-rows-3 h-screen justify-center">
        <div class="row-start-2 row-end-2 overflow-scroll max-w-5xl px-16 h-48 my-auto">
          <div class="h-8">
            <QuoteInformation />
          </div>
          <div class="h-32 overflow-hidden">
            <Show when={attempt.state === AttemptStates.completed}>
              <StatisticsContainer attempt={attempt} quote={quote()} />
            </Show>
            <Show when={attempt.state !== AttemptStates.completed}>
              <TextContainer attempt={attempt} quote={quote()} />
            </Show>
          </div>
          <div class="h-8">
            <Show when={attempt.state !== AttemptStates.completed}>
              <ProgressBar />
            </Show>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
