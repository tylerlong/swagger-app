/* eslint-env jest */
import axios from 'axios'
import { call } from 'redux-saga/effects'

import { loadState } from './index'

test('loadState', () => {
  const gen = loadState()
  expect(gen.next().value).toEqual(call(axios.get, './state.json'))
  // expect(gen.next()).toEqual({ done: true, value: undefined })
})
