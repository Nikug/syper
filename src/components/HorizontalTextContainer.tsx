import { Component, For } from 'solid-js'
import { Attempt, TypingTest } from '../types'
import { userOptions } from '../StateManager'
import clsx from 'clsx'
import { LineHeightMultiplier } from '../constants'
import { HorizontallyScrollingCharacter } from './HorizontallScrollingCharacter'

interface Props {
  quote: TypingTest
  attempt: Attempt
}

export const HorizontalTextContainer: Component<Props> = (props) => {
  let containerRef!: HTMLDivElement

  return (
    <div
      ref={containerRef}
      style={{
        'font-family': userOptions.font,
        'padding-top': `${userOptions.fontSize * LineHeightMultiplier}px`,
        'line-height': `${userOptions.fontSize * LineHeightMultiplier}px`,
        'font-size': `${userOptions.fontSize}px`,
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
