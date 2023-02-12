import { Component, createEffect, createSignal, onCleanup, onMount, Show } from 'solid-js'
import { createStore } from 'solid-js/store'
import quotesJson from './assets/quotes.json'
import { Header } from './components/Header'
import { ProgressBar } from './components/ProgressBar'
import { QuoteInformation } from './components/QuoteInformation'
import { StatisticsContainer } from './components/StatisticsContainer'
import { TextContainer } from './components/TextContainer'
import { ThemeStorageKey } from './constants'
import { CleanupKeyboard, SetupKeyboard } from './KeyboardHandler'
import {
  Attempt,
  AttemptStates,
  CatppuccinFlavour,
  catppuccinFlavours,
  QuotesJson,
  QuoteWithWords,
  Theme,
  Word,
} from './types'
import { getRandomFromArray } from './util'

const quotes = quotesJson as QuotesJson
export const getRandomQuote = () => getRandomFromArray(quotes.quotes)

const splitParagraph = (text: string): Word[] => {
  const words: Word[] = []
  let word: Word = new Map()
  for (let i = 0, limit = text.length; i < limit; i++) {
    word.set(i, text[i])
    if (text[i] === ' ') {
      words.push(word)
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

export const nextAttempt = () => {
  setAttempt(newAttempt())
  setQuote(initQuote())
}

export const restartAttempt = () => {
  setAttempt(newAttempt())
}

export const [quote, setQuote] = createSignal<QuoteWithWords>(initQuote())
export const [attempt, setAttempt] = createStore<Attempt>(newAttempt())

export const [catppuccinFlavour, setCatppuccinFlavour] = createSignal<Theme>({
  flavour: 'mocha',
  class: 'ctp-mocha',
})
export const setTheme = (flavour: CatppuccinFlavour): Theme =>
  setCatppuccinFlavour({ flavour, class: `ctp-${flavour}` })

const App: Component = () => {
  onMount(() => {
    const storedTheme = localStorage.getItem(ThemeStorageKey)
    if (storedTheme && Object.keys(catppuccinFlavours).includes(storedTheme)) {
      setTheme(storedTheme as CatppuccinFlavour)
    }
    SetupKeyboard()
  })
  onCleanup(() => CleanupKeyboard())

  createEffect(() => {
    document.body.className = catppuccinFlavour().class
    localStorage.setItem(ThemeStorageKey, catppuccinFlavour().flavour)
  })

  return (
    <div class="w-screen min-h-screen bg-ctp-base text-ctp-text">
      <div class="grid grid-rows-5 min-h-screen justify-center">
        <div class="row-span-1">
          <Header />
        </div>
        <Show when={attempt.state !== AttemptStates.completed}>
          <div class="row-span-3 overflow-scroll max-w-5xl px-16 h-48 my-auto">
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
        </Show>
        <Show when={attempt.state === AttemptStates.completed}>
          <div class="row-span-4 flex justify-center">
            <div class="max-w-5xl px-16">
              <StatisticsContainer attempt={attempt} quote={quote()} />
            </div>
          </div>
        </Show>
      </div>
    </div>
  )
}

export default App
