import clsx from 'clsx'
import { Component } from 'solid-js'
import { isTimeMode } from '../helpers/optionsHelpers'
import { testStarted } from '../helpers/stateHelpers'
import { typingTest, attempt } from '../StateManager'

const gradient = 'bg-gradient-to-r from-transparent via-theme-accent to-theme-primary'

export const ProgressBar: Component = () => {
  const progress = () => {
    if (isTimeMode()) {
      if (!testStarted()) return 0
      return (1 - attempt.remainingDuration / attempt.testDuration) * 100
    }

    return (attempt.finalText.length / typingTest().length) * 100
  }
  return (
    <div class="relative w-full h-2 mt-2">
      <div class={clsx(gradient, 'absolute inset-0')} />
      <div
        style={{ left: `${progress()}%` }}
        class={`inset-y-0 right-0 absolute bg-theme-base transition-left ${
          isTimeMode() ? 'duration-1000 ease-linear' : 'duration-75'
        }`}
      />
    </div>
  )
}
