import { test } from 'uvu'
import * as assert from 'uvu/assert'
import {
  calculateTrendLine,
  getAccuracy,
  getCorrectness,
  getWordsPerMinute,
  mapErrorsToSeries,
  sampleSeries,
  smoothSeries,
  wordsPerMinute,
} from '../src/helpers/mathHelpers'
import { Attempt, Measurements, TypingTest } from '../src/types'

test('sampleSeries', () => {
  const series = Array.from({ length: 10 }, (_, index) => index)
  assert.equal(sampleSeries(series, 3), [0, 3, 6, 9])
  assert.equal(sampleSeries(series, 2), [0, 2, 4, 6, 8])
  assert.equal(sampleSeries(series, 5), [0, 5])
  assert.equal(sampleSeries(series, 15), [0])
})

test('wordsPerMinute', () => {
  const minute = 60e3
  assert.is(wordsPerMinute(10, minute), 2)
  assert.is(wordsPerMinute(5, minute), 1)
  assert.is(wordsPerMinute(100, minute), 20)
  assert.is(wordsPerMinute(0, minute), 0)
  assert.is(wordsPerMinute(0, 0), null)
})

test('getWordsPerMinute', () => {
  const minute = 60e3
  const measurements: Measurements = {
    startTime: 0,
    endTime: minute,
    errors: new Map(),
    timestamps: new Map(),
    words: [],
  }
  const test: TypingTest = {
    id: 0,
    length: 5,
    text: 'a',
    source: 'a',
    words: [],
  }

  assert.is(getWordsPerMinute(measurements, test), 1)
})

test('getCorrectness', () => {
  const test: TypingTest = {
    length: 4,
    text: 'abcd',
  } as unknown as TypingTest

  const attempt: Attempt = {
    finalText: 'abcd',
  } as unknown as Attempt

  assert.is(getCorrectness(test, attempt), 1)
  attempt.finalText = 'ab'
  assert.is(getCorrectness(test, attempt), 0.5)
  attempt.finalText = 'abcdef'
  assert.is(getCorrectness(test, attempt), 1)
  attempt.finalText = '1234'
  assert.is(getCorrectness(test, attempt), 0)
})

test('getAccuracy', () => {
  const test: TypingTest = {
    length: 4,
    text: 'abcd',
  } as unknown as TypingTest

  const attempt: Attempt = {
    finalText: 'abcd',
    allText: 'abcd',
  } as unknown as Attempt

  assert.is(getAccuracy(test, attempt), 1)
  attempt.finalText = 'ab'
  attempt.allText = 'ab'
  assert.is(getAccuracy(test, attempt), 1)
  attempt.finalText = 'abcd'
  attempt.allText = 'abcdef'
  assert.is(getAccuracy(test, attempt), 2 / 3)
  attempt.finalText = '1234'
  attempt.allText = 'abcd1234'
  assert.is(getAccuracy(test, attempt), 0)
})

test('smoothSeries', () => {
  const series = Array.from({ length: 10 }, (_, index) => index + 1)
  assert.equal(smoothSeries(series, 2), [1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10])
  assert.equal(smoothSeries(series, 5), [3, 4, 5, 6, 7, 8, 8.5, 9, 9.5, 10])
})

test('calculateTrendline - horizontal line', () => {
  const series = Array.from({ length: 10 }, (_, index) => ({ x: index, y: 1 }))
  assert.equal(calculateTrendLine(series), [
    { x: 0, y: 1 },
    { x: 9, y: 1 },
  ])
})

test('calculateTrendline - diagonal line', () => {
  const series = Array.from({ length: 10 }, (_, index) => ({ x: index, y: index }))
  assert.equal(calculateTrendLine(series), [
    { x: 0, y: 0 },
    { x: 9, y: 9 },
  ])
})

test('calculateTrendline - horizontal between 0 and 1', () => {
  const series = Array.from({ length: 10 }, (_, index) => ({ x: index, y: index % 2 }))
  assert.equal(calculateTrendLine(series), [
    { x: 0, y: 1 / 2.75 },
    { x: 9, y: 1 - 1 / 2.75 },
  ])
})

test('mapErrorsToSeries', () => {
  const series = Array.from({ length: 4 }, (_, index) => ({ x: (index + 1) * 5, y: 10 }))
  const errors = new Map<number, number>()
  errors.set(0, 1)
  errors.set(2, 1)
  errors.set(5, 2)
  errors.set(7, 1)

  const errorSeries = mapErrorsToSeries(errors, series.at(-1)!.x, 5)
  assert.equal(errorSeries, [
    { x: 5, y: 2 },
    { x: 10, y: 3 },
    { x: 15, y: null },
    { x: 20, y: null },
  ])
})

test.run()
