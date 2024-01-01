import { Component, Show } from 'solid-js'
import { personalBests } from '../StateManager'
import { DatabasePersonalBest } from '../supabaseTypes'
import { textModeOptions } from '../constants'

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
      <h3 class="text-3xl font-bold text-center mb-4">Personal best</h3>
      <div>
        <p>Mode: {getTextMode(getBestPersonalBest()?.textMode)}</p>
        <p>Words per minute: {getBestPersonalBest()?.wordsPerMinute.toFixed(2)}</p>
        <p>Dictionary: {getBestPersonalBest()?.source}</p>
        <Show when={getBestPersonalBest()?.words}>
          <p>Words: {getBestPersonalBest()?.words}</p>
        </Show>
        <Show when={getBestPersonalBest()?.duration}>
          <p>Duration: {getBestPersonalBest()?.duration}</p>
        </Show>
      </div>
    </div>
  )
}
