/* eslint-env jest */
import R from 'ramda'

import { setState, setProp } from '../src/actions'
import store from './store'

const initialState = { models: [{ name: '1', properties: [] }, { name: '2', properties: [] }] }

beforeEach(() => {
  store.dispatch(setState(initialState))
  store.resetActions()
})

describe('global actions', () => {
  test('setState', () => {
    store.dispatch(setState({ message: 'world' }))
    expect(R.omit('alerts', store.getState())).toEqual({ message: 'world' })
  })

  test('setProp', () => {
    store.dispatch(setProp(['models', 1, 'name'], 'hello'))
    expect(store.getState().models[1]).toEqual({ name: 'hello', properties: [] })
  })
})

describe('unknown actions', () => {
  test('path', () => {
    store.dispatch({ type: 'MOVE_PATH' })
    expect(store.getState().alerts[1].message).toEqual('Unknown action type: MOVE_PATH')
  })
  test('permission', () => {
    store.dispatch({ type: 'MOVE_PERMISSION' })
    expect(store.getState().alerts[1].message).toEqual('Unknown action type: MOVE_PERMISSION')
  })
  test('path_parameter', () => {
    store.dispatch({ type: 'MOVE_PATH_PARAMETER' })
    expect(store.getState().alerts[1].message).toEqual('Unknown action type: MOVE_PATH_PARAMETER')
  })
})
