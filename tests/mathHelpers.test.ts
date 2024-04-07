import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { sampleSeries, wordsPerMinute } from '../src/helpers/mathHelpers'

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

test.run()
