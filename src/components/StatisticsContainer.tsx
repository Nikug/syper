import { Component, For } from 'solid-js'
import { animationState } from '../StateManager'
import { Attempt, QuoteWithWords } from '../types'
import { numberOfMatchingItems, wordsPerMinute } from '../util'
import { LabeledValue } from './LabeledValue'
import { WordWithWpm } from './WordWithWpm'
import { WpmChart } from './WpmChart'

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

    const duration = props.attempt.measurements.endTime - props.attempt.measurements.startTime
    return wordsPerMinute(props.quote.length, duration)
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
    <div class="h-full pt-8 pb-32">
      <div class="w-full flex justify-evenly">
        <LabeledValue value={getWordsPerMinute()?.toFixed(1)} label="Words per minute" />
        <LabeledValue value={`${(getAccuracy() * 100).toFixed(1)}%`} label="Accuracy" />
        <LabeledValue value={`${(getCorrectedness() * 100).toFixed(1)}%`} label="Correctedness" />
      </div>
      <div class="mt-4">
        <WpmChart measurements={props.attempt.measurements} state={animationState().resultsState} />
      </div>
      <h2 class="font-bold text-2xl mt-8 text-center">Words per minute by words</h2>
      <div class="mt-4">
        <div class="flex flex-wrap gap-x-4 gap-y-4 w-full paper p-4">
          <For each={props.attempt.measurements.words}>{(word) => <WordWithWpm word={word} />}</For>
        </div>
      </div>
    </div>
  )
}
