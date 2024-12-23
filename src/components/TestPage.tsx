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
import { AnimationDurationClass, LineHeightMultiplier } from '../constants'
import { animationState, showingResults, showingWriting } from '../AnimationManager'
import { cleanupKeyboard, setupKeyboard } from '../KeyboardHandler'
import { initializeText, restartAttempt } from '../helpers/stateHelpers'
import { BlurWhenTyping } from './BlurWhenTyping'
import { CapsLockIndicator } from './CapsLockIndicator'
import { Meta, Title } from '@solidjs/meta'
import { HorizontalTextContainer } from './HorizontalTextContainer'

const TestPage: Component = () => {
  let textContainerRef!: HTMLDivElement

  onMount(async () => {
    setupKeyboard()
    setTypingTest(await initializeText())
  })

  onCleanup(() => {
    restartAttempt()
    cleanupKeyboard()
  })

  const getTargetHeight = () => {
    const { top, height } = textContainerRef.getBoundingClientRect()
    return top + height / 2
  }

  return (
    <>
      <Title>Syper / Typing test</Title>
      <Meta
        name="description"
        content="Syper: a solid typing experience. Test your typing speed and see your improvements over time in this minimalistic and customizable typing game."
      />
      <div class="w-full h-full">
        <div
          class={clsx(
            'grid mx-auto max-w-7xl md:px-16 px-2 min-h-screen justify-items-stretch items-center',
            { 'grid-rows-5': showingWriting(), 'auto-rows-min': showingResults() }
          )}
        >
          <div class="row-span-1 self-start min-w-0">
            <BlurWhenTyping>
              <Header showOptions={true} />
            </BlurWhenTyping>
          </div>
          <Show when={showingWriting()}>
            <div
              style={{
                'margin-top': `${userOptions.typingMode === 'vertical' ? -userOptions.fontSize * LineHeightMultiplier * 2 : 0}px`,
              }}
              class={clsx(
                'row-span-3 justify-self-start min-w-0 w-full',
                handleBlur(animationState().writingState === AnimationStates.shown)
              )}
            >
              <div class="h-56">
                <div class="h-8">
                  <QuoteInformation />
                </div>
                <Show when={userOptions.typingMode === 'vertical'}>
                  <div
                    ref={textContainerRef}
                    class="overflow-hidden"
                    style={{ height: `${userOptions.fontSize * LineHeightMultiplier * 3}px` }}
                  >
                    <TextContainer
                      targetHeight={getTargetHeight()}
                      attempt={attempt}
                      quote={typingTest()}
                    />
                  </div>
                </Show>
                <Show when={userOptions.typingMode === 'horizontal'}>
                  <div class="overflow-hidden w-full">
                    <HorizontalTextContainer attempt={attempt} quote={typingTest()} />
                  </div>
                </Show>
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
                'row-span-1 min-w-0',
                handleBlur(animationState().resultsState === AnimationStates.shown)
              )}
            >
              <StatisticsContainer attempt={attempt} typingTest={typingTest()} />
            </div>
          </Show>
          <Show when={showingWriting()}>
            <div
              class={clsx(
                'row-span-1 min-w-0',
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
