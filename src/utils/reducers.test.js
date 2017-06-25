/* eslint-env jest */
const { swap } = require('./reducers')

test('swap two elements in an array', () => {
  expect(swap(0, 2, [1, 2, 3])).toEqual([3, 2, 1])
})
