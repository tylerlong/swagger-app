/* eslint-env jest */
import store from '../src/store'
import { setState, addModelProperty, deleteModelProperty } from '../src/actions'

const initialState = { models: [{ name: '1', properties: [] }, { name: '2', properties: [] }] }

beforeEach(() => {
  store.dispatch(setState(initialState))
})

describe('test model', () => {
  test('add model property', () => {
    store.dispatch(addModelProperty(1))
    expect(store.getState().models[1].properties.length).toEqual(1)
  })
  test('delete model property', () => {
    store.dispatch(addModelProperty(1))
    store.dispatch(deleteModelProperty(1, 0))
    expect(store.getState().models[1].properties.length).toEqual(0)
  })
})
