import { Component, For, JSX, Show } from 'solid-js'
import { animationState, attempt, typingTest } from '../StateManager'
import { Attempt, AttemptStates, TypingTest } from '../types'
import { numberOfMatchingItems, wordsPerMinute } from '../util'
import { LabeledValue } from './LabeledValue'
import { WordWithWpm } from './WordWithWpm'
import { WpmChart } from './WpmChart'

interface Props {
  quote: TypingTest
  attempt: Attempt
}

export const StatisticsContainer: Component<Props> = (props) => {
  const getDuration = (): number | null => {
    if (
      props.attempt.measurements.endTime == null ||
      props.attempt.measurements.startTime == null
    ) {
      return null
    }

    return props.attempt.measurements.endTime - props.attempt.measurements.startTime
  }

  const getWordsPerMinute = (): number | null => {
    const duration = getDuration()
    if (duration == null) return null
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

  const getFormattedDuration = (): JSX.Element | null => {
    const duration = getDuration()
    if (duration == null) return null

    const totalSeconds = duration / 1000
    const minutes = Math.floor(totalSeconds / 60)
    const remainingSeconds = totalSeconds % 60
    return (
      <span>
        <Show when={minutes}>
          {minutes}
          <span class="font-normal text-lg mr-2">m</span>
        </Show>
        {remainingSeconds.toFixed(1)}
        <span class="font-normal text-lg">s</span>
      </span>
    )
  }

  return (
    <div class="h-full pt-8 pb-32">
      <Show when={attempt.state === AttemptStates.completed}>
        <div class="mt-auto mb-16 text-center">
          <span>source:</span>
          <h2 class="text-4xl font-bold mb-2">{typingTest().source}</h2>
          <span class="mr-4">
            Words: <span class="font-bold">{props.quote.words.length}</span>
          </span>
          <span>
            Characters: <span class="font-bold">{props.quote.text.length}</span>
          </span>
        </div>
      </Show>
      <div class="w-full flex justify-evenly">
        <LabeledValue value={getWordsPerMinute()?.toFixed(1)} label="Words per minute" />
        <LabeledValue value={getFormattedDuration()} label="Duration" />
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
