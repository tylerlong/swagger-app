import R from 'ramda'

import { alert } from '../utils'

const defaultState = {
  alerts: [],
  info: {
    title: 'Example API',
    version: '1.0',
    description: 'Restful API for Example',
    termsOfService: 'https://www.example.com/terms-of-service',
    host: 'api.example.com',
    basePath: '/',
    schemes: ['https'],
    produces: ['application/json'],
    consumes: ['application/json']
  },
  permissions: [],
  pathParameters: [],
  paths: [],
  models: []
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_PROP':
      return R.set(R.lensPath(action.path), action.value)
    case 'SET_STATE':
      return R.pipe(
        R.always(action.state),
        alert('success', 'Data loaded')
      )
    default:
      if (action.type !== '@@redux/INIT' && action.type !== 'LOAD_STATE') {
        // When app starts, '@@redux/INIT' invoked by Redux
        // 'LOAD_STATE' is handled by redux-logic
        return alert('error', `Unknown action type: ${action.type}`)
      }
      return R.always(state)
  }
}

export default reducer
