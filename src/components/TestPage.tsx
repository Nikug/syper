import { Component, Show, onCleanup, onMount } from 'solid-js'
import { clsx } from 'clsx'
import { Header } from './Header'
import { attempt, setTypingTest, typingTest } from '../StateManager'
import { QuoteInformation } from './QuoteInformation'
import { TextContainer } from './TextContainer'
import { ProgressBar } from './ProgressBar'
import { AnimationStates } from '../types'
import { Footer } from './Footer'
import { StatisticsContainer } from './StatisticsContainer'
import { AnimationDurationClass } from '../constants'
import { animationState, showingResults, showingWriting } from '../AnimationManager'
import { cleanupKeyboard, setupKeyboard } from '../KeyboardHandler'
import { initializeText } from '../helpers/stateHelpers'

const TestPage: Component = () => {
  onMount(async () => {
    setupKeyboard()
    setTypingTest(await initializeText())
  })

  onCleanup(() => cleanupKeyboard())

  return (
    <div class="w-full h-full">
      <div class="grid mx-auto max-w-7xl px-16 grid-rows-5 min-h-screen justify-items-stretch">
        <div class="row-span-1">
          <Header />
        </div>
        <Show when={showingWriting()}>
          <div
            class={clsx(
              'row-span-3 my-auto justify-self-start',
              handleBlur(animationState().writingState === AnimationStates.shown)
            )}
          >
            <div class="h-48">
              <div class="h-8">
                <QuoteInformation />
              </div>
              <div class="h-38 overflow-hidden">
                <TextContainer attempt={attempt} quote={typingTest()} />
              </div>
              <div class="h-8">
                <ProgressBar />
              </div>
            </div>
          </div>
        </Show>
        <Show when={showingResults()}>
          <div
            class={clsx(
              'row-span-4',
              handleBlur(animationState().resultsState === AnimationStates.shown)
            )}
          >
            <StatisticsContainer attempt={attempt} typingTest={typingTest()} />
          </div>
        </Show>
        <Show when={showingWriting()}>
          <div
            class={clsx(
              'row-span-1',
              handleBlur(animationState().writingState === AnimationStates.shown)
            )}
          >
            <Footer />
          </div>
        </Show>
      </div>
    </div>
  )
}

const handleBlur = (condition: boolean): string =>
  clsx(condition ? 'focus' : 'blur', 'transition-opacity', AnimationDurationClass)

export default TestPage
