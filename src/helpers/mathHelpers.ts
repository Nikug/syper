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
