import { Component } from 'solid-js'
import { userOptions } from '../StateManager'
import { CheckButton } from './CheckButton'
import { setShowProgressBar, setShowProgressCounter } from '../helpers/optionsHelpers'

export const UserOptions: Component = () => {
  return (
    <div class="flex flex-wrap gap-4">
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
  )
}
