/* eslint-env jest */
import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import store from './store'
import { setState, addModel, deleteModel, addModelProperty, deleteModelProperty } from '../src/actions'
import Models from '../src/components/Models'

const initialState = { models: [{ createdAt: 123, name: '1', properties: [] }, { createdAt: 456, name: '2', properties: [] }] }

beforeEach(() => {
  store.dispatch(setState(initialState))
  store.resetActions()
})

const getWrapper = () => {
  return mount(
    <Provider store={store}>
      <Models />
    </Provider>
  )
}

describe('test model', () => {
  test('add model', () => {
    store.dispatch(addModel())
    const models = store.getState().models
    expect(models.length).toEqual(3)
    expect(models[2].name).toEqual('Name')
  })
  test('delete model', () => {
    store.dispatch(deleteModel(1))
    const models = store.getState().models
    expect(models.length).toEqual(1)
    expect(models[0].name).toEqual('1')
  })
  test('add model property', () => {
    store.dispatch(addModelProperty(1))
    const properties = store.getState().models[1].properties
    expect(properties.length).toEqual(1)
    expect(properties[0].name).toEqual('name')
  })
  test('delete model property', () => {
    store.dispatch(addModelProperty(1))
    store.dispatch(deleteModelProperty(1, 0))
    const properties = store.getState().models[1].properties
    expect(properties.length).toEqual(0)
  })
  test('view model', () => {
    const wrapper = getWrapper()
    expect(wrapper.find('.ant-collapse-item').length).toEqual(2)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
