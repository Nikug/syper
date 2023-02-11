import { For } from 'solid-js'
import { CharactersPerWord } from '../constants'
import { Attempt, QuoteWithWords, WordMeasurement } from '../types'
import { numberOfMatchingItems } from '../util'

interface Props {
  quote: QuoteWithWords
  attempt: Attempt
}

export const StatisticsContainer = (props: Props) => {
  const getWordsPerMinute = (): number | null => {
    if (
      props.attempt.measurements.endTime == null ||
      props.attempt.measurements.startTime == null
    ) {
      return null
    }
    const calculatedWords = props.quote.length / CharactersPerWord
    const durationInMinutes =
      (props.attempt.measurements.endTime - props.attempt.measurements.startTime) / 1000 / 60

    return calculatedWords / durationInMinutes
  }

  const getCorrectedness = (): number => {
    return numberOfMatchingItems(props.quote.text, props.attempt.finalText) / props.quote.length
  }

  const getAccuracy = (): number => {
    console.log(props.attempt.measurements.timestamps)
    return (
      numberOfMatchingItems(props.quote.text, props.attempt.finalText) /
      props.attempt.allText.length
    )
  }

  const wordMeasurements = () => {
    return props.attempt.measurements.words.filter((word) => word.word !== ' ')
  }

  const getWordWordsPerMinute = (word: WordMeasurement) => {
    const calculatedWords = word.word.length / CharactersPerWord
    if (word.startTime == null || word.endTime == null) return
    const durationInMinutes = (word.endTime - word.startTime) / 1000 / 60
    return calculatedWords / durationInMinutes
  }

  return (
    <div class="h-full overflow-auto">
      <p>Wpm: {getWordsPerMinute()?.toFixed(1)}</p>
      <p>Correctedness: {(getCorrectedness() * 100).toFixed(1)}%</p>
      <p>Accuracy: {(getAccuracy() * 100).toFixed(1)}%</p>
      <h3>Wpm by words:</h3>
      <For each={wordMeasurements()}>
        {(word) => (
          <p>
            {word.word}: {getWordWordsPerMinute(word)?.toFixed(2)}
          </p>
        )}
      </For>
    </div>
  )
}
