import { Component, For, createSignal, onCleanup } from 'solid-js'
import { Attempt, TypingTest } from '../types'
import { Character } from './Character'
import { userOptions } from '../StateManager'
import clsx from 'clsx'
import { LineHeightMultiplier } from '../constants'

const animationDuration = 250

interface Props {
  quote: TypingTest
  attempt: Attempt
  targetHeight: number
}

export const TextContainer: Component<Props> = (props) => {
  let containerRef!: HTMLDivElement
  const [offsetY, setOffsetY] = createSignal(userOptions.fontSize * LineHeightMultiplier)
  const [animating, setAnimating] = createSignal(false)
  const [timeoutId, setTimeoutId] = createSignal<undefined | NodeJS.Timeout>(undefined)

  const translate = (amount: number) => {
    if (amount !== 0 && !animating()) {
      setOffsetY((prev) => prev + amount)
      if (!userOptions.useSmoothScrolling) return

      setAnimating(true)
      const id = setTimeout(() => setAnimating(false), animationDuration)
      setTimeoutId(id)
    }
  }

  onCleanup(() => clearTimeout(timeoutId()))

  return (
    <div
      ref={containerRef}
      style={{
        'font-family': userOptions.font,
        transform: `translateY(${offsetY()}px)`,
        'transition-duration': `${animationDuration}ms`,
        'line-height': `${userOptions.fontSize * LineHeightMultiplier}px`,
        'font-size': `${userOptions.fontSize}px`,
      }}
      class={clsx(
        'flex justify-center w-full font-mono',
        userOptions.useSmoothScrolling ? 'transition-transform ease-out' : 'transition-none'
      )}
    >
      <div class="flex flex-wrap justify-start" data-nosnippet>
        <For each={props.quote.words}>
          {(word) => (
            <div>
              <For each={[...word.entries()]}>
                {([index, character]) => (
                  <Character
                    targetHeight={props.targetHeight}
                    expected={character}
                    actual={props.attempt.finalText[index]}
                    isNext={props.attempt.finalText.length === index}
                    translate={translate}
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
