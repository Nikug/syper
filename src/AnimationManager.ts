import { createSignal } from 'solid-js'
import { AnimationDuration } from './constants'
import { Animation, AnimationStates } from './types'
import { sleep } from './util'

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
  await sleep(1)
  setAnimationState({ ...animationState(), resultsState: AnimationStates.shown })
}
export const fromResultsToWriting = async () => {
  setAnimationState({ ...animationState(), resultsState: AnimationStates.hidden })
  await sleep(AnimationDuration)
  setAnimationState({ ...animationState(), view: 'writing' })
  await sleep(1)
  setAnimationState({ ...animationState(), writingState: AnimationStates.shown })
}

export const showingResults = () => animationState().view === 'results'
export const showingWriting = () => animationState().view === 'writing'
