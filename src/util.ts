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
