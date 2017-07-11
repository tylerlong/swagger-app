/* eslint-env jest */
import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import Info from '../src/components/Info'
import store from './store'
import { setState } from '../src/actions'

const initialState = {
  info: {
    title: 'Example API',
    version: '1.0',
    description: 'Restful API for Example',
    termsOfService: 'https://www.example.com/terms-of-service',
    host: 'api.example.com',
    basePath: '/',
    schemes: 'https',
    produces: 'application/json',
    consumes: 'application/json'
  }
}

const getWrapper = () => {
  return mount(
    <Provider store={store}>
      <Info />
    </Provider>
  )
}

beforeEach(() => {
  store.dispatch(setState(initialState))
  store.resetActions()
})

describe('test info', () => {
  test('view info', () => {
    const wrapper = getWrapper()
    expect(store.getState().info.title).toEqual('Example API')
    expect(wrapper.find('input').first().props().value).toEqual('Example API')
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
