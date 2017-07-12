/* eslint-env jest */
import R from 'ramda'
import toJson from 'enzyme-to-json'
import { Popconfirm } from 'antd'

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
    const count = store.getState().paths.length
    expect(wrapper.find('.ant-collapse-item').length).toEqual(count)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('add path', () => {
    const count = store.getState().paths.length
    wrapper.find('button.ant-btn-primary').simulate('click')
    expect(store.getState().paths.length).toEqual(count + 1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('delete path', () => {
    // delete path
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    const count = store.getState().paths.length
    wrapper.find(Popconfirm).props().onConfirm()
    expect(store.getState().paths.length).toEqual(count - 1)
    expect(wrapper.find(Popconfirm).length).toEqual(0)
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
