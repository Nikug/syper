import { format } from 'date-fns'

export const toDateTimeString = (date: Date) => format(date, 'dd.MM.yyyy HH:mm')

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

