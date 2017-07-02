/* eslint-env jest */
import { call } from 'redux-saga/effects'
import nock from 'nock'

import { loadState } from './index'

test('loadState', () => {
  nock(/.+?/).get('/state.json').reply(200, { message: 'Hello world' })
  const gen = loadState()
  expect(gen.next().value).toEqual(call(global.fetch, '/state.json'))
  gen.next()
  gen.next()
  expect(gen.next().done).toEqual(true)
})
