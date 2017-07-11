/* eslint-env jest */
import toJson from 'enzyme-to-json'

import Paths from '../src/components/Paths'
import { getWrapper } from './shared'

const state = {
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

describe('test paths', () => {
  test('view paths', () => {
    const wrapper = getWrapper(Paths, state)
    expect(wrapper.find('.ant-collapse-item').length).toEqual(1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
