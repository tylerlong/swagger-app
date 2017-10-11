/* eslint-env jest */
import * as R from 'ramda'

import { setState, setProp } from '../src/web/actions'
import store from './store'

const initialState = { models: [{ name: '1', properties: [] }, { name: '2', properties: [] }] }

beforeEach(() => {
  store.dispatch(setState(initialState))
  store.resetActions()
})

describe('global actions', () => {
  test('setState', () => {
    store.dispatch(setState({ message: 'world' }))
    expect(R.omit(['alerts'], store.getState())).toEqual({ message: 'world' })
  })

  test('setProp', () => {
    store.dispatch(setProp(['models', 1, 'name'], 'hello'))
    expect(store.getState().models[1]).toEqual({ name: 'hello', properties: [] })
  })
})

describe('unknown actions', () => {
  test('reducers', () => {
    const state = store.getState()
    store.dispatch({ type: 'UNKNOWN_ACTION' })
    expect(store.getState()).toEqual(state)
  })
})
