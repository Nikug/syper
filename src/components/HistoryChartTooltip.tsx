import { Component } from 'solid-js'
import { W } from '../apexChartTypes'
import { format } from 'date-fns'
import { DatabaseTestResult } from '../supabaseTypes'
import { getFormattedDuration } from '../helpers/mathHelpers'
import { textModeOptions } from '../constants'

interface Props {
  series: number[][]
  dataPointIndex: number
  w: W
  tests: DatabaseTestResult[]
}

export const HistoryChartTooltip: Component<Props> = (props) => {
  const test = () => props.tests[props.dataPointIndex]

  return (
    <div class="bg-theme-surface1 rounded px-4 py-2 !border-theme-danger">
      <h3 class="font-semibold mb-2">{format(new Date(test().date), 'dd.MM.yyyy HH:mm')}</h3>
      <div>
        <p>
          Type:{' '}
          <span class="font-bold">
            {textModeOptions.find((mode) => mode.key === test()?.textMode)?.value}
          </span>
        </p>
        <p>
          Source: <span class="font-bold">{test()?.source}</span>
        </p>
        <p>
          Duration: <span class="font-bold">{getFormattedDuration(test()?.duration)}</span>
        </p>
        <p class="border-b border-theme-text pb-2">
          Words: <span class="font-bold">{test()?.words}</span>
        </p>
        <p class="mt-2">
          Wpm: <span class="font-bold">{test()?.wordsPerMinute.toFixed(2)}</span>
        </p>
        <p>
          Accuracy: <span class="font-bold">{(test()?.accuracy * 100).toFixed(2)}%</span>
        </p>
        <p>
          Correctness: <span class="font-bold">{(test()?.correctness * 100).toFixed(2)}%</span>
        </p>
      </div>
    </div>
  )
}
