import { Component, Show, onCleanup, onMount } from 'solid-js'
import { clsx } from 'clsx'
import { Header } from './Header'
import { attempt, setTypingTest, typingTest, userOptions } from '../StateManager'
import { QuoteInformation } from './QuoteInformation'
import { TextContainer } from './TextContainer'
import { ProgressBar } from './ProgressBar'
import { AnimationStates } from '../types'
import { NavigationHelp } from './NavigationHelp'
import { StatisticsContainer } from './StatisticsContainer'
import { AnimationDurationClass } from '../constants'
import { animationState, showingResults, showingWriting } from '../AnimationManager'
import { cleanupKeyboard, setupKeyboard } from '../KeyboardHandler'
import { initializeText, restartAttempt } from '../helpers/stateHelpers'
import { BlurWhenTyping } from './BlurWhenTyping'
import { CapsLockIndicator } from './CapsLockIndicator'
import { Meta, Title } from '@solidjs/meta'

const TestPage: Component = () => {
  onMount(async () => {
    setupKeyboard()
    setTypingTest(await initializeText())
  })

  onCleanup(() => {
    restartAttempt()
    cleanupKeyboard()
  })

  return (
    <>
      <Title>Syper / Typing test</Title>
      <Meta
        name="description"
        content="Syper: a solid typing experience. Test your typing speed and see your improvements over time in this minimalistic and customizable typing game."
      />
      <div class="w-full h-full">
        <div class="grid mx-auto max-w-7xl md:px-16 px-2 grid-rows-5 min-h-screen justify-items-stretch items-center">
          <div class="row-span-1 self-start">
            <BlurWhenTyping>
              <Header showOptions={true} />
            </BlurWhenTyping>
          </div>
          <Show when={showingWriting()}>
            <div
              class={clsx(
                'row-span-3 justify-self-start',
                handleBlur(animationState().writingState === AnimationStates.shown)
              )}
            >
              <div class="h-56">
                <div class="h-8">
                  <QuoteInformation />
                </div>
                <div
                  class={clsx(
                    'max-h-46 overflow-hidden',
                    userOptions.useSmoothScrolling && 'scroll-smooth'
                  )}
                >
                  <TextContainer attempt={attempt} quote={typingTest()} />
                </div>
                <div class="h-24">
                  <Show when={userOptions.showProgressBar}>
                    <ProgressBar />
                  </Show>
                  <div class="h-16 flex justify-center items-center">
                    <CapsLockIndicator />
                  </div>
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
              <BlurWhenTyping>
                <NavigationHelp />
              </BlurWhenTyping>
            </div>
          </Show>
        </div>
      </div>
    </>
  )
}

const handleBlur = (condition: boolean): string =>
  clsx(condition ? 'focus' : 'blur', 'transition-all', AnimationDurationClass)

export default TestPage
