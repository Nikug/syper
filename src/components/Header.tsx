import { clsx } from 'clsx'
import { Component, Show } from 'solid-js'
import { attempt, catppuccinFlavour, quote, setTheme } from '../StateManager'
import { AttemptStates, CatppuccinFlavour, catppuccinFlavours } from '../types'
import { capitalize } from '../util'
import { Dropdown } from './Dropdown'

export const Header: Component = () => {
  const isOngoingAttempt = () => attempt.state === AttemptStates.started

  return (
    <div
      class={clsx(
        'h-full flex flex-col items-center transition-all duration-300',
        isOngoingAttempt() && 'blur-md opacity-50'
      )}
    >
      <h1 class="text-5xl font-bold pt-8 pb-4">Solid Typist</h1>
      <Dropdown
        value={capitalize(catppuccinFlavour().flavour)}
        options={Object.entries(catppuccinFlavours).map(([key]) => ({
          key: key as CatppuccinFlavour,
          value: capitalize(key),
        }))}
        onSelect={(option) => setTheme(option.key)}
      />
      <div class="flex mt-4 mb-4 text-sm">
        <p class="px-4">
          Next: <span class="font-bold">Tab</span>
        </p>
        <p class="px-4">
          Restart: <span class="font-bold">Esc</span>
        </p>
      </div>
      <Show when={attempt.state === AttemptStates.completed}>
        <div class="mt-auto mb-4 text-center">
          <span>source:</span>
          <h2 class="text-4xl font-bold">{quote().source}</h2>
        </div>
      </Show>
    </div>
  )
}
