import clsx from 'clsx'
import { quote, attempt } from '../App'

const gradient = 'bg-gradient-to-r from-transparent via-ctp-peach to-ctp-red'

export const ProgressBar = () => {
  const progress = () => (attempt.finalText.length / quote().length) * 100
  return (
    <div class="relative w-full h-2 mt-2">
      <div class={clsx(gradient, 'absolute inset-0')} />
      <div
        style={{ left: `${progress()}%` }}
        class="inset-y-0 right-0 absolute bg-ctp-base transition-all duration-75"
      />
    </div>
  )
}
