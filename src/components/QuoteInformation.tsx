import { Component, Show } from 'solid-js'
import { getShortFormattedDuration } from '../helpers/dateHelpers'
import { isQuoteMode, isTimeMode } from '../helpers/optionsHelpers'
import { attempt, typingTest, userOptions } from '../StateManager'
import { testStarted } from '../helpers/stateHelpers'

export const QuoteInformation: Component = () => {
  const completedWords = () => attempt.finalText.split(' ').length - 1
  const totalWords = () => typingTest().words.length

  return (
    <div class="truncate">
      <Show when={userOptions.showProgressCounter}>
        <Show when={!isTimeMode()}>
          <span>
            {completedWords()}
            <span class="mx-1">/</span>
            {totalWords()}
          </span>
        </Show>
        <Show when={isTimeMode()}>
          <span>
            {getShortFormattedDuration(
              testStarted() ? userOptions.timeDuration - attempt.remainingDuration : 0
            )}
            <span class="mx-1">/</span>
            {getShortFormattedDuration(userOptions.timeDuration)}
          </span>
        </Show>
      </Show>
      <Show when={isQuoteMode()}>
        <span class="ml-8">{typingTest().source}</span>
      </Show>
    </div>
  )
}
