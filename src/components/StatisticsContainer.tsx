import { CharactersPerWord } from '../constants'
import { Attempt, Quote } from '../types'
import { numberOfMatchingItems } from '../util'

interface Props {
  quote: Quote
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
    return (
      numberOfMatchingItems(props.quote.text, props.attempt.finalText) /
      props.attempt.allText.length
    )
  }

  return (
    <div>
      <p>Wpm: {getWordsPerMinute()?.toFixed(1)}</p>
      <p>Correctedness: {(getCorrectedness() * 100).toFixed(1)}%</p>
      <p>Accuracy: {(getAccuracy() * 100).toFixed(1)}%</p>
    </div>
  )
}
