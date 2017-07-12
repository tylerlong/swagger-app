/* eslint-env jest */
import R from 'ramda'
import toJson from 'enzyme-to-json'
import { Popconfirm } from 'antd'

import Permissions from '../src/components/Permissions'
import store from './store'
import { getWrapper } from './shared'
import state from '../dist/state.json'

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
    // view permission
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    expect(wrapper.find(Popconfirm).length).toEqual(1)
    expect(store.getState().permissions.length).toEqual(3)
    expect(toJson(wrapper)).toMatchSnapshot()

    // delete permission
    wrapper.find(Popconfirm).props().onConfirm()
    expect(store.getState().permissions.length).toEqual(2)
    expect(wrapper.find(Popconfirm).length).toEqual(0)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
