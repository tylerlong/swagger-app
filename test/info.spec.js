/* eslint-env jest */
import R from 'ramda'

import Info from '../src/web/components/Info'
import store from './store'
import { getWrapper } from './shared'
import state from '../dist/state.json'

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
    let input = wrapper.find('input[placeholder="Values separated by commas"]').first()
    input.simulate('change', { target: { value: 'https,http' } })
    expect(store.getState().info.schemes).toEqual(['https', 'http'])

    // produces
    input = wrapper.find('input[placeholder="Values separated by commas"]').at(1)
    input.simulate('change', { target: { value: 'application/json,text/plain; charset=utf-8' } })
    expect(store.getState().info.produces).toEqual(['application/json', 'text/plain; charset=utf-8'])

    // consumes
    input = wrapper.find('input[placeholder="Values separated by commas"]').at(2)
    input.simulate('change', { target: { value: 'application/json,text/plain; charset=utf-8' } })
    expect(store.getState().info.consumes).toEqual(['application/json', 'text/plain; charset=utf-8'])
  })
})
