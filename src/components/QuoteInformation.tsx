import { Component, Show } from 'solid-js'
import { getShortFormattedDuration } from '../helpers/mathHelpers'
import { userOptions } from '../StateManager'
import { typingTest } from '../StateManager'

export const QuoteInformation: Component = () => {
  return (
    <div class="truncate">
      <span class="mr-8">{typingTest().source}</span>
      <Show when={userOptions.textMode !== 'time'}>
        <span>{typingTest().length} characters</span>
      </Show>
      <Show when={userOptions.textMode === 'time'}>
        <span>{getShortFormattedDuration(0)}</span>
      </Show>
    </div>
  )
}
