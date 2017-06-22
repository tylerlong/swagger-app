import R from 'ramda'

const defaultState = {
  metadata: {
    activeTabKey: 'info'
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
  permissions: []
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_PROP':
      return R.set(R.lensPath(action.path), action.value, state)
    case 'SET_STATE':
      return action.state
    case 'ADD_PERMISSION':
      return R.over(R.lensPath(['permissions']), R.prepend(R.omit(['type'], action)), state)
    default:
      console.log(`Unknown action type: ${action.type}`)
      return state
  }
}

export default reducer
