/* eslint-env jest */
import R from 'ramda'
import toJson from 'enzyme-to-json'

import Paths from '../src/components/Paths'
import { getWrapper } from './shared'
import state from '../dist/state.json'
import FormItem from '../src/components/Paths/FormItem'
import store from './store'

let wrapper = null
beforeEach(() => {
  wrapper = getWrapper(Paths, R.pick(['paths'], state))
})

describe('test paths', () => {
  test('view paths', () => {
    expect(wrapper.find('.ant-collapse-item').length).toEqual(1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('edit path path', () => {
    // update path path
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    const index = wrapper.find(FormItem).first().props().index
    wrapper.find('input').first().simulate('change', { target: { value: '/hello' } })
    expect(store.getState().paths[index].path).toEqual('/hello')
    wrapper.find('input').first().simulate('change', { target: { value: '/world' } })
    expect(store.getState().paths[index].path).toEqual('/world')
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
