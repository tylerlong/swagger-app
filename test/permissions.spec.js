/* eslint-env jest */
import R from 'ramda'
import { Popconfirm } from 'antd'

import Permissions from '../src/web/components/Permissions'
import Permission from '../src/web/components/Permissions/Permission'
import store from './store'
import { getWrapper } from './shared'
import state from '../dist/state.json'

let wrapper = null
beforeEach(() => {
  wrapper = getWrapper(Permissions, R.pick(['permissions'], state))
})
const count = state.permissions.length
const getCount = () => store.getState().permissions.length
const getModel = (index) => store.getState().permissions[index]

describe('test permissions', () => {
  test('permissions list', () => {
    expect(wrapper.find('.ant-collapse-item').length).toEqual(count)
  })

  test('add permission', () => {
    wrapper.find('button.ant-btn-primary').simulate('click')
    expect(getCount()).toEqual(count + 1)
  })

  test('delete permission', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    wrapper.find(Popconfirm).props().onConfirm()
    expect(getCount()).toEqual(count - 1)
  })

  test('update permission fields', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    const index = wrapper.find(Permission).first().props().index

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
  })
})
