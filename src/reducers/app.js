import R from 'ramda'

const defaultState = {
  metadata: {
    alerts: [],
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
  switch (action.type) {
    case 'SET_PROP':
      return R.set(R.lensPath(action.path), action.value, state)
    case 'SET_STATE':
      return action.state
    default:
      if (action.type !== '@@redux/INIT') { // When app starts, invoked by Redux
        console.log(`Unknown action type: ${action.type}`)
      }
      return state
  }
}

export default reducer
