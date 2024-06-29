import { Component, For, Show } from 'solid-js'
import { W } from '../apexChartTypes'
import { Measurements } from '../types'
import clsx from 'clsx'

interface Character {
  character: string
  underline: boolean
}

interface Props {
  series: number[][]
  dataPointIndex: number
  w: W
  measurements: Measurements
}

export const WpmChartTooltip: Component<Props> = (props) => {
  const wpmSeries = () => props.series[0]
  const totalWpmSeries = () => props.series[1]
  const wpmPoint = () => wpmSeries()?.[props.dataPointIndex]
  const totalWpmPoint = () => totalWpmSeries()?.[props.dataPointIndex]
  const showWpmSeries = () => wpmPoint() != null
  const showTotalWpmSeries = () => totalWpmPoint() != null
  const characterIndex = () =>
    props.w.globals.initialSeries[0]?.data[props.dataPointIndex]?.x as number

  const getWord = (): Character[] => {
    let index = characterIndex()
    if (index == null) return []
    index -= 1
    const word = props.measurements.words.find(
      (word) => word.startIndex <= index && word.endIndex >= index
    )
    if (!word) return []
    const underlineIndex = index - word.startIndex
    const chars = [...word.word].map((char, i) => ({
      character: char,
      underline: i === underlineIndex,
    }))

    return chars
  }

  return (
    <div class="bg-theme-surface1 rounded px-4 py-2 !border-theme-danger">
      <h3 class="font-semibold mb-2">At {characterIndex()?.toString()} characters</h3>
      <h3 class="font-semibold mb-2 whitespace-pre">
        Word:{' '}
        <For each={getWord()}>
          {(character) => (
            <span
              class={clsx(character.underline && 'underline', 'decoration-2 font-bold font-mono!')}
            >
              {character.character}
            </span>
          )}
        </For>
      </h3>
      <Show when={showTotalWpmSeries()}>
        <div class="flex gap-x-2 items-center">
          <div class="bg-theme-primary rounded-full w-4 h-4" />
          <p>
            Total Wpm: <span class="font-bold">{totalWpmPoint()?.toFixed(1)}</span>
          </p>
        </div>
      </Show>
      <Show when={showWpmSeries()}>
        <div class="flex gap-x-2 items-center">
          <div class="bg-theme-secondary rounded-full w-4 h-4" />
          <p>
            Wpm: <span class="font-bold">{wpmPoint()?.toFixed(1)}</span>
          </p>
        </div>
      </Show>
    </div>
  )
}
