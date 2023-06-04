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

/**
 * Turns milliseconds to 2h 30m 15s format
 */
export const getFormattedDuration = (duration: number): string => {
  const totalSeconds = Math.round(duration / 1000)
  const seconds = totalSeconds % 60
  const minutes = Math.floor((totalSeconds / 60) % 60)
  const hours = Math.floor((totalSeconds / 3600) % 60)

  let result = `${seconds}s`
  if (minutes) result = `${minutes}m ${result}`
  if (hours) result = `${hours}h ${result}`
  return result
}

/**
 * Turns milliseconds to 02:30:15 format
 */
export const getShortFormattedDuration = (duration: number): string => {
  const totalSeconds = Math.round(duration / 1000)
  const seconds = totalSeconds % 60
  const minutes = Math.floor((totalSeconds / 60) % 60)
  const hours = Math.floor((totalSeconds / 3600) % 60)

  let result = `${seconds.toString().padStart(2, '0')}`
  if (minutes) result = `${minutes.toString().padStart(2, '0')}:${result}`
  if (hours) result = `${hours.toString().padStart(2, '0')}:${result}`
  return result
}

interface Vector2 {
  x: number
  y: number
}
// Source: https://math.stackexchange.com/questions/204020/what-is-the-equation-used-to-calculate-a-linear-trendline
export const calculateTrendLine = (points: Vector2[]): Vector2[] => {
  if (points.length < 2) return []

  let xSum = 0
  let ySum = 0
  let xySum = 0
  let xxSum = 0
  const count = points.length

  for (const point of points) {
    xSum += point.x
    ySum += point.y
    xySum += point.x * point.y
    xxSum += point.x * point.x
  }

  const slope = (count * xySum - xSum * ySum) / (count * xxSum - xSum * xSum)
  const offset = (ySum - slope * xSum) / count
  const startPoint = { x: points[0].x, y: points[0].x * slope + offset }
  const endPoint = { x: points[count - 1].x, y: points[count - 1].x * slope + offset }
  return [startPoint, endPoint]
}
