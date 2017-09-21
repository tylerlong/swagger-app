import R from 'ramda'

import appReducer from './app'
import pathsReducer from './paths'

const reducer = (state, action) => {
  if (R.test(/_PATH/, action.type)) {
    return pathsReducer(state, action)
  }
  return appReducer(state, action)
}

export default (state, action) => reducer(state, action)(state)
