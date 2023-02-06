import { For } from 'solid-js'
import { Attempt, Quote } from '../types'
import { Character } from './Character'

interface Props {
  quote: Quote
  attempt: Attempt
}

export const TextContainer = (props: Props) => {
  const quoteWords = () => props.quote.text.split(' ')
  const actualWords = () => props.attempt.finalText.split(' ')

  return (
    <div class="flex justify-center w-full p-4 overflow-hidden font-mono">
      <div class="max-w-xl w-full flex flex-wrap justify-start gap-x-4">
        <For each={quoteWords()}>
          {(word, wordIndex) => (
            <div class="flex-shrink-0">
              <For each={Array.from(word)}>
                {(character, characterIndex) => (
                  <Character
                    expected={character}
                    actual={actualWords()?.[wordIndex()]?.[characterIndex()]}
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
