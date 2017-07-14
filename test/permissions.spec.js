/* eslint-env jest */
import R from 'ramda'
import toJson from 'enzyme-to-json'
import { Popconfirm } from 'antd'

import Permissions from '../src/components/Permissions'
import FormItem from '../src/components/Permissions/FormItem'
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
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('add permission', () => {
    wrapper.find('button.ant-btn-primary').simulate('click')
    expect(getCount()).toEqual(count + 1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('delete permission', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    wrapper.find(Popconfirm).props().onConfirm()
    expect(getCount()).toEqual(count - 1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('update permission name', () => {
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    const index = wrapper.find(FormItem).first().props().index
    wrapper.find('input').first().simulate('change', { target: { value: 'Hello' } })
    expect(getModel(index).name).toEqual('Hello')
    wrapper.find('input').first().simulate('change', { target: { value: 'World' } })
    expect(getModel(index).name).toEqual('World')
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
