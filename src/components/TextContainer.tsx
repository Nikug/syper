import { For } from 'solid-js'
import { Attempt, Quote, Word } from '../types'
import { Character } from './Character'

const splitParagraph = (text: string): Word[] => {
  const words: Word[] = []
  let word: Word = new Map()
  for (let i = 0, limit = text.length; i < limit; i++) {
    if (text[i] !== ' ') {
      word.set(i, text[i])
    } else {
      words.push(word)
      words.push(new Map().set(i, ' '))
      word = new Map()
    }
  }

  words.push(word)
  return words
}

interface Props {
  quote: Quote
  attempt: Attempt
}

export const TextContainer = (props: Props) => {
  const quoteWords = () => splitParagraph(props.quote.text)

  return (
    <div class="flex justify-center w-full overflow-hidden font-mono leading-8">
      <div class="flex flex-wrap justify-start">
        <For each={quoteWords()}>
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
