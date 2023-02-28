import { clsx } from 'clsx'
import { Component, createEffect, onCleanup, onMount, Show, on } from 'solid-js'
import { setupAuth } from './authentication/Authentication'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ProgressBar } from './components/ProgressBar'
import { QuoteInformation } from './components/QuoteInformation'
import { StatisticsContainer } from './components/StatisticsContainer'
import { TextContainer } from './components/TextContainer'
import { AnimationDurationClass } from './constants'
import { cleanupKeyboard, setupKeyboard } from './KeyboardHandler'
import { persistUserOptions, userOptions } from './OptionsManager'
import { animationState, attempt, initializeText, quote, setQuote } from './StateManager'
import { AnimationStates } from './types'

const App: Component = () => {
  onMount(async () => {
    setupAuth()
    setupKeyboard()
    setQuote(await initializeText())
  })
  onCleanup(() => cleanupKeyboard())

  createEffect(() => {
    document.body.className = `ctp-${userOptions.theme}`
  })

  createEffect(
    on(
      () => userOptions.textMode,
      async () => {
        if (animationState().view === 'writing') {
          setQuote(await initializeText())
        }
      }
    )
  )

  createEffect(() => {
    persistUserOptions()
  })

  return (
    <div class="w-screen  overflow-x-hidden min-h-screen bg-ctp-base text-ctp-text">
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

export default App
