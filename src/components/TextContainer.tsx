import { Component, For } from 'solid-js'
import { Attempt, TypingTest } from '../types'
import { Character } from './Character'

interface Props {
  quote: TypingTest
  attempt: Attempt
}

export const TextContainer: Component<Props> = (props) => {
  return (
    <div class="flex justify-center w-full font-mono leading-12">
      <div class="flex flex-wrap justify-start">
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
