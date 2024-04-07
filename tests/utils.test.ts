import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { numberOfMatchingItems } from '../src/util'

test('numberOfMatchingItems', () => {
  assert.equal(numberOfMatchingItems(['a', 'b', 'c'], ['a', 'b', 'c']), 3)
  assert.equal(numberOfMatchingItems(['a', 'b', 'c'], ['a', 'b']), 2)
  assert.equal(numberOfMatchingItems(['a', 'b', 'c'], ['a', 'b', 'c', 'd']), 3)
  assert.equal(numberOfMatchingItems(['a', 'b', 'c'], ['a', 'b', 'd']), 2)
})

test.run()
