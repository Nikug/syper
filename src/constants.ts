import { getShortFormattedDuration } from './helpers/dateHelpers'
import { TextMode } from './types'

export const CharactersPerWord = 5

export const WordCounts = [10, 25, 50, 100]
export const TimeDurations: { key: number; value: string }[] = [
  { key: 15 * 1000, value: getShortFormattedDuration(15 * 1000) },
  { key: 30 * 1000, value: getShortFormattedDuration(30 * 1000) },
  { key: 60 * 1000, value: getShortFormattedDuration(60 * 1000) },
  { key: 90 * 1000, value: getShortFormattedDuration(90 * 1000) },
  { key: 120 * 1000, value: getShortFormattedDuration(120 * 1000) },
]

export const AnimationDuration = 200
export const AnimationDurationClass = 'duration-200'

export const TimedTestWords = 50
export const TimedTestCharacters = 300
export const TimerUpdateFrequency = 1000

export interface TextModeOption {
  key: TextMode
  value: string
}

export const textModeOptions: TextModeOption[] = [
  { key: 'quote', value: 'Quote' },
  { key: 'words', value: 'Words' },
  { key: 'time', value: 'Time' },
]

export const PersonalBestCorrectnessLimit = 0.95

export const TestTimeoutDuration = 30 * 1000

export const DefaultFont = 'Fragment Mono'

export const NotificationDuration = 5 * 1000

export const LineHeightMultiplier = 1.75
