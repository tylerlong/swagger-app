/* eslint-env jest */
import R from 'ramda'
import toJson from 'enzyme-to-json'
import { Popconfirm, Select } from 'antd'

import store from './store'
import Models from '../src/components/Models'
import FormItem from '../src/components/Models/FormItem'
import SubFormItem from '../src/components/Models/SubFormItem'
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
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  test('add model', () => {
    wrapper.find('button.ant-btn-primary').simulate('click')
    expect(getCount()).toEqual(count + 1)
  })
  test('delete model', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    wrapper.find(Popconfirm).props().onConfirm()
    expect(getCount()).toEqual(count - 1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  test('update model name', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    const index = wrapper.find(FormItem).first().props().index
    wrapper.find('input').first().simulate('change', { target: { value: 'Hello' } })
    expect(getModel(index).name).toEqual('Hello')
    wrapper.find('input').first().simulate('change', { target: { value: 'World' } })
    expect(getModel(index).name).toEqual('World')
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  test('model properties list index #0', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    const index = wrapper.find(FormItem).first().props().index
    const count = wrapper.find(FormItem).first().find('.ant-collapse-item').length
    expect(store.getState().models[index].properties.length).toEqual(count)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  test('model properties list index #1', () => {
    wrapper.find('div.ant-collapse-header').at(1).simulate('click')
    const index = wrapper.find(FormItem).first().props().index
    const count = wrapper.find(FormItem).first().find('.ant-collapse-item').length
    expect(store.getState().models[index].properties.length).toEqual(count)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  test('model properties list index #2', () => {
    wrapper.find('div.ant-collapse-header').at(2).simulate('click')
    const index = wrapper.find(FormItem).first().props().index
    const count = wrapper.find(FormItem).first().find('.ant-collapse-item').length
    expect(store.getState().models[index].properties.length).toEqual(count)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  test('add model property', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    const index = wrapper.find(FormItem).first().props().index
    const count = store.getState().models[index].properties.length
    wrapper.find(FormItem).first().find('button.ant-btn-primary').simulate('click')
    expect(store.getState().models[index].properties.length).toEqual(count + 1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  test('delete model property', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    wrapper.find(FormItem).first().find('div.ant-collapse-header').first().simulate('click')
    const index = wrapper.find(FormItem).first().props().index
    const count = store.getState().models[index].properties.length
    wrapper.find(FormItem).first().find(SubFormItem).first().find(Popconfirm).props().onConfirm()
    expect(store.getState().models[index].properties.length).toEqual(count - 1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  test('update model property fields', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    wrapper.find(FormItem).first().find('div.ant-collapse-header').first().simulate('click')
    const form = wrapper.find(FormItem).first().find(SubFormItem).first()
    const { index1, index2 } = form.props()

    let input = form.find('input').first()
    input.simulate('change', { target: { value: 'Hello' } })
    expect(store.getState().models[index1].properties[index2].name).toEqual('Hello')
    input.simulate('change', { target: { value: 'World' } })
    expect(store.getState().models[index1].properties[index2].name).toEqual('World')

    input = form.find('input').at(1)
    input.simulate('change', { target: { value: 'Hello' } })
    expect(store.getState().models[index1].properties[index2].description).toEqual('Hello')
    input.simulate('change', { target: { value: 'World' } })
    expect(store.getState().models[index1].properties[index2].description).toEqual('World')

    const select = form.find(Select).first()
    select.props().onChange('int64')
    expect(store.getState().models[index1].properties[index2].type).toEqual('int64')
    select.props().onChange('binary')
    expect(store.getState().models[index1].properties[index2].type).toEqual('binary')

    input = form.find('input').at(2)
    input.simulate('change', { target: { value: 'Hello, World' } })
    expect(store.getState().models[index1].properties[index2].enum).toEqual(['Hello', 'World'])

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
