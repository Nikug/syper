import { Vector2 } from '../apexChartTypes'
import { CharactersPerWord } from '../constants'
import { Attempt, Measurements, TypingTest } from '../types'
import { numberOfMatchingItems } from '../util'

export const getDuration = (measurements: Measurements): number | null => {
  if (measurements.endTime == null || measurements.startTime == null) {
    return null
  }

  return measurements.endTime - measurements.startTime
}

export const getWordsPerMinute = (measurements: Measurements, test: TypingTest): number | null => {
  const duration = getDuration(measurements)
  if (!duration) return null

  return wordsPerMinute(test.length, duration)
}

export const wordsPerMinute = (characters: number, duration: number): number | null => {
  if (!duration) return null
  const words = characters / CharactersPerWord
  const durationInMinutes = duration / 1000 / 60

  return words / durationInMinutes
}

export const getCorrectness = (test: TypingTest, attempt: Attempt): number => {
  return numberOfMatchingItems(test.text, attempt.finalText) / test.length
}

export const getAccuracy = (test: TypingTest, attempt: Attempt): number => {
  return numberOfMatchingItems(test.text, attempt.finalText) / attempt.allText.length
}

// Source: https://math.stackexchange.com/questions/204020/what-is-the-equation-used-to-calculate-a-linear-trendline
export const calculateTrendLine = (points: Vector2<number>[]): Vector2<number>[] => {
  if (points.length < 2) return []

  let xSum = 0
  let ySum = 0
  let xySum = 0
  let xxSum = 0
  let firstPoint = points[0]
  let lastPoint = points[0]
  const count = points.length

  for (const point of points) {
    xSum += point.x
    ySum += point.y
    xySum += point.x * point.y
    xxSum += point.x * point.x
    if (point.x < firstPoint.x) firstPoint = point
    if (point.x > lastPoint.x) lastPoint = point
  }

  const slope = (count * xySum - xSum * ySum) / (count * xxSum - xSum * xSum)
  const intercept = (ySum - slope * xSum) / count
  const startPoint = { x: firstPoint.x, y: firstPoint.x * slope + intercept }
  const endPoint = { x: lastPoint.x, y: lastPoint.x * slope + intercept }
  return [startPoint, endPoint]
}

const mean = (array: number[]) => {
  const sum = array.reduce((total, value) => total + value, 0)
  return sum / array.length
}

export const smoothSeries = (series: number[], smoothCount: number): number[] => {
  const smoothedSeries: number[] = new Array(series.length)
  let subSeries: number[] = new Array(smoothCount)

  for (let i = 0, limit = series.length; i < limit; i++) {
    subSeries = series.slice(i, i + smoothCount)
    smoothedSeries[i] = mean(subSeries)
  }

  return smoothedSeries
}

export const smoothYValues = (
  values: Vector2<number>[],
  smoothCount: number
): Vector2<number>[] => {
  const yValues = values.map((value) => value.y)
  const smoothedYValues = smoothSeries(yValues, smoothCount)
  values = values.map((value, i) => ({ x: value.x, y: smoothedYValues[i] }))
  return values
}

export const sampleSeries = <T>(series: T[], frequency: number): T[] => {
  return series.filter((_, index) => index % frequency === 0)
}

export const mapErrorsToSeries = (
  errors: Map<number, number>,
  seriesLength: number,
  frequency: number
) => {
  let sample = 0
  const series: { x: number; y: number | null }[] = []
  for (let i = 0; i < seriesLength; ++i) {
    if (i % frequency === 0 && i !== 0) {
      series.push({ x: i, y: sample === 0 ? null : sample })
      sample = 0
    }

    const value = errors.get(i)
    if (value) sample += value
  }

  series.push({ x: seriesLength, y: sample === 0 ? null : sample })

  return series
}
