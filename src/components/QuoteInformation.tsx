import { Component, Show } from 'solid-js'
import { getShortFormattedDuration } from '../helpers/mathHelpers'
import { isTimeMode } from '../helpers/optionsHelpers'
import { testStarted } from '../helpers/stateHelpers'
import { attempt, typingTest, userOptions } from '../StateManager'

export const QuoteInformation: Component = () => {
  return (
    <div class="truncate">
      <span class="mr-8">{typingTest().source}</span>
      <Show when={!isTimeMode()}>
        <span>{typingTest().length} characters</span>
      </Show>
      <Show when={isTimeMode()}>
        <span>
          {getShortFormattedDuration(
            testStarted() ? attempt.remainingDuration : userOptions.timeDuration
          )}
        </span>
      </Show>
    </div>
  )
}
