/* eslint-env jest */
import R from 'ramda'
import toJson from 'enzyme-to-json'

import store from './store'
import { addModel, deleteModel, addModelProperty, deleteModelProperty } from '../src/actions'
import Models from '../src/components/Models'
import { getWrapper } from './shared'
import state from '../dist/state.json'

let wrapper = null
beforeEach(() => {
  wrapper = getWrapper(Models, R.pick(['models'], state))
})

describe('test model', () => {
  test('add model', () => {
    store.dispatch(addModel())
    const models = store.getState().models
    expect(models.length).toEqual(4)
    expect(R.last(models).name).toEqual('Name')
  })
  test('delete model', () => {
    store.dispatch(deleteModel(1))
    const models = store.getState().models
    expect(models.length).toEqual(2)
    expect(models[1].name).toEqual('VersionInfo')
  })
  test('add model property', () => {
    store.dispatch(addModelProperty(1))
    const properties = store.getState().models[1].properties
    expect(properties.length).toEqual(4)
    expect(R.last(properties).name).toEqual('name')
  })
  test('delete model property', () => {
    let properties = store.getState().models[1].properties
    expect(properties.length).toEqual(3)
    store.dispatch(addModelProperty(1))
    properties = store.getState().models[1].properties
    expect(properties.length).toEqual(4)
    store.dispatch(deleteModelProperty(1, 0))
    properties = store.getState().models[1].properties
    expect(properties.length).toEqual(3)
  })
  test('view model', () => {
    expect(wrapper.find('.ant-collapse-item').length).toEqual(3)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
