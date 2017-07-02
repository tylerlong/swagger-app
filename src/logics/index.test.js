/* eslint-env jest */
// import nock from 'nock'
import R from 'ramda'
import { createMockStore } from 'redux-logic-test'

import reducer from '../reducers'
import logic from './index'
import { setState } from '../actions'

const store = createMockStore({
  initialState: { message: 'hello' },
  reducer,
  logic
})

test('setState', () => {
  store.dispatch(setState({ message: 'world' }))
  return store.whenComplete(() => { // must return this, otherwise jest don't know it failed
    expect(R.omit('metadata', store.getState())).toEqual({ message: 'world' })
  })
})
