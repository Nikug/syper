import { Component, For, Show } from 'solid-js'
import { animationState } from '../AnimationManager'
import { getAccuracy, getCorrectness, getDuration, getWordsPerMinute } from '../helpers/mathHelpers'
import { getFormattedDuration } from '../helpers/dateHelpers'
import { typingTest } from '../StateManager'
import { Attempt, TypingTest } from '../types'
import { LabeledValue } from './LabeledValue'
import { WordWithWpm } from './WordWithWpm'
import { WpmChart } from './WpmChart'
import { PersonalBestCorrectnessLimit } from '../constants'
import { NavigationHelp } from './NavigationHelp'
import { isQuoteMode } from '../helpers/optionsHelpers'
import { Dictionaries, getDictionaryName } from '../assets/files'

interface Props {
  typingTest: TypingTest
  attempt: Attempt
}

export const StatisticsContainer: Component<Props> = (props) => {
  const getWpm = () => getWordsPerMinute(props.attempt.measurements, props.typingTest)

  return (
    <div class="h-full pt-8 pb-32">
      <div class="mt-auto mb-8 text-center">
        <span>source:</span>
        <h2 class="h2">
          {isQuoteMode()
            ? typingTest().source
            : getDictionaryName(typingTest().source as Dictionaries)}
        </h2>
        <span class="mr-4">
          Words: <span class="font-bold">{props.typingTest.words.length}</span>
        </span>
        <span>
          Characters: <span class="font-bold">{props.typingTest.text.length}</span>
        </span>
      </div>
      <Show when={props.attempt.personalBest.isPersonalBest}>
        <div class="w-full text-center">
          <Show when={props.attempt.personalBest.hasApprovedCorrectness}>
            <p class="font-bold text-3xl mb-2">New personal best!</p>
            <div class="font-bold text-3xl flex justify-center items-center gap-4">
              <Show when={props.attempt.personalBest.previousPersonalBest != null}>
                <p class="text-xl">
                  {props.attempt.personalBest.previousPersonalBest?.toFixed(1)}{' '}
                </p>
                <div class="i-ri-arrow-right-line w-8 h-8" />
              </Show>
              <p>{getWpm()?.toFixed(1)}</p>
            </div>
            <p>Words per minute</p>
          </Show>
          <Show when={!props.attempt.personalBest.hasApprovedCorrectness}>
            <p class="text-lg">
              Personal best should have over {PersonalBestCorrectnessLimit * 100}% correctness
            </p>
          </Show>
        </div>
      </Show>
      <div class="w-full flex justify-evenly mt-12 max-sm:flex-col max-sm:gap-4">
        <LabeledValue value={getWpm()?.toFixed(1)} label="Words per minute" />
        <LabeledValue
          value={getFormattedDuration(getDuration(props.attempt.measurements) ?? 0)}
          label="Duration"
        />
        <LabeledValue
          value={`${(getAccuracy(props.typingTest, props.attempt) * 100).toFixed(1)}%`}
          label="Accuracy"
        />
        <LabeledValue
          value={`${(getCorrectness(props.typingTest, props.attempt) * 100).toFixed(1)}%`}
          label="Correctness"
        />
      </div>
      <div class="mt-4">
        <WpmChart measurements={props.attempt.measurements} state={animationState().resultsState} />
      </div>
      <h2 class="h2 pb-8 mt-32 text-center">Words per minute by words</h2>
      <div class="flex flex-wrap gap-x-4 gap-y-4 w-full paper p-4">
        <For each={props.attempt.measurements.words}>{(word) => <WordWithWpm word={word} />}</For>
      </div>
      <div class="my-8">
        <NavigationHelp />
      </div>
    </div>
  )
}
