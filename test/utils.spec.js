/* eslint-env jest */
import R from 'ramda'

import { alert, orderBy } from '../src/web/utils'

describe('test alert', () => {
  const state = { alerts: [] }

  test('alert success/info/warning/error', () => {
    expect(alert('success', 'Hello world')(state)).toEqual({ alerts: [{ type: 'success', message: 'Hello world' }] })
    expect(alert('info', 'Hello world')(state)).toEqual({ alerts: [{ type: 'info', message: 'Hello world' }] })
    expect(alert('warning', 'Hello world')(state)).toEqual({ alerts: [{ type: 'warning', message: 'Hello world' }] })
    expect(alert('error', 'Hello world')(state)).toEqual({ alerts: [{ type: 'error', message: 'Hello world' }] })
  })

  test('alert unknown type', () => {
    expect(() => { alert('bug', 'Hello world')(state) }).toThrowError(TypeError, 'Unknown alert type')
  })

  test('alert invalid message', () => {
    expect(alert('success', null)(state)).not.toEqual({ alerts: [{ type: 'success', message: null }] })
    expect(alert('success', null)(state)).toEqual(state)
    expect(alert('success', '')(state)).not.toEqual({ alerts: [{ type: 'success', message: '' }] })
    expect(alert('success', '')(state)).toEqual(state)
    expect(alert('success', undefined)(state)).not.toEqual({ alerts: [{ type: 'success', message: undefined }] })
    expect(alert('success', undefined)(state)).toEqual(state)
    expect(alert('success', ['Hello world'])(state)).not.toEqual({ alerts: [{ type: 'success', message: ['Hello world'] }] })
    expect(alert('success', ['Hello world'])(state)).toEqual(state)
  })
})

describe('test orderBy', () => {
  const objects = [{ name: 'c', path: '/B' }, { name: 'a', path: '/c' }, { name: 'B', path: '/a' }]
  test('order by name', () => {
    const expected = [{ name: 'a', path: '/c' }, { name: 'B', path: '/a' }, { name: 'c', path: '/B' }]
    expect(orderBy(R.prop('name'), objects)).toEqual(expected)
  })
  test('order by path', () => {
    const expected = [{ name: 'B', path: '/a' }, { name: 'c', path: '/B' }, { name: 'a', path: '/c' }]
    expect(orderBy(R.prop('path'), objects)).toEqual(expected)
  })
})
