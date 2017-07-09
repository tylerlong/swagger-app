/* eslint-env jest */
import renderer from 'react-test-renderer'
import React from 'react'
import { Provider } from 'react-redux'

import Permissions from '../src/components/Permissions'
import store from './store'
import { setState } from '../src/actions'

const initialState = { permissions: [
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
]}

beforeEach(() => {
  store.dispatch(setState(initialState))
  store.resetActions()
})

test('test permissions list', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Permissions />
    </Provider>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  // add permission
  tree.children[2].props.onClick()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
