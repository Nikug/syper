import { Component, createEffect, createSignal, on, onCleanup } from 'solid-js'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { AnimationState, AnimationStates, Measurements } from '../types'
import { mapErrorsToSeries, sampleSeries, wordsPerMinute } from '../helpers/mathHelpers'
import './WpmChart.css'
import { userOptions } from '../StateManager'
import { getColor } from '../themes/themeHelper'
import { CharactersPerWord } from '../constants'
import { WpmChartTooltip } from './WpmChartTooltip'
import { render } from 'solid-js/web'
import { findPersonalBestFromOptions } from '../helpers/personalBestHelpers'

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

  onCleanup(() => chart()?.destroy())

  return (
    <div class="paper p-4 chart-container">
      <div ref={element} />
    </div>
  )
}

const createOptions = (measurements: Measurements) => {
  const timestamps = sampleSeries(
    Array.from(measurements.timestamps.entries()),
    CharactersPerWord
  ).slice(1)
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

  const errors = mapErrorsToSeries(measurements.errors, wpmOverTime.at(-1)!.x, CharactersPerWord)
  const options = createDefaultChartOptions('Characters written', 'Words per minute')
  options.series = [
    { name: 'Words per minute', data: wpmBetweenTimestamps, type: 'line' },
    { name: 'Total words per minute', data: wpmOverTime, type: 'line' },
    {
      name: 'Errors',
      data: errors,
      type: 'column',
      color: getColor(userOptions.theme, 'danger', 0.5),
    },
  ]
  options.tooltip = {
    custom: (tooltipProps) => {
      disposeTooltip()?.dispose()
      const div = document.createElement('div')
      const result = render(
        () => (
          <WpmChartTooltip
            seriesIndex={tooltipProps.seriesIndex}
            series={tooltipProps.series}
            dataPointIndex={tooltipProps.dataPointIndex}
            w={tooltipProps.w}
            measurements={measurements}
          />
        ),
        div
      )
      setDisposeTooltip({ dispose: result })
      return div.innerHTML
    },
  }
  options.yaxis = [
    {
      seriesName: 'Words per minute',
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
        text: 'Words per minute',
        style: {
          color: getColor(userOptions.theme, 'text'),
          fontSize: 'inherit',
          fontWeight: 'normal',
        },
      },
    },
    { seriesName: 'Words per minute', labels: { show: false } },
    {
      seriesName: 'Errors',
      labels: {
        style: {
          colors: getColor(userOptions.theme, 'text'),
        },
        formatter: (value: number) => value?.toFixed(),
      },
      title: {
        text: 'Errors',
        style: {
          color: getColor(userOptions.theme, 'text'),
          fontSize: 'inherit',
          fontWeight: 'normal',
        },
      },
      opposite: true,
    },
  ]

  const best = findPersonalBestFromOptions(userOptions)
  if (best) {
    options.annotations = createPersonalBestAnnotation(best.wordsPerMinute)
  }

  return options
}

const [disposeTooltip, setDisposeTooltip] = createSignal<{ dispose: () => void } | null>(null)

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
    plotOptions: {
      bar: {
        columnWidth: 2,
      },
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
      width: [2, 4],
    },
    markers: {
      strokeColors: undefined,
      strokeWidth: 0,
      size: [1, 1, 5],
    },
    colors: [getColor(userOptions.theme, 'secondary'), getColor(userOptions.theme, 'primary')],
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
    noData: {
      text: 'No data',
    },
  }

  return options
}

export const createPersonalBestAnnotation = (wpm: number): ApexAnnotations => {
  return {
    yaxis: [
      {
        y: wpm,
        strokeDashArray: 8,
        borderColor: getColor(userOptions.theme, 'text'),
        opacity: 1,
        label: {
          text: `Personal best ${wpm.toFixed(2)} wpm`,
          borderColor: undefined,
          textAnchor: 'middle',
          position: 'center',
          offsetY: -8,
          style: {
            color: getColor(userOptions.theme, 'base'),
            fontSize: '14px',
            background: getColor(userOptions.theme, 'text'),
            cssClass: 'rounded-lg font-bold',
          },
        },
      },
    ],
  }
}
