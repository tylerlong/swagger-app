/* eslint-env jest */
import R from 'ramda'
import { Popconfirm } from 'antd'

import Paths from '../src/web/components/Paths'
import FormItem from '../src/web/components/Paths/FormItem'
import { getWrapper } from './shared'
import state from '../dist/state.json'
import store from './store'

let wrapper = null
beforeEach(() => {
  wrapper = getWrapper(Paths, R.pick(['paths'], state))
})
const count = state.paths.length
const getCount = () => store.getState().paths.length
const getModel = (index) => store.getState().paths[index]

describe('test paths', () => {
  test('view paths', () => {
    expect(wrapper.find('.ant-collapse-item').length).toEqual(count)
  })

  test('add path', () => {
    wrapper.find('button.ant-btn-primary').simulate('click')
    expect(getCount()).toEqual(count + 1)
  })

  test('delete path', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    wrapper.find(Popconfirm).props().onConfirm()
    expect(getCount()).toEqual(count - 1)
  })

  test('edit path path', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    const index = wrapper.find(FormItem).first().props().index
    wrapper.find('input').first().simulate('change', { target: { value: '/hello' } })
    expect(getModel(index).path).toEqual('/hello')
    wrapper.find('input').first().simulate('change', { target: { value: '/world' } })
    expect(getModel(index).path).toEqual('/world')
  })
})
