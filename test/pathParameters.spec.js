/* eslint-env jest */
import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Popconfirm } from 'antd'

import PathParameters from '../src/components/PathParameters'
import store from './store'
import { setState } from '../src/actions'

const initialState = {
  'pathParameters': [
    {
      'createdAt': 1498875032646,
      'name': 'accountId',
      'description': 'Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session',
      'enum': []
    },
    {
      'createdAt': 1498875033792,
      'name': 'scaleSize',
      'description': 'Dimensions of a profile image which will be returned in response',
      'enum': [
        '90x90',
        '195x195',
        '584x584'
      ]
    },
    {
      'createdAt': 1498875137756,
      'name': 'answeringRuleId',
      'description': 'Internal identifier of an answering rule. The value can be standard digital ID or specific ID - either business-hours-rule or after-hours-rule',
      'enum': []
    },
    {
      'createdAt': 1498875138459,
      'name': 'attachmentId',
      'description': 'Internal identifier of a message attachment',
      'enum': []
    }
  ]
}

const getWrapper = () => {
  return mount(
    <Provider store={store}>
      <PathParameters />
    </Provider>
  )
}

beforeEach(() => {
  store.dispatch(setState(initialState))
  store.resetActions()
})

describe('test pathParameters', () => {
  test('pathParameters list', () => {
    const wrapper = getWrapper()
    expect(store.getState().pathParameters.length).toEqual(4)
    expect(wrapper.find('button.ant-btn-primary').length).toEqual(1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('add pathParameter', () => {
    const wrapper = getWrapper()
    wrapper.find('button.ant-btn-primary').simulate('click')
    expect(store.getState().pathParameters.length).toEqual(5)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('delete pathParameter', () => {
    const wrapper = getWrapper()

    // view pathParameter
    wrapper.find('div.ant-collapse-header').first().simulate('click')
    expect(wrapper.find(Popconfirm).length).toEqual(1)
    expect(store.getState().pathParameters.length).toEqual(4)
    expect(toJson(wrapper)).toMatchSnapshot()

    // delete pathParameter
    wrapper.find(Popconfirm).props().onConfirm()
    expect(store.getState().pathParameters.length).toEqual(3)
    expect(wrapper.find(Popconfirm).length).toEqual(0)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
