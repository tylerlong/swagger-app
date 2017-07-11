/* eslint-env jest */
import toJson from 'enzyme-to-json'

import Paths from '../src/components/Paths'
import { setState } from '../src/actions'
import store from './store'
import { getWrapper } from './shared'

const initialState = {
  'paths': [
    {
      'createdAt': 1498875254374,
      'path': '/restapi',
      'methods': [
        {
          'since': '1.0.2',
          'apiGroup': 'Light',
          'permissions': [],
          'batch': false,
          'visibility': 'public',
          'status': 'normal',
          'method': 'get',
          'description': 'Get Server Info',
          'tags': [
            'API Versions'
          ],
          'parameters': {},
          'request': {},
          'response': {},
          'examples': []
        }
      ]
    }
  ]
}

beforeEach(() => {
  store.dispatch(setState(initialState))
  store.resetActions()
})

describe('test paths', () => {
  test('view paths', () => {
    const wrapper = getWrapper(Paths)
    expect(wrapper.find('.ant-collapse-item').length).toEqual(1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
