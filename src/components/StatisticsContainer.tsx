import { Component, For } from 'solid-js'
import { CharactersPerWord } from '../constants'
import { Attempt, QuoteWithWords, WordMeasurement } from '../types'
import { numberOfMatchingItems } from '../util'
import { LabeledValue } from './LabeledValue'
import { WordWithWpm } from './WordWithWpm'

interface Props {
  quote: QuoteWithWords
  attempt: Attempt
}

export const StatisticsContainer: Component<Props> = (props) => {
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

  const wordMeasurements = () => {
    return props.attempt.measurements.words.filter((word) => word.word !== ' ')
  }

  return (
    <div class="h-full">
      <h1 class="font-bold text-4xl mt-8">Results</h1>
      <div class="w-full flex justify-evenly mt-4">
        <LabeledValue value={getWordsPerMinute()?.toFixed(1)} label="Words per minute" />
        <LabeledValue value={`${(getAccuracy() * 100).toFixed(1)}%`} label="Accuracy" />
        <LabeledValue value={`${(getCorrectedness() * 100).toFixed(1)}%`} label="Correctedness" />
      </div>
      <div class="mt-4">Graph comes here</div>
      <h2 class="font-bold text-2xl mt-8">Words per minute by words:</h2>
      <div class="mt-8">
        <div class="flex flex-wrap gap-x-4 gap-y-4 w-full">
          <For each={wordMeasurements()}>{(word) => <WordWithWpm word={word} />}</For>
        </div>
      </div>
    </div>
  )
}
