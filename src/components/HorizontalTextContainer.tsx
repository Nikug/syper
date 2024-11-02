import { Component, For, createEffect, createSignal } from 'solid-js'
import { Attempt, AttemptStates, TypingTest } from '../types'
import { attempt, userOptions } from '../StateManager'
import clsx from 'clsx'
import { LineHeightMultiplier, SmoothScrollDuration } from '../constants'
import { HorizontallyScrollingCharacter } from './HorizontallScrollingCharacter'

interface Props {
  quote: TypingTest
  attempt: Attempt
}

export const HorizontalTextContainer: Component<Props> = (props) => {
  let containerRef!: HTMLDivElement
  const [translateX, setTranslateX] = createSignal(0)

  const centerOfContainer = () => {
    const { width, left } = containerRef.getBoundingClientRect()
    return left + width / 2
  }

  const scrollToNextCharacter = (x: number) => {
    let difference = centerOfContainer() - x

    // Offset the scroll a bit, so user feels like writing on the center of the screen
    if (userOptions.scrollOnWordEnd) {
      difference -= userOptions.fontSize * 3
    } else {
      difference -= userOptions.fontSize
    }

    if (difference > 0) {
      difference = 0
    }
    setTranslateX(difference)
  }

  createEffect(() => {
    if (attempt.state === AttemptStates.notStarted) {
      setTranslateX(0)
    }
  })

  return (
    <div
      ref={containerRef}
      style={{
        'font-family': userOptions.font,
        'line-height': `${userOptions.fontSize * LineHeightMultiplier}px`,
        'font-size': `${userOptions.fontSize}px`,
        transform: `translateX(${translateX()}px)`,
        'transition-duration': `${SmoothScrollDuration}ms`,
      }}
      class={clsx(
        'w-full font-mono',
        userOptions.useSmoothScrolling ? 'transition-transform ease-out' : 'transition-none'
      )}
    >
      <div class="flex justify-start" data-nosnippet>
        <For each={props.quote.words}>
          {(word) => (
            <div>
              <For each={[...word.entries()]}>
                {([index, character]) => (
                  <HorizontallyScrollingCharacter
                    expected={character}
                    actual={props.attempt.finalText[index]}
                    isNext={props.attempt.finalText.length === index}
                    isCurrent={props.attempt.finalText.length - 1 === index}
                    translate={scrollToNextCharacter}
                  />
                )}
              </For>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
