import clsx from 'clsx'
import { Component } from 'solid-js'
import { typingTest, attempt } from '../StateManager'

const gradient = 'bg-gradient-to-r from-transparent via-theme-accent to-theme-primary'

export const ProgressBar: Component = () => {
  const progress = () => (attempt.finalText.length / typingTest().length) * 100
  return (
    <div class="relative w-full h-2 mt-2">
      <div class={clsx(gradient, 'absolute inset-0')} />
      <div
        style={{ left: `${progress()}%` }}
        class="inset-y-0 right-0 absolute bg-theme-base transition-all duration-75"
      />
    </div>
  )
}
