import R from 'ramda'

import { swap, alert } from '../utils/reducers'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PERMISSION':
      return R.pipe(
        R.over(R.lensPath(['permissions']), R.append(R.omit(['type'], action))),
        R.set(R.lensPath(['metadata', 'activePermissionIndex']), state.permissions.length),
        alert('success', 'Permission added')
      )
    case 'DELETE_PERMISSION':
      return R.pipe(
        R.over(R.lensPath(['permissions']), R.remove(state.metadata.activePermissionIndex, 1)),
        R.set(R.lensPath(['metadata', 'activePermissionIndex']), -1),
        alert('success', 'Permission deleted')
      )
    case 'MOVE_PERMISSION_UP':
      return R.pipe(
        R.over(R.lensPath(['permissions']), swap(state.metadata.activePermissionIndex, state.metadata.activePermissionIndex - 1)),
        R.over(R.lensPath(['metadata', 'activePermissionIndex']), R.dec),
        alert('success', 'Permission moved up')
      )
    case 'MOVE_PERMISSION_DOWN':
      return R.pipe(
        R.over(R.lensPath(['permissions']), swap(state.metadata.activePermissionIndex, state.metadata.activePermissionIndex + 1)),
        R.over(R.lensPath(['metadata', 'activePermissionIndex']), R.inc),
        alert('success', 'Permission moved down')
      )
    default:
      return alert('error', `Unknown action type: ${action.type}`)
  }
}

export default (state, action) => reducer(state, action)(state)
