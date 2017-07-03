/* eslint-env jest */
const { alert } = require('../src/utils/reducers')

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
