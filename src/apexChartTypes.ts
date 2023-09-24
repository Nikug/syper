import { ApexOptions } from 'apexcharts'

export type Series = number[][]

export interface Vector2<T> {
  x: T
  y: number
}

export interface InitialSeries {
  data: Vector2<number | Date | string>[]
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
