import { getShortFormattedDuration } from './helpers/mathHelpers'

export const CharactersPerWord = 5

export const WordCounts = [10, 25, 50, 100]
export const TimeDurations: { key: number; value: string }[] = [
  { key: 15 * 1000, value: getShortFormattedDuration(15 * 1000) },
  { key: 30 * 1000, value: getShortFormattedDuration(30 * 1000) },
  { key: 60 * 1000, value: getShortFormattedDuration(60 * 1000) },
  { key: 90 * 1000, value: getShortFormattedDuration(90 * 1000) },
  { key: 120 * 1000, value: getShortFormattedDuration(120 * 1000) },
]

export const AnimationDuration = 100
export const AnimationDurationClass = 'duration-100'

export const TimedTestWords = 50
export const TimedTestCharacters = 300
export const TimerUpdateFrequency = 1000
