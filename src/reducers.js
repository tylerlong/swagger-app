import R from 'ramda'

const defaultState = {
  title: 'Example API',
  version: '1.0',
  description: 'Restful API for Example',
  termsOfService: 'https://www.example.com/terms-of-service',
  host: 'api.example.com',
  basePath: '/',
  schemes: 'https',
  produces: 'application/json',
  consumes: 'application/json',
  permissions: []
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_PROP':
      return R.set(R.lensProp(action.path), action.value, state)
    case 'SET_STATE':
      return action.state
    default:
      return state
  }
}

export default reducer
