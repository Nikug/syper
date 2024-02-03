import { Component, For } from 'solid-js'
import { userOptions } from '../StateManager'
import { CheckButton } from './CheckButton'
import {
  setFont,
  setShowCapsLockIndicator,
  setShowProgressBar,
  setShowProgressCounter,
  setShowTextHighlight,
  setUseSmoothScrolling,
} from '../helpers/optionsHelpers'
import { getThemeList } from '../themes/themes'
import { setAndSaveTheme } from '../themes/ThemeManager'
import { ThemeName } from './ThemeName'
import { Dropdown } from './Dropdown'
import { getFontList } from '../fonts'

export const UserOptions: Component = () => {
  return (
    <div class="flex flex-col">
      <h3 class="h3">Options</h3>
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
      <h3 class="h3">Font</h3>
      <div class="mb-8 flex flex-col gap-8">
        <Dropdown
          key={userOptions.font}
          options={getFontList().map((font) => ({ key: font, value: font }))}
          onSelect={(option) => setFont(option.key)}
        />
        <div style={{ 'font-family': userOptions.font }} class="font-mono text-4xl">
          This is what your text will look like
        </div>
      </div>
      <h3 class="h3">Theme</h3>
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
