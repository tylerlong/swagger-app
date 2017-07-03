/* eslint-env jest */
import { createMockStore } from 'redux-logic-test'

import reducer from '../src/reducers'
import logic from '../src/logics'
import { setState, addModelProperty, deleteModelProperty } from '../src/actions'

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

describe('test model', () => {
  test('add model property', () => {
    store.dispatch(addModelProperty(1))
    return store.whenComplete(() => {
      expect(store.getState().models[1].properties.length).toEqual(1)
    })
  })
  test('delete model property', () => {
    store.dispatch(addModelProperty(1))
    store.dispatch(deleteModelProperty(1, 0))
    return store.whenComplete(() => {
      expect(store.getState().models[1].properties.length).toEqual(0)
    })
  })
})
