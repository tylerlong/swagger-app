/* eslint-env jest */
import R from 'ramda'
import toJson from 'enzyme-to-json'
import { Popconfirm } from 'antd'

import store from './store'
import { addModelProperty, deleteModelProperty } from '../src/actions'
import Models from '../src/components/Models'
import { getWrapper } from './shared'
import state from '../dist/state.json'

let wrapper = null
beforeEach(() => {
  wrapper = getWrapper(Models, R.pick(['models'], state))
})

describe('test model', () => {
  test('add model', () => {
    const count = store.getState().models.length
    wrapper.find('button.ant-btn-primary').simulate('click')
    const models = store.getState().models
    expect(models.length).toEqual(count + 1)
    const defaultName = 'Name'
    expect(R.last(models).name).toEqual(defaultName)
  })
  test('delete model', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    const count = store.getState().models.length
    wrapper.find(Popconfirm).props().onConfirm()
    expect(store.getState().models.length).toEqual(count - 1)
    expect(wrapper.find(Popconfirm).length).toEqual(0)
    expect(toJson(wrapper)).toMatchSnapshot()
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
