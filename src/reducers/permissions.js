import R from 'ramda'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PERMISSION':
      return R.over(R.lensPath(['permissions']), R.append(R.omit(['type'], action)), state)
    case 'DELETE_PERMISSION':
      return R.over(R.lensPath(['permissions']), R.remove(state.metadata.activePermissionIndex, 1), state)
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
    default:
      console.log(`Unknown action type: ${action.type}`)
      return state
  }
}

export default reducer
