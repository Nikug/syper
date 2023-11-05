import { Component, For } from 'solid-js'
import { userOptions } from '../StateManager'
import { CheckButton } from './CheckButton'
import {
  setShowCapsLockIndicator,
  setShowProgressBar,
  setShowProgressCounter,
  setShowTextHighlight,
  setUseSmoothScrolling,
} from '../helpers/optionsHelpers'
import { getThemeList } from '../themes/themes'
import { setAndSaveTheme } from '../themes/ThemeManager'
import { ThemeName } from './ThemeName'

export const UserOptions: Component = () => {
  return (
    <div class="flex flex-col">
      <h3 class="text-3xl font-bold mb-4">Options</h3>
      <div class="grid grid-cols-3 gap-4 mb-16">
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
        <CheckButton
          value={userOptions.showCapsLockIndicator}
          text="Show caps lock indicator"
          onClick={setShowCapsLockIndicator}
        />
        <CheckButton
          value={userOptions.showTextHighlight}
          text="Show text highlight"
          onClick={setShowTextHighlight}
        />
        <CheckButton
          value={userOptions.useSmoothScrolling}
          text="Use smooth scrolling"
          onClick={setUseSmoothScrolling}
        />
      </div>
      <h3 class="text-3xl font-bold mb-4">Theme</h3>
      <div class="grid grid-cols-3 gap-4 mb-16">
        <For each={getThemeList()}>
          {(theme) => (
            <CheckButton
              value={theme.key === userOptions.theme}
              text={<ThemeName theme={theme.value} />}
              onClick={() => setAndSaveTheme(theme.key)}
            />
          )}
        </For>
      </div>
    </div>
  )
}
