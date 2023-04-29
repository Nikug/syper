import { Component } from 'solid-js'
import { WordMeasurement } from '../types'
import { wordsPerMinute } from '../helpers/mathHelpers'

interface Props {
  word: WordMeasurement
}

export const WordWithWpm: Component<Props> = (props) => {
  const getWordWordsPerMinute = (word: WordMeasurement) => {
    if (word.startTime == null || word.endTime == null) return null
    return wordsPerMinute(word.word.length, word.endTime - word.startTime)
  }

  return (
    <div class="text-center">
      <p class="text-sm h-5">{getWordWordsPerMinute(props.word)?.toFixed(1)}</p>
      <p class="text-xl font-bold leading-tight">{props.word.word}</p>
    </div>
  )
}
