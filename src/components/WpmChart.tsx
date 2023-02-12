import { Component, createEffect } from 'solid-js'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { variants } from '@catppuccin/palette'
import { Measurements } from '../types'
import { wordsPerMinute } from '../util'
import { catppuccinFlavour } from '../App'

interface Props {
  measurements: Measurements
}

export const WpmChart: Component<Props> = (props) => {
  let element: HTMLDivElement | undefined

  createEffect(() => {
    const chart = new ApexCharts(element, createOptions(props.measurements))
    chart.render()
  })

  return <div ref={element} class="rounded overflow-hidden bg-ctp-surface0" />
}

const catppuccinColor = () => variants[catppuccinFlavour().flavour]

const createOptions = (measurements: Measurements) => {
  const timestamps = Array.from(measurements.timestamps.entries())
  const startTime = measurements.startTime ?? 0
  const wpmOverTime = timestamps.map(([key, value]) => ({
    x: key,
    y: wordsPerMinute(key, value - startTime),
  }))

  const wpmBetweenTimestamps = timestamps.map(([key, value], i) => ({
    x: key,
    y: wordsPerMinute(
      key - (timestamps[i - 1]?.[0] ?? 0),
      value - (timestamps[i - 1]?.[1] ?? startTime)
    ),
  }))

  const options: ApexOptions = {
    series: [
      { name: 'Words per minute', data: wpmBetweenTimestamps },
      { name: 'Words per minute total', data: wpmOverTime },
    ],
    chart: {
      height: 400,
      type: 'line',
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: false,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      borderColor: catppuccinColor().text.hex,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'top',
      labels: {
        colors: catppuccinColor().text.hex,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    markers: {
      size: 4,
      strokeColors: undefined,
      strokeWidth: 0,
    },
    colors: [catppuccinColor().peach.hex, catppuccinColor().blue.hex],
    xaxis: {
      tickAmount: 10,
      labels: {
        style: {
          colors: catppuccinColor().text.hex,
        },
      },
      tooltip: {
        enabled: false,
      },
      crosshairs: {
        show: false,
      },
      title: {
        text: 'Characters written',
        style: {
          color: catppuccinColor().text.hex,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: catppuccinColor().text.hex,
        },
        formatter: (value: number) => value?.toFixed(),
      },
      title: {
        text: 'Words per minute',
        style: {
          color: catppuccinColor().text.hex,
        },
      },
    },
  }

  return options
}
