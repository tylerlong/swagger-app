/* eslint-env jest */
import toJson from 'enzyme-to-json'

import Info from '../src/components/Info'
import store from './store'
import { getWrapper } from './shared'

const state = {
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

describe('test info', () => {
  test('view info', () => {
    const wrapper = getWrapper(Info, state)
    expect(store.getState().info.title).toEqual('Example API')
    expect(wrapper.find('input').first().props().value).toEqual('Example API')
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
