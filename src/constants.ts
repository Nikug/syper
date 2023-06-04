import { getShortFormattedDuration } from './helpers/mathHelpers'

export const CharactersPerWord = 5

export const WordCounts = [10, 25, 50, 100]
export const TimeDurations: { key: number; value: string }[] = [
  { key: 15, value: getShortFormattedDuration(15 * 1000) },
  { key: 30, value: getShortFormattedDuration(30 * 1000) },
  { key: 60, value: getShortFormattedDuration(60 * 1000) },
  { key: 90, value: getShortFormattedDuration(90 * 1000) },
  { key: 120, value: getShortFormattedDuration(120 * 1000) },
]

export const AnimationDuration = 100
export const AnimationDurationClass = 'duration-100'
