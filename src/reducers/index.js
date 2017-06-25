import R from 'ramda'

import permissionsReducer from './permissions'
import pathParametersReducer from './pathParameters'
import modelsReducer from './models'
import appReducer from './app'

const defaultState = {
  metadata: {
    activeTabKey: 'info',
    activePermissionIndex: 0,
    activePathParameterIndex: 0,
    activeModelIndex: 0
  },
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
  },
  permissions: [],
  pathParameters: [],
  paths: [],
  models: []
}

const reducer = (state = defaultState, action) => {
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

export default reducer
