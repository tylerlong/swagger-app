/* eslint-env jest */
import toJson from 'enzyme-to-json'
import { Popconfirm } from 'antd'

import Permissions from '../src/components/Permissions'
import store from './store'
import { getWrapper } from './shared'

const state = {
  permissions: [
    {
      'createdAt': 1498875025725,
      'name': 'EditAccounts',
      'description': 'Viewing and updating user account info (including name, business name, address and phone number/account number)'
    },
    {
      'createdAt': 1498875008388,
      'name': 'Accounts',
      'description': 'Managing accounts: creating new accounts, viewing and updating account information, deleting existing accounts'
    },
    {
      'createdAt': 1498875020815,
      'name': 'Contacts',
      'description': 'Creating, viewing, editing and deleting user personal contacts'
    }
  ]
}

describe('test permission', () => {
  test('permissions list', () => {
    const wrapper = getWrapper(Permissions, state)
    expect(store.getState().permissions.length).toEqual(3)
    expect(wrapper.find('button.ant-btn-primary').length).toEqual(1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('add permission', () => {
    const wrapper = getWrapper(Permissions, state)
    wrapper.find('button.ant-btn-primary').simulate('click')
    expect(store.getState().permissions.length).toEqual(4)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('delete permission', () => {
    const wrapper = getWrapper(Permissions, state)

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
