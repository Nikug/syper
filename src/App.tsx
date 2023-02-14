import { clsx } from 'clsx'
import {
  Component,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  Show,
  startTransition,
} from 'solid-js'
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
  AnimationStates,
  Animation,
  Attempt,
  AttemptStates,
  CatppuccinFlavour,
  catppuccinFlavours,
  QuotesJson,
  QuoteWithWords,
  Theme,
  Word,
} from './types'
import { getRandomFromArray, sleep } from './util'

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
  if (animationState().view === 'results') {
    startTransition(fromResultsToWriting)
  } else {
    setAttempt(newAttempt())
    setQuote(initQuote())
  }
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

export const [animationState, setAnimationState] = createSignal<Animation>({
  writingState: AnimationStates.shown,
  resultsState: AnimationStates.hidden,
  view: 'writing',
})

export const fromWritingToResults = async () => {
  setAnimationState({
    ...animationState(),
    writingState: AnimationStates.hidden,
    resultsState: AnimationStates.hidden,
  })
  await sleep(200)
  setAnimationState({ ...animationState(), view: 'results' })
  await sleep(0)
  setAnimationState({ ...animationState(), resultsState: AnimationStates.shown })
}
export const fromResultsToWriting = async () => {
  setAnimationState({ ...animationState(), resultsState: AnimationStates.hidden })
  await sleep(200)
  setAnimationState({ ...animationState(), view: 'writing' })
  await sleep(0)
  setAnimationState({ ...animationState(), writingState: AnimationStates.shown })
  setAttempt(newAttempt())
  setQuote(initQuote())
}

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
        <Show when={animationState().view === 'writing'}>
          <div
            class={clsx(
              animationState().writingState === AnimationStates.shown
                ? 'opacity-100 blur-none'
                : 'opacity-0 blur-lg',
              'transition-opacity duration-200 row-span-3 my-auto'
            )}
          >
            <div class="overflow-scroll max-w-5xl px-16 h-48">
              <div class="h-8">
                <QuoteInformation />
              </div>
              <div class="h-32 overflow-hidden">
                <TextContainer attempt={attempt} quote={quote()} />
              </div>
              <div class="h-8">
                <ProgressBar />
              </div>
            </div>
          </div>
        </Show>
        <Show when={animationState().view === 'results'}>
          <div
            class={clsx(
              animationState().resultsState === AnimationStates.shown
                ? 'opacity-100 blur-none'
                : 'opacity-0 blur-lg',
              'transition-opacity duration-200 row-span-4 '
            )}
          >
            <div class="flex justify-center">
              <div class="max-w-5xl px-16">
                <StatisticsContainer attempt={attempt} quote={quote()} />
              </div>
            </div>
          </div>
        </Show>
      </div>
    </div>
  )
}

export default App
