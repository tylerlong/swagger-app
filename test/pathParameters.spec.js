/* eslint-env jest */
import R from 'ramda'
import toJson from 'enzyme-to-json'
import { Popconfirm } from 'antd'

import PathParameters from '../src/components/PathParameters'
import store from './store'
import { getWrapper } from './shared'
import state from '../dist/state.json'
import FormItem from '../src/components/PathParameters/FormItem'

let wrapper = null
beforeEach(() => {
  wrapper = getWrapper(PathParameters, R.pick(['pathParameters'], state))
})

describe('test pathParameters', () => {
  test('pathParameters list', () => {
    expect(store.getState().pathParameters.length).toEqual(4)
    expect(wrapper.find('button.ant-btn-primary').length).toEqual(1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('add pathParameter', () => {
    wrapper.find('button.ant-btn-primary').simulate('click')
    expect(store.getState().pathParameters.length).toEqual(5)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('delete pathParameter', () => {
    // delete pathParameter
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    const count = store.getState().pathParameters.length
    wrapper.find(Popconfirm).props().onConfirm()
    expect(store.getState().pathParameters.length).toEqual(count - 1)
    expect(wrapper.find(Popconfirm).length).toEqual(0)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('edit pathParameter name', () => {
    // update pathParameter name
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    const index = wrapper.find(FormItem).first().props().index
    wrapper.find('input').first().simulate('change', { target: { value: 'Hello' } })
    expect(store.getState().pathParameters[index].name).toEqual('Hello')
    wrapper.find('input').first().simulate('change', { target: { value: 'World' } })
    expect(store.getState().pathParameters[index].name).toEqual('World')
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
