import { Component, For } from 'solid-js'
import { Attempt, TypingTest } from '../types'
import { Character } from './Character'
import { userOptions } from '../StateManager'

interface Props {
  quote: TypingTest
  attempt: Attempt
}

export const TextContainer: Component<Props> = (props) => {
  let hiddenInput!: HTMLInputElement

  return (
    <div
      style={{ 'font-family': userOptions.font }}
      class="flex justify-center w-full font-mono leading-16"
    >
      <div class="flex flex-wrap justify-start relative" onClick={() => hiddenInput.focus()}>
        <input ref={hiddenInput} class="fixed w-0 h-0 opacity-0" />
        <For each={props.quote.words}>
          {(word) => (
            <div>
              <For each={[...word.entries()]}>
                {([index, character]) => (
                  <Character
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
