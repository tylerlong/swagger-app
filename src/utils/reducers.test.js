/* eslint-env jest */
const { swap } = require('./reducers')

test('swap two elements in an array', () => {
  expect(swap(0, 2, [1, 2, 3])).toEqual([3, 2, 1])
})

test('swap index out of bound', () => {
  expect(swap(0, 3, [1, 2, 3])).toEqual([1, 2, 3])
  expect(swap(-1, 2, [1, 2, 3])).toEqual([1, 2, 3])
})
