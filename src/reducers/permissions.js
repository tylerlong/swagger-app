import R from 'ramda'

import { swap } from '../utils/reducers'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PERMISSION':
      return R.pipe(
        R.over(R.lensPath(['permissions']), R.append(R.omit(['type'], action))),
        R.over(R.lensPath(['metadata', 'alerts']), R.append({ type: 'success', message: 'Permission added' }))
      )(state)
    case 'DELETE_PERMISSION':
      return R.pipe(
        R.over(R.lensPath(['permissions']), R.remove(state.metadata.activePermissionIndex, 1)),
        R.over(R.lensPath(['metadata', 'alerts']), R.append({ type: 'success', message: 'Permission deleted' }))
      )(state)
    case 'MOVE_PERMISSION_UP':
      return R.pipe(
        R.over(R.lensPath(['permissions']), swap(state.metadata.activePermissionIndex, state.metadata.activePermissionIndex - 1)),
        R.over(R.lensPath(['metadata', 'activePermissionIndex']), R.dec),
        R.over(R.lensPath(['metadata', 'alerts']), R.append({ type: 'success', message: 'Permission moved up' }))
      )(state)
    case 'MOVE_PERMISSION_DOWN':
      return R.pipe(
        R.over(R.lensPath(['permissions']), swap(state.metadata.activePermissionIndex, state.metadata.activePermissionIndex + 1)),
        R.over(R.lensPath(['metadata', 'activePermissionIndex']), R.inc),
        R.over(R.lensPath(['metadata', 'alerts']), R.append({ type: 'success', message: 'Permission moved down' }))
      )(state)
    default:
      console.log(`Unknown action type: ${action.type}`)
      return state
  }
}

export default reducer
