import { ApexOptions } from 'apexcharts'

export type Series = number[][]

export interface Vector2 {
  x: number
  y: number
}

export interface InitialSeries {
  data: Vector2[]
  name: string
}

export interface W {
  config: ApexOptions
  globals: Globals
}

export interface Globals {
  chartID: string
  chartClass: string
  clientX: number
  clientY: number
  colours: string[]
  gridHeight: number
  gridWidth: number
  labels: number[]
  series: Series
  initialSeries: InitialSeries[]
}
