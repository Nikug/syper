import { createSignal, startTransition } from 'solid-js'
import { createStore } from 'solid-js/store'
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
  TextMode,
  WordsJson,
  Quote,
} from './types'
import { getRandomFromArray, replaceBadQuotes, sleep } from './util'

// Text mode
export const [textMode, setTextMode] = createSignal<TextMode>('words')

// Helpers

const getText = async (): Promise<Quote> => {
  if (textMode() === 'quote') {
    const quotes: QuotesJson = await import('./assets/monkeytype-quotes.json')
    return getRandomFromArray(quotes.quotes)
  } else {
    const words: WordsJson = await import('./assets/english-1k.json')
    const text: string[] = []
    for (let i = 0, limit = 50; i < limit; i++) {
      text.push(getRandomFromArray(words.words))
    }
    const finalText = text.join(' ')
    return {
      id: 0,
      source: 'words',
      text: finalText,
      length: finalText.length,
    }
  }
}

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

export const initQuote = async () => {
  const randomQuote = await getText()
  randomQuote.text = replaceBadQuotes(randomQuote.text)
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
  setQuote(await initQuote())
}

export const restartAttempt = async () => {
  if (animationState().view === 'results') {
    await startTransition(fromResultsToWriting)
  }
  setAttempt(newAttempt())
}

// Main signals and stores
export const [quote, setQuote] = createSignal<QuoteWithWords>(await initQuote())
export const [attempt, setAttempt] = createStore<Attempt>(newAttempt())

// Theme
export const [catppuccinFlavour, setCatppuccinFlavour] = createSignal<Theme>({
  flavour: 'mocha',
  class: 'ctp-mocha',
})
export const setTheme = (flavour: CatppuccinFlavour): Theme =>
  setCatppuccinFlavour({ flavour, class: `ctp-${flavour}` })

// Animation
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
}
