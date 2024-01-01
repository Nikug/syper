import { Component, createSignal } from 'solid-js'
import { Dropdown } from './Dropdown'
import { Dictionaries, dictionaries } from '../assets/files'
import { TextMode } from '../types'
import { textModeOptions } from '../constants'
import { personalBests } from '../StateManager'
import { HistoricalPersonalBestChart } from './HistoricalPersonalBestChart'

export const HistoricalPersonalBestContainer: Component = () => {
  const [dictionary, setDictionary] = createSignal<Dictionaries>('english-200')
  const [mode, setMode] = createSignal<TextMode>('words')

  const dictionaryOptions = () =>
    Object.entries(dictionaries).map(([key, value]) => ({
      key: key as Dictionaries,
      value: value.name,
    }))

  const modeOptions = () => textModeOptions.filter((mode) => mode.key !== 'quote')

  const selectedPersonalBests = () => {
    return personalBests.filter(
      (best) => best.textMode === mode() && best.source === dictionaries[dictionary()].name
    )
  }
  return (
    <>
      <div class="flex gap-4 my-4">
        <p class="font-bold">Chart options:</p>
        <Dropdown
          key={mode()}
          options={modeOptions()}
          onSelect={(newMode) => setMode(newMode.key)}
        />
        <Dropdown
          key={dictionary()}
          options={dictionaryOptions()}
          onSelect={(option) => setDictionary(option.key)}
        />
      </div>
      <div class="min-h-[400px]">
        <HistoricalPersonalBestChart personalBests={selectedPersonalBests()} textMode={mode()} />
      </div>
    </>
  )
}
