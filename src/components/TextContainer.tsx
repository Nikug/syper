import { For } from 'solid-js'
import { Attempt, Quote } from '../types'
import { Character } from './Character'

interface Props {
  quote: Quote
  attempt: Attempt
}

export const TextContainer = (props: Props) => {
  return (
    <div class="flex justify-center w-full border p-4 overflow-hidden">
      <div class="max-w-xl w-full flex flex-wrap justify-start">
        <For each={Array.from(props.quote.text)}>
          {(character, i) => (
            <Character expected={character} actual={props.attempt.finalText.at(i())} />
          )}
        </For>
      </div>
    </div>
  )
}
