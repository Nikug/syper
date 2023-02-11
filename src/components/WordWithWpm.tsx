import { Component } from 'solid-js'
import { CharactersPerWord } from '../constants'
import { WordMeasurement } from '../types'

interface Props {
  word: WordMeasurement
}

export const WordWithWpm: Component<Props> = (props) => {
  const getWordWordsPerMinute = (word: WordMeasurement) => {
    const calculatedWords = word.word.length / CharactersPerWord
    if (word.startTime == null || word.endTime == null) return null
    const durationInMinutes = (word.endTime - word.startTime) / 1000 / 60

    if (durationInMinutes === 0) return null
    return calculatedWords / durationInMinutes
  }

  return (
    <div class="text-center">
      <p class="text-sm h-5">{getWordWordsPerMinute(props.word)?.toFixed(1)}</p>
      <p class="text-xl font-bold leading-tight">{props.word.word}</p>
    </div>
  )
}
