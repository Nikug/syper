import { Component, createEffect, createSignal, on } from 'solid-js'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { DatabaseTestResult } from '../types'
import { userOptions } from '../OptionsManager'
import { createDefaultChartOptions } from './WpmChart'
import { format } from 'date-fns'

interface Props {
  tests: DatabaseTestResult[]
}

export const HistoryChart: Component<Props> = (props) => {
  let element: HTMLDivElement | undefined
  const [chart, setChart] = createSignal<ApexCharts | null>(null)

  createEffect(
    on([() => userOptions.theme], () => {
      chart()?.destroy()
      const newChart = new ApexCharts(element, createOptions(props.tests))
      newChart.render()
      setChart(newChart)
    })
  )

  return <div ref={element} class="paper p-4" />
}

const createOptions = (tests: DatabaseTestResult[]): ApexOptions => {
  const data = tests.map((test) => ({
    x: format(new Date(test.date), 'dd.MM.yyyy HH:mm'),
    y: test.wordsPerMinute,
  }))

  const options = createDefaultChartOptions('Date', 'Words per minute')
  options.series = [{ name: 'Words per minute', data }]
  return options
}
