import R from 'ramda'

import appReducer from './app'
import permissionsReducer from './permissions'
import pathParametersReducer from './pathParameters'
import modelsReducer from './models'

const reducer = (state, action) => {
  if (R.test(/PERMISSION/, action.type)) {
    return permissionsReducer(state, action)
  }
  if (R.test(/PATH_PARAMETER/, action.type)) {
    return pathParametersReducer(state, action)
  }
  if (R.test(/MODEL/, action.type)) {
    return modelsReducer(state, action)
  }
  return appReducer(state, action)
}

export default (state, action) => reducer(state, action)(state)
