import { Component, createEffect, createSignal, on } from 'solid-js'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { DatabaseTestResult } from '../types'
import { userOptions } from '../OptionsManager'
import { createDefaultChartOptions } from './WpmChart'
import { format } from 'date-fns'

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

const createOptions = (
  tests: DatabaseTestResult[],
  startDate?: Date,
  endDate?: Date
): ApexOptions => {
  const data = tests.map((test) => ({
    x: new Date(test.date),
    y: test.wordsPerMinute,
  }))

  const formattedStart = format(startDate ?? new Date(), 'dd.MM.yyyy')
  const formattedEnd = format(endDate ?? new Date(), 'dd.MM.yyyy')
  let title = formattedStart
  if (formattedStart !== formattedEnd) {
    title = `${title} - ${formattedEnd}`
  }

  const options = createDefaultChartOptions('Date', 'Words per minute')
  options.series = [{ name: 'Words per minute', data }]
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  options.xaxis!.type = 'datetime'
  options.title!.text = title
  /* eslint-enable @typescript-eslint/no-non-null-assertion */
  return options
}
