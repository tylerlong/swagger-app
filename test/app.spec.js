/* eslint-env jest */
import nock from 'nock'
import axios from 'axios'
import R from 'ramda'
import { createMockStore } from 'redux-logic-test'
import httpAdapter from 'axios/lib/adapters/http'

import reducer from '../src/reducers'
import logic from '../src/logics'
import { loadState, setState } from '../src/actions'

const host = 'http://localhost'
axios.defaults.host = host
axios.defaults.adapter = httpAdapter

const initialState = { models: [{ name: '1', properties: [] }, { name: '2', properties: [] }] }
const store = createMockStore({
  initialState,
  reducer,
  logic
})

beforeEach(() => {
  store.dispatch(setState(initialState))
  store.resetActions()
})

describe('test state', () => {
  test('setState', () => {
    store.dispatch(setState({ message: 'world' }))
    return store.whenComplete(() => { // must `return`, otherwise jest won't report failure
      expect(R.omit('metadata', store.getState())).toEqual({ message: 'world' })
    })
  })

  test('loadState', () => {
    nock(host).get('/state.json').reply(200, { message: 'Hello world' })
    store.dispatch(loadState())
    return store.whenComplete(() => {
      expect(store.actions).toEqual([
        { type: 'LOAD_STATE' },
        { type: 'SET_STATE', state: { message: 'Hello world' } }
      ])
      expect(R.omit('metadata', store.getState())).toEqual({ message: 'Hello world' })
    })
  })
})
