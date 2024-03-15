import { Component } from 'solid-js'
import { Dropdown } from './Dropdown'
import { Dictionaries, dictionaries } from '../assets/files'
import { textModeOptions } from '../constants'
import { personalBests, userOptions } from '../StateManager'
import { HistoricalPersonalBestChart } from './HistoricalPersonalBestChart'
import {
  setHistoryPersonalBestDictionary,
  setHistoryPersonalBestMode,
} from '../helpers/optionsHelpers'

export const HistoricalPersonalBestContainer: Component = () => {
  const dictionaryOptions = () =>
    Object.entries(dictionaries).map(([key, value]) => ({
      key: key as Dictionaries,
      value: value.name,
    }))

  const modeOptions = () => textModeOptions.filter((mode) => mode.key !== 'quote')

  const selectedPersonalBests = () => {
    return personalBests.filter(
      (best) =>
        best.textMode === userOptions.historyPersonalBestMode &&
        best.source === userOptions.historyPersonalBestDictionary
    )
  }
  return (
    <>
      <div class="flex gap-4 my-4">
        <p class="font-bold">Chart options:</p>
        <Dropdown
          key={userOptions.historyPersonalBestMode}
          options={modeOptions()}
          onSelect={(newMode) => setHistoryPersonalBestMode(newMode.key)}
        />
        <Dropdown
          key={userOptions.historyPersonalBestDictionary}
          options={dictionaryOptions()}
          onSelect={(option) => setHistoryPersonalBestDictionary(option.key)}
        />
      </div>
      <div>
        <HistoricalPersonalBestChart
          personalBests={selectedPersonalBests()}
          textMode={userOptions.historyPersonalBestMode}
        />
      </div>
    </>
  )
}
