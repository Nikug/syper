import { createSignal, startTransition } from 'solid-js'
import { createStore } from 'solid-js/store'
import { AnimationDuration } from './constants'
import { initializeText } from './helpers/stateHelpers'
import { Attempt, Animation, AttemptStates, QuoteWithWords, AnimationStates } from './types'
import { sleep } from './util'

// Helpers
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

const newText = (): QuoteWithWords => ({
  id: 0,
  text: '',
  source: '',
  length: 0,
  words: [],
})

export const nextAttempt = async () => {
  if (animationState().view === 'results') {
    await startTransition(fromResultsToWriting)
  }
  setAttempt(newAttempt())
  setQuote(await initializeText())
}

export const restartAttempt = async () => {
  if (animationState().view === 'results') {
    await startTransition(fromResultsToWriting)
  }
  setAttempt(newAttempt())
}

// Main signals and stores
export const [quote, setQuote] = createSignal<QuoteWithWords>(newText())
export const [attempt, setAttempt] = createStore<Attempt>(newAttempt())

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
