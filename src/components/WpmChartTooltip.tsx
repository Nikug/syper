import { Component, Show } from 'solid-js'
import { W } from '../apexChartTypes'

interface Props {
  series: number[][]
  dataPointIndex: number
  w: W
}

export const WpmChartTooltip: Component<Props> = (props) => {
  const wpmSeries = () => props.series[0]
  const totalWpmSeries = () => props.series[1]
  const wpmPoint = () => wpmSeries()?.[props.dataPointIndex]
  const totalWpmPoint = () => totalWpmSeries()?.[props.dataPointIndex]
  const showWpmSeries = () => wpmPoint() != null
  const showTotalWpmSeries = () => totalWpmPoint() != null

  return (
    <div class="bg-theme-surface1 rounded px-4 py-2 !border-theme-danger">
      <h3 class="font-semibold mb-2">
        At {props.w.globals.initialSeries[0]?.data[props.dataPointIndex]?.x.toString()} characters
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
