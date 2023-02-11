import { Component, createEffect } from 'solid-js'
import { Measurements } from '../types'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { wordsPerMinute } from '../util'

interface Props {
  measurements: Measurements
}

export const WpmChart: Component<Props> = (props) => {
  let element: HTMLDivElement | undefined

  createEffect(() => {
    const chart = new ApexCharts(element, createOptions(props.measurements))
    chart.render()
  })

  return <div ref={element} />
}

const createOptions = (measurements: Measurements) => {
  const timestamps = Array.from(measurements.timestamps.entries())
  const startTime = measurements.startTime ?? 0
  const wpmOverTime = timestamps.map(([key, value], i) => ({
    x: i + 1,
    y: wordsPerMinute(key, value - startTime),
  }))

  const betweenTimestamps = timestamps.map(([key, value], i) => ({
    x: i + 1,
    y: wordsPerMinute(
      key - (timestamps.at(i - 1)?.[0] ?? 0),
      value - (timestamps.at(i - 1)?.[1] ?? startTime)
    ),
  }))

  const options: ApexOptions = {
    series: [{ data: wpmOverTime }, { data: betweenTimestamps }],
    chart: {
      height: 400,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
  }

  return options
}
