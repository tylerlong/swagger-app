/* eslint-env jest */
import toJson from 'enzyme-to-json'
import R from 'ramda'

import Info from '../src/components/Info'
import store from './store'
import { getWrapper } from './shared'
import state from '../dist/state.json'

describe('test info', () => {
  test('view info', () => {
    const wrapper = getWrapper(Info, R.pick(['info'], state))
    expect(store.getState().info.title).toEqual('Example API')
    expect(wrapper.find('input').first().props().value).toEqual('Example API')
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
