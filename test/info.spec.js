/* eslint-env jest */
import * as R from 'ramda'
import { Select } from 'antd'

import Info from '../src/web/components/Info'
import store from './store'
import { getWrapper } from './shared'
import state from '../build/state.json'

let wrapper = null
beforeEach(() => {
  wrapper = getWrapper(Info, R.pick(['info'], state))
})

describe('test info', () => {
  test('view info', () => {
    expect(wrapper.find('input').first().props().value).toEqual(store.getState().info.title)
  })
  test('update title', () => {
    wrapper.find('input').first().simulate('change', { target: { value: 'Hello' } })
    expect(store.getState().info.title).toEqual('Hello')
    wrapper.find('input').first().simulate('change', { target: { value: 'World' } })
    expect(store.getState().info.title).toEqual('World')
  })
  test('update arrays', () => {
    // schemes
    let input = wrapper.find(Select).first()
    input.props().onChange(['https', 'http'])
    expect(store.getState().info.schemes).toEqual(['https', 'http'])

    // produces
    input = wrapper.find(Select).at(1)
    input.props().onChange(['application/json', 'text/plain; charset=utf-8'])
    expect(store.getState().info.produces).toEqual(['application/json', 'text/plain; charset=utf-8'])

    // consumes
    input = wrapper.find(Select).at(2)
    input.props().onChange(['application/json', 'text/plain; charset=utf-8'])
    expect(store.getState().info.consumes).toEqual(['application/json', 'text/plain; charset=utf-8'])

    // tags
    input = wrapper.find(Select).at(3)
    input.props().onChange(['hello', 'world'])
    expect(store.getState().info.tags).toEqual(['hello', 'world'])
  })
})
