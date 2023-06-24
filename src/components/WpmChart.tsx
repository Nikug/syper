import { Component, createEffect, createSignal, on } from 'solid-js'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { AnimationState, AnimationStates, Measurements } from '../types'
import { wordsPerMinute } from '../helpers/mathHelpers'
import './WpmChart.css'
import { userOptions } from '../StateManager'
import { getColor } from '../themes/themeHelper'

interface Props {
  measurements: Measurements
  state: AnimationState
}

export const WpmChart: Component<Props> = (props) => {
  let element: HTMLDivElement | undefined
  const [chart, setChart] = createSignal<ApexCharts | null>(null)
  const getState = () => props.state === AnimationStates.shown

  createEffect(
    on([getState, () => userOptions.theme], () => {
      if (!getState()) return
      chart()?.destroy()
      const newChart = new ApexCharts(element, createOptions(props.measurements))
      newChart.render()
      setChart(newChart)
    })
  )

  return <div ref={element} class="paper p-4" />
}

const createOptions = (measurements: Measurements) => {
  const timestamps = Array.from(measurements.timestamps.entries())
  const startTime = measurements.startTime ?? 0
  const wpmOverTime = timestamps.map(([key, value]) => ({
    x: key + 1,
    y: wordsPerMinute(key, value - startTime),
  }))

  const wpmBetweenTimestamps = timestamps.map(([key, value], i) => ({
    x: key + 1,
    y: wordsPerMinute(
      key - (timestamps[i - 1]?.[0] ?? 0),
      value - (timestamps[i - 1]?.[1] ?? startTime)
    ),
  }))

  const options = createDefaultChartOptions('Characters written', 'Words per minute')
  options.series = [
    { name: 'Words per minute total', data: wpmOverTime },
    { name: 'Words per minute', data: wpmBetweenTimestamps },
  ]

  return options
}

export const createDefaultChartOptions = (xTitle: string, yTitle: string): ApexOptions => {
  const options: ApexOptions = {
    series: [],
    title: {
      align: 'center',
      offsetY: 24,
      style: {
        color: getColor(userOptions.theme, 'text'),
        fontSize: '1.25rem',
      },
    },
    chart: {
      height: 400,
      width: '100%',
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
      position: 'back',
      xaxis: {
        lines: {
          show: false,
        },
      },
      borderColor: getColor(userOptions.theme, 'text', 0.5),
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'top',
      fontSize: 'inherit',
      labels: {
        colors: getColor(userOptions.theme, 'text'),
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    markers: {
      strokeColors: undefined,
      strokeWidth: 0,
    },
    colors: [getColor(userOptions.theme, 'primary'), getColor(userOptions.theme, 'secondary')],
    xaxis: {
      tickAmount: 10,
      labels: {
        style: {
          colors: getColor(userOptions.theme, 'text'),
        },
      },
      tooltip: {
        enabled: false,
      },
      crosshairs: {
        show: false,
      },
      axisTicks: {
        color: getColor(userOptions.theme, 'text', 0.5),
      },
      axisBorder: {
        show: false,
      },
      title: {
        text: xTitle,
        style: {
          color: getColor(userOptions.theme, 'text'),
          fontSize: 'inherit',
          fontWeight: 'normal',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: getColor(userOptions.theme, 'text'),
        },
        formatter: (value: number) => value?.toFixed(),
      },
      axisTicks: {
        color: getColor(userOptions.theme, 'text', 0.5),
      },
      title: {
        text: yTitle,
        style: {
          color: getColor(userOptions.theme, 'text'),
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
          <div class="bg-theme-surface1 rounded px-4 py-2 !border-theme-danger">
            <h3 class="font-semibold mb-2">At ${
              w.globals.initialSeries.at(0)?.data.at(dataPointIndex)?.x
            } characters
            </h3>
            ${
              showSeries0
                ? `<div class="flex gap-x-2 items-center">
                     <div class="bg-theme-primary rounded-full w-4 h-4"></div>
                     <p>Total Wpm: <span class="font-bold">${series
                       .at(0)
                       ?.[dataPointIndex]?.toFixed(1)}</span></p>
                   </div>`
                : ''
            }
            ${
              showSeries1
                ? `<div class="flex gap-x-2 items-center">
                     <div class="bg-theme-secondary rounded-full w-4 h-4"></div>
                     <p>Current Wpm: <span class="font-bold">${series
                       .at(1)
                       ?.[dataPointIndex]?.toFixed(1)}</span></p>
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
