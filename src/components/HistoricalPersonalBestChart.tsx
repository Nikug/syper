import { Component, createEffect, createSignal, on } from 'solid-js'
import { DatabasePersonalBest } from '../supabaseTypes'
import { userOptions } from '../StateManager'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { createDefaultChartOptions } from './WpmChart'
import { TextMode } from '../types'
import { TimeDurations, WordCounts, textModeOptions } from '../constants'
import { render } from 'solid-js/web'
import { PersonalBestChartTooltip } from './PersonalBestChartTooltip'

interface Props {
  personalBests: DatabasePersonalBest[]
  textMode: TextMode
}

export const HistoricalPersonalBestChart: Component<Props> = (props) => {
  let element: HTMLDivElement | undefined
  const [chart, setChart] = createSignal<ApexCharts | null>(null)

  createEffect(
    on([() => userOptions.theme, () => props.personalBests], () => {
      chart()?.destroy()
      const newChart = new ApexCharts(element, createOptions(props.personalBests, props.textMode))
      newChart.render()
      setChart(newChart)
    })
  )

  return (
    <div class="paper p-4 chart-container">
      <div ref={element} />
    </div>
  )
}

const parseData = (
  personalBests: DatabasePersonalBest[],
  textMode: TextMode
): { x: unknown; y: unknown }[] => {
  if (textMode === 'words') {
    return WordCounts.map((count) => ({
      x: count.toString(),
      y: personalBests.find((best) => best.words === count)?.wordsPerMinute ?? 0,
    }))
  } else if (textMode === 'time') {
    return TimeDurations.map((duration) => ({
      x: duration.value,
      y: personalBests.find((best) => best.duration === duration.key)?.wordsPerMinute ?? 0,
    }))
  }

  return []
}

const [disposeTooltip, setDisposeTooltip] = createSignal<{ dispose: () => void } | null>(null)

const createOptions = (personalBests: DatabasePersonalBest[], textMode: TextMode): ApexOptions => {
  const data = parseData(personalBests, textMode)
  const options = createDefaultChartOptions(
    textModeOptions.find((mode) => mode.key === textMode)?.value ?? '',
    'Words per minute'
  )

  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  options.chart!.type = 'bar'
  options.series = [{ name: 'Words per minute', data }]
  options.title!.text = 'Personal bests'
  options.tooltip = {}
  options.tooltip.intersect = true
  options.tooltip.shared = false
  options.tooltip.followCursor = true
  options.plotOptions = { bar: { borderRadius: 4 } }
  // eslint-disable-next-line solid/reactivity
  options.tooltip!.custom = (tooltipProps) => {
    disposeTooltip()?.dispose()
    const div = document.createElement('div')
    const wpm = () => tooltipProps.series[tooltipProps.seriesIndex][tooltipProps.dataPointIndex]
    const personalBest = () => personalBests.find((best) => best.wordsPerMinute === wpm())
    const result = render(() => <PersonalBestChartTooltip personalBest={personalBest()} />, div)
    setDisposeTooltip({ dispose: result })
    return div.innerHTML
  }
  /* eslint-enable @typescript-eslint/no-non-null-assertion */

  return options
}
