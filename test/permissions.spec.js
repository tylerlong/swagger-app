/* eslint-env jest */
import R from 'ramda'
import toJson from 'enzyme-to-json'
import { Popconfirm } from 'antd'

import Permissions from '../src/components/Permissions'
import store from './store'
import { getWrapper } from './shared'
import state from '../dist/state.json'
import FormItem from '../src/components/Permissions/FormItem'

let wrapper = null
beforeEach(() => {
  wrapper = getWrapper(Permissions, R.pick(['permissions'], state))
})

describe('test permission', () => {
  test('permissions list', () => {
    expect(store.getState().permissions.length).toEqual(3)
    expect(wrapper.find('button.ant-btn-primary').length).toEqual(1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('add permission', () => {
    wrapper.find('button.ant-btn-primary').simulate('click')
    expect(store.getState().permissions.length).toEqual(4)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('delete permission', () => {
    // delete permission
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    expect(store.getState().permissions.length).toEqual(3)
    wrapper.find(Popconfirm).props().onConfirm()
    expect(store.getState().permissions.length).toEqual(2)
    expect(wrapper.find(Popconfirm).length).toEqual(0)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('edit permission name', () => {
    // update permission name
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    const index = wrapper.find(FormItem).first().props().index
    wrapper.find('input').first().simulate('change', { target: { value: 'Hello' } })
    expect(store.getState().permissions[index].name).toEqual('Hello')
    wrapper.find('input').first().simulate('change', { target: { value: 'World' } })
    expect(store.getState().permissions[index].name).toEqual('World')
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
