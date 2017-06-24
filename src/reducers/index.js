import R from 'ramda'

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
      return R.over(R.lensPath(['pathParameters']), R.remove(state.metadata.activePathParameterIndex, 1), state)
    case 'ADD_MODEL':
      return R.over(R.lensPath(['models']), R.append(R.omit(['type'], action)), state)
    case 'DELETE_MODEL':
      return R.over(R.lensPath(['models']), R.remove(state.metadata.activeModelIndex, 1), state)
    case 'MOVE_PERMISSION_UP':
      const permissionIndex = state.metadata.activePermissionIndex
      const permission = state.permissions[permissionIndex]
      return R.pipe(
        R.over(R.lensPath(['permissions']), R.insert(permissionIndex - 1, permission)),
        R.over(R.lensPath(['permissions']), R.remove(permissionIndex + 1, 1)),
        R.over(R.lensPath(['metadata', 'activePermissionIndex']), R.dec)
      )(state)
    case 'MOVE_PERMISSION_DOWN':
      const activePermissionIndex = state.metadata.activePermissionIndex
      const activePermission = state.permissions[activePermissionIndex]
      return R.pipe(
        R.over(R.lensPath(['permissions']), R.insert(activePermissionIndex + 2, activePermission)),
        R.over(R.lensPath(['permissions']), R.remove(activePermissionIndex, 1)),
        R.over(R.lensPath(['metadata', 'activePermissionIndex']), R.inc)
      )(state)
    case 'MOVE_PATH_PARAMETER_UP':
      const pathParameterIndex = state.metadata.activePathParameterIndex
      const pathParameter = state.pathParameters[pathParameterIndex]
      return R.pipe(
        R.over(R.lensPath(['pathParameters']), R.insert(pathParameterIndex - 1, pathParameter)),
        R.over(R.lensPath(['pathParameters']), R.remove(pathParameterIndex + 1, 1)),
        R.over(R.lensPath(['metadata', 'activePathParameterIndex']), R.dec)
      )(state)
    case 'MOVE_PATH_PARAMETER_DOWN':
      const activePathParameterIndex = state.metadata.activePathParameterIndex
      const activePathParameter = state.pathParameters[activePathParameterIndex]
      return R.pipe(
        R.over(R.lensPath(['pathParameters']), R.insert(activePathParameterIndex + 2, activePathParameter)),
        R.over(R.lensPath(['pathParameters']), R.remove(activePathParameterIndex, 1)),
        R.over(R.lensPath(['metadata', 'activePathParameterIndex']), R.inc)
      )(state)
    default:
      console.log(`Unknown action type: ${action.type}`)
      return state
  }
}

export default reducer
