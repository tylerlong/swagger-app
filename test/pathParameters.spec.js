/* eslint-env jest */
import R from 'ramda'
import toJson from 'enzyme-to-json'
import { Popconfirm } from 'antd'

import PathParameters from '../src/web/components/PathParameters'
import FormItem from '../src/web/components/PathParameters/FormItem'
import store from './store'
import { getWrapper } from './shared'
import state from '../dist/state.json'

let wrapper = null
beforeEach(() => {
  wrapper = getWrapper(PathParameters, R.pick(['pathParameters'], state))
})
const count = state.pathParameters.length
const getCount = () => store.getState().pathParameters.length
const getModel = (index) => store.getState().pathParameters[index]

describe('test pathParameters', () => {
  test('pathParameters list', () => {
    expect(wrapper.find('.ant-collapse-item').length).toEqual(count)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('add pathParameter', () => {
    wrapper.find('button.ant-btn-primary').simulate('click')
    expect(getCount()).toEqual(count + 1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('delete pathParameter', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    wrapper.find(Popconfirm).props().onConfirm()
    expect(getCount()).toEqual(count - 1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('update pathParameter fields', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    const index = wrapper.find(FormItem).first().props().index

    // name
    let input = wrapper.find('input').first()
    input.simulate('change', { target: { value: 'Hello' } })
    expect(getModel(index).name).toEqual('Hello')
    input.simulate('change', { target: { value: 'World' } })
    expect(getModel(index).name).toEqual('World')

    // description
    input = wrapper.find('input').at(1)
    input.simulate('change', { target: { value: 'Hello' } })
    expect(getModel(index).description).toEqual('Hello')
    input.simulate('change', { target: { value: 'World' } })
    expect(getModel(index).description).toEqual('World')

    // enum
    input = wrapper.find('input').at(2)
    input.simulate('change', { target: { value: 'Hello, World' } })
    expect(getModel(index).enum).toEqual(['Hello', 'World'])

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
