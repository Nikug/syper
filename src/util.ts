import { CharactersPerWord } from './constants'

/*
 * Gets random integer value between min and max
 * @param {end} min - inclusive
 * @param {end} max - exclusive
 */
export const randomBetween = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

/*
 * Returns random item from array
 * @param {T[]} array - Array to get the item from
 */
export const getRandomFromArray = <T>(array: T[]): T => {
  return array[randomBetween(0, array.length)]
}

/*
 * Returns the number of matching items from two arrays by comparing
 * items from both arrays at each index.
 * @param {T[]} arrayA - First array
 * @param {T[]} arrayB - Second array
 */
export const numberOfMatchingItems = <T extends string | unknown[]>(
  arrayA: T,
  arrayB: T
): number => {
  const limit = arrayA.length > arrayB.length ? arrayA.length : arrayB.length
  let matchingItems = 0
  for (let i = 0; i < limit; i++) {
    if (arrayA[i] === arrayB[i]) {
      matchingItems++
    }
  }

  return matchingItems
}

/*
 * Creates a string from Map values.
 * @param {Map<K, V>} map - The map to turn to string
 */
export const mapToString = <K, V>(map: Map<K, V>): string => {
  return Array.from(map.values()).join('')
}

/*
 * Calculates words per minute from characters and duration.
 * @param {number} characters - Number of characters
 * @param {number} duration - Duration in milliseconds
 */
export const wordsPerMinute = (characters: number, duration: number): number | null => {
  const words = characters / CharactersPerWord
  const durationInMinutes = duration / 1000 / 60
  if (duration === 0) return null

  return words / durationInMinutes
}

/*
 * Capitalizes the given text by switching the first character to uppercase.
 * @param {string} text - Text to capitalize
 */
export const capitalize = (text: string): string => {
  return text[0]?.toUpperCase() + text.substring(1)
}

/*
 * Wait for the specified duration.
 * @param {number} duration - Duration to wait in milliseconds
 */
export const sleep = (duration: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, duration))
}

/*
 * Replaces non-regular quotes with reqular quotes.
 *  @param {string} text - The text in which to replace quotes
 */
export const replaceBadQuotes = (text: string) => {
  return text.replace(/[“”]/g, '"').replace(/[‘’]/g, "'")
}
