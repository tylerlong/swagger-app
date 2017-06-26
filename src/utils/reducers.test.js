/* eslint-env jest */
const { swap, alert } = require('./reducers')

test('swap two elements in an array', () => {
  expect(swap(0, 2, [1, 2, 3])).toEqual([3, 2, 1])
  expect(swap(1, 0, [1, 2, 3])).toEqual([2, 1, 3])
})

test('swap index out of bound', () => {
  expect(swap(0, 3, [1, 2, 3])).toEqual([1, 2, 3])
  expect(swap(-1, 2, [1, 2, 3])).toEqual([1, 2, 3])
})

test('alert success/info/warning/error', () => {
  const state = { metadata: { alerts: [] } }
  expect(alert('success', 'Hello world')(state)).toEqual({ metadata: { alerts: [{ type: 'success', message: 'Hello world' }] } })
  expect(alert('info', 'Hello world')(state)).toEqual({ metadata: { alerts: [{ type: 'info', message: 'Hello world' }] } })
  expect(alert('warning', 'Hello world')(state)).toEqual({ metadata: { alerts: [{ type: 'warning', message: 'Hello world' }] } })
  expect(alert('error', 'Hello world')(state)).toEqual({ metadata: { alerts: [{ type: 'error', message: 'Hello world' }] } })
})

test('alert unknown type', () => {
  const state = { metadata: { alerts: [] } }
  expect(alert('bug', 'Hello world')(state)).not.toEqual({ metadata: { alerts: [{ type: 'bug', message: 'Hello world' }] } })
  expect(alert('bug', 'Hello world')(state)).toEqual(state)
})

test('alert invalid message', () => {
  const state = { metadata: { alerts: [] } }
  expect(alert('success', null)(state)).not.toEqual({ metadata: { alerts: [{ type: 'success', message: null }] } })
  expect(alert('success', null)(state)).toEqual(state)
  expect(alert('success', '')(state)).not.toEqual({ metadata: { alerts: [{ type: 'success', message: '' }] } })
  expect(alert('success', '')(state)).toEqual(state)
  expect(alert('success', undefined)(state)).not.toEqual({ metadata: { alerts: [{ type: 'success', message: undefined }] } })
  expect(alert('success', undefined)(state)).toEqual(state)
  expect(alert('success', ['Hello world'])(state)).not.toEqual({ metadata: { alerts: [{ type: 'success', message: ['Hello world'] }] } })
  expect(alert('success', ['Hello world'])(state)).toEqual(state)
})
