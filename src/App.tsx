import { Component, createSignal, onCleanup, onMount, Show } from 'solid-js'
import { createStore } from 'solid-js/store'
import quotesJson from './assets/quotes.json'
import { ProgressBar } from './components/ProgressBar'
import { QuoteInformation } from './components/QuoteInformation'
import { StatisticsContainer } from './components/StatisticsContainer'
import { TextContainer } from './components/TextContainer'
import { CleanupKeyboard, SetupKeyboard } from './KeyboardHandler'
import { Attempt, AttemptStates, QuotesJson, QuoteWithWords, Word } from './types'
import { getRandomFromArray } from './util'

const quotes = quotesJson as QuotesJson
export const getRandomQuote = () => getRandomFromArray(quotes.quotes)

const splitParagraph = (text: string): Word[] => {
  const words: Word[] = []
  let word: Word = new Map()
  for (let i = 0, limit = text.length; i < limit; i++) {
    if (text[i] !== ' ') {
      word.set(i, text[i])
    } else {
      words.push(word)
      words.push(new Map().set(i, ' '))
      word = new Map()
    }
  }

  words.push(word)
  return words
}

export const initQuote = () => {
  const randomQuote = getRandomQuote()
  return { ...randomQuote, words: splitParagraph(randomQuote.text) }
}
export const newAttempt = (): Attempt => ({
  state: AttemptStates.notStarted,
  allText: '',
  finalText: '',
  measurements: {
    startTime: null,
    endTime: null,
    words: [],
    timestamps: new Map(),
  },
})

export const resetAttempt = () => {
  setAttempt(newAttempt())
  setQuote(initQuote())
}

export const [quote, setQuote] = createSignal<QuoteWithWords>(initQuote())
export const [attempt, setAttempt] = createStore<Attempt>(newAttempt())

const App: Component = () => {
  onMount(() => SetupKeyboard())
  onCleanup(() => CleanupKeyboard())
  return (
    <div class="w-screen min-h-screen bg-ctp-base text-ctp-text">
      <Show when={attempt.state !== AttemptStates.completed}>
        <div class="grid grid-rows-3 h-screen justify-center">
          <div class="row-start-2 row-end-2 overflow-scroll max-w-5xl px-16 h-48 my-auto">
            <div class="h-8">
              <QuoteInformation />
            </div>
            <div class="h-32 overflow-hidden">
              <TextContainer attempt={attempt} quote={quote()} />
            </div>
            <div class="h-8">
              <Show when={attempt.state !== AttemptStates.completed}>
                <ProgressBar />
              </Show>
            </div>
          </div>
        </div>
      </Show>
      <Show when={attempt.state === AttemptStates.completed}>
        <div class="flex justify-center">
          <div class="max-w-5xl px-16">
            <StatisticsContainer attempt={attempt} quote={quote()} />
          </div>
        </div>
      </Show>
    </div>
  )
}

export default App
