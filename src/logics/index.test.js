/* eslint-env jest */
import nock from 'nock'
import axios from 'axios'
import R from 'ramda'
import { createMockStore } from 'redux-logic-test'
import httpAdapter from 'axios/lib/adapters/http'

import reducer from '../reducers'
import logic from './index'
import { loadState, setState } from '../actions'

const host = 'http://localhost'
axios.defaults.host = host
axios.defaults.adapter = httpAdapter

const store = createMockStore({
  initialState: { message: 'hello' },
  reducer,
  logic
})

test('setState', () => {
  store.dispatch(setState({ message: 'world' }))
  return store.whenComplete(() => { // must `return`, otherwise jest won't report failure
    expect(R.omit('metadata', store.getState())).toEqual({ message: 'world' })
  })
})

test('loadState', () => {
  nock(host).get('/state.json').reply(200, { message: 'Hello world' })
  store.resetActions()
  store.dispatch(loadState())
  return store.whenComplete(() => {
    expect(store.actions).toEqual([
      { type: 'LOAD_STATE' },
      { type: 'SET_STATE', state: { message: 'Hello world' } }
    ])
    expect(R.omit('metadata', store.getState())).toEqual({ message: 'Hello world' })
  })
})
