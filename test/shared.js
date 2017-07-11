import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'

import store from './store'

export const getWrapper = (Component) => {
  return mount(
    <Provider store={store}>
      <Component />
    </Provider>
  )
}
