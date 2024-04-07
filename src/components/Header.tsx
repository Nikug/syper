import { A } from '@solidjs/router'
import { clsx } from 'clsx'
import { Component, Show } from 'solid-js'
import { Dictionaries, dictionaries } from '../assets/files'
import { TimeDurations, WordCounts, textModeOptions } from '../constants'
import { getShortFormattedDuration } from '../helpers/dateHelpers'
import {
  isTimeMode,
  isWordsMode,
  setDictionary,
  setTextMode,
  setTimeDuration,
  setWordCount,
} from '../helpers/optionsHelpers'
import { userOptions } from '../StateManager'
import { setAndSaveTheme } from '../themes/ThemeManager'
import { getThemeList } from '../themes/themes'
import { Dropdown } from './Dropdown'
import { Routes } from '../helpers/routeHelpers'
import { ThemeName } from './ThemeName'

interface Props {
  showOptions?: boolean
}

export const Header: Component<Props> = (props) => {
  return (
    <div class={clsx('h-full pt-8 transition-all duration-300')}>
      <div class="w-full mb-4 flex justify-between items-center">
        <A href={Routes.test} class="text-5xl font-bold">
          Syper_
        </A>
      </div>
      <Show when={props.showOptions}>
        <div class="h-full w-full flex justify-start">
          <div class="flex flex-col">
            <div class="flex items-center gap-x-2 flex-wrap">
              /
              <Dropdown
                key={userOptions.theme}
                options={getThemeList().map((theme) => ({
                  key: theme.key,
                  value: <ThemeName theme={theme.value} />,
                }))}
                onSelect={(option) => setAndSaveTheme(option.key)}
              />
              /
              <Dropdown
                key={userOptions.textMode}
                options={textModeOptions}
                onSelect={(option) => setTextMode(option.key)}
              />
              /
              <Show when={isWordsMode() || isTimeMode()}>
                <Dropdown
                  key={userOptions.dictionary}
                  options={Object.entries(dictionaries).map(([key, value]) => ({
                    key: key as Dictionaries,
                    value: value.name,
                  }))}
                  onSelect={(option) => setDictionary(option.key)}
                />
                /
              </Show>
              <Show when={isWordsMode()}>
                <Dropdown
                  key={userOptions.wordCount}
                  valueFormatter={(option) => `Count: ${option.key}`}
                  options={WordCounts.map((count) => ({ key: count, value: count }))}
                  onSelect={(option) => setWordCount(option.key)}
                />
                /
              </Show>
              <Show when={isTimeMode()}>
                <Dropdown
                  key={userOptions.timeDuration}
                  valueFormatter={(option) => `Duration: ${getShortFormattedDuration(option.key)}`}
                  options={TimeDurations}
                  onSelect={(option) => setTimeDuration(option.key)}
                />
                /
              </Show>
            </div>
          </div>
        </div>
      </Show>
    </div>
  )
}
