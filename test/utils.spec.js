/* eslint-env jest */
const { swap, alert } = require('../src/utils/reducers')

describe('test swap', () => {
  const state = [1, 2, 3]

  test('swap two elements in an array', () => {
    expect(swap(0, 2, state)).toEqual([3, 2, 1])
    expect(swap(1, 0, state)).toEqual([2, 1, 3])
  })

  test('swap index out of bound', () => {
    expect(swap(0, 3, state)).toEqual([1, 2, 3])
    expect(swap(-1, 2, state)).toEqual([1, 2, 3])
  })
})

describe('test alert', () => {
  const state = { metadata: { alerts: [] } }

  test('alert success/info/warning/error', () => {
    expect(alert('success', 'Hello world')(state)).toEqual({ metadata: { alerts: [{ type: 'success', message: 'Hello world' }] } })
    expect(alert('info', 'Hello world')(state)).toEqual({ metadata: { alerts: [{ type: 'info', message: 'Hello world' }] } })
    expect(alert('warning', 'Hello world')(state)).toEqual({ metadata: { alerts: [{ type: 'warning', message: 'Hello world' }] } })
    expect(alert('error', 'Hello world')(state)).toEqual({ metadata: { alerts: [{ type: 'error', message: 'Hello world' }] } })
  })

  test('alert unknown type', () => {
    expect(alert('bug', 'Hello world')(state)).not.toEqual({ metadata: { alerts: [{ type: 'bug', message: 'Hello world' }] } })
    expect(alert('bug', 'Hello world')(state)).toEqual(state)
  })

  test('alert invalid message', () => {
    expect(alert('success', null)(state)).not.toEqual({ metadata: { alerts: [{ type: 'success', message: null }] } })
    expect(alert('success', null)(state)).toEqual(state)
    expect(alert('success', '')(state)).not.toEqual({ metadata: { alerts: [{ type: 'success', message: '' }] } })
    expect(alert('success', '')(state)).toEqual(state)
    expect(alert('success', undefined)(state)).not.toEqual({ metadata: { alerts: [{ type: 'success', message: undefined }] } })
    expect(alert('success', undefined)(state)).toEqual(state)
    expect(alert('success', ['Hello world'])(state)).not.toEqual({ metadata: { alerts: [{ type: 'success', message: ['Hello world'] }] } })
    expect(alert('success', ['Hello world'])(state)).toEqual(state)
  })
})
