import { Component, Show } from 'solid-js'
import { clsx } from 'clsx'
import { Header } from './Header'
import { animationState, attempt, quote } from '../StateManager'
import { QuoteInformation } from './QuoteInformation'
import { TextContainer } from './TextContainer'
import { ProgressBar } from './ProgressBar'
import { AnimationStates } from '../types'
import { Footer } from './Footer'
import { StatisticsContainer } from './StatisticsContainer'
import { AnimationDurationClass } from '../constants'

const TestPage: Component = () => {
  return (
    <div class="w-full h-full">
      <div class="grid mx-auto max-w-7xl px-16 grid-rows-5 min-h-screen justify-items-stretch">
        <div class="row-span-1">
          <Header />
        </div>
        <Show when={animationState().view === 'writing'}>
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
              'row-span-4',
              handleBlur(animationState().resultsState === AnimationStates.shown)
            )}
          >
            <StatisticsContainer attempt={attempt} quote={quote()} />
          </div>
        </Show>
        <Show when={animationState().view === 'writing'}>
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
