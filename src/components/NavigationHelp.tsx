import { clsx } from 'clsx'
import { Component } from 'solid-js'
import { attempt } from '../StateManager'
import { AttemptStates } from '../types'

export const NavigationHelp: Component = () => {
  const isOngoingAttempt = () => attempt.state === AttemptStates.started
  return (
    <div class={clsx('flex justify-center', isOngoingAttempt() && 'blurred')}>
      <div class="flex mt-4 mb-4 text-sm">
        <p class="px-4">
          Next: <span class="font-bold">Tab</span>
        </p>
        <p class="px-4">
          Restart: <span class="font-bold">Esc</span>
        </p>
      </div>
    </div>
  )
}
