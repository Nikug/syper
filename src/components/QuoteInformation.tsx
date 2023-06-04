import { Component, Show } from 'solid-js'
import { getShortFormattedDuration } from '../helpers/mathHelpers'
import { isTimeMode } from '../helpers/optionsHelpers'
import { attempt, typingTest } from '../StateManager'

export const QuoteInformation: Component = () => {
  return (
    <div class="truncate">
      <span class="mr-8">{typingTest().source}</span>
      <Show when={!isTimeMode()}>
        <span>{typingTest().length} characters</span>
      </Show>
      <Show when={isTimeMode()}>
        <span>{getShortFormattedDuration(attempt.remainingDuration)}</span>
      </Show>
    </div>
  )
}
