/* eslint-env jest */
import toJson from 'enzyme-to-json'
import R from 'ramda'

import Info from '../src/components/Info'
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
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  test('update title', () => {
    wrapper.find('input').first().simulate('change', { target: { value: 'Hello' } })
    expect(store.getState().info.title).toEqual('Hello')
    wrapper.find('input').first().simulate('change', { target: { value: 'World' } })
    expect(store.getState().info.title).toEqual('World')
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
