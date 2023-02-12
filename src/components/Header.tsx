import { clsx } from 'clsx'
import { Component, Show } from 'solid-js'
import { attempt, catppuccinFlavour, setTheme } from '../App'
import { AttemptStates, CatppuccinFlavour, catppuccinFlavours } from '../types'
import { capitalize } from '../util'
import { Dropdown } from './Dropdown'

export const Header: Component = () => {
  const isOngoingAttempt = () => attempt.state === AttemptStates.started

  return (
    <div
      class={clsx(
        'flex flex-col items-center transition-all duration-300',
        isOngoingAttempt() && 'blur-md opacity-50'
      )}
    >
      <h1 class="text-5xl font-bold pt-4 pb-4">Solid Typist</h1>
      <Dropdown
        value={capitalize(catppuccinFlavour().flavour)}
        options={Object.entries(catppuccinFlavours).map(([key]) => ({
          key: key as CatppuccinFlavour,
          value: capitalize(key),
        }))}
        onSelect={(option) => setTheme(option.key)}
      />
      <Show when={attempt.state === AttemptStates.completed}>
        <h2 class="text-4xl font-bold mt-auto mb-4">Your score</h2>
      </Show>
    </div>
  )
}
