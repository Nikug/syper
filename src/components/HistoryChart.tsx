import { Component, createEffect, createSignal, on } from 'solid-js'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { DatabaseTestResult } from '../supabaseTypes'
import { createDefaultChartOptions } from './WpmChart'
import { format } from 'date-fns'
import { calculateTrendLine } from '../helpers/mathHelpers'
import { userOptions } from '../StateManager'
import { render } from 'solid-js/web'
import { HistoryChartTooltip } from './HistoryChartTooltip'

interface Props {
  startDate?: Date
  endDate?: Date
  tests: DatabaseTestResult[]
}

export const HistoryChart: Component<Props> = (props) => {
  let element: HTMLDivElement | undefined
  const [chart, setChart] = createSignal<ApexCharts | null>(null)

  createEffect(
    on([() => userOptions.theme], () => {
      chart()?.destroy()
      const newChart = new ApexCharts(
        element,
        createOptions(props.tests, props.startDate, props.endDate)
      )
      newChart.render()
      setChart(newChart)
    })
  )

  return <div ref={element} class="paper p-4" />
}

const [disposeTooltip, setDisposeTooltip] = createSignal<{ dispose: () => void } | null>(null)

const createOptions = (
  tests: DatabaseTestResult[],
  startDate?: Date,
  endDate?: Date
): ApexOptions => {
  const data = tests.map((test) => ({
    x: new Date(test.date),
    y: test.wordsPerMinute,
  }))
  const trendLine = calculateTrendLine(data.map((point) => ({ x: point.x.getTime(), y: point.y })))
  const formattedStart = format(startDate ?? new Date(), 'dd.MM.yyyy')
  const formattedEnd = format(endDate ?? new Date(), 'dd.MM.yyyy')
  let title = formattedStart
  if (formattedStart !== formattedEnd) {
    title = `${title} - ${formattedEnd}`
  }

  const options = createDefaultChartOptions('Date', 'Words per minute')
  options.series = [
    { name: 'Words per minute', data, type: 'scatter' },
    { name: 'Trend', data: trendLine, type: 'line' },
  ]
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  options.xaxis!.type = 'datetime'
  options.xaxis!.min = startDate?.getTime()
  options.xaxis!.max = endDate?.getTime()
  options.xaxis!.crosshairs!.show = false
  options.title!.text = title
  options.stroke!.curve = 'straight'
  options.stroke!.dashArray = 6
  options.markers!.size = [6, 0]
  options.tooltip!.intersect = true
  options.tooltip!.shared = false
  options.tooltip!.followCursor = true
  // eslint-disable-next-line solid/reactivity
  options.tooltip!.custom = (tooltipProps) => {
    disposeTooltip()?.dispose()
    const div = document.createElement('div')
    const result = render(
      () => (
        <HistoryChartTooltip
          tests={tests}
          series={tooltipProps.series}
          dataPointIndex={tooltipProps.dataPointIndex}
          w={tooltipProps.w}
        />
      ),
      div
    )
    setDisposeTooltip({ dispose: result })
    return div.innerHTML
  }
  /* eslint-enable @typescript-eslint/no-non-null-assertion */

  return options
}
