import { CharactersPerWord } from '../constants'
import { Attempt, Quote } from '../types'

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
  return <div>Wpm: {getWordsPerMinute()}</div>
}
