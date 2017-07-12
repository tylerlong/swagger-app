/* eslint-env jest */
import R from 'ramda'
import toJson from 'enzyme-to-json'

import Paths from '../src/components/Paths'
import { getWrapper } from './shared'
import state from '../dist/state.json'

let wrapper = null
beforeEach(() => {
  wrapper = getWrapper(Paths, R.pick(['paths'], state))
})

describe('test paths', () => {
  test('view paths', () => {
    expect(wrapper.find('.ant-collapse-item').length).toEqual(1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
