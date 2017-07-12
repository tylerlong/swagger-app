// @flow

import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import type ReactWrapper from 'enzyme'

import store from './store'
import { setState } from '../src/actions'

export const getWrapper = (Component: Class<React.Component<*, *, *>>, state: any): ReactWrapper<any, any> => {
  store.dispatch(setState(state))
  store.resetActions()
  return mount(
    <Provider store={store}>
      <Component />
    </Provider>
  )
}
