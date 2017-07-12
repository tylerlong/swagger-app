/* eslint-env jest */
import R from 'ramda'
import toJson from 'enzyme-to-json'
import { Popconfirm } from 'antd'

import PathParameters from '../src/components/PathParameters'
import store from './store'
import { getWrapper } from './shared'
import state from '../dist/state.json'

let wrapper = null
beforeEach(() => {
  wrapper = getWrapper(PathParameters, R.pick(['pathParameters'], state))
})

describe('test pathParameters', () => {
  test('pathParameters list', () => {
    expect(store.getState().pathParameters.length).toEqual(4)
    expect(wrapper.find('button.ant-btn-primary').length).toEqual(1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('add pathParameter', () => {
    wrapper.find('button.ant-btn-primary').simulate('click')
    expect(store.getState().pathParameters.length).toEqual(5)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('delete pathParameter', () => {
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
