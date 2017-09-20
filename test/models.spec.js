/* eslint-env jest */
import R from 'ramda'
import { Popconfirm, Select } from 'antd'

import store from './store'
import Models from '../src/web/containers/Models'
import Model from '../src/web/containers/Models/Model'
import Property from '../src/web/containers/Models/Property'
import { getWrapper } from './shared'
import state from '../dist/state.json'

let wrapper = null
beforeEach(() => {
  wrapper = getWrapper(Models, R.pick(['models'], state))
})
const count = state.models.length
const getCount = () => store.getState().models.length
const getModel = (index) => store.getState().models[index]

describe('test model', () => {
  test('models list', () => {
    expect(wrapper.find('.ant-collapse-item').length).toEqual(count)
  })
  test('add model', () => {
    wrapper.find('button.ant-btn-primary').simulate('click')
    expect(getCount()).toEqual(count + 1)
  })
  test('delete model', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    wrapper.find(Popconfirm).props().onConfirm()
    expect(getCount()).toEqual(count - 1)
  })
  test('update model fields', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    const index = wrapper.find(Model).first().props().index
    wrapper.find('input').first().simulate('change', { target: { value: 'Hello' } })
    expect(getModel(index).name).toEqual('Hello')
    wrapper.find('input').first().simulate('change', { target: { value: 'World' } })
    expect(getModel(index).name).toEqual('World')
  })
  test('model properties list index #0', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    const index = wrapper.find(Model).first().props().index
    const count = wrapper.find(Model).first().find('.ant-collapse-item').length
    expect(store.getState().models[index].properties.length).toEqual(count)
  })
  test('model properties list index #1', () => {
    wrapper.find('div.ant-collapse-header').at(1).simulate('click')
    const index = wrapper.find(Model).first().props().index
    const count = wrapper.find(Model).first().find('.ant-collapse-item').length
    expect(store.getState().models[index].properties.length).toEqual(count)
  })
  test('model properties list index #2', () => {
    wrapper.find('div.ant-collapse-header').at(2).simulate('click')
    const index = wrapper.find(Model).first().props().index
    const count = wrapper.find(Model).first().find('.ant-collapse-item').length
    expect(store.getState().models[index].properties.length).toEqual(count)
  })
  test('add model property', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    const index = wrapper.find(Model).first().props().index
    const count = store.getState().models[index].properties.length
    wrapper.find(Model).first().find('button.ant-btn-primary').simulate('click')
    expect(store.getState().models[index].properties.length).toEqual(count + 1)
  })
  test('delete model property', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    wrapper.find(Model).first().find('div.ant-collapse-header').first().simulate('click')
    const index = wrapper.find(Model).first().props().index
    const count = store.getState().models[index].properties.length
    wrapper.find(Model).first().find(Property).first().find(Popconfirm).props().onConfirm()
    expect(store.getState().models[index].properties.length).toEqual(count - 1)
  })
  test('update model property fields', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    wrapper.find(Model).first().find('div.ant-collapse-header').first().simulate('click')
    const form = wrapper.find(Model).first().find(Property).first()
    const { index1, index2 } = form.props()

    // name
    let input = form.find('input').first()
    input.simulate('change', { target: { value: 'Hello' } })
    expect(store.getState().models[index1].properties[index2].name).toEqual('Hello')
    input.simulate('change', { target: { value: 'World' } })
    expect(store.getState().models[index1].properties[index2].name).toEqual('World')

    // description
    input = form.find('input').at(1)
    input.simulate('change', { target: { value: 'Hello' } })
    expect(store.getState().models[index1].properties[index2].description).toEqual('Hello')
    input.simulate('change', { target: { value: 'World' } })
    expect(store.getState().models[index1].properties[index2].description).toEqual('World')

    // type
    const select = form.find(Select).first()
    select.props().onChange('int64')
    expect(store.getState().models[index1].properties[index2].type).toEqual('int64')
    select.props().onChange('binary')
    expect(store.getState().models[index1].properties[index2].type).toEqual('binary')

    // enum
    input = form.find('input').at(2)
    input.simulate('change', { target: { value: 'Hello, World' } })
    expect(store.getState().models[index1].properties[index2].enum).toEqual(['Hello', 'World'])

    // required & isArray
    input = form.find('.ant-checkbox-input').first()
    input.simulate('change', { target: { checked: true } })
    expect(store.getState().models[index1].properties[index2].required).toEqual(true)
    input = form.find('.ant-checkbox-input').at(1)
    input.simulate('change', { target: { checked: true } })
    expect(store.getState().models[index1].properties[index2].isArray).toEqual(true)
  })
})
