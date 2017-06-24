import R from 'ramda'

const defaultState = {
  metadata: {
    activeTabKey: 'info',
    activePermissionIndex: 0
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
    case 'ADD_PERMISSION':
      return R.over(R.lensPath(['permissions']), R.append(R.omit(['type'], action)), state)
    case 'DELETE_PERMISSION':
      return R.over(R.lensPath(['permissions']), R.remove(state.metadata.activePermissionIndex, 1), state)
    case 'ADD_PATH_PARAMETER':
      return R.over(R.lensPath(['pathParameters']), R.append(R.omit(['type'], action)), state)
    case 'DELETE_PATH_PARAMETER':
      return R.over(R.lensPath(['pathParameters']), R.remove(action.index, 1), state)
    case 'MOVE_PERMISSION_UP':
      const permissionIndex = state.metadata.activePermissionIndex
      const permission = state.permissions[permissionIndex]
      return R.pipe(
        R.over(R.lensPath(['permissions']), R.insert(permissionIndex - 1, permission)),
        R.over(R.lensPath(['permissions']), R.remove(permissionIndex + 1, 1)),
        R.over(R.lensPath(['metadata', 'activePermissionIndex']), R.dec)
      )(state)
    default:
      console.log(`Unknown action type: ${action.type}`)
      return state
  }
}

export default reducer
