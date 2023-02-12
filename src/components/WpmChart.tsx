import { Component, createEffect } from 'solid-js'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { variants } from '@catppuccin/palette'
import { Measurements } from '../types'
import { wordsPerMinute } from '../util'
import { catppuccinFlavour } from '../App'
import './WpmChart.css'

interface Props {
  measurements: Measurements
}

export const WpmChart: Component<Props> = (props) => {
  let element: HTMLDivElement | undefined

  createEffect(() => {
    const chart = new ApexCharts(element, createOptions(props.measurements))
    chart.render()
  })

  return <div ref={element} class="paper py-4 pr-4" />
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
      toolbar: {
        show: false,
      },
      fontFamily: 'inherit',
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      borderColor: catppuccinColor().overlay0.hex,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'top',
      fontSize: 'inherit',
      labels: {
        colors: catppuccinColor().text.hex,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    markers: {
      size: 5,
      strokeColors: undefined,
      strokeWidth: 0,
    },
    colors: [catppuccinColor().overlay2.hex, catppuccinColor().mauve.hex],
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
      axisTicks: {
        color: catppuccinColor().overlay0.hex,
      },
      title: {
        text: 'Characters written',
        style: {
          color: catppuccinColor().text.hex,
          fontSize: 'inherit',
          fontWeight: 'normal',
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
      axisTicks: {
        color: catppuccinColor().overlay0.hex,
      },
      title: {
        text: 'Words per minute',
        style: {
          color: catppuccinColor().text.hex,
          fontSize: 'inherit',
          fontWeight: 'normal',
        },
      },
    },
    tooltip: {
      custom: ({ series, dataPointIndex, w }) => {
        const showSeries0 = series.at(0)?.[dataPointIndex] != null
        const showSeries1 = series.at(1)?.[dataPointIndex] != null
        return `
          <div class="bg-ctp-surface2 rounded px-4 py-2 !border-ctp-red">
            <h3 class="font-semibold mb-2">At ${
              w.globals.initialSeries.at(0)?.data.at(dataPointIndex)?.x
            } characters
            </h3>
            ${
              showSeries0
                ? `<div class="flex gap-x-2 items-center">
                     <div class="bg-ctp-overlay2 rounded-full w-4 h-4"></div>
                     <p>Current Wpm: ${series.at(0)?.[dataPointIndex]?.toFixed(1)}</p>
                   </div>`
                : ''
            }
            ${
              showSeries1
                ? `<div class="flex gap-x-2 items-center">
                     <div class="bg-ctp-mauve rounded-full w-4 h-4"></div>
                     <p>Total Wpm: ${series.at(1)?.[dataPointIndex]?.toFixed(1)}</p>
                   </div>`
                : ''
            }
          </div>
        `
      },
    },
  }

  return options
}
