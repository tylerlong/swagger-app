/* eslint-env jest */
import R from 'ramda'
import { Popconfirm, Select } from 'antd'

import store from './store'
import Models from '../src/web/containers/Models'
import Model from '../src/web/containers/Models/Model'
import Property from '../src/web/components/Models/Property'
import { getWrapper } from './shared'
import state from '../build/state.json'

let wrapper = null
beforeEach(() => {
  wrapper = getWrapper(Models, R.pick(['models'], state))
})
const count = state.models.length
const getByPath = path => R.path(path, store.getState())
const getModelCount = () => store.getState().models.length
const getPropertyCount = path => getByPath(path).properties.length

describe('test model', () => {
  test('models list', () => {
    expect(wrapper.find('.ant-collapse-item').length).toEqual(count)
  })
  test('add model', () => {
    wrapper.find('button.ant-btn-primary').simulate('click')
    expect(getModelCount()).toEqual(count + 1)
  })
  test('delete model', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    wrapper.find(Popconfirm).props().onConfirm()
    expect(getModelCount()).toEqual(count - 1)
  })
  test('update model fields', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    const path = wrapper.find(Model).first().props().path
    wrapper.find('input').first().simulate('change', { target: { value: 'Hello' } })
    expect(getByPath(path).name).toEqual('Hello')
    wrapper.find('input').first().simulate('change', { target: { value: 'World' } })
    expect(getByPath(path).name).toEqual('World')
  })
  test('model properties list index #0', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    const path = wrapper.find(Model).first().props().path
    const count = wrapper.find(Model).first().find('.ant-collapse-item').length
    expect(getPropertyCount(path)).toEqual(count)
  })
  test('model properties list index #1', () => {
    wrapper.find('div.ant-collapse-header').at(1).simulate('click')
    const path = wrapper.find(Model).first().props().path
    const count = wrapper.find(Model).first().find('.ant-collapse-item').length
    expect(getPropertyCount(path)).toEqual(count)
  })
  test('model properties list index #2', () => {
    wrapper.find('div.ant-collapse-header').at(2).simulate('click')
    const path = wrapper.find(Model).first().props().path
    const count = wrapper.find(Model).first().find('.ant-collapse-item').length
    expect(getPropertyCount(path)).toEqual(count)
  })
  test('add model property', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    const path = wrapper.find(Model).first().props().path
    const count = getPropertyCount(path)
    wrapper.find(Model).first().find('button.ant-btn-primary').simulate('click')
    expect(getPropertyCount(path)).toEqual(count + 1)
  })
  test('delete model property', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    wrapper.find(Model).first().find('div.ant-collapse-header').first().simulate('click')
    const path = wrapper.find(Model).first().props().path
    const count = getPropertyCount(path)
    wrapper.find(Model).first().find(Property).first().find(Popconfirm).props().onConfirm()
    expect(getPropertyCount(path)).toEqual(count - 1)
  })
  test('update model property fields', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    wrapper.find(Model).first().find('div.ant-collapse-header').first().simulate('click')
    const form = wrapper.find(Model).first().find(Property).first()
    const { path } = form.props()

    // name
    let input = form.find('input').first()
    input.simulate('change', { target: { value: 'Hello' } })
    expect(getByPath(path).name).toEqual('Hello')
    input.simulate('change', { target: { value: 'World' } })
    expect(getByPath(path).name).toEqual('World')

    // description
    input = form.find('input').at(1)
    input.simulate('change', { target: { value: 'Hello' } })
    expect(getByPath(path).description).toEqual('Hello')
    input.simulate('change', { target: { value: 'World' } })
    expect(getByPath(path).description).toEqual('World')

    // type
    let select = form.find(Select).first()
    select.props().onChange('int64')
    expect(getByPath(path).type).toEqual('int64')
    select.props().onChange('binary')
    expect(getByPath(path).type).toEqual('binary')

    // enum
    select = form.find(Select).at(1)
    select.props().onChange(['Hello', 'World'])
    expect(getByPath(path).enum).toEqual(['Hello', 'World'])

    // required & isArray
    input = form.find('.ant-checkbox-input').first()
    input.simulate('change', { target: { checked: true } })
    expect(getByPath(path).required).toEqual(true)
    input = form.find('.ant-checkbox-input').at(1)
    input.simulate('change', { target: { checked: true } })
    expect(getByPath(path).isArray).toEqual(true)
  })
})
