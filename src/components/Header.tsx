import { A } from '@solidjs/router'
import { clsx } from 'clsx'
import { Component } from 'solid-js'
import { account } from '../authentication/Authentication'
import { setTextMode, setTheme, userOptions } from '../OptionsManager'
import { attempt } from '../StateManager'
import { AttemptStates, CatppuccinFlavour, catppuccinFlavours, TextMode } from '../types'
import { capitalize } from '../util'
import { Dropdown } from './Dropdown'

interface TextModeOption {
  key: TextMode
  value: string
}

const textModeOptions: TextModeOption[] = [
  { key: 'quote', value: 'Quote' },
  { key: 'words', value: 'Words' },
]

export const Header: Component = () => {
  const isOngoingAttempt = () => attempt.state === AttemptStates.started

  return (
    <div class={clsx('h-full pt-16 transition-all duration-300', isOngoingAttempt() && 'blurred')}>
      <div class="w-full mb-4 flex justify-between items-center">
        <A href="/" class="text-5xl font-bold">
          Syper_
        </A>
        <div>
          <A href="/profile" class="text-xl cursor-pointer">
            Profile
          </A>
        </div>
      </div>
      <div class="h-full w-full flex justify-start">
        <div class="flex flex-col">
          <div class="flex items-center">
            <Dropdown
              value={capitalize(userOptions.theme)}
              options={Object.entries(catppuccinFlavours).map(([key]) => ({
                key: key as CatppuccinFlavour,
                value: capitalize(key),
              }))}
              onSelect={(option) => setTheme(option.key)}
            />
            <Dropdown
              value={capitalize(userOptions.textMode)}
              options={textModeOptions}
              onSelect={(option) => setTextMode(option.key)}
            />
            <p class="px-4">{account()?.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
