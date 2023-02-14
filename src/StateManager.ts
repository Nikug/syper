import { createSignal, startTransition } from 'solid-js'
import { createStore } from 'solid-js/store'
import quotesJson from './assets/quotes.json'
import { AnimationDuration } from './constants'
import {
  Attempt,
  Animation,
  AttemptStates,
  CatppuccinFlavour,
  QuotesJson,
  QuoteWithWords,
  Theme,
  Word,
  AnimationStates,
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

export const nextAttempt = async () => {
  if (animationState().view === 'results') {
    await startTransition(fromResultsToWriting)
  }
  setAttempt(newAttempt())
  setQuote(initQuote())
}

export const restartAttempt = async () => {
  if (animationState().view === 'results') {
    await startTransition(fromResultsToWriting)
  }
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
  })
  await sleep(AnimationDuration)
  setAnimationState({ ...animationState(), view: 'results' })
  await sleep(0)
  setAnimationState({ ...animationState(), resultsState: AnimationStates.shown })
}
export const fromResultsToWriting = async () => {
  setAnimationState({ ...animationState(), resultsState: AnimationStates.hidden })
  await sleep(AnimationDuration)
  setAnimationState({ ...animationState(), view: 'writing' })
  await sleep(0)
  setAnimationState({ ...animationState(), writingState: AnimationStates.shown })
  setAttempt(newAttempt())
  setQuote(initQuote())
}
