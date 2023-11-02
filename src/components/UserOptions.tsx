import { Component, For } from 'solid-js'
import { userOptions } from '../StateManager'
import { CheckButton } from './CheckButton'
import { setShowProgressBar, setShowProgressCounter } from '../helpers/optionsHelpers'
import { ThemeKey, themes } from '../themes/themes'
import { setAndSaveTheme } from '../themes/ThemeManager'

export const UserOptions: Component = () => {
  return (
    <div class="flex flex-col">
      <h3 class="text-3xl font-bold mb-4">Options</h3>
      <div class="flex flex-wrap gap-4 mb-16">
        <CheckButton
          value={userOptions.showProgressBar}
          text="Show progress bar"
          onClick={setShowProgressBar}
        />
        <CheckButton
          value={userOptions.showProgressCounter}
          text="Show progress counter"
          onClick={setShowProgressCounter}
        />
      </div>
      <h3 class="text-3xl font-bold mb-4">Theme</h3>
      <div class="flex flex-wrap gap-4 mb-16">
        <For each={Object.entries(themes)}>
          {([key, value]) => (
            <CheckButton
              value={key === userOptions.theme}
              text={value.name}
              onClick={() => setAndSaveTheme(key as ThemeKey)}
            />
          )}
        </For>
      </div>
    </div>
  )
}
