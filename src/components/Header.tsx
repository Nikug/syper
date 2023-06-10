import { A } from '@solidjs/router'
import { clsx } from 'clsx'
import { Component, Show } from 'solid-js'
import { Dictionaries, dictionaries, getDictionaryName } from '../assets/files'
import { getUserName } from '../authentication/Authentication'
import { TimeDurations, WordCounts } from '../constants'
import { getShortFormattedDuration } from '../helpers/mathHelpers'
import {
  setDictionary,
  setTextMode,
  setTimeDuration,
  setWordCount,
} from '../helpers/optionsHelpers'
import { attempt, userOptions } from '../StateManager'
import { setAndSaveTheme } from '../themes/ThemeManager'
import { ThemeKey, themes } from '../themes/themes'
import { AttemptStates, TextMode } from '../types'
import { capitalize } from '../util'
import { Dropdown } from './Dropdown'

interface TextModeOption {
  key: TextMode
  value: string
}

const textModeOptions: TextModeOption[] = [
  { key: 'quote', value: 'Quote' },
  { key: 'words', value: 'Words' },
  { key: 'time', value: 'Time' },
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
          <A href="/profile" class="cursor-pointer flex items-center">
            <div class="i-ri-user-line w-8 h-8 mr-2" />
            {getUserName() ?? 'Profile'}
          </A>
        </div>
      </div>
      <div class="h-full w-full flex justify-start">
        <div class="flex flex-col">
          <div class="flex items-center gap-x-2">
            <Dropdown
              value={themes[userOptions.theme].name}
              options={Object.entries(themes).map(([key, value]) => ({
                key: key as ThemeKey,
                value: value.name,
              }))}
              onSelect={(option) => setAndSaveTheme(option.key)}
            />
            <Dropdown
              value={capitalize(userOptions.textMode)}
              options={textModeOptions}
              onSelect={(option) => setTextMode(option.key)}
            />
            <Show when={userOptions.textMode === 'words' || userOptions.textMode === 'time'}>
              <Dropdown
                value={getDictionaryName(userOptions.dictionary)}
                options={Object.entries(dictionaries).map(([key, value]) => ({
                  key: key as Dictionaries,
                  value: value.name,
                }))}
                onSelect={(option) => setDictionary(option.key)}
              />
            </Show>
            <Show when={userOptions.textMode === 'words'}>
              <Dropdown
                value={`Words: ${userOptions.wordCount}`}
                options={WordCounts.map((count) => ({ key: count, value: count }))}
                onSelect={(option) => setWordCount(option.key)}
              />
            </Show>
            <Show when={userOptions.textMode === 'time'}>
              <Dropdown
                value={`Time: ${getShortFormattedDuration(userOptions.timeDuration)}`}
                options={TimeDurations}
                onSelect={(option) => setTimeDuration(option.key)}
              />
            </Show>
          </div>
        </div>
      </div>
    </div>
  )
}
