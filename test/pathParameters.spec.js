/* eslint-env jest */
import * as R from 'ramda'
import { Popconfirm, Select } from 'antd'

import PathParameters from '../src/web/containers/PathParameters'
import PathParameter from '../src/web/components/PathParameters/PathParameter'
import store from './store'
import { getWrapper } from './shared'
import state from '../build/state.json'

let wrapper = null
beforeEach(() => {
  wrapper = getWrapper(PathParameters, R.pick(['pathParameters'], state))
})
const count = state.pathParameters.length
const getCount = () => store.getState().pathParameters.length
const getPathParameter = path => R.path(path, store.getState())

describe('test pathParameters', () => {
  test('pathParameters list', () => {
    expect(wrapper.find('.ant-collapse-item').length).toEqual(count)
  })

  test('add pathParameter', () => {
    wrapper.find('button.ant-btn-primary').simulate('click')
    expect(getCount()).toEqual(count + 1)
  })

  test('delete pathParameter', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    wrapper.find(Popconfirm).props().onConfirm()
    expect(getCount()).toEqual(count - 1)
  })

  test('update pathParameter fields', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    const path = wrapper.find(PathParameter).first().props().path

    // name
    let input = wrapper.find('input').first()
    input.simulate('change', { target: { value: 'Hello' } })
    expect(getPathParameter(path).name).toEqual('Hello')
    input.simulate('change', { target: { value: 'World' } })
    expect(getPathParameter(path).name).toEqual('World')

    // description
    input = wrapper.find('input').at(1)
    input.simulate('change', { target: { value: 'Hello' } })
    expect(getPathParameter(path).description).toEqual('Hello')
    input.simulate('change', { target: { value: 'World' } })
    expect(getPathParameter(path).description).toEqual('World')

    // enum
    input = wrapper.find(Select).first()
    input.props().onChange(['Hello', 'World'])
    expect(getPathParameter(path).enum).toEqual(['Hello', 'World'])
  })
})
