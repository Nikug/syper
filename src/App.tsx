import { clsx } from 'clsx'
import { Component, createEffect, onCleanup, onMount, Show, on } from 'solid-js'
import { Header } from './components/Header'
import { ProgressBar } from './components/ProgressBar'
import { QuoteInformation } from './components/QuoteInformation'
import { StatisticsContainer } from './components/StatisticsContainer'
import { TextContainer } from './components/TextContainer'
import { AnimationDurationClass } from './constants'
import { CleanupKeyboard, SetupKeyboard } from './KeyboardHandler'
import { persistUserOptions, userOptions } from './OptionsManager'
import { animationState, attempt, initQuote, quote, setQuote } from './StateManager'
import { AnimationStates } from './types'

const App: Component = () => {
  onMount(async () => {
    SetupKeyboard()
    setQuote(await initQuote())
  })
  onCleanup(() => CleanupKeyboard())

  createEffect(() => {
    document.body.className = `ctp-${userOptions.theme}`
  })

  createEffect(
    on(
      () => userOptions.textMode,
      async () => {
        if (animationState().view === 'writing') {
          setQuote(await initQuote())
        }
      }
    )
  )

  createEffect(() => {
    persistUserOptions()
  })

  return (
    <div class="w-screen overflow-x-hidden min-h-screen bg-ctp-base text-ctp-text">
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
              'transition-opacity row-span-3 my-auto',
              AnimationDurationClass
            )}
          >
            <div class="max-w-7xl w-screen px-16 h-48">
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
              'transition-opacity row-span-4',
              AnimationDurationClass
            )}
          >
            <div class="flex justify-center">
              <div class="max-w-7xl w-screen px-16">
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
