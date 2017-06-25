import R from 'ramda'

import { swap } from '../utils/reducers'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PERMISSION':
      return R.over(R.lensPath(['permissions']), R.append(R.omit(['type'], action)), state)
    case 'DELETE_PERMISSION':
      return R.over(R.lensPath(['permissions']), R.remove(state.metadata.activePermissionIndex, 1), state)
    case 'MOVE_PERMISSION_UP':
      return R.pipe(
        R.over(R.lensPath(['permissions']), swap(state.metadata.activePermissionIndex, state.metadata.activePermissionIndex - 1)),
        R.over(R.lensPath(['metadata', 'activePermissionIndex']), R.dec)
      )(state)
    case 'MOVE_PERMISSION_DOWN':
      return R.pipe(
        R.over(R.lensPath(['permissions']), swap(state.metadata.activePermissionIndex, state.metadata.activePermissionIndex + 1)),
        R.over(R.lensPath(['metadata', 'activePermissionIndex']), R.inc)
      )(state)
    default:
      console.log(`Unknown action type: ${action.type}`)
      return state
  }
}

export default reducer
