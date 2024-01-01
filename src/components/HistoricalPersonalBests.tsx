import { Component, Show } from 'solid-js'
import { personalBests } from '../StateManager'
import { DatabasePersonalBest } from '../supabaseTypes'
import { textModeOptions } from '../constants'
import { HistoricalPersonalBestContainer } from './HistoricalPersonalBestContainer'
import { getFormattedDuration } from '../helpers/mathHelpers'

export const HistoricalPersonalBests: Component = () => {
  const getBestPersonalBest = () =>
    personalBests.reduce((result: DatabasePersonalBest | null, best) => {
      if (!result || result.wordsPerMinute < best.wordsPerMinute) {
        return best
      }
      return result
    }, null)

  const getTextMode = (mode: string | undefined) => {
    return textModeOptions.find((option) => option.key === mode)?.value
  }

  return (
    <div>
      <h3 class="text-3xl font-bold text-center mb-8">Personal bests</h3>
      <div class="flex gap-4 items-center mb-8">
        <div class="i-ri-vip-crown-line w-6 h-6 -mr-2" />
        <h4 class="text-xl font-bold">Best:</h4>
        <p>{getBestPersonalBest()?.wordsPerMinute.toFixed(2)} wpm</p>
        <p>Mode: {getTextMode(getBestPersonalBest()?.textMode)}</p>
        <p>Dictionary: {getBestPersonalBest()?.source}</p>
        <Show when={getBestPersonalBest()?.words}>
          <p>Words: {getBestPersonalBest()?.words}</p>
        </Show>
        <Show when={getBestPersonalBest()?.duration}>
          <p>Duration: {getFormattedDuration(getBestPersonalBest()?.duration ?? 0)}</p>
        </Show>
      </div>
      <div>
        <HistoricalPersonalBestContainer />
      </div>
    </div>
  )
}
