/* eslint-env jest */
import R from 'ramda'
import nock from 'nock'
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'

import store from './store'
import { loadState, setState } from '../src/web/actions'

const host = 'http://localhost'
axios.defaults.host = host
axios.defaults.adapter = httpAdapter

const initialState = { models: [{ name: '1', properties: [] }, { name: '2', properties: [] }] }

beforeEach(() => {
  store.dispatch(setState(initialState))
  store.resetActions()
})

test('loadState', () => {
  nock(host).get('/state.json').reply(200, { message: 'Hello world' })
  store.dispatch(loadState('/state.json'))
  return store.whenComplete(() => { // because it is async
    expect(store.actions).toEqual([
      { type: 'LOAD_STATE', filePath: '/state.json' },
      { type: 'SET_STATE', state: { message: 'Hello world' } }
    ])
    expect(R.omit('alerts', store.getState())).toEqual({ message: 'Hello world' })
  })
})
